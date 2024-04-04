import { useRef, useEffect } from 'react';

type AudioPlayerProps = {
  src: string, 
  isPlaying: boolean, 
  onTrackEnded: () => void
};

export function AudioPlayer({ src, isPlaying, onTrackEnded }:AudioPlayerProps) {
  
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    }
  }, [src, isPlaying]);

  useEffect(() => {
    function handleEnded(e: Event) {
      onTrackEnded();
    };
    
    if (ref.current) {
      const currentRef = ref.current;
      currentRef.addEventListener('ended', handleEnded);
      return () => currentRef.removeEventListener('ended', handleEnded);
    }

  }, [onTrackEnded]); // Only run this once

  return(
    <div id='audio_div'>
        <audio id='audio_player' ref={ref} src={src} />
    </div>
  );
}