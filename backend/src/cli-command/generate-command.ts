import {CliCommandInterface} from './cli-command.interface.js';
// import {MockData} from '../types/mock-data.type';
import {Product} from '../types/product.type.js';
import {nanoid} from 'nanoid';
import {TsvFileReader} from '../common/file-reader/tsv-file-reader.js';
import dayjs from 'dayjs';
import {GuitarType} from '../types/guitar-type.enum.js';
import {getRandomElement, getRandomInt} from '../utils/utils.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';

const DEFAAULT_MOCK_CSV_FILEPATH = './mocks/mock-data.tsv';

export class GenerateCommand implements CliCommandInterface {
    public readonly name = '--generate';
    // private mockData: MockData;

    constructor(private logger: LoggerInterface) {

    }

    public async execute() {
        await this.loadData(DEFAAULT_MOCK_CSV_FILEPATH);
        this.logger.info('file readed');
    }

    private async loadData(filename: string): Promise<void> {
        const fileReader = new TsvFileReader(filename.trim());
        fileReader.on('line', this.onLine);
        fileReader.on('end', this.onComplete);
        try {
            await fileReader.read();
        } catch (error) {
            console.log(`Не удалось импортировать данные из файла, ошибка: "${error}"`);
        }
    }

    private onLine = (line: string, resolve: () => void) => {
        const product = this.createProduct(line);
        console.log(product);
        // await this.saveMovie(movie);
        // this.logger.info(`Movie "${movie.title}" saved in DB.`);
        resolve();
    }

    private onComplete = (count: number) => {
        this.logger.info(`${count} rows imported.`);
        // this.databaseService.disconnect();
    }

    private createProduct = (line: string): Product => {
        const tokens = line.replace('\n', '')
            .replace(`"`, '').split('\t');
        const [title, description, photo, type] = tokens;
        let guitarType = GuitarType.Acoustic;
        let stringCount = 0;

        switch (type) {
            case GuitarType.Electric:
                guitarType = GuitarType.Electric;
                stringCount = getRandomElement([4, 6, 7]);
                break;
            case GuitarType.Acoustic:
                guitarType = GuitarType.Acoustic;
                stringCount = getRandomElement([6, 7, 12]);
                break;
            case GuitarType.Ukulele:
                guitarType = GuitarType.Ukulele;
                stringCount = 4;
                break;
        }

        return {
            id: nanoid(),
            title, description, photo, guitarType,
            addedDate: dayjs().toDate(),
            article: `${type}-${nanoid(5)}`,
            stringCount,
            price: getRandomInt(100, 1000000)
        }
    }
}
