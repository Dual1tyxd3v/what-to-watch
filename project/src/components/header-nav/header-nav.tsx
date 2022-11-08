import { memo } from 'react';
import { AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-process/selectors';
import HeaderNavLogged from '../header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../header-nav-not-logged/header-nav-not-logged';

function HeaderNav(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  return (
    authStatus === AuthStatus.Auth ? <HeaderNavLogged /> : <HeaderNavNotLogged />
  );
}

export default memo(HeaderNav);
