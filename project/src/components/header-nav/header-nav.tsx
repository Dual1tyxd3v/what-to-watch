import { AuthStatus } from '../../const';
import HeaderNavLogged from '../header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../header-nav-not-logged/header-nav-not-logged';

function HeaderNav(): JSX.Element {
  const auth = Math.floor(Math.random() * 10) > 5 ? AuthStatus.Auth : AuthStatus.NoAuth;
  return (
    auth === AuthStatus.Auth ? <HeaderNavLogged /> : <HeaderNavNotLogged />
  );
}

export default HeaderNav;
