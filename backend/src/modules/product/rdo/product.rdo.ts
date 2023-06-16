import {Expose} from 'class-transformer';
import {GuitarType} from '../../../types/guitar-type.enum.js';

export class ProductRDO {
    @Expose()
    public id!: string;

    @Expose()
    public title!: string;

    @Expose()
    public description!: string;

    @Expose()
    public photo!: string;

    @Expose()
    public guitarType!: GuitarType;

    @Expose()
    public article!: string;

    @Expose()
    public stringCount!: number;

    @Expose()
    public price!: number;

    @Expose()
    public createdAt!: number;
}
