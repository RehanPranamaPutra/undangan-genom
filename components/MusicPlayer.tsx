"use client";

import { useEffect, useRef, useState } from "react";

export function MusicPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  if (!available) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Jeda ${title}` : `Putar ${title}`}
        aria-pressed={playing}
        className="flex items-center gap-2 border-2 border-ink bg-paper px-3 py-2 shadow-brutal-sm transition-transform duration-100 hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
      >
        <span className="flex h-4 w-4 items-end justify-between" aria-hidden="true">
          {playing ? (
            <>
              <i className="eqbar w-[3px] bg-moss" style={{ height: "100%" }} />
              <i className="eqbar w-[3px] bg-moss" style={{ height: "100%" }} />
              <i className="eqbar w-[3px] bg-moss" style={{ height: "100%" }} />
              <i className="eqbar w-[3px] bg-moss" style={{ height: "100%" }} />
            </>
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-ink" fill="currentColor">
              <path d="M5 3.5v9l8-4.5z" />
            </svg>
          )}
        </span>
        <span className="font-sans text-[0.72rem] font-semibold tracking-wide text-ink">
          {playing ? "Musik on" : "Play"}
        </span>
      </button>
    </div>
  );
}
