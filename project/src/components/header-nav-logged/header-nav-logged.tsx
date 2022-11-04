import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../services/api-actions';

function HeaderNavLogged(): JSX.Element {
  const {userInfo} = useAppSelector((state) => state);
  const dispatch = useAppDiapatch();

  function clickHandler(evt: MouseEvent) {
    evt.preventDefault();
    dispatch(logoutAction());
  }
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={userInfo?.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" to='#' onClick={clickHandler}>Sign out</Link>
      </li>
    </ul>
  );
}

export default HeaderNavLogged;
