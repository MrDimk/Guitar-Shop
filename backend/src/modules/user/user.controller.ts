import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {UserServiceInterface} from './user-service.interface.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {CreateUserDTO} from './dto/create-user.dto.js';
import {HttpError} from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {createJWT, fillDTO} from '../../utils/utils.js';
import {UserRDO} from './rdo/user.rdo.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {JWT_ALGORITM} from './user-const.js';
import LoggedUserRDO from './rdo/logged-user.rdo.js';

@injectable()
export class UserController extends Controller {
    constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
        @inject(Component.ConfigInterface) configService: ConfigInterface,
    ) {
        super(logger, configService);

        this.logger.info('Register routes for UserController…');

        this.addRoute({
            path: '/register',
            method: HttpMethod.Post,
            handler: this.create,
            middlewares: [new ValidateDtoMiddleware(CreateUserDTO)]
        });


        this.addRoute({
            path: '/login',
            method: HttpMethod.Post,
            handler: this.login,
            middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
        });


        this.addRoute({
            path: '/login',
            method: HttpMethod.Get,
            handler: this.checkAuthenticate
        });
    }

    public async create(
        {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDTO>,
        res: Response
    ): Promise<void> {
        console.log(body);
        const existsUser = await this.userService.findByEmail(body.email);

        if (existsUser) {
            throw new HttpError(
                StatusCodes.CONFLICT,
                `User with email «${body.email}» exists.`,
                'UserController'
            );
        }

        const result = await this.userService.create(body, this.configService.get('SALT'));
        this.send(
            res,
            StatusCodes.CREATED,
            fillDTO(UserRDO, result)
        );
    }

    public async login(
        {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
        res: Response,
    ): Promise<void> {
        const user = await this.userService.verifyUser(body, this.configService.get('SALT'));
        if (! user) {
            throw new HttpError(
                StatusCodes.UNAUTHORIZED,
                'Unauthorized',
                'UserController',
            );
        }

        const token = await createJWT(
            JWT_ALGORITM,
            this.configService.get('JWT_SECRET'),
            { email: user.email, id: user.id}
        );
        this.ok(res, fillDTO(LoggedUserRDO, {email: user.email, name: user.name, token}));
    }

    public async checkAuthenticate(req: Request, res: Response): Promise<void> {
        if (! req.user) {
            throw new HttpError(
                StatusCodes.UNAUTHORIZED,
                'Unauthorized',
                'UserController'
            );
        }
        const user = await this.userService.findByEmail(req.user.email);
        this.ok(res, fillDTO(LoggedUserRDO, user));
    }
}
