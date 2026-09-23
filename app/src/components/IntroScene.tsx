import { motion } from "framer-motion";
import { Sunflower } from "./Botanicals";
import { Stars } from "./Stars";

const lines = [
  "Every love story has a beginning.",
  "Ours started with a conversation.",
  "And somehow… became my favorite story.",
];

// Silent start screen. The button gesture is what lets audio play.
export function IntroScene({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: "linear-gradient(180deg,#080d24 0%,#0d1636 60%,#111a3d 100%)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.2 }}
    >
      <Stars count={70} />
      <motion.div
        className="absolute bottom-[14%] left-1/2 -translate-x-1/2 opacity-70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 0.6, duration: 1.4 }}
      >
        <Sunflower size={80} />
      </motion.div>

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6">
        {lines.map((l, i) => (
          <motion.p
            key={i}
            className="cinema-text text-2xl text-[#e9e2cf] sm:text-4xl"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1 + i * 1.7, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {l}
          </motion.p>
        ))}

        <motion.button
          onClick={onBegin}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + lines.length * 1.7 + 0.4, duration: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 rounded-full border border-[#f6c944]/50 bg-[#f6c944]/10 px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-[#f6c944] backdrop-blur-sm transition hover:bg-[#f6c944]/20"
        >
          Begin Our Story
        </motion.button>
        <motion.span
          className="hand text-lg text-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + lines.length * 1.7 + 1.2, duration: 1 }}
        >
          best with sound, on your phone 🌻
        </motion.span>
      </div>
    </motion.div>
  );
}
