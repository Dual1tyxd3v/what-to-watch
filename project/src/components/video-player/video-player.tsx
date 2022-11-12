import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DELAY_TO_PREVIEW } from '../../const';
import PlayerControls from '../player-controls/player-controls';

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
  const [duration, setDuration] = useState(0);

  const buttonHandler = useCallback((playing: boolean) => {
    if(!videoRef.current) {
      return;
    }
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, []);

  const progressBarHandler = useCallback((timeMark: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeMark;
    }
  }, []);

  function progressHandler(evt: SyntheticEvent<HTMLVideoElement, Event>) {
    if (fullscreen) {
      setProgress(evt.currentTarget.currentTime);
    }
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
  }, [duration, fullscreen, isPlaying, src]);
  if (duration === 0 && videoRef.current) {
    setDuration(videoRef.current.duration);
  }

  return (
    <>
      <video ref={videoRef} src={src} poster={posterSrc} muted={!fullscreen} className={fullscreen ? 'player__video' : ''} width='285' height='175' onTimeUpdate={progressHandler}>
      </video>
      {
        fullscreen
          ? <PlayerControls progressBarHandler={progressBarHandler} name={name ? name : ''} duration={duration} buttonHandler={buttonHandler} progress={progress} />
          : null
      }
    </>
  );
}

export default VideoPlayer;
