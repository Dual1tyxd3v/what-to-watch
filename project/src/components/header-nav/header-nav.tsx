import { AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import HeaderNavLogged from '../header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../header-nav-not-logged/header-nav-not-logged';

function HeaderNav(): JSX.Element {
  const {authStatus} = useAppSelector((state) => state);
  return (
    authStatus === AuthStatus.Auth ? <HeaderNavLogged /> : <HeaderNavNotLogged />
  );
}

export default HeaderNav;
