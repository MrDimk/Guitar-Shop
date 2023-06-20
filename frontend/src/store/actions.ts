import {createAction} from '@reduxjs/toolkit';
import {Filters, Products, User} from '../types/types';
import {AccessType, Paths} from '../const';

export const changePage = createAction<number>('products/changePage');
export const changeFilter = createAction<Filters>('products/changeFilter');
// export const changeSort = createAction<number>('products/changeSort');

export const requireAuthorization = createAction<AccessType>('user/requireAuthorization');
export const loadUserData = createAction<User>('user/loadUserData');

export const loadProducts = createAction<Products>('data/loadProducts');
// export const createProduct = createAction<Product>('data/createProduct');
// export const updateProduct = createAction<Product>('data/updateProduct');

export const setError = createAction<string | null>('data/setError');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const redirectToRoute = createAction<Paths>('main/redirectToRoute');
