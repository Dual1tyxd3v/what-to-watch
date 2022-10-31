import { useCallback, useState } from 'react';
import { Films } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Films;
}

function FilmList({films}: FilmListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(-1);

  const activeFilmHandler = useCallback((id: number, type: string) => {
    setActiveFilm(type === 'mouseenter' ? id : -1);
  }, []);

  return (
    <div className="catalog__films-list">
      {
        films.map((film, i) => {
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
