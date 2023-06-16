import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {GuitarType} from '../../types/guitar-type.enum.js';

export interface ProductEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'products'
    }
})
export class ProductEntity extends defaultClasses.TimeStamps {
    @prop({
        minlength: 10,
        maxlength: 100,
        required: true,
    })
    public title!: string;

    @prop({
        minlength: 20,
        maxlength: 1024,
        required: true,
    })
    public description!: string;

    @prop({
        required: true,
        default: new Date()
    })
    public postDate!: Date;

    @prop({
        match: [/^[\w-]+\.(jpg|png)$/i, 'File format is incorrect'],
        required: true
    })
    public photo!: string;

    @prop({
        required: true,
        type: () => String,
        enum: GuitarType
    })
    public guitarType!: String;

    @prop({required: true})
    public article!: string;

    @prop({required: true})
    public stringCount!: number;

    @prop({required: true, min: 0, max: 1000000})
    public price!: number;
}

export const TestModel = getModelForClass(ProductEntity);
