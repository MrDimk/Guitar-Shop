import {Container} from 'inversify';
import {Component} from '../../types/component.types.js';
import {types} from '@typegoose/typegoose';
import {ProductEntity, ProductModel} from './product.entity.js';
import {ProductServiceInterface} from './product-service.interface.js';
import {ProductService} from './product.service.js';
import {ControllerInterface} from '../../common/controller/controller.interface.js';
import {ProductController} from './product.controller.js';

const productContainer = new Container();

productContainer.bind<ProductServiceInterface>(Component.ProductServiceInterface).to(ProductService).inSingletonScope();
productContainer.bind<types.ModelType<ProductEntity>>(Component.ProductModel).toConstantValue(ProductModel);
productContainer.bind<ControllerInterface>(Component.ProductController).to(ProductController).inSingletonScope();

export {productContainer};
