import {GuitarType} from '../../../types/guitar-type.enum.js';
import {PRODUCT_VALIDATION} from '../product.const.js';
import {IsEnum, IsInt, IsString, Length, Matches} from 'class-validator';

const {TITLE, DESCRIPTION, ARTICLE, PRICE, GUITAR_TYPE, PHOTO} = PRODUCT_VALIDATION;

export class CreateProductDto {
    @IsString({message: TITLE.MessageRequired})
    @Length(TITLE.Min, TITLE.Max, {message: TITLE.MessageValid})
    public title!: string;

    @IsString({message: DESCRIPTION.MessageRequired})
    @Length(DESCRIPTION.Min, DESCRIPTION.Max, {message: DESCRIPTION.MessageValid})
    public description!: string;

    @IsString({message: DESCRIPTION.MessageRequired})
    @Matches(/\.(jpg|png)$/, {message: PHOTO.MessageValid})
    public photo?: string;

    @IsEnum(GuitarType, {message: GUITAR_TYPE.MessageValid})
    public guitarType!: GuitarType;

    @IsString({message: ARTICLE.MessageRequired})
    @Length(ARTICLE.Min, ARTICLE.Max, {message: ARTICLE.MessageValid})
    public article!: string;

    public stringCount!: number;

    @IsInt({message: PRICE.MessageValid})
    public price!: number;
}
