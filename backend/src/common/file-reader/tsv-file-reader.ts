import {FileReaderInterface} from './file-reader.interface.js';
import EventEmitter from 'events';
import {createReadStream} from 'fs';
import path from 'path';
// import {fileURLToPath} from 'url';

export class TsvFileReader extends EventEmitter implements FileReaderInterface {
    constructor(public filename: string) {
        super();
    }

    public async read(): Promise<void> {
        const __filename = path.dirname(process.argv[1])
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, this.filename);
        const stream = createReadStream(filePath, {
            highWaterMark: 2 ** 14,
            encoding: 'utf-8'
        });

        let lineRead = '';
        let endLinePosition = -1;
        let importedRowCount = 0;

        for await (const chunk of stream) {
            lineRead += chunk.toString();

            while ((lineRead.indexOf('\n')) >= 0) {
                endLinePosition = lineRead.indexOf('\n');
                const completeRow = lineRead.slice(0, endLinePosition + 1);
                lineRead = lineRead.slice(++endLinePosition);
                importedRowCount++;

                await new Promise((resolve) => {
                    this.emit('line', completeRow, resolve);
                });
            }
        }

        this.emit('end', importedRowCount);
    }
}
