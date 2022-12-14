import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { getAuthStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  if (authStatus === AuthStatus.Unknown) {
    return <LoadingScreen />;
  }
  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
