import {Expose} from 'class-transformer';
import {GuitarType} from '../../../types/guitar-type.enum.js';

export class ProductShortRDO {
    @Expose()
    public id!: string;

    @Expose()
    public title!: string;

    @Expose()
    public photo!: string;

    @Expose()
    public guitarType!: GuitarType;

    @Expose()
    public stringCount!: number;

    @Expose()
    public price!: number;

    @Expose()
    public createdAt!: number;
}
