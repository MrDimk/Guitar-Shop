import {LoggerInterface} from './logger.interface';
import pino from 'pino';
import {injectable} from 'inversify';

@injectable()
export class LoggerService implements LoggerInterface {
    private logger!: LoggerInterface;

    constructor() {
        this.logger = pino({
            transport: {
                target: 'pino-pretty'
            },
        });
        this.logger.info('Logger created.');
    }

    public debug(message: string, ...args: unknown[]): void {
        this.logger.debug(message, ...args);
    }

    public error(message: string, ...args: unknown[]): void {
        this.logger.error(message, ...args);
    }

    public info(message: string, ...args: unknown[]): void {
        this.logger.info(message, ...args);
    }

    public warn(message: string, ...args: unknown[]): void {
        this.logger.warn(message, ...args);
    }
}
