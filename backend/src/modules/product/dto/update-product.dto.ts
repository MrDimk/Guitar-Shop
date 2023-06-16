import {GuitarType} from '../../../types/guitar-type.enum.js';

export class UpdateProductDto {
    public title?: string;
    public description?: string;
    public photo?: string;
    public guitarType?: GuitarType;
    public article?: string;
    public stringCount?: number;
    public price?: number;
}
