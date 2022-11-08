import { useState } from 'react';
import ButtonPause from '../../components/button-pause/button-pause';
import ButtonPlay from '../../components/button-play/button-play';

type PlayerControlsProps = {
  name: string;
  duration: string;
  buttonHandler: (isPlaying: boolean) => void;
}

function PlayerControls({name, duration, buttonHandler}: PlayerControlsProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  function clickHandler() {
    setIsPlaying(!isPlaying);
    buttonHandler(isPlaying);
  }
  return (
    <>
      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{duration}</div>
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
