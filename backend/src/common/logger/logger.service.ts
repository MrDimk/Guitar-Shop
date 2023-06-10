import {LoggerInterface} from './logger.interface';
import pino from 'pino';

export class LoggerService implements LoggerInterface {
    private logger!: LoggerInterface;

    constructor() {
        this.logger = pino({
            timestamp: true,
            prettyPrint: true
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
