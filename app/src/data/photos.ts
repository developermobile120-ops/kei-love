export type PhotoRole =
  | "hero"
  | "portrait"
  | "memory"
  | "montage"
  | "sunset"
  | "night"
  | "love"
  | "letter"
  | "ending";

export interface Photo {
  id: string;
  src: string;
  role: PhotoRole;
  scene: string;
  w: number;
  h: number;
}

// Real photographs of Kei. Only cropped / resized / optimized — never altered.
// Reorder or re-tag freely; every component pulls from these roles.
export const photos: Photo[] = [
  { id: "kei-01", src: "/images/kei/kei-01.webp", role: "hero", scene: "opening", w: 722, h: 1277 },
  { id: "kei-02", src: "/images/kei/kei-02.webp", role: "hero", scene: "getting-to-know", w: 726, h: 1222 },
  { id: "kei-03", src: "/images/kei/kei-03.webp", role: "portrait", scene: "getting-to-know", w: 714, h: 1274 },
  { id: "kei-04", src: "/images/kei/kei-04.webp", role: "portrait", scene: "getting-to-know", w: 712, h: 1274 },
  { id: "kei-05", src: "/images/kei/kei-05.webp", role: "hero", scene: "little-things", w: 722, h: 1268 },
  { id: "kei-06", src: "/images/kei/kei-06.webp", role: "hero", scene: "little-things", w: 716, h: 1269 },
  { id: "kei-07", src: "/images/kei/kei-07.webp", role: "hero", scene: "her-world", w: 717, h: 1280 },
  { id: "kei-08", src: "/images/kei/kei-08.webp", role: "portrait", scene: "her-world", w: 713, h: 1283 },
  { id: "kei-09", src: "/images/kei/kei-09.webp", role: "montage", scene: "playful", w: 722, h: 1284 },
  { id: "kei-10", src: "/images/kei/kei-10.webp", role: "montage", scene: "playful", w: 719, h: 1192 },
  { id: "kei-11", src: "/images/kei/kei-11.webp", role: "montage", scene: "montage", w: 688, h: 1280 },
  { id: "kei-12", src: "/images/kei/kei-12.webp", role: "montage", scene: "montage", w: 712, h: 1280 },
  { id: "kei-13", src: "/images/kei/kei-13.webp", role: "montage", scene: "montage", w: 666, h: 1286 },
  { id: "kei-14", src: "/images/kei/kei-14.webp", role: "montage", scene: "montage", w: 727, h: 1278 },
  { id: "kei-15", src: "/images/kei/kei-15.webp", role: "montage", scene: "montage", w: 719, h: 1275 },
  { id: "kei-16", src: "/images/kei/kei-16.webp", role: "montage", scene: "montage", w: 714, h: 1287 },
  { id: "kei-17", src: "/images/kei/kei-17.webp", role: "montage", scene: "montage", w: 714, h: 1290 },
  { id: "kei-18", src: "/images/kei/kei-18.webp", role: "montage", scene: "montage", w: 719, h: 1276 },
  { id: "kei-19", src: "/images/kei/kei-19.webp", role: "montage", scene: "montage", w: 714, h: 1275 },
  { id: "kei-20", src: "/images/kei/kei-20.webp", role: "memory", scene: "care", w: 719, h: 1272 },
  { id: "kei-21", src: "/images/kei/kei-21.webp", role: "memory", scene: "differences", w: 719, h: 1061 },
  { id: "kei-22", src: "/images/kei/kei-22.webp", role: "sunset", scene: "sunset", w: 722, h: 1280 },
  { id: "kei-23", src: "/images/kei/kei-23.webp", role: "sunset", scene: "sunset", w: 728, h: 1268 },
  { id: "kei-24", src: "/images/kei/kei-24.webp", role: "sunset", scene: "sunset", w: 726, h: 1286 },
  { id: "kei-25", src: "/images/kei/kei-25.webp", role: "night", scene: "blue-hour", w: 724, h: 1278 },
  { id: "kei-26", src: "/images/kei/kei-26.webp", role: "night", scene: "night", w: 728, h: 1268 },
  { id: "kei-27", src: "/images/kei/kei-27.webp", role: "night", scene: "night", w: 726, h: 1278 },
  { id: "kei-28", src: "/images/kei/kei-28.webp", role: "night", scene: "night", w: 712, h: 1290 },
  { id: "kei-29", src: "/images/kei/kei-29.webp", role: "love", scene: "love", w: 724, h: 1284 },
  { id: "kei-30", src: "/images/kei/kei-30.webp", role: "letter", scene: "letter", w: 716, h: 1288 },
];

export const byId = (id: string) => photos.find((p) => p.id === id)!;
export const byRole = (role: string) => photos.filter((p) => p.role === role);
export const byScene = (scene: string) => photos.filter((p) => p.scene === scene);

// A hand-picked spread across the whole roll, for montages / walls / constellations.
export const spread = (n: number): Photo[] => {
  if (n >= photos.length) return photos;
  const step = photos.length / n;
  const out: Photo[] = [];
  for (let i = 0; i < n; i++) out.push(photos[Math.floor(i * step)]);
  return out;
};
