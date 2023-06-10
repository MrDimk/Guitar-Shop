import {CliCommandInterface} from '../cli-command/cli-command.interface';

type ParsedCommand = {
    [key: string]: string[];
};

export class CLIApplication {
    private commands: {[property: string]: CliCommandInterface} = {};
    private defaultCommand = '--help';

    public parseCommand(cliArguments: string[]): ParsedCommand {
        let command = '';
        const parsedCommand: ParsedCommand = {};

        return cliArguments.reduce((acc, argument) => {
            if(argument.startsWith('--')) {
                acc[argument] = [];
                command = argument;
            } else if(command && argument) {
                acc[command].push(argument);
            }

            return acc;
        }, parsedCommand);
    }

    public registerCommands(commands: CliCommandInterface[]): void {
        commands.reduce((acc, command) => {
            const cliCommand = command;
            acc[cliCommand.name] = cliCommand;
            return acc;
        }, this.commands);
    }

    public processCommand(argv: string[]): void {
        const parsedCommand = this.parseCommand(argv);
        const [commandName] = Object.keys(parsedCommand);
        const command = this.commands[commandName] ?? this.commands[this.defaultCommand];
        const commandArguments = parsedCommand[commandName] ?? [];
        command.execute(...commandArguments);
    }
}
