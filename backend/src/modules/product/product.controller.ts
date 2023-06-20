import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {HttpError} from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/utils.js';
import {ProductServiceInterface} from './product-service.interface.js';
import {CreateProductDto} from './dto/create-product.dto.js';
import {ProductRDO} from './rdo/product.rdo.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {UpdateProductDto} from './dto/update-product.dto.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {ProductShortRDO} from './rdo/product-short.rdo.js';
import * as core from 'express-serve-static-core';
import {UploadPhotoRdo} from './rdo/upload-photo.rdo.js';

type ParamsGetProduct = {
    productId: string;
}

@injectable()
export class ProductController extends Controller {
    constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.ProductServiceInterface) private readonly productService: ProductServiceInterface,
        @inject(Component.ConfigInterface) configService: ConfigInterface,
    ) {
        super(logger, configService);

        this.logger.info('Register routes for ProductController…');

        this.addRoute({
            path: '/',
            method: HttpMethod.Post,
            handler: this.create,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateDtoMiddleware(CreateProductDto),
            ]
        });

        this.addRoute({
            path: '/',
            method: HttpMethod.Get,
            handler: this.index,
            // middlewares: [
            //     new PrivateRouteMiddleware()
            // ]
        });

        this.addRoute({
            path: '/:productId',
            method: HttpMethod.Patch,
            handler: this.update,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateObjectIdMiddleware('productId'),
                new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
                new ValidateDtoMiddleware(UpdateProductDto),
            ]
        });
        this.addRoute({
            path: '/:productId',
            method: HttpMethod.Delete,
            handler: this.delete,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateObjectIdMiddleware('productId'),
                new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
            ]
        });
        this.addRoute({
            path: '/:productId',
            method: HttpMethod.Get,
            handler: this.show,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateObjectIdMiddleware('productId'),
                new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
            ]
        });
        this.addRoute({
            path: '/:productId/photo',
            method: HttpMethod.Post,
            handler: this.uploadPhoto,
            middlewares: [
                new PrivateRouteMiddleware(),
                new ValidateObjectIdMiddleware('productId'),
                new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'photo'),
            ]
        });
    }

    public async create(
        {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateProductDto>,
        res: Response
    ): Promise<void> {

        console.log(this.configService.get('PORT'));
        console.log(body);
        const result = await this.productService.create(body);
        this.send(
            res,
            StatusCodes.CREATED,
            fillDTO(ProductRDO, result)
        );
    }

    public async index({query}: Request, res: Response): Promise<void> {
        console.log('index method');
        console.log(query);
        const result = await this.productService.find(query);
        if(!result) {
            throw new HttpError(
                StatusCodes.NO_CONTENT,
                `Products not found.`,
                'ProductController'
            );
        }
        console.log(fillDTO(ProductShortRDO, result));
        this.ok(res, fillDTO(ProductShortRDO, result));
    }

    public async update({ body, params }: Request, res: Response): Promise<void> {
        const updatedProduct = await this.productService.updateById(params.productId, body);
        this.ok(res, fillDTO(ProductRDO, updatedProduct));
    }


    public async delete({params}: Request, res: Response): Promise<void> {
        const deletedProduct = await this.productService.deleteById(params.productId);
        this.noContent(res, fillDTO(ProductRDO, deletedProduct));
    }

    public async show({params}: Request, res: Response): Promise<void> {
        const product = await this.productService.findById(params.productId);
        // if (!product) {
        //     throw new HttpError(
        //         StatusCodes.NOT_FOUND,
        //         `Product with id ${params.productId} not found.`,
        //         'ProductController'
        //     );
        // }
        this.ok(res, fillDTO(ProductRDO, product));
    }

    // public async uploadPhoto(req: Request, res: Response) {
    //     this.created(res, {
    //         filepath: req.file?.path
    //     });
    // }
    public async uploadPhoto(req: Request<core.ParamsDictionary | ParamsGetProduct>, res: Response) {
        const {productId} = req.params;
        const updateDto = { photo: req.file?.filename };
        await this.productService.updateById(productId, updateDto);
        this.created(res, fillDTO(UploadPhotoRdo, {updateDto}));
    }
}
