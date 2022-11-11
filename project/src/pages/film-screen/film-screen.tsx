import { useLayoutEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonMyList from '../../components/button-my-list/button-my-list';
import ButtonPlay from '../../components/button-play/button-play';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import HeaderNav from '../../components/header-nav/header-nav';
import Logo from '../../components/logo/logo';
import Tabs from '../../components/tabs/tabs';
import { AppRoute, AuthStatus, MAX_LIKES_FILMS } from '../../const';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction, fetchFilmAction, fetchSimilarFilmsAction } from '../../services/api-actions';
import { setFilm } from '../../store/data-process/data-process';
import { getComments, getFilm, getIsDataLoaded, getSimilarFilms } from '../../store/data-process/selectors';
import { getAuthStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function FilmScreen(): JSX.Element {
  const film = useAppSelector(getFilm);
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const similarFilms = useAppSelector(getSimilarFilms);
  const comments = useAppSelector(getComments);
  const authStatus = useAppSelector(getAuthStatus);

  const dispatch = useAppDiapatch();
  const navigate = useNavigate();

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

  function buttonPlayHandler() {
    film && navigate(`${AppRoute.Player}/${film.id}`);
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
                <button className="btn btn--play film-card__button" type="button" onClick={buttonPlayHandler}>
                  <ButtonPlay />
                </button>
                {
                  authStatus === AuthStatus.Auth
                    ?
                    <>
                      <ButtonMyList film={film} />
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
