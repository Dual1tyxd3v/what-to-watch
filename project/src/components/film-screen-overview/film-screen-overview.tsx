import { Film } from '../../types/film';
import { formatRating, formatRatingToText } from '../../utils';

type FilmScreenOverviewProps = {
  film: Film;
}

function FilmScreenOverview({film}: FilmScreenOverviewProps): JSX.Element {
  const {rating, director, scoresCount, starring, description} = film;
  const formatedRating = formatRating(rating);
  const textRating = formatRatingToText(rating);
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{formatedRating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{textRating ? textRating : 'No Rate'}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring:
            {
              ` ${starring.join(', ')} `
            }
                  and other
          </strong>
        </p>
      </div>
    </>
  );
}

export default FilmScreenOverview;
