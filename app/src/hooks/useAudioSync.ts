import { useCallback, useEffect, useRef, useState } from "react";

const TRACK_SRC = "/audio/love-story.mp3";

export interface AudioSync {
  available: boolean; // is a real audio file present & loadable
  ready: boolean;
  playing: boolean;
  muted: boolean;
  currentTime: number;
  duration: number;
  progress: number; // 0..1
  play: () => void;
  pause: () => void;
  toggle: () => void;
  toggleMute: () => void;
  restart: () => void;
  seekToProgress: (p: number) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

// Manages the HTMLAudioElement for "Love Story". Degrades gracefully to a
// silent internal timeline when the local file is missing.
export function useAudioSync(): AudioSync {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = new Audio();
    a.src = TRACK_SRC;
    a.preload = "auto";
    a.loop = false;
    audioRef.current = a;

    const onMeta = () => {
      if (a.duration && isFinite(a.duration)) {
        setDuration(a.duration);
        setAvailable(true);
        setReady(true);
      }
    };
    const onTime = () => setCurrentTime(a.currentTime);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setAvailable(false);
      setReady(true); // ready = we've resolved the question, file just isn't there
    };
    const onEnded = () => setPlaying(false);

    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("canplay", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("error", onError);
    a.addEventListener("ended", onEnded);

    return () => {
      a.pause();
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("canplay", onMeta);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("error", onError);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  const play = useCallback(() => {
    const a = audioRef.current;
    if (!a || !available) return;
    a.play().catch(() => {});
  }, [available]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a || !available) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }, [available]);

  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }, []);

  const restart = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setCurrentTime(0);
    if (available) a.play().catch(() => {});
  }, [available]);

  const seekToProgress = useCallback(
    (p: number) => {
      const a = audioRef.current;
      if (!a || !available || !duration) return;
      a.currentTime = Math.max(0, Math.min(duration, p * duration));
    },
    [available, duration]
  );

  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  return {
    available,
    ready,
    playing,
    muted,
    currentTime,
    duration,
    progress,
    play,
    pause,
    toggle,
    toggleMute,
    restart,
    seekToProgress,
    audioRef,
  };
}
