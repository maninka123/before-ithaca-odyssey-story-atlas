import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import {
  characters,
  characterSource,
  relationships,
} from "../../data/characters";
import { chapters } from "../../data/chapters";
import { useJourney } from "../../store/journey";
import Avatar from "./Avatar";
export default function CharacterExplorer() {
  const { character, selectCharacter, enter } = useJourney();
  const c = characters.find((c) => c.name === character) ?? characters[0];
  const [q, setQ] = useState(""),
    [group, setGroup] = useState("All");
  const links = relationships
    .filter((r) => r[0] === c.name || r[1] === c.name)
    .map((r) => ({
      name: r[0] === c.name ? r[1] : r[0],
      label: r[0] === c.name ? r[2] : r[3],
    }));
  return (
    <section className="characters-page page-shell">
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE PEOPLE BEHIND THE MYTH</p>
          <h1>Gods. Heroes. A family.</h1>
          <p>
            Every journey is shaped by the people who help, oppose, and wait.
          </p>
        </div>
      </div>
      <div className="character-layout">
        <aside className="character-index">
          <label className="search-field">
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a character…"
              aria-label="Find a character"
            />
          </label>
          <div className="group-filters">
            {["All", "Mortals", "Gods", "Mythic beings"].map((g) => (
              <button
                key={g}
                className={group === g ? "active" : ""}
                onClick={() => setGroup(g)}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="character-names">
            {characters
              .filter(
                (c) =>
                  (group === "All" || c.group === group) &&
                  `${c.name} ${c.role}`.toLowerCase().includes(q.toLowerCase()),
              )
              .map((c) => (
                <button
                  className={c.name === character ? "active" : ""}
                  key={c.name}
                  onClick={() => selectCharacter(c.name)}
                >
                  <Avatar name={c.name} />
                  <span>
                    <strong>{c.name}</strong>
                    <small>{c.role.split(" · ")[0]}</small>
                  </span>
                  <ArrowRight size={15} />
                </button>
              ))}
            {!characters.some(
              (c) =>
                (group === "All" || c.group === group) &&
                `${c.name} ${c.role}`.toLowerCase().includes(q.toLowerCase()),
            ) ? (
              <p className="empty">No character matches this search.</p>
            ) : null}
          </div>
        </aside>
        <article className="character-profile" key={c.name}>
          <div className="profile-opening">
            <Avatar name={c.name} large />
            <div>
              <p className="eyebrow">{c.group.toUpperCase()}</p>
              <h2>{c.name}</h2>
              <p className="character-role">{c.role}</p>
              <p>{c.description}</p>
            </div>
          </div>
          <div className="profile-facts">
            <div>
              <span className="eyebrow">WHAT THEY WANT</span>
              <p>{c.motivation}</p>
            </div>
            <div>
              <span className="eyebrow">HOW THEY CHANGE THE STORY</span>
              <p>{c.action}</p>
            </div>
          </div>
          <div className="relationship-heading">
            <h3>{c.name}’s connections</h3>
            <span>Only direct relationships are shown</span>
          </div>
          <div className="relationship-tree">
            <div className="relationship-root">
              <Avatar name={c.name} />
              <strong>{c.name}</strong>
            </div>
            <div className="relationship-branches">
              {links.map((l) => (
                <button
                  key={`${l.name}-${l.label}`}
                  onClick={() => selectCharacter(l.name)}
                >
                  <span className="relationship-label">{l.label}</span>
                  <Avatar name={l.name} />
                  <strong>{l.name}</strong>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>
          <div className="character-chapters">
            <h3>Follow {c.name} in the story</h3>
            {c.chapters.map((id) => {
              const chapter = chapters.find((c) => c.id === id)!;
              return (
                <button key={id} onClick={() => enter(chapter.number - 1)}>
                  <span>{String(chapter.number).padStart(2, "0")}</span>
                  {chapter.shortTitle}
                  <ArrowRight size={16} />
                </button>
              );
            })}
          </div>
          <a
            className="source-link"
            href={characterSource(c)}
            target="_blank"
            rel="noreferrer"
          >
            Source: {c.source} ↗
          </a>
          <p className="portrait-note">
            Portraits are artistic interpretations created for this atlas.
          </p>
        </article>
      </div>
    </section>
  );
}
