import {DocumentType, types} from '@typegoose/typegoose';
import {CreateProductDto} from './dto/create-product.dto.js';
import {ProductEntity} from './productEntity.js';
import {ProductQuery} from '../../types/product-query.type.js';
import {UpdateProductDto} from './dto/update-product.dto.js';

export interface ProductServiceInterface {
    create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>>;
    find(query: ProductQuery): Promise<types.DocumentType<ProductEntity>[]>;
    findById(id: string): Promise<types.DocumentType<ProductEntity> | null>;
    updateById(productId: string, dto: UpdateProductDto): Promise<types.DocumentType<ProductEntity> | null>;
    deleteById(productId: string): Promise<types.DocumentType<ProductEntity> | null>;
}
