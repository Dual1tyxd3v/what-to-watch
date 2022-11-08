import { useParams } from 'react-router-dom';
import VideoPlayer from '../../components/video-player/video-player';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/data-process/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function PlayerScreen(): JSX.Element {
  const films = useAppSelector(getFilms);
  const params = useParams();
  const paramsId = Number(params.id);
  const film = films.find((filmItem) => filmItem.id === paramsId);
  if (!film) {
    return <NotFoundScreen />;
  }
  return (
    <div className="player">
      {/* <video src="#" className="player__video" poster="img/player-poster.jpg"></video> */}
      <VideoPlayer src={film.videoLink} posterSrc='img/player-poster.jpg' muted isPlaying={false} fullscreen name={film.name}/>
    </div>
  );
}

export default PlayerScreen;
