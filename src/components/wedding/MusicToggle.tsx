import { useEffect, useRef, useState } from "react";

const SRC = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c4e1f7fab.mp3?filename=indian-sitar-meditation-music-22174.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.4;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle music"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full glass text-gold transition hover:scale-110 animate-pulse-glow"
    >
      {playing ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      )}
    </button>
  );
}
