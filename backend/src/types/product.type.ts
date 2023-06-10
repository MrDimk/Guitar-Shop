import {GuitarType} from './guitar-type.enum';

export type Product = {
    id: string;
    title: string;
    description: string;
    addedDate: Date;
    photo: string;
    guitarType: GuitarType;
    article: string;
    stringCount: number;
    price: number;
}
