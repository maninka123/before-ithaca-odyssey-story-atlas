import { useEffect, useState } from "react";
import { Focus, Minus, Plus, X } from "lucide-react";
const objects = [
  {
    id: "door",
    name: "The stone door",
    x: 78,
    y: 38,
    text: "Only Polyphemus can move this boulder. Odysseus cannot simply kill him: the men would remain trapped inside.",
  },
  {
    id: "wine",
    name: "The wine and stake",
    x: 28,
    y: 51,
    text: "Strong wine makes the giant sleep. The men heat an olive-wood stake to blind his single eye. The false name Nobody keeps the other Cyclopes from understanding his cries.",
  },
  {
    id: "sheep",
    name: "The sheep",
    x: 57,
    y: 49,
    text: "At dawn, the men hide beneath the sheep. The blinded giant feels the animals’ backs, but does not find the men underneath.",
  },
];
export default function CyclopsScene({
  onInspect,
  active,
}: {
  onInspect: (id: string) => void;
  active?: string;
}) {
  const [selected, setSelected] = useState<string | null>(null),
    [zoom, setZoom] = useState(1);
  useEffect(() => {
    document.documentElement.style.setProperty("--cave-scale", String(zoom));
    return () => {
      document.documentElement.style.removeProperty("--cave-scale");
    };
  }, [zoom]);
  return (
    <>
      <div
        className="cave-exploration"
        role="group"
        aria-label="Explore the illustrated cave"
      >
        <div className="scene-tools">
          <span>
            <Focus size={14} /> EXPLORE THE ILLUSTRATED CAVE
          </span>
          <button
            className="icon-button"
            aria-label="Zoom out of cave"
            disabled={zoom <= 1}
            onClick={() => {
              setZoom(Math.max(1, Math.round((zoom - 0.15) * 100) / 100));
            }}
          >
            <Minus size={17} />
          </button>
          <button
            className="icon-button"
            aria-label="Zoom into cave"
            disabled={zoom >= 1.3}
            onClick={() => {
              setZoom(Math.min(1.3, Math.round((zoom + 0.15) * 100) / 100));
            }}
          >
            <Plus size={17} />
          </button>
        </div>
        <div className="hotspots">
          {objects.map((o) => (
            <button
              key={o.id}
              className={`hotspot ${active === o.id ? "active" : ""}`}
              style={{ left: `${o.x}%`, top: `${o.y}%` }}
              onClick={() => {
                setSelected(o.id);
                onInspect(o.id);
              }}
              aria-label={`Inspect ${o.name}`}
            >
              <Plus size={16} />
              <span>{o.name}</span>
            </button>
          ))}
        </div>
      </div>
      {selected ? (
        <aside className="object-note" aria-live="polite">
          <button
            className="icon-button"
            aria-label="Close object explanation"
            onClick={() => setSelected(null)}
          >
            <X size={17} />
          </button>
          <span className="eyebrow">THE ESCAPE PLAN</span>
          <h3>{objects.find((o) => o.id === selected)!.name}</h3>
          <p>{objects.find((o) => o.id === selected)!.text}</p>
        </aside>
      ) : null}
    </>
  );
}
