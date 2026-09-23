import { motion } from "framer-motion";

// All flowers/creatures are hand-built SVG so the whole botanical world matches.

export function Sunflower({
  size = 90,
  className = "",
  petals = 20,
  sway = true,
}: {
  size?: number;
  className?: string;
  petals?: number;
  sway?: boolean;
}) {
  const arr = Array.from({ length: petals });
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      className={className}
      style={{ transformOrigin: "center", animation: sway ? "sway 6s ease-in-out infinite" : undefined }}
    >
      <g>
        {arr.map((_, i) => {
          const a = (i / petals) * 360;
          return (
            <g key={i} transform={`rotate(${a})`}>
              <path
                d="M0,-14 C7,-20 7,-38 0,-46 C-7,-38 -7,-20 0,-14 Z"
                fill="#f6c944"
                stroke="#e6a41f"
                strokeWidth="0.8"
              />
              <path
                d="M0,-16 C3,-24 3,-38 0,-44 C-3,-38 -3,-24 0,-16 Z"
                fill="#ffdd6b"
                opacity="0.7"
              />
            </g>
          );
        })}
      </g>
      <circle r="15" fill="#6b3f1d" />
      <circle r="15" fill="url(#sfc)" />
      <defs>
        <radialGradient id="sfc">
          <stop offset="0%" stopColor="#8a5a2b" />
          <stop offset="100%" stopColor="#4d2c12" />
        </radialGradient>
      </defs>
      {Array.from({ length: 40 }).map((_, i) => {
        const ang = (i * 137.5 * Math.PI) / 180;
        const r = 1.9 * Math.sqrt(i);
        return (
          <circle
            key={i}
            cx={Math.cos(ang) * r}
            cy={Math.sin(ang) * r}
            r="1"
            fill="#3a2109"
            opacity="0.8"
          />
        );
      })}
    </svg>
  );
}

export function Rose({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" className={className}>
      <g>
        <circle r="30" fill="#7c2340" />
        <circle r="24" fill="#a63356" />
        <path d="M-18,-6 A18,18 0 0 1 18,-6 A16,16 0 0 1 -14,10 Z" fill="#c24d70" />
        <circle r="14" fill="#d16b89" />
        <path d="M-10,-2 A10,10 0 0 1 10,-2 A9,9 0 0 1 -8,6 Z" fill="#e58aa4" />
        <circle r="6" fill="#f0a7bd" />
        <circle r="2.5" fill="#ffd0dc" />
      </g>
    </svg>
  );
}

export function Tulip({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="-50 -60 100 120" className={className}>
      <path d="M0,50 C-3,20 -3,0 0,-10 C3,0 3,20 0,50 Z" fill="#3f7d4f" />
      <path d="M0,20 C-22,18 -26,-2 -18,10 C-8,20 0,20 0,20Z" fill="#4f9a63" />
      <path d="M0,20 C22,18 26,-2 18,10 C8,20 0,20 0,20Z" fill="#4f9a63" />
      <path d="M-16,-14 C-16,-40 -4,-46 0,-46 C4,-46 16,-40 16,-14 C10,-6 -10,-6 -16,-14 Z" fill="#e05780" />
      <path d="M-16,-14 C-14,-34 -8,-44 0,-46 L0,-8 C-8,-8 -14,-10 -16,-14Z" fill="#f27a9c" />
      <path d="M0,-46 C6,-42 8,-30 6,-10 L0,-8 Z" fill="#c73f68" />
    </svg>
  );
}

export function Wildflower({ size = 44, className = "", color = "#e7d3f0" }: { size?: number; className?: string; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="-50 -60 100 120" className={className}>
      <path d="M0,55 C-2,25 -2,5 0,-8 C2,5 2,25 0,55Z" fill="#4f9a63" />
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} rx="7" ry="16" cx="0" cy="-24" fill={color} transform={`rotate(${i * 60})`} />
      ))}
      <circle cy="-24" r="6" fill="#f6c944" />
    </svg>
  );
}

export function Leaf({ size = 50, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" className={className}>
      <path d="M0,45 C-30,20 -30,-30 0,-45 C30,-30 30,20 0,45 Z" fill="#3f7d4f" />
      <path d="M0,45 L0,-45" stroke="#2c5a38" strokeWidth="2" fill="none" />
      {[-30, -12, 6, 24].map((y, i) => (
        <path key={i} d={`M0,${y} C12,${y - 6} 20,${y - 4} 24,${y - 12}`} stroke="#2c5a38" strokeWidth="1.4" fill="none" />
      ))}
    </svg>
  );
}

export function Butterfly({
  size = 40,
  className = "",
  color = "#f2a14e",
  flutter = true,
}: {
  size?: number;
  className?: string;
  color?: string;
  flutter?: boolean;
}) {
  const wing = (
    <>
      <path d="M0,0 C-30,-34 -52,-24 -44,-2 C-52,18 -30,30 0,6 Z" fill={color} opacity="0.92" />
      <path d="M0,6 C-26,20 -40,38 -24,44 C-8,44 -2,24 0,10 Z" fill={color} opacity="0.75" />
      <circle cx="-30" cy="-8" r="4" fill="#fff" opacity="0.55" />
    </>
  );
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-60 -50 120 100"
      className={className}
      animate={flutter ? { scaleX: [1, 0.7, 1] } : undefined}
      transition={flutter ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } : undefined}
      style={{ transformOrigin: "center" }}
    >
      <g>{wing}</g>
      <g transform="scale(-1,1)">{wing}</g>
      <ellipse cx="0" cy="4" rx="3" ry="16" fill="#2a1e12" />
      <circle cx="0" cy="-14" r="4" fill="#2a1e12" />
      <path d="M0,-16 C6,-28 12,-30 14,-34" stroke="#2a1e12" strokeWidth="1.4" fill="none" />
      <path d="M0,-16 C-6,-28 -12,-30 -14,-34" stroke="#2a1e12" strokeWidth="1.4" fill="none" />
    </motion.svg>
  );
}

// A quiet hand-drawn cat that shows up as an easter egg.
export function Cat({ size = 70, className = "", color = "#2a2233" }: { size?: number; className?: string; color?: string }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 100 85" className={className}>
      <path d="M20,80 C10,80 10,50 18,44 C14,30 20,20 26,26 C30,18 40,16 44,24 C58,22 66,34 64,48 C74,54 78,80 66,80 Z" fill={color} />
      <path d="M18,44 L12,26 L28,36 Z" fill={color} />
      <path d="M50,26 L58,12 L64,32 Z" fill={color} />
      <path d="M66,80 C82,78 84,60 78,54 C86,58 90,78 80,82 Z" fill={color} />
      <circle cx="30" cy="50" r="2.4" fill="#f6c944" />
      <circle cx="48" cy="48" r="2.4" fill="#f6c944" />
      <path d="M36,56 q4,3 8,0" stroke="#f6c944" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
