import { useMemo } from "react";

// A twinkling star field. `density` and vertical `spread` are tunable.
export function Stars({
  count = 90,
  className = "",
  maxTop = 100,
}: {
  count?: number;
  className?: string;
  maxTop?: number;
}) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * maxTop,
        left: Math.random() * 100,
        size: Math.random() < 0.85 ? 1 + Math.random() * 1.6 : 2.4 + Math.random() * 1.8,
        dur: 2 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    [count, maxTop]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.8)`,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Moon({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id="moong" cx="40%" cy="38%">
          <stop offset="0%" stopColor="#fffbe9" />
          <stop offset="70%" stopColor="#f3eccf" />
          <stop offset="100%" stopColor="#d9cfa6" />
        </radialGradient>
        <filter id="moonglow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#fff7dc" opacity="0.18" filter="url(#moonglow)" />
      <circle cx="50" cy="50" r="34" fill="url(#moong)" />
      <circle cx="40" cy="42" r="5" fill="#e4d9b3" opacity="0.6" />
      <circle cx="58" cy="55" r="7" fill="#e4d9b3" opacity="0.5" />
      <circle cx="52" cy="38" r="3" fill="#e4d9b3" opacity="0.5" />
    </svg>
  );
}
