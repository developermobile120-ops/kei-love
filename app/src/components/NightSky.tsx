import { Scene, Line, Note } from "./Bits";
import { CinematicPhoto } from "./CinematicPhoto";
import { Stars, Moon } from "./Stars";
import { FlowerField } from "./FlowerField";
import { byId } from "../data/photos";

// Blue hour — sunset fades, silhouettes, first stars, photo fades.
export function BlueHour() {
  return (
    <Scene id="blue-hour">
      <Stars count={40} maxTop={70} />
      <FlowerField density={8} silhouette kinds={["sunflower", "tulip", "wild"]} />
      <div className="relative z-10 flex flex-col items-center">
        <CinematicPhoto photo={byId("kei-25")} treatment="fade" width={260} className="!w-[min(280px,66vw)]" duration={2.2} />
      </div>
    </Scene>
  );
}

// Moon + stars immersive night.
export function NightSky() {
  const shots = [byId("kei-26"), byId("kei-27"), byId("kei-28")];
  return (
    <Scene id="night" extraTall>
      <Stars count={120} />
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2">
        <Moon size={120} />
      </div>
      <div className="relative z-10 mt-24 flex flex-col items-center gap-12">
        <div className="flex flex-wrap items-center justify-center gap-5">
          {shots.map((p, i) => (
            <CinematicPhoto
              key={p.id}
              photo={p}
              treatment={i === 1 ? "rise" : "fade"}
              width={150}
              rotate={(i - 1) * 5}
              className="!w-[min(150px,40vw)]"
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <Line className="text-white" size="text-3xl sm:text-4xl">You like looking at the stars.</Line>
          <Note className="text-[#f6c944]">I hope you always have reasons to look up.</Note>
        </div>
      </div>
    </Scene>
  );
}
