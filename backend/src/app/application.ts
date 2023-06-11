import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';
import 'reflect-metadata';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {getURI} from '../utils/db.js';
import {UserModel} from '../modules/user/user.entity.js';

@injectable()
export class Application {

    constructor(
        @inject(Component.LoggerInterface) private logger: LoggerInterface,
        @inject(Component.ConfigInterface) private config: ConfigInterface,
        @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface
    ) {}

    public async init() {
        this.logger.info('Application initialization...');
        this.logger.info(`Port is ${this.config.get('PORT')}`);

        const uri = getURI(
            this.config.get('DB_USER'),
            this.config.get('DB_PASSWORD'),
            this.config.get('DB_PORT'),
            this.config.get('DB_HOST'),
            this.config.get('DB_NAME'),
        );

        this.logger.info(uri);
        await this.databaseClient.connect(uri);


        this.logger.info(`DB_Host is ${this.config.get('DB_HOST')}`);
        this.logger.info(`Salt is ${this.config.get('SALT')}`);

        const user = await UserModel.create({
            email: 'admin@test.com',
            name: 'admin'
        });

        console.log(user);
    }
}
