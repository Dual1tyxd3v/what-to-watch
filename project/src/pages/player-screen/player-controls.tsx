import { MouseEvent, useEffect, useState } from 'react';
import ButtonPause from '../../components/button-pause/button-pause';
import ButtonPlay from '../../components/button-play/button-play';
import { formatRunTimeToPlayer } from '../../utils';

type PlayerControlsProps = {
  name: string;
  duration: number;
  buttonHandler: (isPlaying: boolean) => void;
  trigger: boolean;
  progress: number;
}

function PlayerControls({name, duration, buttonHandler, trigger, progress}: PlayerControlsProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(1);
  const [progressCount, setProgressCount] = useState(0);
  const xDuration = duration * 10;
  const TIME_STEP = 100 / xDuration;

  function clickHandler() {
    if (currentTime >= duration) {
      setCurrentTime(1);
    }
    setIsPlaying(!isPlaying);
    buttonHandler(isPlaying);
  }

  function progressClickHandler(evt: MouseEvent) {
    /* console.log(evt.clientX);
    console.log(duration);
    console.log(evt.currentTarget.getBoundingClientRect().width);
    const progressWidth = evt.currentTarget.getBoundingClientRect().width; */
  }
/*   useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (currentTime >= duration) {
      setIsPlaying(false);
      return;
    }
    if (!trigger) {
      return;
    }
    const timer = setInterval(() => {
      setCurrentTime(currentTime + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [ currentTime, duration, isPlaying, trigger]); */
  /* useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const progressTimer = setInterval(() => {
      setProgressCount(progressCount + 1);
    }, 100);
    console.log('mim' + progressCount * TIME_STEP);
    return () => clearInterval(progressTimer);
  }, [TIME_STEP, duration, isPlaying, progressCount, trigger]); */
  console.log(progressCount);
  return (
    <>
      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={(progress).toString()} max="100" onClick={progressClickHandler}>
            </progress>
            {/* <div className="player__toggler" style={{left: `${progressCount}%`}}>Toggler</div> */}
          </div>
          <div className="player__time-value">{formatRunTimeToPlayer(duration - currentTime + 1)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={clickHandler}>
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
