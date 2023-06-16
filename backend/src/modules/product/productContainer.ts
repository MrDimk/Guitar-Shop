import {Container} from 'inversify';
import {Component} from '../../types/component.types.js';
import {types} from '@typegoose/typegoose';
import {ProductEntity, TestModel} from './productEntity.js';
import {ProductServiceInterface} from './product-service.interface.js';
import {ProductService} from './productService.js';
import {ControllerInterface} from '../../common/controller/controller.interface.js';
import {ProductController} from './productController.js';

const productContainer = new Container();

productContainer.bind<ProductServiceInterface>(Component.ProductServiceInterface).to(ProductService).inSingletonScope();
productContainer.bind<types.ModelType<ProductEntity>>(Component.ProductModel).toConstantValue(TestModel);
productContainer.bind<ControllerInterface>(Component.ProductController).to(ProductController).inSingletonScope();

export {productContainer};
