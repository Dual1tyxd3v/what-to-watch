import { useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import HeaderNav from '../../components/header-nav/header-nav';
import Logo from '../../components/logo/logo';
import Tabs from '../../components/tabs/tabs';
import { AuthStatus, MAX_LIKES_FILMS } from '../../const';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction, fetchFilmAction, fetchSimilarFilmsAction } from '../../services/api-actions';
import { setFilm } from '../../store/action';
import { getAuthStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function FilmScreen(): JSX.Element {
  const {film, isDataLoaded, similarFilms, comments, favoriteFilms} = useAppSelector((state) => state.All);
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDiapatch();

  const params = useParams();
  const paramsId = params.id;

  useLayoutEffect(() => {
    if (paramsId) {
      dispatch(fetchFilmAction(paramsId));
      dispatch(fetchSimilarFilmsAction(paramsId));
      dispatch(fetchCommentsAction(paramsId));
    }
    return () => {
      dispatch(setFilm(null));
    };
  }, [dispatch, paramsId]);

  if (!film && isDataLoaded) {
    return <LoadingScreen />;
  }
  if (!film) {
    return <NotFoundScreen />;
  }
  const similarFilmsToView = similarFilms.filter((filmItem) => filmItem.id !== film.id);
  const {backgroundImage, name, genre, released, posterImage} = film;
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <HeaderNav />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  authStatus === AuthStatus.Auth
                    ?
                    <>
                      <button className="btn btn--list film-card__button" type="button">
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>
                        <span>My list</span>
                        <span className="film-card__count">{favoriteFilms.length}</span>
                      </button>
                      <Link to='review' className="btn film-card__button">Add review</Link>
                    </>
                    : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>
            <Tabs comments={comments} film={film}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={similarFilmsToView} showedFilmsCounter={MAX_LIKES_FILMS} />

        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmScreen;
