import { useAppDiapatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction } from '../../services/api-actions';
import { getFavoriteFilms } from '../../store/data-process/selectors';
import { Film } from '../../types/film';

type ButtonMyListProps = {
  film: Film;
}

function ButtonMyList({film:{id, isFavorite}}: ButtonMyListProps): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const dispatch = useAppDiapatch();

  function clickHandler() {
    dispatch(changeFavoriteStatusAction({filmId: id, status: +!isFavorite}));
  }
  return (
    <button className="btn btn--list film-card__button" type="button" onClick={clickHandler}>
      {
        isFavorite
          ?
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
          :
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
      }
      <span>My list</span>
      <span className="film-card__count" data-testId="favoriteCounts">{favoriteFilms.length}</span>
    </button>
  );
}

export default ButtonMyList;
