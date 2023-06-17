import 'reflect-metadata';
import {Container} from 'inversify';
import {Component} from './types/component.types.js';
import {Application} from './app/application.js';
import {applicationContainer} from './app/application.container.js';
import {userContainer} from './modules/user/user.container.js';
import {productContainer} from './modules/product/product.container.js';

const mainContainer = Container.merge(
    applicationContainer,
    userContainer,
    productContainer
);

async function bootstrap() {
    const application = mainContainer.get<Application>(Component.Application);
    await application.init();
}

await bootstrap();
