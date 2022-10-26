import { useCallback, useState } from 'react';
import { Films } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Films;
}

export default function FilmList({films}: FilmListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(films[0].id);
  const activeFilmHandler = useCallback((id: number, type: string) => {
    setActiveFilm(type === 'mouseenter' ? id : 0);
  }, []);
  console.log(activeFilm);
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
            />);
        })
      }
    </div>
  );
}
