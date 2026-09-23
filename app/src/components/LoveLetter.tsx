import { motion } from "framer-motion";
import { Sunflower, Rose, Tulip, Butterfly, Leaf } from "./Botanicals";
import { Stars, Moon } from "./Stars";

export function LoveLetter() {
  return (
    <motion.div
      className="relative mx-auto w-[min(560px,92vw)]"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* decorations */}
      <div className="pointer-events-none absolute -left-6 -top-8 z-20"><Butterfly size={40} color="#e58aa4" /></div>
      <div className="pointer-events-none absolute -right-5 -top-6 z-20"><Butterfly size={36} color="#f6c944" /></div>
      <div className="pointer-events-none absolute -bottom-8 -left-7 z-20"><Sunflower size={72} /></div>
      <div className="pointer-events-none absolute -bottom-6 left-16 z-20"><Rose size={48} /></div>
      <div className="pointer-events-none absolute -bottom-7 right-6 z-20"><Tulip size={54} /></div>
      <div className="pointer-events-none absolute -bottom-4 right-24 z-20 opacity-80"><Leaf size={40} /></div>

      <div
        className="relative overflow-hidden rounded-[6px] px-7 py-9 sm:px-10 sm:py-11"
        style={{
          background: "linear-gradient(180deg,#fbf6e9 0%,#f6efdd 100%)",
          boxShadow: "0 40px 100px -30px rgba(0,0,0,.7), inset 0 0 60px rgba(200,170,110,.15)",
          border: "1px solid rgba(180,150,90,.25)",
        }}
      >
        {/* faint ruled paper */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(#000 0 1px, transparent 1px 28px)" }} />
        <div className="relative text-neutral-800">
          <p className="letter mb-4 text-3xl text-[#7c2340]">Dear Kei,</p>
          <div className="hand space-y-3 text-[20px] leading-relaxed sm:text-[22px]">
            <p>I don't know exactly when it happened.</p>
            <p>
              Somewhere between our conversations, the teasing, the random moments, the good nights that
              somehow became one more message, and all the little things I learned about you… you became
              someone incredibly important to me.
            </p>
            <p>
              I love how sweet you are. I love how caring you can be. I love your kindness. I love learning
              the little things that make you <em>you</em>.
            </p>
            <p>
              I love that you can make me laugh, make me overthink, make me blush, and somehow still make me
              want to talk to you for another five minutes when we were supposed to say good night.
            </p>
            <p>
              I know you think a lot. I know sometimes love can be scary. I don't expect us to have every
              answer. I don't need everything to be perfect.
            </p>
            <p>
              I just want us to keep being honest with each other, keep talking, keep caring, keep laughing,
              and keep choosing each other.
            </p>
            <p>
              I want to keep learning you. Your favorite things. Your dreams. Your quiet moments. Your silly
              moments. The things you tell everyone. And the things you only tell someone you trust.
            </p>
            <p>Thank you for becoming part of my life.</p>
            <p className="text-2xl text-[#7c2340]">I love you, Kei.</p>
            <p>And I hope this is only the beginning of our story.</p>
          </div>
          <p className="script mt-6 text-right text-3xl text-[#7c2340]">— Jay 🌻</p>
        </div>
      </div>
    </motion.div>
  );
}

// Wraps the letter in a gentle night-with-blooms atmosphere once opened.
export function LetterStage() {
  return (
    <div className="relative w-full">
      <Stars count={50} maxTop={80} />
      <div className="absolute right-6 top-2 opacity-70"><Moon size={70} /></div>
      <div className="relative z-10 py-10">
        <LoveLetter />
      </div>
    </div>
  );
}
