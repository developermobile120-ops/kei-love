import { useState } from "react";
import { motion } from "framer-motion";
import { Scene, Line, Note } from "./Bits";
import { Sunflower, Butterfly } from "./Botanicals";
import { Stars } from "./Stars";

// A treasured keepsake: the collage Kei made for Jay, kept inside his film for
// her. This is the reciprocal beat — his gift holds her gift.
// Save her image to:  app/public/images/gift/from-kei.jpg
const GIFT_SRC = "/images/gift/from-kei.jpg";

export function GiftFromKei() {
  const [missing, setMissing] = useState(false);

  return (
    <Scene id="gift-from-kei" extraTall className="!justify-start !pt-24">
      <Stars count={40} maxTop={70} />
      <div className="pointer-events-none absolute bottom-10 right-8 opacity-90">
        <Sunflower size={64} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <Line className="max-w-sm text-center text-white" size="text-2xl sm:text-3xl">
          And then… you made something for me too.
        </Line>

        <motion.figure
          className="relative m-0"
          style={{ width: "min(360px,86vw)" }}
          initial={{ opacity: 0, y: 40, scale: 0.96, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute -left-5 -top-6 z-20">
            <Butterfly size={38} color="#e58aa4" />
          </div>
          <div className="pointer-events-none absolute -right-4 -top-4 z-20">
            <Butterfly size={32} color="#f6c944" />
          </div>

          <div
            className="overflow-hidden rounded-[10px] bg-[#faf6ea] p-2.5 pb-8 photo-shadow"
            style={{ boxShadow: "0 40px 100px -30px rgba(0,0,0,.75), 0 0 60px rgba(246,201,68,.15)" }}
          >
            {!missing ? (
              <img
                src={GIFT_SRC}
                alt="A collage Kei made for Jay"
                loading="lazy"
                onError={() => setMissing(true)}
                className="block w-full rounded-[4px] object-contain"
              />
            ) : (
              <div className="grid aspect-[3/4] w-full place-items-center rounded-[4px] bg-gradient-to-b from-[#e9dcc4] to-[#d9c8a6] px-6 text-center">
                <div className="text-neutral-600">
                  <p className="script text-3xl text-[#7c2340]">her collage goes here</p>
                  <p className="hand mt-3 text-xl leading-snug">
                    save the image she made to
                    <br />
                    <span className="text-neutral-800">app/public/images/gift/from-kei.jpg</span>
                  </p>
                </div>
              </div>
            )}
            <figcaption className="hand mt-2 text-center text-xl text-neutral-700">
              made by you 🌻
            </figcaption>
          </div>
        </motion.figure>

        <div className="flex flex-col items-center gap-3 text-center">
          <Note className="text-[#f6c944] !text-3xl">"…you are one of them."</Note>
          <Line className="text-white/85" delay={0.3} size="text-xl sm:text-2xl">
            I kept it. I always will.
          </Line>
          <Note className="text-white/80">You are one of mine, too.</Note>
        </div>
      </div>
    </Scene>
  );
}
