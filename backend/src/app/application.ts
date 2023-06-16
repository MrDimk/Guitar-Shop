import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {getURI} from '../utils/db.js';
import express, {Express} from 'express';
import {ControllerInterface} from '../common/controller/controller.interface.js';
import {ExceptionFilterInterface} from '../common/errors/exception-filter.interface.js';

@injectable()
export class Application {
    private expressApp: Express;

    constructor(
        @inject(Component.LoggerInterface) private logger: LoggerInterface,
        @inject(Component.ConfigInterface) private config: ConfigInterface,
        @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
        @inject(Component.UserController) private userController: ControllerInterface,
        @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
        @inject(Component.ProductController) private productController: ControllerInterface
    ) {
        this.expressApp = express();
    }

    public initExceptionFilter() {
        this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public initRoutes() {
        this.expressApp.use('/users', this.userController.router);
        this.expressApp.use('/products', this.productController.router);
    }

    public initMiddleware() {
        this.expressApp.use(express.json());
        // this.expressApp.use(
        //     '/upload',
        //     express.static(this.config.get('UPLOAD_DIRECTORY'))
        // );
        // const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
        // this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    }

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

        this.initMiddleware();
        this.initRoutes();
        this.initExceptionFilter();
        await this.expressApp.listen(this.config.get('PORT'));
        this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
    }
}
