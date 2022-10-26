import { Film } from '../../types/film';
import {MouseEvent} from 'react';

type FilmCardProps = {
  film: Film;
  onActiveFilm: (id: number, type: string) => void;
}

function FilmCard({film, onActiveFilm}: FilmCardProps): JSX.Element {
  function onMouseEventHandler(evt: MouseEvent<HTMLElement>): void {
    onActiveFilm(id, evt.type);
  }
  const {previewImage, name, id} = film;
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={onMouseEventHandler}
      onMouseLeave={onMouseEventHandler}
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
