import {SortDirection} from '../../types/sortDirection.js';

export const PRODUCT_DEFAULT = {
    PAGE_SIZE: 7,
    SORT_FIELD: 'price',
    SORT_DIR: SortDirection.Asc
}

export const PRODUCT_VALIDATION = {
    TITLE: {
        MessageValid: 'Title must be 10-100 characters long',
        MessageRequired: 'Title required',
        Min: 10,
        Max: 100
    },
    DESCRIPTION: {
        MessageValid: 'Description must be 20-1024 characters long',
        MessageRequired: 'Description required',
        Min: 20,
        Max: 1024
    },
    ARTICLE: {
        MessageValid: 'Article must be 5-40 characters long',
        MessageRequired: 'Article required',
        Min: 5,
        Max: 40
    },
    PRICE: {
        MessageValid: 'Price must be in range 100-1000000',
        MessageRequired: 'Price must be an integer',
        Min: 100,
        Max: 1000000
    },
    PHOTO: {
        MessageValid: 'Must be a link to *.jpg or *.png file'
    },
    GUITAR_TYPE: {
        MessageValid: 'Must be a valid enum type'
    }
};
