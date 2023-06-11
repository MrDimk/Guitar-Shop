import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import * as mongoose from 'mongoose';
import {DatabaseInterface} from './database.interface.js';

@injectable()
export class DatabaseService implements DatabaseInterface {
    constructor(
        @inject(Component.LoggerInterface) private logger: LoggerInterface,
    ) {}

    public async connect(uri: string): Promise<void> {
        this.logger.info('Trying to connect to database...')
        await mongoose.connect(uri);
        this.logger.info('Database connection is established.');
    }

    public async disconnect(): Promise<void> {
        mongoose.disconnect();
        this.logger.info('Database connection closed.');
    }
}
