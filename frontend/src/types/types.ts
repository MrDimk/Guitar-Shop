import {store} from '../store';

export enum GuitarType {
  Electric = "электро",
  Acoustic = "аккустика",
  Ukulele = "укулеле",
}

export type Filters = {
  acoustic: boolean;
  electric: boolean;
  ukulele: boolean;
  strings4: boolean;
  strings6: boolean;
  strings7: boolean;
  strings12: boolean;
}

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

export type Products = Product[];

export type User = {
  email: string;
  name: string;
  token: string;
}

export type AuthData = {
  password: string,
  login: string,
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
