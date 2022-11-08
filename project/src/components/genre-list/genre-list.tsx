import { Link } from 'react-router-dom';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { MouseEvent } from 'react';
import { getGenre } from '../../store/app-process/selectors';
import { changeGenre } from '../../store/app-process/app-process';

type GenreListProps = {
  genres: string[];
}

function GenreList({genres}: GenreListProps): JSX.Element {
  const selectedGenre = useAppSelector(getGenre);
  const dispatch = useAppDiapatch();

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
