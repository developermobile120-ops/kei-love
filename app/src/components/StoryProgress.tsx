import { AnimatePresence, motion } from "framer-motion";

// Thin top progress line + a discreet "paused / resume" control.
export function StoryProgress({
  progress,
  paused,
  onResume,
  autoActive,
}: {
  progress: number;
  paused: boolean;
  onResume: () => void;
  autoActive: boolean;
}) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#f6c944] via-[#e58aa4] to-[#8f7fc0]"
          style={{ width: `${progress * 100}%`, transition: "width 200ms linear" }}
        />
      </div>

      <AnimatePresence>
        {paused && !autoActive && (
          <motion.button
            key="resume"
            onClick={onResume}
            style={{ x: "-50%" }}
            initial={{ opacity: 0, x: "-50%", y: -10 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={{ opacity: 0, x: "-50%", y: -10 }}
            className="fixed left-1/2 top-4 z-40 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-sm text-white/85 backdrop-blur-md"
          >
            <span className="script mr-2 text-[#f6c944]">Story paused</span>
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-[#0b1230]">Resume ▸</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
