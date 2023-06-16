import {GuitarType} from './guitar-type.enum.js';
import {SortDirection} from './sortDirection.js';

export class ProductQuery {
    guitarType?: GuitarType;
    stringCount?: string;
    page?: string;
    sortField?: string;
    sortDirection?: SortDirection;
    limit?: string;
}
