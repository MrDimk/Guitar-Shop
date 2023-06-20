import {GuitarType} from '../../../types/guitar-type.enum.js';
import {PRODUCT_VALIDATION} from '../product.const.js';
import {IsEnum, IsInt, IsOptional, IsString, Length, Matches, Max, Min} from 'class-validator';

const {TITLE, DESCRIPTION, ARTICLE, PHOTO, PRICE, GUITAR_TYPE} = PRODUCT_VALIDATION;

export class UpdateProductDto {
    @IsString({message: TITLE.MessageRequired})
    @Length(TITLE.Min, TITLE.Min, {message: TITLE.MessageValid})
    public title?: string;

    @IsString({message: DESCRIPTION.MessageRequired})
    @Length(DESCRIPTION.Min, DESCRIPTION.Max, {message: DESCRIPTION.MessageValid})
    public description?: string;

    @IsOptional()
    @IsString({message: DESCRIPTION.MessageRequired})
    @Matches(/\.(jpg|png)$/, {message: PHOTO.MessageValid})
    public photo?: string;

    @IsEnum(GuitarType, {message: GUITAR_TYPE.MessageValid})
    public guitarType?: GuitarType;

    @IsString({message: ARTICLE.MessageRequired})
    @Length(ARTICLE.Min, ARTICLE.Min, {message: ARTICLE.MessageValid})
    public article?: string;

    public stringCount?: number;

    @IsInt({message: PRICE.MessageRequired})
    @Min(PRICE.Min, {message: PRICE.MessageValid})
    @Max(PRICE.Max, {message: PRICE.MessageValid})
    public price?: number;
}
