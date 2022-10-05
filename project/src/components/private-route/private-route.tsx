import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';

type PrivateRouteProps = {
  auth: string;
  children: JSX.Element;
}

function PrivateRoute({auth, children}: PrivateRouteProps): JSX.Element {
  return (
    auth === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
