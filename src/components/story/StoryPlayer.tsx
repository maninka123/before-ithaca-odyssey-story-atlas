import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  List,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  MapPin,
  Waves,
} from "lucide-react";
import { chapters, epicOrder, imagePath, parts } from "../../data/chapters";
import { useJourney } from "../../store/journey";
import { useAudio } from "../../hooks/useAudio";
import CyclopsScene from "./CyclopsScene";
export default function StoryPlayer({
  openChapters,
}: {
  openChapters: () => void;
}) {
  const {
    chapter,
    beat,
    enter,
    setBeat,
    complete,
    setView,
    selectCharacter,
    mode,
    motion,
    setMotion,
  } = useJourney();
  const c = chapters[chapter],
    baseBeat = c.beats[Math.min(beat, c.beats.length - 1)];
  const b =
    mode === "epic" && c.id === "phaeacians" && beat === c.beats.length - 1
      ? {
          ...baseBeat,
          title: "Before the voyage home",
          text: "Before the Phaeacians carry him to Ithaca, Odysseus tells them how he lost his ships and companions. The next chapters follow his account as a flashback.",
        }
      : baseBeat;
  const [reading, setReading] = useState(false),
    [finished, setFinished] = useState(false),
    [inspected, setInspected] = useState<string[]>([]);
  const audio = useAudio(`${b.title}. ${b.text}`);
  useEffect(() => setFinished(false), [chapter, beat]);
  const order =
    mode === "epic" && epicOrder.includes(c.id)
      ? epicOrder
      : chapters.map((c) => c.id);
  const at = order.indexOf(c.id),
    next = order[at + 1],
    previous = order[at - 1];
  useEffect(() => {
    setInspected([]);
  }, [chapter]);
  const advance = () => {
    if (beat < c.beats.length - 1) setBeat(beat + 1);
    else {
      complete();
      if (next) enter(chapters.findIndex((c) => c.id === next));
      else setFinished(true);
    }
  };
  const back = () => {
    if (beat > 0) setBeat(beat - 1);
    else if (previous) {
      const idx = chapters.findIndex((c) => c.id === previous);
      enter(idx, chapters[idx].beats.length - 1);
    }
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        document.querySelector("dialog[open]") ||
        ["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(
          (e.target as HTMLElement).tagName,
        )
      )
        return;
      if (e.key === "ArrowRight") advance();
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
  return (
    <section
      className={`story-player ${reading ? "reading" : ""} ${motion ? "moving" : ""} ${c.id === "cyclops" ? "cave-player" : ""}`}
    >
      {!reading ? (
        <>
          <div
            className="story-backdrop"
            key={c.image}
            style={{ backgroundImage: `url(${imagePath(c.image)})` }}
            role="img"
            aria-label={`Artistic illustration for ${c.title}`}
          />
          <div className="story-shade" />
        </>
      ) : null}
      <div className="story-top">
        <button className="text-button" onClick={openChapters}>
          <List size={17} />
          CHAPTER {String(c.number).padStart(2, "0")} / 21
        </button>
        <span>
          PART {["I", "II", "III"][c.part - 1]} ·{" "}
          {parts[c.part - 1].toUpperCase()}
        </span>
        <button className="text-button" onClick={() => setReading(!reading)}>
          <BookOpen size={17} />
          {reading ? "Cinematic view" : "Reading view"}
        </button>
      </div>
      <div className="story-location">
        <MapPin size={14} />
        {c.location}
      </div>
      {mode === "epic" ? (
        <p className="epic-note">
          {[
            "cicones",
            "cyclops",
            "aeolus",
            "giants",
            "circe",
            "underworld",
            "sirens",
            "strait",
            "helios",
          ].includes(c.id)
            ? "FLASHBACK · Odysseus tells his adventures at the Phaeacian court."
            : "EPIC ORDER · A teaching route through Homer’s frame story and flashbacks."}
        </p>
      ) : null}
      {mode === "epic" && c.id === "helios" && beat === c.beats.length - 1 ? (
        <p className="epic-note">
          The flashback ends here. Calypso and the Phaeacians were covered
          earlier in this route. We now return to Odysseus arriving in Ithaca.
        </p>
      ) : null}
      {!reading && c.id === "cyclops" ? (
        <CyclopsScene
          active={b.object}
          onInspect={(id) => setInspected([...new Set([...inspected, id])])}
        />
      ) : null}
      <article
        className="story-narrative"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="eyebrow">
          {finished
            ? "JOURNEY COMPLETE"
            : `${b.kind === "consequence" ? "THE CONSEQUENCE" : "THE STORY"} · ${String(beat + 1).padStart(2, "0")} / ${String(c.beats.length).padStart(2, "0")}`}
        </p>
        <h1>{finished ? "At last, home." : c.title}</h1>
        <p className="chapter-intro">{c.intro}</p>
        <div className="beat-copy" key={`${c.id}-${beat}`}>
          <h2>
            {finished ? "You have reached the end of the story." : b.title}
          </h2>
          <p>
            {finished
              ? "Revisit a favourite chapter, explore the route, or follow the people who shaped the journey. Your progress is saved on this device."
              : b.text}
          </p>
        </div>
        <div className="story-characters">
          <span>IN THIS CHAPTER</span>
          {c.characters.map((name) => (
            <button key={name} onClick={() => selectCharacter(name)}>
              {name}
            </button>
          ))}
        </div>
        <a
          className="source-link"
          href={c.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          {c.source} ↗
        </a>
        {c.id === "cyclops" ? (
          <span className="inspect-count">
            {inspected.length}/3 objects explored · exploration is optional
          </span>
        ) : null}
      </article>
      <div className="story-controls">
        <div className="playback">
          <button
            className="icon-button"
            onClick={() => setMotion(!motion)}
            aria-label={motion ? "Pause scene motion" : "Play scene motion"}
          >
            {motion ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            className="icon-button"
            onClick={() => {
              setBeat(0);
              setFinished(false);
            }}
            aria-label="Replay chapter"
          >
            <RotateCcw size={18} />
          </button>
          <span className="tool-divider" />
          <button
            className={`icon-button ${audio.speaking ? "selected" : ""}`}
            onClick={audio.narrate}
            disabled={!audio.canNarrate}
            aria-label={
              audio.speaking
                ? "Stop read aloud"
                : "Read aloud with device voice"
            }
          >
            {audio.speaking ? <VolumeX size={19} /> : <Volume2 size={19} />}
          </button>
          <button
            className={`icon-button ${audio.sea ? "selected" : ""}`}
            onClick={() => void audio.toggleSea()}
            aria-label={audio.sea ? "Mute sea ambience" : "Enable sea ambience"}
          >
            <Waves size={19} />
          </button>
        </div>
        <div
          className="beat-progress"
          aria-label={`Beat ${beat + 1} of ${c.beats.length}`}
        >
          {c.beats.map((_, i) => (
            <button
              key={i}
              onClick={() => setBeat(i)}
              className={i <= beat ? "done" : ""}
              aria-label={`Go to beat ${i + 1}`}
              aria-current={i === beat ? "step" : undefined}
            />
          ))}
        </div>
        <div className="advance-controls">
          <button
            className="icon-button"
            onClick={back}
            disabled={beat === 0 && !previous}
            aria-label="Previous story beat"
          >
            <ArrowLeft size={20} />
          </button>
          {finished ? (
            <button className="button gold" onClick={() => setView("atlas")}>
              Explore the atlas <ArrowRight size={17} />
            </button>
          ) : (
            <button className="button gold" onClick={advance}>
              {beat < c.beats.length - 1
                ? "Continue"
                : next
                  ? "Next chapter"
                  : "Complete journey"}
              {beat === c.beats.length - 1 && !next ? (
                <Check size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
