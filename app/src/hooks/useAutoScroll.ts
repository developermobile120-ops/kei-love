import { useEffect, useRef } from "react";
import type { AudioSync } from "./useAudioSync";

const FALLBACK_DURATION = 300; // seconds of silent timeline when no audio file
const NAV_KEYS = new Set([
  "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Spacebar",
]);

interface Options {
  active: boolean; // auto-scroll running
  started: boolean; // story has begun
  audio: AudioSync;
  onManual: () => void; // called when the user takes over
}

// A proper rAF scroll controller (not setInterval): it eases the page toward a
// target derived from the music's progress (or a silent clock), and yields to
// the user the instant they scroll, swipe, or press a nav key.
export function useAutoScroll({ active, started, audio, onManual }: Options) {
  const clockRef = useRef(0); // silent-mode progress 0..1
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  // Manual takeover listeners are active whenever the story is running.
  useEffect(() => {
    if (!started) return;
    const bail = () => onManual();
    const onKey = (e: KeyboardEvent) => {
      if (NAV_KEYS.has(e.key)) onManual();
    };
    window.addEventListener("wheel", bail, { passive: true });
    window.addEventListener("touchmove", bail, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", bail);
      window.removeEventListener("touchmove", bail);
      window.removeEventListener("keydown", onKey);
    };
  }, [started, onManual]);

  // Sync the silent clock to wherever the page currently is when (re)activating.
  useEffect(() => {
    if (!active) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    clockRef.current = max > 0 ? window.scrollY / max : 0;
    lastTsRef.current = 0;
  }, [active]);

  useEffect(() => {
    if (!active || !started) return;
    if (reduced.current) return; // respect reduced motion: no auto movement

    const step = (ts: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
      lastTsRef.current = ts;

      let target: number;
      if (audio.available && audio.playing && audio.duration > 0) {
        target = audio.currentTime / audio.duration;
        clockRef.current = target;
      } else {
        clockRef.current = Math.min(1, clockRef.current + dt / FALLBACK_DURATION);
        target = clockRef.current;
      }

      const desired = target * max;
      const current = window.scrollY;
      // ease toward desired; snap when very close to avoid jitter
      const next = current + (desired - current) * Math.min(1, dt * 3.2);
      window.scrollTo(0, Math.abs(desired - current) < 0.6 ? desired : next);

      if (target >= 1 && current >= max - 1) {
        cancelAnimationFrame(rafRef.current);
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, started, audio.available, audio.playing, audio.duration, audio.currentTime]);
}
