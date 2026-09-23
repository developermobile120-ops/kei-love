import { useEffect, useState } from "react";

// Tracks how far through the whole film we've scrolled (0..1), on a rAF loop so
// the sky / progress bar update smoothly whether scrolling is manual or auto.
export function useScrollProgress(active: boolean) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress((prev) => (Math.abs(prev - p) > 0.0004 ? p : prev));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return progress;
}
