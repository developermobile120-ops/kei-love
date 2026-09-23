import { motion } from "framer-motion";
import { Scene, Line, Note } from "./Bits";
import { CinematicPhoto } from "./CinematicPhoto";
import { Sunflower, Butterfly, Cat, Tulip, Rose, Leaf } from "./Botanicals";
import { FlowerField } from "./FlowerField";
import { ButterflyField } from "./ButterflyField";
import { byId, byRole } from "../data/photos";

export function HerWorldIntro() {
  return (
    <Scene id="her-world">
      <ButterflyField count={5} />
      <div className="pointer-events-none absolute bottom-10 left-8 opacity-90">
        <Sunflower size={70} />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <CinematicPhoto photo={byId("kei-07")} treatment="zoom" width={280} className="!w-[min(300px,72vw)]" kenBurns />
        <Line className="text-white" size="text-3xl sm:text-4xl">This is a little of your world.</Line>
        <Note className="text-[#f6c944]">sunflowers, butterflies, and everything you love</Note>
      </div>
    </Scene>
  );
}

/* ---------- Movie scene ---------- */
export function MovieScene() {
  const frames = [byId("kei-11"), byId("kei-12"), byId("kei-13"), byId("kei-14")];
  return (
    <Scene id="movie" className="!bg-[#070a1c]/60">
      <div className="relative z-10 flex w-full flex-col items-center gap-8">
        <Line className="text-white" size="text-3xl sm:text-4xl">You like movies.</Line>
        <div className="relative w-full overflow-hidden py-3">
          <motion.div
            className="flex gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[...frames, ...frames, ...frames].map((p, i) => (
              <div key={i} className="relative shrink-0" style={{ width: 120 }}>
                <div className="rounded-sm bg-black p-1.5" style={{ boxShadow: "0 0 0 2px #111" }}>
                  <img src={p.src} alt="film frame of Kei" loading="lazy" className="h-[200px] w-full rounded-[2px] object-cover" />
                </div>
              </div>
            ))}
          </motion.div>
          {/* sprocket holes */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-3 items-center justify-around bg-black/80">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="h-1.5 w-2 rounded-[1px] bg-neutral-600" />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-3 items-center justify-around bg-black/80">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="h-1.5 w-2 rounded-[1px] bg-neutral-600" />
            ))}
          </div>
        </div>
        <Note className="text-[#f6c944]">So here's one little story.</Note>
        <Line className="text-white/80" size="text-xl sm:text-2xl">The page itself is the movie.</Line>
      </div>
    </Scene>
  );
}

/* ---------- Book + art scene ---------- */
export function BookArtScene() {
  return (
    <Scene id="book-art" className="!bg-[#efe6d1]/[0.06]">
      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          className="relative"
          initial={{ rotateX: 40, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ perspective: 900 }}
        >
          <div className="flex overflow-hidden rounded-md shadow-2xl">
            <div className="flex w-[150px] flex-col justify-center gap-2 bg-[#faf6ea] p-4 text-neutral-700">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="h-1.5 rounded bg-neutral-300" style={{ width: `${60 + Math.random() * 40}%` }} />
              ))}
              <span className="hand mt-2 text-lg text-neutral-600">stories…</span>
            </div>
            <div className="w-[3px] bg-neutral-400/50" />
            <div className="relative w-[150px] bg-[#f5efdd] p-3">
              <img src={byId("kei-15").src} alt="Kei" loading="lazy" className="h-full w-full rounded object-cover" />
              {/* paint strokes */}
              <span className="absolute -left-2 top-4 h-2 w-16 -rotate-12 rounded-full bg-[#e05780]/70" />
              <span className="absolute bottom-6 right-2 h-2 w-12 rotate-6 rounded-full bg-[#4f9a63]/70" />
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col items-center gap-3 text-center">
          <Line className="text-white" size="text-3xl sm:text-4xl">Books. Art. Stories.</Line>
          <Note className="text-white/85">You like stories.</Note>
          <Line className="text-[#f6c944]" delay={0.3} size="text-2xl sm:text-3xl">I think ours deserves one too.</Line>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- Plants + animals (garden) ---------- */
export function GardenScene() {
  return (
    <Scene id="garden" extraTall>
      <ButterflyField count={6} />
      <div className="relative z-10 mb-40 flex flex-col items-center gap-6">
        <div className="relative">
          <CinematicPhoto photo={byId("kei-08")} treatment="rise" width={240} className="!w-[min(260px,62vw)]" />
          <div className="absolute -left-10 bottom-0"><Tulip size={54} /></div>
          <div className="absolute -right-9 top-6"><Rose size={50} /></div>
          <div className="absolute -right-12 bottom-4"><Leaf size={48} /></div>
        </div>
        <Line className="text-white" size="text-2xl sm:text-3xl">You love plants and animals.</Line>
        <Note className="max-w-xs text-center text-[#f6c944]">
          So naturally, I had to leave a little garden for you.
        </Note>
      </div>

      {/* cat walking across the bottom */}
      <motion.div
        className="pointer-events-none absolute bottom-[30%] left-0 z-10"
        initial={{ x: "-20vw" }}
        whileInView={{ x: "88vw" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 9, ease: "linear" }}
      >
        <Cat size={64} color="#20304f" />
      </motion.div>

      <FlowerField density={11} />
    </Scene>
  );
}
