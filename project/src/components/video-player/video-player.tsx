import { ReactEventHandler, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DELAY_TO_PREVIEW } from '../../const';
import PlayerControls from '../../pages/player-screen/player-controls';

type VideoPlayerProps = {
  src: string;
  isPlaying: boolean;
  posterSrc: string;
  muted: boolean;
  fullscreen?: boolean;
  name?: string;
}

function VideoPlayer({src, posterSrc, isPlaying, muted, fullscreen, name}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trigger, setTrigger] = useState(false);

  const buttonHandler = useCallback((playing: boolean) => {
    if(!videoRef.current) {
      return;
    }
    if (playing) {
      videoRef.current.pause();
      setTrigger(false);
    } else {
      videoRef.current.play();
    }
  }, []);

  function progressHandler(evt: SyntheticEvent<HTMLVideoElement, Event>) {
    setProgress(evt.currentTarget.currentTime / evt.currentTarget.duration * 100);
    console.log('p' + progress);
  }

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.addEventListener('loadeddata', () => setIsLoaded(true));

    const timer = setTimeout(() => {
      if (isPlaying && !fullscreen) {
        videoRef.current?.play();
      }
    }, DELAY_TO_PREVIEW);

    videoRef.current.src = src;
    return () => clearTimeout(timer);
  }, [fullscreen, isPlaying, src]);

  return (
    <>
      <video ref={videoRef} src={src} poster={posterSrc} muted={muted} className={fullscreen ? 'player__video' : ''} width='285' height='175' onProgress={progressHandler} >
      </video>
      {/* {
        fullscreen
          ? <PlayerControls name={name ? name : ''} duration={videoRef.current?.duration || 0} buttonHandler={buttonHandler} trigger={trigger} progress={progress}/>
          : null
      } */}
    </>
  );
}

export default VideoPlayer;
