import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {loadProducts, redirectToRoute, requireAuthorization, setDataLoadingStatus, setError} from './actions';
import {saveToken, dropToken} from '../services/token';
import {AccessType, APIRoute, Paths, TIMEOUT_SHOW_ERROR} from '../const';
import {UserData, UserLoginData, UserRegisterData} from '../types/user.types';
import {AppDispatch, Products, State} from '../types/types';
import {store} from './index';

export const fetchProductsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    console.log('FetchData Action!!!');
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Products>(APIRoute.Products);
    console.log(data);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadProducts(data));
  },
);

export const changeFilterAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFilters',
  async (_arg, {dispatch, extra: api}) => {
    console.log('FetchData Action!!!');
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Products>(APIRoute.Products+'?');
    console.log(data);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadProducts(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'users/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AccessType.authorized));
    } catch {
      dispatch(requireAuthorization(AccessType.unauthorized));
    }
  },
);

export const loginAction = createAsyncThunk<void, UserLoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'users/login',
  async ({email, password}, {dispatch, extra: api}) => {
    console.log(email, password);
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AccessType.authorized));
    dispatch(redirectToRoute(Paths.Products));
  },
);

export const registerAction = createAsyncThunk<void, UserRegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'users/register',
  async ({name, email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Register, {name, email, password});
    saveToken(token);
    dispatch(requireAuthorization(AccessType.authorized));
    dispatch(redirectToRoute(Paths.Login));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Register);
    dropToken();
    dispatch(requireAuthorization(AccessType.unauthorized));
  },
);

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
