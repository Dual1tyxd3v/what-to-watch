import { MouseEvent, useEffect, useState } from 'react';
import ButtonPause from '../button-pause/button-pause';
import ButtonPlay from '../button-play/button-play';
import browserHistory from '../../browser-history';
import { formatRunTimeToPlayer } from '../../utils';
import { PROGRESSBAR_OFFSET } from '../../const';

type PlayerControlsProps = {
  name: string;
  duration: number;
  buttonHandler: (isPlaying: boolean) => void;
  progress: number;
  progressBarHandler: (timeMark: number) => void;
}

function PlayerControls({name, duration, buttonHandler, progress, progressBarHandler}: PlayerControlsProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const TIME_STEP = progress * 100 / duration;

  function clickHandler() {
    setIsPlaying(!isPlaying);
    buttonHandler(isPlaying);
  }

  function exitButtonHandler() {
    browserHistory.go(-1);
  }

  function progressClickHandler(evt: MouseEvent) {
    const progressWidth = evt.currentTarget.getBoundingClientRect().width;
    const clickCoordX = evt.clientX - PROGRESSBAR_OFFSET;
    const currentT = clickCoordX * duration / progressWidth;
    progressBarHandler(currentT);
  }

  useEffect(() => {
    if (progress >= duration) {
      setIsPlaying(false);
    }
  }, [ duration, progress]);

  return (
    <>
      <button type="button" className="player__exit" onClick={exitButtonHandler}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={(TIME_STEP).toString()} max="100" onClick={progressClickHandler}>
            </progress>
            <div className="player__toggler" style={{left: `${TIME_STEP}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatRunTimeToPlayer(duration - progress)}</div>
        </div>

        <div className="player__controls-row" onClick={clickHandler}>
          <button type="button" className="player__play" >
            {
              isPlaying
                ? <ButtonPause />
                : <ButtonPlay />
            }
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default PlayerControls;
