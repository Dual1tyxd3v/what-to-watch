import { useCallback, useState } from 'react';
import { Films } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Films;
  showedFilmsCounter?: number;
}

function FilmList({films, showedFilmsCounter}: FilmListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(-1);

  const filmsToShow = showedFilmsCounter ? films.slice(0, showedFilmsCounter) : films;

  const activeFilmHandler = useCallback((id: number, type: string) => {
    setActiveFilm(type === 'mouseenter' ? id : -1);
  }, []);

  return (
    <div className="catalog__films-list">
      {
        filmsToShow.map((film, i) => {
          const key = `filmCardMain_${i}`;
          return (
            <FilmCard
              key={key}
              film={film}
              onActiveFilm={activeFilmHandler}
              isPlaying={film.id === activeFilm}
            />);
        })
      }
    </div>
  );
}

export default FilmList;
