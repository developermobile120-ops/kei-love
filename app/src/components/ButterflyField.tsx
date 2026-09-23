import { useMemo } from "react";
import { motion } from "framer-motion";
import { Butterfly } from "./Botanicals";

const COLORS = ["#f2a14e", "#e7a6c4", "#f6c944", "#b7c9ef", "#e58aa4"];

// Butterflies drifting along gentle curved paths, in depth layers.
export function ButterflyField({ count = 7, colors = COLORS }: { count?: number; colors?: string[] }) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const depth = 0.4 + Math.random() * 0.9;
        return {
          id: i,
          size: 22 + depth * 34,
          color: colors[i % colors.length],
          top: 8 + Math.random() * 74,
          left: Math.random() * 90,
          dur: 10 + Math.random() * 12,
          delay: Math.random() * 8,
          dx: 40 + Math.random() * 120,
          dy: 30 + Math.random() * 90,
          opacity: 0.5 + depth * 0.5,
        };
      }),
    [count, colors]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ top: `${f.top}%`, left: `${f.left}%`, opacity: f.opacity }}
          animate={{
            x: [0, f.dx, f.dx * 0.3, f.dx * 1.1, 0],
            y: [0, -f.dy, f.dy * 0.4, -f.dy * 0.6, 0],
            rotate: [-8, 8, -4, 10, -8],
          }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Butterfly size={f.size} color={f.color} />
        </motion.div>
      ))}
    </div>
  );
}
