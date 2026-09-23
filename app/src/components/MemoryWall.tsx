import { motion } from "framer-motion";
import { Scene } from "./Bits";
import { spread } from "../data/photos";

const WORDS = ["you", "me", "laughs", "care", "late nights", "sunsets", "stars", "love"];

// A layered, rotated memory wall — polaroids and floating portraits, not a grid.
export function MemoryWall() {
  const pics = spread(12);
  return (
    <Scene id="memory-wall" extraTall className="!p-0">
      <div className="relative h-[150svh] w-full">
        {pics.map((p, i) => {
          const seed = (i * 2654435761) % 1000;
          const r = seed / 1000;
          const polaroid = i % 3 === 0;
          return (
            <motion.figure
              key={p.id}
              className="absolute m-0"
              style={{
                left: `${8 + ((i * 41) % 78)}%`,
                top: `${6 + ((i * 61) % 82)}%`,
                width: polaroid ? 130 : 100 + Math.round(r * 60),
                zIndex: Math.round(r * 10),
                rotate: (r - 0.5) * 26,
                background: polaroid ? "#faf6ea" : "transparent",
                padding: polaroid ? 8 : 0,
                paddingBottom: polaroid ? 26 : 0,
                borderRadius: polaroid ? 3 : 10,
              }}
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: (i % 6) * 0.1 }}
            >
              <div className="overflow-hidden photo-shadow" style={{ borderRadius: polaroid ? 2 : 10 }}>
                <img src={p.src} alt="Kei" loading="lazy" className="block w-full object-cover" style={{ aspectRatio: `${p.w}/${p.h}` }} />
              </div>
            </motion.figure>
          );
        })}

        {/* floating handwritten words */}
        {WORDS.map((w, i) => (
          <motion.span
            key={w}
            className={i === WORDS.length - 1 ? "" : "hand absolute text-2xl text-white/85"}
            style={{
              left: `${12 + ((i * 47) % 74)}%`,
              top: `${10 + ((i * 71) % 80)}%`,
              zIndex: 20,
              rotate: (i % 3) - 1,
              display: i === WORDS.length - 1 ? "none" : undefined,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.12 }}
          >
            {w}
          </motion.span>
        ))}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "backOut" }}
        >
          <span className="cinema-text text-7xl text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] sm:text-8xl">US</span>
        </motion.div>
      </div>
    </Scene>
  );
}
