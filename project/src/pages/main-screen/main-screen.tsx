import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ButtonShowMore from '../../components/button-show-more/button-show-more';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import HeaderNav from '../../components/header-nav/header-nav';
import Logo from '../../components/logo/logo';
import { AuthStatus, DISPLAY_FILMS_STEP } from '../../const';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { fetchPromoFilmAction } from '../../services/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

function MainScreen(): JSX.Element {
  const {selectedGenre, films, isDataLoaded, authStatus, promoFilm, favoriteFilms} = useAppSelector((state) => state);
  const [displayFilmsCounter, setDisplayFilmsCounter] = useState(DISPLAY_FILMS_STEP);
  const dispatch = useAppDiapatch();
  const buttonClickHandler = useCallback(() => {
    setDisplayFilmsCounter((prev) => prev + DISPLAY_FILMS_STEP);
  }, []);

  useLayoutEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  useEffect(() => {
    setDisplayFilmsCounter(DISPLAY_FILMS_STEP);
  }, [selectedGenre]);

  if (isDataLoaded || !promoFilm) {
    return <LoadingScreen />;
  }

  const {name, genre, released, backgroundImage, posterImage} = promoFilm;

  const genres = ['All Genres', ...new Set(films.map((film) => film.genre))];

  const filteredFilms = selectedGenre === 'All Genres'
    ? films
    : films.filter((film) => selectedGenre === film.genre);
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <HeaderNav />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

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
                    <button className="btn btn--list film-card__button" type="button">
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                      <span className="film-card__count">{favoriteFilms.length}</span>
                    </button>
                    : null
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={genres} />

          <FilmList films={filteredFilms} showedFilmsCounter={displayFilmsCounter}/>
          {
            displayFilmsCounter >= filteredFilms.length
              ? null
              : <ButtonShowMore buttonClickHandler={buttonClickHandler} />
          }
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
