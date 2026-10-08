import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  Check,
  Compass,
  Info,
  Layers,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { chapters, imagePath } from "../../data/chapters";
import { destinations, referencePlaces } from "../../data/locations";
import { loadCoastlines } from "../../data/geography";
import { useJourney } from "../../store/journey";
const WorldMap = lazy(() => import("../../scenes/WorldMap"));
class MapBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onUnavailable: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onUnavailable();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function FlatMap({
  reference,
  selected,
  onSelect,
}: {
  reference: boolean;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [land, setLand] = useState<number[][][]>([]);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    loadCoastlines(controller.signal)
      .then(setLand)
      .catch((error) => {
        if (error.name !== "AbortError") setUnavailable(true);
      });
    return () => controller.abort();
  }, []);
  const list = reference
    ? referencePlaces.map((p) => ({
        id: p.name,
        name: p.name,
        position: [(p.lon - 15) / 2.5, -(p.lat - 36.5) / 2.5] as [
          number,
          number,
        ],
      }))
    : destinations;
  return (
    <div className="flat-map">
      {unavailable ? (
        <p className="map-data-note" role="status">
          Coastlines could not load. Select a destination below to continue.
        </p>
      ) : null}
      <svg
        viewBox="0 0 1000 560"
        preserveAspectRatio="none"
        aria-label={
          reference
            ? "Geographical reference map"
            : "Illustrative mythic journey"
        }
        role="img"
      >
        <defs>
          <pattern
            id="mapgrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0H0V50"
              stroke="#789294"
              strokeOpacity=".15"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="1000" height="560" fill="#103039" />
        <rect width="1000" height="560" fill="url(#mapgrid)" />
        {land.map((ring, i) => (
          <polygon
            key={i}
            points={ring
              .map(
                (p) =>
                  `${500 + ((p[0] - 15) / 2.5) * 46},${280 - ((p[1] - 36.5) / 2.5) * 44}`,
              )
              .join(" ")}
            fill="#34534e"
            stroke="#829889"
            strokeWidth="1"
          />
        ))}
        <text
          x="500"
          y="280"
          textAnchor="middle"
          fill="#8dafa9"
          opacity=".18"
          fontSize="28"
          letterSpacing="7"
        >
          THE WINE-DARK SEA
        </text>
        {!reference ? (
          <polyline
            points={destinations
              .map(
                (d) =>
                  `${500 + d.position[0] * 46},${280 + d.position[1] * 44}`,
              )
              .join(" ")}
            stroke="#c7b381"
            fill="none"
            strokeDasharray="6 7"
          />
        ) : null}
      </svg>
      {list.map((d, i) => (
        <button
          key={d.id}
          className={`flat-marker ${reference ? "compact" : ""} ${selected === d.id ? "active" : ""}`}
          style={{
            left: `${50 + d.position[0] * 4.6}%`,
            top: `${50 + d.position[1] * 7.86}%`,
          }}
          onClick={() => onSelect(d.id)}
          aria-pressed={selected === d.id}
          aria-label={`Select ${d.name}`}
        >
          <span>
            {reference
              ? "•"
              : String(
                  chapters.find((c) => c.id === destinations[i].chapter)!
                    .number,
                ).padStart(2, "0")}
          </span>
          <strong>{d.name}</strong>
        </button>
      ))}
    </div>
  );
}
export default function Atlas() {
  const { completed, enter, motion, graphics, chapter } = useJourney();
  useEffect(() => {
    setTwoD(graphics === "quiet");
  }, [graphics]);
  const [reference, setReference] = useState(false),
    [twoD, setTwoD] = useState(graphics === "quiet"),
    [selected, setSelected] = useState(
      destinations.find((d) => d.chapter === chapters[chapter].id)?.id ??
        "troy",
    ),
    [reset, setReset] = useState(0);
  const location = reference
    ? (referencePlaces.find((p) => p.name === selected) ?? referencePlaces[0])
    : (destinations.find((d) => d.id === selected) ?? destinations[0]);
  const c = chapters.find((c) => c.id === location.chapter)!;
  const known = reference || ("known" in location && location.known);
  const switchMode = (ref: boolean) => {
    setReference(ref);
    setSelected(ref ? "Troy" : "troy");
  };
  const fallback = (
    <FlatMap reference={reference} selected={selected} onSelect={setSelected} />
  );
  return (
    <section className="atlas page-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE WORLD OF THE ODYSSEY</p>
          <h1>A sea of stories.</h1>
          <p>
            Follow the route. Discover the places. See what changed at every
            shore.
          </p>
        </div>
        <div className="segmented">
          <button
            className={!reference ? "active" : ""}
            onClick={() => switchMode(false)}
          >
            Mythic journey
          </button>
          <button
            className={reference ? "active" : ""}
            onClick={() => switchMode(true)}
          >
            Real geography
          </button>
        </div>
      </div>
      <div className="map-layout">
        <div className="map-stage">
          <div className="map-toolbar">
            <span>
              <Compass size={16} />
              {reference
                ? "MEDITERRANEAN REFERENCE"
                : "AN ARTISTIC JOURNEY MAP"}
            </span>
            <div>
              <button
                className="text-button small"
                onClick={() => setTwoD(!twoD)}
              >
                <Layers size={16} />
                {twoD ? "Use 3D map" : "Use 2D map"}
              </button>
              <button
                className="icon-button"
                onClick={() => setReset(reset + 1)}
                aria-label="Reset map camera"
                disabled={twoD}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          <div className="map-canvas" key={`${reference}-${reset}-${twoD}`}>
            {twoD ? (
              fallback
            ) : (
              <MapBoundary
                fallback={fallback}
                onUnavailable={() => setTwoD(true)}
              >
                <Suspense
                  fallback={<p className="map-loading">Opening the atlas…</p>}
                >
                  <WorldMap
                    onUnavailable={() => setTwoD(true)}
                    reference={reference}
                    selected={selected}
                    onSelect={setSelected}
                    completed={completed}
                    motion={motion}
                  />
                </Suspense>
              </MapBoundary>
            )}
          </div>
          <div className="map-bottom">
            <span>
              {twoD
                ? "Select any labelled destination"
                : "Drag to orbit · Scroll to zoom · Right-drag to pan"}
            </span>
            <span>
              <span className="status-dot" />
              {completed.length}/21 chapters completed
            </span>
          </div>
        </div>
        <aside className="destination-panel">
          <img src={imagePath(c.image)} alt="" />
          <div className="destination-copy">
            <p className="eyebrow">
              <MapPin size={13} />
              {known ? "GEOGRAPHICAL REFERENCE" : "MYTHIC DESTINATION"}
            </p>
            <h2>{location.name}</h2>
            <span className="destination-chapter">
              CHAPTER {String(c.number).padStart(2, "0")} · {c.shortTitle}
            </span>
            <p>{c.intro}</p>
            <button className="button gold" onClick={() => enter(c.number - 1)}>
              Enter this chapter <ArrowRight size={17} />
            </button>
            <div className="geography-note">
              <Info size={17} />
              <p>
                {"note" in location
                  ? location.note
                  : "A modern geographical reference for a named place in the ancient story. These points are not a reconstruction of the full mythical voyage."}
              </p>
            </div>
          </div>
        </aside>
      </div>
      <div className="atlas-note">
        <Info size={16} />
        <p>
          {reference
            ? "The reference map shows named places in Greece, Thrace and Anatolia. The fabulous islands are omitted because their modern locations are unestablished. Terrain relief is stylised."
            : "This route is arranged to explain the story. Lines and mythic markers do not represent verified coordinates or sailing distances. Use Real geography for named places."}
        </p>
      </div>
      <div className="destination-list" aria-label="All atlas destinations">
        {(reference
          ? referencePlaces.map((p) => ({
              id: p.name,
              name: p.name,
              chapter: p.chapter,
            }))
          : destinations
        ).map((d, i) => (
          <button
            key={d.id}
            className={selected === d.id ? "active" : ""}
            onClick={() => setSelected(d.id)}
          >
            <span>
              {completed.includes(d.chapter) ? (
                <Check size={13} />
              ) : reference ? (
                "•"
              ) : (
                String(
                  chapters.find((c) => c.id === d.chapter)!.number,
                ).padStart(2, "0")
              )}
            </span>
            {d.name}
          </button>
        ))}
      </div>
    </section>
  );
}
