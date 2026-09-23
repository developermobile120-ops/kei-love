import { motion } from "framer-motion";
import type { AudioSync } from "../hooks/useAudioSync";

function fmt(t: number) {
  if (!isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Small floating player — our own design, not a streaming-app clone.
export function AudioPlayer({ audio, silentProgress }: { audio: AudioSync; silentProgress: number }) {
  const p = audio.available ? audio.progress : silentProgress;

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 z-40 w-[min(340px,92vw)]"
      style={{ x: "-50%" }}
      initial={{ opacity: 0, x: "-50%", y: 30 }}
      animate={{ opacity: 1, x: "-50%", y: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
    >
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/35 px-3.5 py-2.5 backdrop-blur-md">
        <button
          aria-label={audio.playing ? "Pause" : "Play"}
          onClick={audio.toggle}
          disabled={!audio.available}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/90 text-[#0b1230] transition hover:scale-105 disabled:opacity-40"
        >
          {audio.playing ? (
            <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor"><rect x="1.5" y="1" width="3" height="10" rx="1" /><rect x="7.5" y="1" width="3" height="10" rx="1" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor"><path d="M2.5 1.4v9.2a.6.6 0 0 0 .93.5l7-4.6a.6.6 0 0 0 0-1L3.43.9a.6.6 0 0 0-.93.5Z" /></svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="script truncate text-lg leading-none text-[#f6c944]">♡ Our Song</span>
            <span className="text-[10px] tabular-nums text-white/50">
              {audio.available ? `${fmt(audio.currentTime)} / ${fmt(audio.duration)}` : "add mp3"}
            </span>
          </div>
          <div className="mt-1 truncate text-[11px] text-white/70">
            Love Story <span className="text-white/40">· Taylor Swift</span>
          </div>
          <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-gradient-to-r from-[#f6c944] to-[#e58aa4]" style={{ width: `${p * 100}%` }} />
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-1">
          <button aria-label="Restart" onClick={audio.restart} className="grid h-6 w-6 place-items-center rounded-full text-white/70 hover:text-white">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M13 8A5 5 0 1 1 8 3v0" strokeLinecap="round" /><path d="M8 1.2 10 3 8 4.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button aria-label={audio.muted ? "Unmute" : "Mute"} onClick={audio.toggleMute} className="grid h-6 w-6 place-items-center rounded-full text-white/70 hover:text-white">
            {audio.muted ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M7 3 4 6H2v4h2l3 3V3Z" /><path d="M10.5 6.5 14 10M14 6.5 10.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M7 3 4 6H2v4h2l3 3V3Z" /><path d="M10.5 5.5a3.5 3.5 0 0 1 0 5M12.5 4a5.5 5.5 0 0 1 0 8" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </div>
      {!audio.available && (
        <p className="hand mt-1.5 text-center text-base text-white/55">
          drop <span className="text-white/80">love-story.mp3</span> into /public/audio — the film still plays
        </p>
      )}
    </motion.div>
  );
}
