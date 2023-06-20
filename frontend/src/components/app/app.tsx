import {Login} from '../../pages/login/login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AccessType, Paths} from '../../const';
import {MainLayout} from '../main-layout/main-layout';
import {PrivateRoute} from '../private-route/private-route';
import {Register} from '../../pages/register/register';
import {ProductList} from '../../pages/product-list/product-list';
import {Error404} from '../error-404/error-404';
import {ProductPage} from '../../pages/product-page/product-page';
import {useAppSelector} from '../../hooks';
import {LoadingPage} from '../../pages/loading-page/loading-page';
import {HistoryRouter} from '../history-route/history-route';
import {browserHistory} from '../../browser-history';
import {AddProduct} from '../../pages/add-product/add-product';


export function App(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (authStatus === AccessType.unknown || isDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
    <Routes>
      <Route path={Paths.Login} element={<MainLayout />}>
        <Route index element={<Login />} />
        <Route path={Paths.Register} element={<Register />} />
        <Route element={<PrivateRoute access={authStatus} />} >
          <Route path={Paths.Products} element={<ProductList />} />
          <Route path={Paths.Product} element={<ProductPage />}/>
          <Route path={Paths.NewProduct} element={<AddProduct />}/>
          <Route path={Paths.UpdateProduct} element={<h1>Private Update Product page!</h1>}/>
        </Route>
        <Route path='*' element={<Error404 />} />
      </Route>
    </Routes>
    </HistoryRouter>
  );
}
