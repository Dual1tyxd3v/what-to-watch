import { Film } from '../../types/film';
import {MouseEvent} from 'react';
import { Link, useNavigate } from 'react-router-dom';

type FilmCardProps = {
  film: Film;
  onActiveFilm: (id: number, type: string) => void;
}

function FilmCard({film, onActiveFilm}: FilmCardProps): JSX.Element {
  function onMouseEventHandler(evt: MouseEvent<HTMLElement>): void {
    onActiveFilm(id, evt.type);
  }
  const {previewImage, name, id} = film;
  const navigate = useNavigate();

  function clickHandler(): void {
    navigate(`/films/${id}`);
  }
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={onMouseEventHandler}
      onMouseLeave={onMouseEventHandler}
    >
      <div className="small-film-card__image" onClick={clickHandler}>
        <img
          src={previewImage}
          alt={name} width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`} title={`films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
