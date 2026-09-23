import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scene, Line, Note } from "./Bits";
import { Sunflower } from "./Botanicals";
import { LetterStage } from "./LoveLetter";

// A physical envelope that opens into the love letter.
export function Envelope() {
  const [open, setOpen] = useState(false);

  return (
    <Scene id="letter" extraTall className="!justify-start !pt-24">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="closed"
            className="flex flex-col items-center gap-8"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <Line className="max-w-sm text-center text-white" size="text-2xl sm:text-3xl">
              One thing I wanted to say without hiding behind jokes.
            </Line>

            <motion.button
              onClick={() => setOpen(true)}
              className="relative"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              aria-label="Open the letter"
            >
              <div className="relative" style={{ width: "min(320px,80vw)", aspectRatio: "3/2" }}>
                {/* body */}
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: "linear-gradient(160deg,#fbf6e9 0%,#f0e6cf 100%)",
                    boxShadow: "0 30px 70px -25px rgba(0,0,0,.7)",
                    border: "1px solid rgba(60,90,160,.4)",
                  }}
                />
                {/* side flaps */}
                <div className="absolute inset-0 overflow-hidden rounded-md">
                  <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 50% 42%, 0 100%)", background: "rgba(60,90,160,.12)" }} />
                  <div className="absolute inset-0" style={{ clipPath: "polygon(100% 0, 50% 42%, 100% 100%)", background: "rgba(60,90,160,.12)" }} />
                  <div className="absolute inset-0" style={{ clipPath: "polygon(0 100%, 50% 46%, 100% 100%)", background: "rgba(40,70,140,.18)" }} />
                </div>
                {/* top flap (closed) */}
                <div
                  className="absolute inset-x-0 top-0"
                  style={{
                    height: "56%",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(160deg,#f4ecd6,#e6dabb)",
                    borderBottom: "1px solid rgba(60,90,160,.3)",
                  }}
                />
                {/* wax seal */}
                <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
                  <div className="grid h-12 w-12 place-items-center rounded-full" style={{ background: "radial-gradient(circle,#c94f6e,#8f2b46)", boxShadow: "0 4px 12px rgba(0,0,0,.4)" }}>
                    <Sunflower size={30} sway={false} />
                  </div>
                </div>
                {/* handwritten to/from */}
                <span className="hand absolute bottom-3 right-4 text-xl text-[#3c5aa0]">to Kei 🌻</span>
              </div>
            </motion.button>

            <Note className="text-[#f6c944]">Open it.</Note>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <LetterStage />
          </motion.div>
        )}
      </AnimatePresence>
    </Scene>
  );
}
