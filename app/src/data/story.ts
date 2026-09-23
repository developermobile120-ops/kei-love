// Timeline is tuned to musical *energy*, not lyrics. Times are seconds into the
// track and are safe to re-tune after testing with the real audio file.
export interface StoryScene {
  id: string;
  start: number;
  end: number;
}

export const storyScenes: StoryScene[] = [
  { id: "opening", start: 0, end: 16 },
  { id: "getting-to-know", start: 16, end: 40 },
  { id: "her-world", start: 40, end: 70 },
  { id: "movie", start: 70, end: 88 },
  { id: "book-art", start: 88, end: 104 },
  { id: "garden", start: 104, end: 122 },
  { id: "montage", start: 122, end: 150 },
  { id: "little-things", start: 150, end: 170 },
  { id: "good-night", start: 170, end: 188 },
  { id: "care", start: 188, end: 204 },
  { id: "differences", start: 204, end: 220 },
  { id: "sunset", start: 220, end: 250 },
  { id: "blue-hour", start: 250, end: 268 },
  { id: "night", start: 268, end: 300 },
  { id: "constellation", start: 300, end: 322 },
  { id: "love", start: 322, end: 348 },
  { id: "letter", start: 348, end: 430 },
  { id: "memory-wall", start: 430, end: 452 },
  { id: "final", start: 452, end: 480 },
];

// Day -> golden -> sunset -> blue hour -> night -> pre-dawn.
// Each stop maps a global scroll progress (0..1) to a sky gradient [top, bottom].
export interface SkyStop {
  at: number;
  top: string;
  bottom: string;
  glow?: string; // radial accent color
}

export const skyStops: SkyStop[] = [
  { at: 0.0, top: "#0b1230", bottom: "#111a3d", glow: "#243a7a" }, // pre-dawn navy (intro)
  { at: 0.08, top: "#20386e", bottom: "#3b5aa0", glow: "#6f93cf" }, // soft blue morning
  { at: 0.2, top: "#5b83c4", bottom: "#a9c6ea", glow: "#dbe8fb" }, // daylight
  { at: 0.34, top: "#88a9d8", bottom: "#e7d9bf", glow: "#f4e6c7" }, // warm daylight
  { at: 0.46, top: "#c98f6b", bottom: "#f0c98a", glow: "#ffdf9e" }, // golden
  { at: 0.56, top: "#b5527a", bottom: "#f2a14e", glow: "#ffd27a" }, // sunset
  { at: 0.64, top: "#5b3f86", bottom: "#c96f7e", glow: "#e7a06a" }, // afterglow
  { at: 0.72, top: "#2a2f6b", bottom: "#5b5c9c", glow: "#8f7fc0" }, // blue hour
  { at: 0.82, top: "#0d1636", bottom: "#1b2a55", glow: "#33509c" }, // night
  { at: 0.9, top: "#0a1030", bottom: "#141d45", glow: "#2b3f83" }, // deep night
  { at: 1.0, top: "#16214a", bottom: "#c9d6ea", glow: "#e9dcc4" }, // soft pre-dawn / ivory
];

function hexToRgb(h: string) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  );
}
function lerpColor(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex(
    ca[0] + (cb[0] - ca[0]) * t,
    ca[1] + (cb[1] - ca[1]) * t,
    ca[2] + (cb[2] - ca[2]) * t
  );
}

export function skyAt(p: number): { top: string; bottom: string; glow: string } {
  const prog = Math.max(0, Math.min(1, p));
  let a = skyStops[0];
  let b = skyStops[skyStops.length - 1];
  for (let i = 0; i < skyStops.length - 1; i++) {
    if (prog >= skyStops[i].at && prog <= skyStops[i + 1].at) {
      a = skyStops[i];
      b = skyStops[i + 1];
      break;
    }
  }
  const span = b.at - a.at || 1;
  const t = (prog - a.at) / span;
  return {
    top: lerpColor(a.top, b.top, t),
    bottom: lerpColor(a.bottom, b.bottom, t),
    glow: lerpColor(a.glow || a.top, b.glow || b.top, t),
  };
}
