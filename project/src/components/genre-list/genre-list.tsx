import { Link } from 'react-router-dom';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { MouseEvent } from 'react';
import { getGenre } from '../../store/app-process/selectors';
import { changeGenre } from '../../store/app-process/app-process';
import { getFilms } from '../../store/data-process/selectors';

function GenreList(): JSX.Element {
  const selectedGenre = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);
  const dispatch = useAppDiapatch();

  const genres = ['All Genres', ...new Set(films.map((film) => film.genre))];

  function clickHandler(evt: MouseEvent) {
    evt.preventDefault();
    evt.currentTarget.textContent && dispatch(changeGenre(evt.currentTarget.textContent));
  }
  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genreItem, i) => {
          const key = `genre_${i}`;
          return (
            <li key={key} className={`catalog__genres-item ${selectedGenre === genreItem ? 'catalog__genres-item--active' : ''}`}>
              <Link to="#" className="catalog__genres-link" onClick={clickHandler}>{genreItem}</Link>
            </li>
          );
        })
      }
    </ul>
  );
}

export default GenreList;
