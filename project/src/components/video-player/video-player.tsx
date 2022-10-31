import { useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
  src: string;
  isPlaying: boolean;
  posterSrc: string;
  muted: boolean;
}

function VideoPlayer({src, posterSrc, isPlaying, muted}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.addEventListener('loadeddata', () => setIsLoaded(true));

    const timer = setTimeout(() => {
      if (isPlaying) {
        videoRef.current?.play();
      }
    }, 1000);
    videoRef.current.src = src;
    return () => clearTimeout(timer);
  }, [isPlaying, src]);

  return (
    <video ref={videoRef} src={src} poster={posterSrc} muted={muted} width='285' height='175'/>
  );
}

export default VideoPlayer;
