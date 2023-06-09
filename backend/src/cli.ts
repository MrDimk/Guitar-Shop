#!/usr/bin/env node
import 'reflect-metadata';
import {CLIApplication} from './app/cli-application.js';
import {HelpCommand} from './cli-command/help-command.js';
import {VersionCommand} from './cli-command/version-command.js';
import {GenerateCommand} from './cli-command/generate-command.js';

const myManager = new CLIApplication();

myManager.registerCommands([
    new HelpCommand(), new VersionCommand(), new GenerateCommand()
]);
myManager.processCommand(process.argv);
