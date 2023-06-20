import {Navigate, Outlet} from 'react-router-dom';
import {AccessType, Paths} from '../../const';

type PrivateRouteProps = {
  // children: JSX.Element,
  access: AccessType,
};

export function PrivateRoute({ access }: PrivateRouteProps): JSX.Element {
  return access === AccessType.authorized ? <Outlet/> : <Navigate to={Paths.Login} />;
}
