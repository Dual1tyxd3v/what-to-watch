import { Films } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Films;
}

export default function FilmList({films}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {
        films.map((film, i) => {
          const key = `filmCardMain_${i}`;
          return (<FilmCard key={key} film={film}/>);
        })
      }
    </div>
  );
}

