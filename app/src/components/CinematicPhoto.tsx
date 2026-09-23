import { motion } from "framer-motion";
import type { Photo } from "../data/photos";

type Treatment = "blur-in" | "zoom" | "side" | "fade" | "rise" | "mask";
type Frame = "plain" | "polaroid" | "film" | "soft";

const initialFor: Record<Treatment, any> = {
  "blur-in": { opacity: 0, filter: "blur(24px)", scale: 1.12 },
  zoom: { opacity: 0, scale: 1.18 },
  side: { opacity: 0, x: 90 },
  fade: { opacity: 0 },
  rise: { opacity: 0, y: 80, scale: 0.96 },
  mask: { opacity: 0, clipPath: "inset(0 50% 0 50%)" },
};
const animateFor: Record<Treatment, any> = {
  "blur-in": { opacity: 1, filter: "blur(0px)", scale: 1 },
  zoom: { opacity: 1, scale: 1 },
  side: { opacity: 1, x: 0 },
  fade: { opacity: 1 },
  rise: { opacity: 1, y: 0, scale: 1 },
  mask: { opacity: 1, clipPath: "inset(0 0% 0 0%)" },
};

export function CinematicPhoto({
  photo,
  treatment = "fade",
  frame = "soft",
  className = "",
  width = 300,
  caption,
  rotate = 0,
  kenBurns = false,
  priority = false,
  duration = 1.6,
}: {
  photo: Photo;
  treatment?: Treatment;
  frame?: Frame;
  className?: string;
  width?: number;
  caption?: string;
  rotate?: number;
  kenBurns?: boolean;
  priority?: boolean;
  duration?: number;
}) {
  const isPolaroid = frame === "polaroid";
  const pad = isPolaroid ? 10 : 0;
  const radius = frame === "film" ? 4 : frame === "plain" ? 2 : 14;

  const img = (
    <motion.img
      src={photo.src}
      alt="A photograph of Kei"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className="block h-auto w-full select-none"
      style={{ borderRadius: isPolaroid ? 4 : radius, aspectRatio: `${photo.w}/${photo.h}`, objectFit: "cover" }}
      animate={kenBurns ? { scale: [1.02, 1.12], y: [0, -8] } : undefined}
      transition={kenBurns ? { duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } : undefined}
    />
  );

  return (
    <motion.figure
      className={`relative m-0 ${className}`}
      style={{ width, rotate }}
      initial={initialFor[treatment]}
      whileInView={animateFor[treatment]}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative overflow-hidden ${frame === "soft" || isPolaroid ? "photo-shadow" : ""}`}
        style={{
          borderRadius: isPolaroid ? 6 : radius,
          padding: pad,
          background: isPolaroid ? "#faf6ea" : "transparent",
          boxShadow: frame === "film" ? "0 0 0 6px #0c0c0c, 0 24px 60px -20px rgba(0,0,0,.85)" : undefined,
        }}
      >
        <div className="grain relative overflow-hidden" style={{ borderRadius: isPolaroid ? 4 : radius }}>
          {img}
        </div>
        {isPolaroid && caption && (
          <figcaption className="hand mt-2 text-center text-xl text-neutral-700">{caption}</figcaption>
        )}
      </div>
      {!isPolaroid && caption && (
        <figcaption className="hand mt-3 text-center text-2xl text-white/80">{caption}</figcaption>
      )}
    </motion.figure>
  );
}
