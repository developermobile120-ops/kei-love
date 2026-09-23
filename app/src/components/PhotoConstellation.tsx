import { motion } from "framer-motion";
import { Scene } from "./Bits";
import { Stars } from "./Stars";
import { spread } from "../data/photos";

// Photos become stars in a constellation, joined by fine glowing lines.
const NODES = [
  { x: 18, y: 22 },
  { x: 40, y: 12 },
  { x: 66, y: 20 },
  { x: 82, y: 40 },
  { x: 70, y: 66 },
  { x: 48, y: 80 },
  { x: 24, y: 70 },
  { x: 12, y: 46 },
];

export function PhotoConstellation() {
  const pics = spread(NODES.length);
  return (
    <Scene id="constellation" className="!p-0">
      <Stars count={110} />
      <div className="relative h-[100svh] w-full">
        {/* connecting lines */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="cline" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f6c944" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8f7fc0" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {NODES.map((n, i) => {
            const m = NODES[(i + 1) % NODES.length];
            return (
              <motion.line
                key={i}
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
                stroke="url(#cline)"
                strokeWidth="0.25"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.4, delay: 0.4 + i * 0.15 }}
              />
            );
          })}
        </svg>

        {pics.map((p, i) => (
          <motion.figure
            key={p.id}
            className="absolute m-0 overflow-hidden rounded-full photo-shadow"
            style={{
              left: `${NODES[i].x}%`,
              top: `${NODES[i].y}%`,
              width: 78,
              height: 78,
              translate: "-50% -50%",
              boxShadow: "0 0 24px 4px rgba(246,201,68,0.35)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.14, ease: "backOut" }}
          >
            <img src={p.src} alt="Kei" loading="lazy" className="h-full w-full object-cover" />
          </motion.figure>
        ))}

        <div className="pointer-events-none absolute left-1/2 top-1/2 w-[min(320px,80vw)] -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.p
            className="cinema-text text-2xl text-white sm:text-3xl"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, delay: 1.4 }}
          >
            Somehow, these little moments became us.
          </motion.p>
        </div>
      </div>
    </Scene>
  );
}
