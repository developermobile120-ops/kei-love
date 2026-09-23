import { motion } from "framer-motion";
import { Scene, Line, Note } from "./Bits";
import { CinematicPhoto } from "./CinematicPhoto";
import { Sunflower, Butterfly, Cat } from "./Botanicals";
import { Stars, Moon } from "./Stars";
import { ButterflyField } from "./ButterflyField";
import { byId, byRole } from "../data/photos";

/* ---------- Opening: "And then there was you" ---------- */
export function Opening() {
  return (
    <Scene id="opening" className="grain">
      <CinematicPhoto
        photo={byId("kei-01")}
        treatment="blur-in"
        frame="soft"
        width={Math.min(340, 82)}
        kenBurns
        priority
        duration={2.6}
        className="!w-[min(340px,80vw)]"
      />
      <Line className="mt-8 text-center text-white" delay={1.6} size="text-4xl sm:text-5xl">
        And then there was you.
      </Line>
    </Scene>
  );
}

/* ---------- Getting to know you ---------- */
export function GettingToKnow() {
  const shots = [byId("kei-02"), byId("kei-03"), byId("kei-04")];
  const notes = ["the little things", "the way you think", "the person behind all of it"];
  return (
    <Scene id="getting-to-know" extraTall>
      <Line className="mb-10 text-white/90" size="text-3xl sm:text-4xl">
        I started learning you.
      </Line>
      <div className="flex flex-col items-center gap-16">
        {shots.map((p, i) => (
          <div key={p.id} className="flex flex-col items-center">
            <CinematicPhoto
              photo={p}
              treatment={i === 1 ? "side" : i === 2 ? "mask" : "zoom"}
              width={Math.min(280, 70)}
              className="!w-[min(280px,66vw)]"
            />
            <Note className="mt-4 text-white/85" rotate={i % 2 ? 3 : -3}>
              {notes[i]}
            </Note>
          </div>
        ))}
      </div>
    </Scene>
  );
}

/* ---------- Little things (hero pair) ---------- */
export function LittleThings() {
  return (
    <Scene id="little-things">
      <ButterflyField count={4} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <CinematicPhoto photo={byId("kei-05")} treatment="rise" width={280} className="!w-[min(300px,72vw)]" kenBurns />
        <Line className="text-center text-white" size="text-3xl sm:text-4xl">
          the things you love
        </Line>
        <Note className="text-[#f6c944]">and the quiet way you love them</Note>
      </div>
    </Scene>
  );
}

/* ---------- Little things between us (easter eggs) ---------- */
const betweenPhrases = [
  "late-night conversations",
  "one more message",
  "good night × 3",
  "random teasing",
  "fit checks",
  "Mr. Corco",
  "responsible crocodile",
  "Mr. Cat",
  "shy moments",
  "haunting dreams",
  "the guitar plan",
  "taking care of each other",
];
export function LittleThingsBetween() {
  return (
    <Scene id="little-things-between" extraTall>
      <Line className="mb-10 text-white/90">the little things between us</Line>
      <div className="flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-5">
        {betweenPhrases.map((t, i) => (
          <motion.span
            key={t}
            className={i % 3 === 0 ? "script text-3xl text-[#f6c944]" : "hand text-2xl text-white/85"}
            style={{ rotate: (i % 4) - 1.5 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: (i % 6) * 0.12 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </Scene>
  );
}

/* ---------- Good night scene ---------- */
export function GoodNight() {
  const beats = ["Good night.", "Wait…", "One more message.", "Okay. NOW good night."];
  return (
    <Scene id="good-night">
      <Stars count={80} />
      <div className="absolute right-8 top-16 opacity-90">
        <Moon size={90} />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        {beats.map((b, i) => (
          <Line key={i} className="text-white" delay={i * 0.15} size="text-3xl sm:text-4xl">
            {b}
          </Line>
        ))}
        <Line className="mt-4 text-white/80" size="text-2xl sm:text-3xl">
          How many good nights have we actually said?
        </Line>
        <Note className="text-[#f6c944]">Probably not enough.</Note>
      </div>
    </Scene>
  );
}

/* ---------- Care scene ---------- */
const careNotes = ["Did you eat?", "How was your day?", "Did you go to the gym?", "Take care of yourself."];
export function Care() {
  return (
    <Scene id="care">
      <ButterflyField count={4} colors={["#f6c944", "#e58aa4"]} />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <CinematicPhoto photo={byRole("memory")[0]} treatment="fade" width={260} className="!w-[min(280px,66vw)]" />
          {careNotes.map((n, i) => (
            <motion.div
              key={n}
              className="hand absolute rounded-xl bg-[#faf6ea] px-3 py-1.5 text-lg text-neutral-800 shadow-lg"
              style={{
                rotate: (i % 2 ? 1 : -1) * (3 + i),
                top: `${[6, 34, 62, 84][i]}%`,
                left: i % 2 ? "auto" : "-32%",
                right: i % 2 ? "-30%" : "auto",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
            >
              {n}
            </motion.div>
          ))}
        </div>
        <Line className="mt-12 max-w-md text-center text-white" size="text-2xl sm:text-3xl">
          Somehow, we started taking care of each other.
        </Line>
      </div>
    </Scene>
  );
}

/* ---------- Differences (split screen) ---------- */
export function Differences() {
  return (
    <Scene id="differences" className="!p-0">
      <div className="grid min-h-[100svh] w-full grid-cols-2">
        <motion.div
          className="flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#f3c76a]/25 to-transparent"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
        >
          <span className="text-5xl">🌅</span>
          <span className="cinema-text text-2xl text-white sm:text-3xl">EARLY BIRD</span>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#8f7fc0]/25 to-transparent"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
        >
          <span className="text-5xl">🛁</span>
          <span className="cinema-text text-2xl text-white sm:text-3xl">ONE-HOUR BATH</span>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[16%] flex flex-col items-center gap-3 px-6 text-center">
        <Note className="text-white/85">Apparently we are not exactly the same.</Note>
        <Line className="text-white" size="text-2xl sm:text-3xl">And that's okay.</Line>
        <Note className="text-[#f6c944]">We don't have to be the same to understand each other.</Note>
      </div>
    </Scene>
  );
}

/* ---------- Emotional build → confession ---------- */
export function EmotionalBuild() {
  return (
    <Scene id="love-turn" className="grain">
      <div className="flex flex-col items-center gap-8 text-center">
        <Line className="text-white/90" size="text-2xl sm:text-3xl">
          I don't remember exactly when it happened.
        </Line>
        <Line className="text-white/90" delay={0.3} size="text-2xl sm:text-3xl">
          Somewhere between all the conversations…
        </Line>
        <Line className="text-white" delay={0.7} size="text-4xl sm:text-5xl">
          …I fell in love with you.
        </Line>
      </div>
    </Scene>
  );
}

/* ---------- Love scene ---------- */
export function LoveScene() {
  return (
    <Scene id="love">
      <Stars count={50} maxTop={60} />
      <div className="pointer-events-none absolute left-8 top-1/3">
        <Butterfly size={40} color="#e58aa4" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <CinematicPhoto photo={byId("kei-29")} treatment="blur-in" width={280} className="!w-[min(300px,72vw)]" kenBurns />
          <div className="absolute -bottom-6 -left-6 opacity-90">
            <Sunflower size={64} />
          </div>
          <div className="absolute -right-5 -top-5">
            <Butterfly size={38} color="#f6c944" />
          </div>
        </div>
        <Line className="text-white" size="text-3xl sm:text-4xl">And I'm glad I did.</Line>
        <Line className="max-w-md text-center text-white/85" delay={0.3} size="text-xl sm:text-2xl">
          Because now I get to love you while still discovering you.
        </Line>
      </div>
    </Scene>
  );
}

/* ---------- Final chapter + final frame ---------- */
export function FinalChapter() {
  return (
    <Scene id="final-chapter">
      <ButterflyField count={5} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <CinematicPhoto photo={byRole("hero")[3] ?? byId("kei-06")} treatment="rise" width={260} className="!w-[min(280px,66vw)]" />
        <Line className="text-white" size="text-3xl sm:text-4xl">This isn't the end.</Line>
        <Line className="text-white/85" delay={0.3} size="text-2xl sm:text-3xl">It's just our next chapter.</Line>
        <Note className="text-[#f6c944]">And I'd like to keep writing it with you.</Note>
      </div>
    </Scene>
  );
}

export function FinalFrame({ onReplay }: { onReplay: () => void }) {
  return (
    <Scene id="final-frame">
      <div className="pointer-events-none absolute bottom-[22%] left-1/2 -translate-x-1/2">
        <Cat color="#20304f" size={60} />
      </div>
      <div className="absolute left-1/2 top-[16%] -translate-x-1/2 opacity-90">
        <Moon size={80} />
      </div>
      <div className="pointer-events-none absolute bottom-[30%] right-[18%]">
        <Sunflower size={70} />
      </div>
      <div className="pointer-events-none absolute right-[26%] top-[34%]">
        <Butterfly size={40} color="#e58aa4" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <Line className="text-white" size="text-4xl sm:text-5xl">I love you, Kei.</Line>
        <Line className="text-white/85" delay={0.2} size="text-2xl">Today.</Line>
        <Line className="text-white/85" delay={0.45} size="text-2xl">Tomorrow.</Line>
        <Line className="text-white/85" delay={0.7} size="text-2xl">And in all the little moments between.</Line>
        <Note className="mt-2 text-[#f6c944] !text-3xl">— Jay ❤️</Note>
        <motion.button
          onClick={onReplay}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.04 }}
          className="mt-6 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm uppercase tracking-[0.22em] text-white backdrop-blur-sm"
        >
          Replay Our Story
        </motion.button>
        <span className="hand text-lg text-white/50">Start from the beginning.</span>
      </div>
    </Scene>
  );
}
