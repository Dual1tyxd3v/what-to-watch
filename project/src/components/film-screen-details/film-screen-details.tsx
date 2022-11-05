import { Fragment } from 'react';
import { Film } from '../../types/film';
import { formatRunTime } from '../../utils';

type FilmScreenDetailsProps = {
  film: Film;
}

function FilmScreenDetails({film}: FilmScreenDetailsProps): JSX.Element {
  const {director, starring, genre, released, runTime} = film;
  const formatedTime = formatRunTime(runTime);

  return(
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              starring.map((actor, i) => {
                const key = `actor_${i}`;
                return (
                  <Fragment key={key}>
                    {actor}{i === starring.length - 1 ? '' : ','}<br />
                  </Fragment>
                );
              })
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatedTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmScreenDetails;
