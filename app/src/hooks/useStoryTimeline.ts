import { storyScenes } from "../data/story";

const TOTAL = storyScenes[storyScenes.length - 1].end;

export interface TimelineState {
  sceneId: string;
  index: number;
  sceneProgress: number; // 0..1 within the current scene
}

// Maps overall film progress (0..1) to a named scene + local progress.
export function timelineAt(progress: number): TimelineState {
  const t = Math.max(0, Math.min(1, progress)) * TOTAL;
  for (let i = 0; i < storyScenes.length; i++) {
    const s = storyScenes[i];
    if (t >= s.start && t < s.end) {
      return {
        sceneId: s.id,
        index: i,
        sceneProgress: (t - s.start) / (s.end - s.start || 1),
      };
    }
  }
  const last = storyScenes.length - 1;
  return { sceneId: storyScenes[last].id, index: last, sceneProgress: 1 };
}

export const totalScenes = storyScenes.length;
