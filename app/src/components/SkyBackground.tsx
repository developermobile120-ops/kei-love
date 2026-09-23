import { useMemo } from "react";
import { skyAt } from "../data/story";

// Fixed full-viewport gradient that interpolates through the whole day as the
// film progresses (0..1). Sits behind every scene.
export function SkyBackground({ progress }: { progress: number }) {
  const { top, bottom, glow } = useMemo(() => skyAt(progress), [progress]);
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`,
        transition: "background 700ms linear",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 50% 22%, ${glow}55 0%, transparent 60%)`,
          transition: "background 700ms linear",
        }}
      />
    </div>
  );
}
