# kei-love

A private, cinematic love-story website for Kei — a 4–5 minute visual film built
from real photographs, custom SVG flowers & butterflies, a day→sunset→night sky,
a photo constellation, an openable love letter, and the collage Kei made in return.

Built with **React + TypeScript + Vite + Tailwind + Framer Motion**.

## Run it

```bash
cd app
npm install
npm run dev      # http://localhost:5173
```

Build for hosting:

```bash
cd app
npm run build    # outputs app/dist  (deploy to Netlify / Vercel / GitHub Pages)
```

## Two files to add (both optional — the film works without them)

1. **The song** — a local, legally-obtained copy of *Taylor Swift — Love Story*:

   ```
   app/public/audio/love-story.mp3
   ```

   Without it, the film plays silently on an internal ~5-minute timeline and the
   player shows a small "add mp3" hint.

2. **Kei's collage** — the image she made ("…you are one of them"):

   ```
   app/public/images/gift/from-kei.jpg
   ```

   Until it's added, that scene shows a gentle placeholder telling you where to
   drop it. Reload after adding — no rebuild needed in dev.

## How it works

- `src/data/photos.ts` — the photo manifest (roles: hero / portrait / montage /
  sunset / night / love / letter …). Re-tag or reorder freely.
- `src/data/story.ts` — the scene timeline + the `skyStops` color journey.
- `src/hooks/` — `useAudioSync` (HTMLAudioElement), `useAutoScroll`
  (requestAnimationFrame scroll tied to the music, yields to manual scroll),
  `useScrollProgress`, `useStoryTimeline`.
- `src/components/` — one component per scene + the botanical SVG library.

Tap **Begin Our Story** to start (the gesture is what lets the audio play).
Scroll/swipe any time to take over; a **Resume** pill brings the film back.

_The photographs are private. Keep this repository private if you deploy it._
