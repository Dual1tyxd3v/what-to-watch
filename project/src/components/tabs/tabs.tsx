import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { FilmNavLinks } from '../../const';
import { comments } from '../../mocks/comments';
import { Film } from '../../types/film';
import FilmScreenDetails from '../film-screen-details/film-screen-details';
import FilmScreenOverview from '../film-screen-overview/film-screen-overview';
import FilmScreenReviews from '../film-screen-reviews/film-screen-reviews';

type TabsProps = {
  film: Film;
}

function Tabs({film}: TabsProps): JSX.Element {
  let descriptionBlock = null;
  const [navLink, setNavLink] = useState(FilmNavLinks[0]);

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
  return (
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
  );
}

export default Tabs;
