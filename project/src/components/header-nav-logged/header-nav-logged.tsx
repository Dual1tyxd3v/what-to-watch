import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../services/api-actions';
import { clearFavoritesFilms } from '../../store/data-process/data-process';
import { getUserInfo } from '../../store/user-process/selectors';

function HeaderNavLogged(): JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const dispatch = useAppDiapatch();
  const navigate = useNavigate();

  function clickHandler(evt: MouseEvent) {
    evt.preventDefault();
    dispatch(logoutAction());
    dispatch(clearFavoritesFilms());
  }

  function avatarClickHandler() {
    navigate(AppRoute.MyList);
  }
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={userInfo?.avatarUrl} alt="User avatar" width="63" height="63" onClick={avatarClickHandler}/>
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" to='#' onClick={clickHandler}>Sign out</Link>
      </li>
    </ul>
  );
}

export default HeaderNavLogged;
