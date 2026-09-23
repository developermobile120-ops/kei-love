import { useMemo } from "react";
import { Sunflower, Tulip, Rose, Wildflower, Leaf } from "./Botanicals";

type Kind = "sunflower" | "tulip" | "rose" | "wild" | "leaf";

// A swaying border of flowers along the bottom of a scene.
export function FlowerField({
  density = 9,
  kinds = ["sunflower", "tulip", "rose", "wild", "leaf"] as Kind[],
  silhouette = false,
  className = "",
}: {
  density?: number;
  kinds?: Kind[];
  silhouette?: boolean;
  className?: string;
}) {
  const stems = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        kind: kinds[i % kinds.length],
        left: (i / (density - 1)) * 100,
        size: 60 + Math.random() * 70,
        rise: Math.random() * 30,
        delay: Math.random() * 3,
        z: Math.random(),
      })),
    [density, kinds]
  );

  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-[42%] ${className}`}>
      {stems.map((s) => {
        const style: React.CSSProperties = {
          left: `${s.left}%`,
          bottom: `${-s.size * 0.2 + s.rise}px`,
          transform: "translateX(-50%)",
          animation: `sway ${5 + s.z * 4}s ease-in-out ${s.delay}s infinite`,
          transformOrigin: "bottom center",
          filter: silhouette ? "brightness(0.05) saturate(0.4)" : undefined,
          opacity: silhouette ? 0.85 : 1,
        };
        const el =
          s.kind === "sunflower" ? (
            <Sunflower size={s.size} sway={false} />
          ) : s.kind === "tulip" ? (
            <Tulip size={s.size} />
          ) : s.kind === "rose" ? (
            <Rose size={s.size * 0.8} />
          ) : s.kind === "leaf" ? (
            <Leaf size={s.size * 0.8} />
          ) : (
            <Wildflower size={s.size * 0.8} />
          );
        return (
          <div key={s.id} className="absolute" style={style}>
            {(s.kind === "sunflower" || s.kind === "wild" || s.kind === "tulip") && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: `-${s.size * 1.1}px`,
                  width: 3,
                  height: s.size * 1.2,
                  transform: "translateX(-50%)",
                  background: silhouette ? "#050a18" : "#3f7d4f",
                  borderRadius: 3,
                }}
              />
            )}
            {el}
          </div>
        );
      })}
    </div>
  );
}
