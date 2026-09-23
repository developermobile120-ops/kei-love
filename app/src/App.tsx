import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useAudioSync } from "./hooks/useAudioSync";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useAutoScroll } from "./hooks/useAutoScroll";

import { SkyBackground } from "./components/SkyBackground";
import { IntroScene } from "./components/IntroScene";
import { AudioPlayer } from "./components/AudioPlayer";
import { StoryProgress } from "./components/StoryProgress";

import {
  Opening,
  GettingToKnow,
  LittleThings,
  LittleThingsBetween,
  GoodNight,
  Care,
  Differences,
  EmotionalBuild,
  LoveScene,
  FinalChapter,
  FinalFrame,
} from "./components/StoryScenes";
import { HerWorldIntro, MovieScene, BookArtScene, GardenScene } from "./components/HerWorld";
import { PhotoMontage } from "./components/PhotoMontage";
import { SunsetScene, SunsetPhoto } from "./components/SunsetScene";
import { BlueHour, NightSky } from "./components/NightSky";
import { PhotoConstellation } from "./components/PhotoConstellation";
import { Envelope } from "./components/Envelope";
import { GiftFromKei } from "./components/GiftFromKei";
import { MemoryWall } from "./components/MemoryWall";

export default function App() {
  const [started, setStarted] = useState(false);
  const [autoActive, setAutoActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const audio = useAudioSync();

  const progress = useScrollProgress(started);
  const silentClock = useRef(0);

  // keep a silent progress estimate for the player bar when no audio
  useEffect(() => {
    silentClock.current = progress;
  }, [progress]);

  const onManual = useCallback(() => {
    setAutoActive((wasActive) => {
      if (wasActive) {
        setPaused(true);
        return false;
      }
      return wasActive;
    });
  }, []);

  useAutoScroll({ active: autoActive, started, audio, onManual });

  const begin = useCallback(() => {
    window.scrollTo(0, 0);
    setStarted(true);
    setAutoActive(true);
    setPaused(false);
    // user gesture -> allowed to start audio
    audio.restart();
  }, [audio]);

  const resume = useCallback(() => {
    // realign audio to where the reader scrolled, then continue the film
    if (audio.available) {
      audio.seekToProgress(progress);
      audio.play();
    }
    setPaused(false);
    setAutoActive(true);
  }, [audio, progress]);

  const replay = useCallback(() => {
    window.scrollTo(0, 0);
    setPaused(false);
    setAutoActive(true);
    audio.restart();
  }, [audio]);

  return (
    <div className="story-root">
      <SkyBackground progress={started ? progress : 0} />

      <AnimatePresence>
        {!started && <IntroScene key="intro" onBegin={begin} />}
      </AnimatePresence>

      {started && (
        <>
          <StoryProgress progress={progress} paused={paused} onResume={resume} autoActive={autoActive} />

          <main>
            <Opening />
            <GettingToKnow />
            <LittleThings />

            <HerWorldIntro />
            <MovieScene />
            <BookArtScene />
            <GardenScene />

            <PhotoMontage />
            <LittleThingsBetween />
            <GoodNight />
            <Care />
            <Differences />

            <SunsetScene />
            <SunsetPhoto />
            <BlueHour />
            <NightSky />
            <PhotoConstellation />

            <EmotionalBuild />
            <LoveScene />
            <Envelope />
            <GiftFromKei />

            <MemoryWall />
            <FinalChapter />
            <FinalFrame onReplay={replay} />
          </main>

          <AudioPlayer audio={audio} silentProgress={progress} />
        </>
      )}
    </div>
  );
}
