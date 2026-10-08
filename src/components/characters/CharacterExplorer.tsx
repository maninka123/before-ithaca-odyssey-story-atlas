import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { characters } from "../../data/characters";
import { useJourney } from "../../store/journey";
import Avatar from "./Avatar";
import CharacterProfile from "./CharacterProfile";
export default function CharacterExplorer() {
  const { character, selectCharacter, enter } = useJourney();
  const c = characters.find((c) => c.name === character) ?? characters[0];
  const [q, setQ] = useState(""),
    [group, setGroup] = useState("All");
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
        <CharacterProfile
          name={c.name}
          onSelectCharacter={selectCharacter}
          onEnterChapter={enter}
        />
      </div>
    </section>
  );
}
