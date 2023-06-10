import {CliCommandInterface} from './cli-command.interface';

export class HelpCommand implements CliCommandInterface {
    public readonly name = '--help';

    public execute() {
        console.log(`
            Teas-data generator for REST API server.
        Example:
            main.js --<command> [--arguments]
        Команды:
            --version:                   # prints app version
            --help:                      # prints all commands 
            --generate <n> <connection string>  # generates mock-data and push it into DB
        `);
    }
}
