import { motion } from "framer-motion";
import { Scene, Line, Note } from "./Bits";
import { CinematicPhoto } from "./CinematicPhoto";
import { FlowerField } from "./FlowerField";
import { ButterflyField } from "./ButterflyField";
import { byId } from "../data/photos";

// A big cinematic sunset — one of the visual highlights.
export function SunsetScene() {
  return (
    <Scene id="sunset" extraTall className="!p-0 !justify-end">
      {/* sky is painted by the global SkyBackground; add sun + clouds + hills */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 220,
            height: 220,
            bottom: "34%",
            background: "radial-gradient(circle, #fff2c2 0%, #ffd27a 40%, #ff9e57 75%, transparent 78%)",
            filter: "blur(2px)",
          }}
          initial={{ y: -40, opacity: 0.6 }}
          whileInView={{ y: 60, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        {/* clouds */}
        {[
          { top: "18%", left: "8%", w: 180, o: 0.5, d: 40 },
          { top: "28%", left: "60%", w: 240, o: 0.4, d: 55 },
          { top: "12%", left: "40%", w: 140, o: 0.35, d: 70 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: c.top,
              left: c.left,
              width: c.w,
              height: c.w * 0.28,
              opacity: c.o,
              background: "linear-gradient(180deg,#fff 0%,#ffe0c0 100%)",
              filter: "blur(14px)",
            }}
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: c.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* distant hills */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 260" preserveAspectRatio="none" style={{ height: "38%" }}>
          <path d="M0,140 C260,70 520,120 760,90 C1000,60 1240,120 1440,90 L1440,260 L0,260 Z" fill="#7a4a55" opacity="0.55" />
          <path d="M0,180 C300,120 560,170 820,150 C1080,130 1300,180 1440,160 L1440,260 L0,260 Z" fill="#3f2f5a" opacity="0.7" />
          <path d="M0,220 C320,190 640,210 960,200 C1200,192 1360,214 1440,206 L1440,260 L0,260 Z" fill="#1c2144" />
        </svg>
      </div>

      <ButterflyField count={5} colors={["#ffdf9e", "#ff9e57", "#e58aa4"]} />
      <FlowerField density={9} kinds={["sunflower", "tulip", "wild"]} />

      <div className="relative z-10 mb-[26vh] flex flex-col items-center gap-4 text-center">
        <Line className="text-white" size="text-3xl sm:text-4xl">You love sunsets.</Line>
        <Note className="text-white/90 !text-3xl">So I wanted to give you one.</Note>
      </div>
    </Scene>
  );
}

// The sunset photograph moment.
export function SunsetPhoto() {
  return (
    <Scene id="sunset-photo" className="grain">
      <div className="relative z-10 flex flex-col items-center gap-6">
        <CinematicPhoto
          photo={byId("kei-22")}
          treatment="blur-in"
          width={300}
          className="!w-[min(320px,76vw)]"
          kenBurns
          duration={2.4}
        />
        <Line className="max-w-sm text-center text-white" size="text-2xl sm:text-3xl">
          Some moments don't need words.
        </Line>
      </div>
    </Scene>
  );
}
