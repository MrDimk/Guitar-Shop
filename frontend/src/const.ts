export enum AccessType {
  authorized = 'authorized',
  unauthorized = 'unauthorized',
  unknown = 'unknown'
}

export enum Paths {
  Login = '/',
  Register = '/register',
  Products = '/products',
  Product = '/product/:productId',
  NewProduct = '/product/new',
  UpdateProduct = '/product/update/:productId',
}

export enum APIRoute {
  Products = '/products',
  Login = '/users/login',
  Register = '/users/register',
}

export const TIMEOUT_SHOW_ERROR = 2000;
