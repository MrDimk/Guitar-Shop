import {CliCommandInterface} from './cli-command.interface';
import {readFileSync} from 'fs';

export class VersionCommand implements CliCommandInterface {
    public readonly name = '--version';

    private readVersion = (): string => JSON.parse(
        readFileSync('./package.json', 'utf-8'))
        .version;

    public async execute() {
        console.log(this.readVersion());
    }
}
