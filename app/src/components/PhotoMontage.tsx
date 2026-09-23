import { motion } from "framer-motion";
import { Scene, Line } from "./Bits";
import { spread } from "../data/photos";

// An overlapping, floating collage that builds with the music — not a grid.
export function PhotoMontage() {
  const pics = spread(16);
  // pseudo-random but stable layout
  const layout = pics.map((p, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    return {
      p,
      left: 6 + ((i * 37) % 82),
      top: 4 + ((i * 53) % 84),
      w: 90 + Math.round(r * 90),
      rot: (r - 0.5) * 22,
      z: Math.round(r * 10),
      delay: (i % 8) * 0.12,
      float: 6 + r * 8,
    };
  });

  return (
    <Scene id="montage" extraTall className="!p-0">
      <div className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2">
        <Line className="text-center text-white" size="text-2xl sm:text-3xl">all of these little moments</Line>
      </div>
      <div className="relative h-[150svh] w-full">
        {layout.map((l, i) => (
          <motion.figure
            key={l.p.id + i}
            className="absolute m-0 overflow-hidden rounded-lg photo-shadow"
            style={{ left: `${l.left}%`, top: `${l.top}%`, width: l.w, zIndex: l.z }}
            initial={{ opacity: 0, scale: 0.6, rotate: l.rot * 1.5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: l.rot }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: l.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={l.p.src}
              alt="Kei"
              loading="lazy"
              className="block w-full object-cover"
              style={{ aspectRatio: `${l.p.w}/${l.p.h}` }}
              animate={{ y: [0, -l.float, 0] }}
              transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.figure>
        ))}
      </div>
    </Scene>
  );
}
