import { MouseEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import FilmScreenDetails from '../../components/film-screen-details/film-screen-details';
import FilmScreenOverview from '../../components/film-screen-overview/film-screen-overview';
import FilmScreenReviews from '../../components/film-screen-reviews/film-screen-reviews';
import Footer from '../../components/footer/footer';
import HeaderNav from '../../components/header-nav/header-nav';
import Logo from '../../components/logo/logo';
import { FilmNavLinks } from '../../const';
import { comments } from '../../mocks/comments';
import { Films } from '../../types/film';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type FilmScreenProps = {
  films: Films;
}

function FilmScreen({films}: FilmScreenProps): JSX.Element {
  const params = useParams();
  const paramsId = Number(params.id);
  const film = films.find((filmItem) => filmItem.id === paramsId);
  const [navLink, setNavLink] = useState(FilmNavLinks[0]);
  if (!film) {
    return <NotFoundScreen />;
  }

  let descriptionBlock = null;

  switch(navLink) {
    case FilmNavLinks[0]:
      descriptionBlock = <FilmScreenOverview film={film} />;
      break;
    case FilmNavLinks[1]:
      descriptionBlock = <FilmScreenDetails film={film} />;
      break;
    case FilmNavLinks[2]:
      descriptionBlock = <FilmScreenReviews comments={comments} />;
      break;
    default:
      descriptionBlock = null;
  }

  function clickHandler(evt: MouseEvent<HTMLElement>): void {
    evt.preventDefault();
    const currentLink = evt.target as HTMLElement;
    setNavLink(currentLink.textContent as string);
  }
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
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to='review' className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list" >
                  {
                    FilmNavLinks.map((navLinkItem, i) => {
                      const key = `navlink_${i}`;
                      return (
                        <li key={key} className={`film-nav__item ${navLink === navLinkItem ? 'film-nav__item--active' : ''}`}>
                          <Link
                            to="/"
                            className="film-nav__link"
                            onClick={clickHandler}
                          >{navLinkItem }
                          </Link>
                        </li>
                      );
                    })
                  }
                </ul>
              </nav>
              {
                descriptionBlock
              }
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={films.slice(0,4)} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmScreen;
