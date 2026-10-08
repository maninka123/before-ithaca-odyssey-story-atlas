import { useState } from "react";
import { ArrowRight, Check, Search } from "lucide-react";
import { chapters, epicOrder, parts } from "../../data/chapters";
import { useJourney } from "../../store/journey";
export default function ChapterLibrary({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const { enter, completed, chapter, mode, setMode } = useJourney();
  const ordered =
    mode === "epic"
      ? epicOrder.map((id) => chapters.find((c) => c.id === id)!)
      : chapters;
  return (
    <>
      <label className="search-field">
        <Search size={18} />
        <input
          autoFocus
          placeholder="Search a chapter, place or character…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search story chapters"
        />
      </label>
      <div className="library-options">
        <div className="segmented">
          <button
            className={mode === "chronological" ? "active" : ""}
            onClick={() => setMode("chronological")}
          >
            Story chronology
          </button>
          <button
            className={mode === "epic" ? "active" : ""}
            onClick={() => setMode("epic")}
          >
            Original epic order
          </button>
        </div>
        <span>{completed.length} / 21 completed</span>
      </div>
      {mode === "epic" ? (
        <p className="library-note">
          Homer begins with the household in Ithaca, then follows Odysseus from
          Calypso to the Phaeacians. His earlier adventures are told there as
          flashbacks. This teaching route groups episodes by that structure; it
          does not reproduce every shift of the poem. The Trojan War prelude is
          available in Story chronology.
        </p>
      ) : (
        <p className="library-note">
          Begin with the background to the war, then follow the voyage home.
          “Meanwhile, in Ithaca” explains events happening during his absence.
        </p>
      )}
      <div className="chapter-library">
        {ordered
          .filter((c) =>
            `${c.title} ${c.location} ${c.characters.join(" ")}`
              .toLowerCase()
              .includes(q.toLowerCase()),
          )
          .map((c, i) => (
            <div key={c.id}>
              {!q &&
              mode === "chronological" &&
              (i === 0 || ordered[i - 1].part !== c.part) ? (
                <h3>
                  PART {["I", "II", "III"][c.part - 1]} · {parts[c.part - 1]}
                </h3>
              ) : null}
              <button
                onClick={() => {
                  enter(c.number - 1);
                  onClose();
                }}
                className={chapter === c.number - 1 ? "active" : ""}
              >
                <span className="chapter-number">
                  {completed.includes(c.id) ? (
                    <Check size={16} />
                  ) : (
                    String(c.number).padStart(2, "0")
                  )}
                </span>
                <span>
                  <strong>{c.shortTitle}</strong>
                  <small>{c.location}</small>
                </span>
                <ArrowRight size={17} />
              </button>
            </div>
          ))}
        {!ordered.some((c) =>
          `${c.title} ${c.location} ${c.characters.join(" ")}`
            .toLowerCase()
            .includes(q.toLowerCase()),
        ) ? (
          <p className="empty">
            No chapters match. Try a different name or place.
          </p>
        ) : null}
      </div>
    </>
  );
}
