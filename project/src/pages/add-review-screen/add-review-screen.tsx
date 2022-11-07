import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import HeaderNav from '../../components/header-nav/header-nav';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-process/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function AddReviewScreen(): JSX.Element {
  const {films} = useAppSelector((state) => state.All);
  const authStatus = useAppSelector(getAuthStatus);
  const params = useParams();
  const currentLocation = useLocation();

  if (authStatus !== AuthStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  const paramsId = Number(params.id);
  const film = films.find((filmItem) => filmItem.id === paramsId);
  if (!film) {
    return <NotFoundScreen />;
  }
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={currentLocation.pathname.replace('/review', '')} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={currentLocation.pathname} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <HeaderNav />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
}

export default AddReviewScreen;
