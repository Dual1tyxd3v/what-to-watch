import { useCallback, useEffect, useRef, useState } from 'react';
import { DELAY_TO_PREVIEW } from '../../const';
import PlayerControls from '../../pages/player-screen/player-controls';
import { formatRunTimeToPlayer } from '../../utils';

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

  const buttonHandler = useCallback((playing: boolean) => {
    if(videoRef.current) {
      playing
        ? videoRef.current && videoRef.current.pause()
        : videoRef.current && videoRef.current.play();
    }
  }, []);

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

  const formatedDuration = videoRef.current
    ? formatRunTimeToPlayer(videoRef.current.currentTime)
    : '0';
  return (
    <>
      <video ref={videoRef} src={src} poster={posterSrc} muted={muted} className={fullscreen ? 'player__video' : ''} width='285' height='175'>
      </video>
      {
        fullscreen
          ? <PlayerControls name={name ? name : ''} duration={formatedDuration} buttonHandler={buttonHandler}/>
          : null
      }
    </>
  );
}

export default VideoPlayer;
