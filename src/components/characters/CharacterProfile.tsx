import { ArrowRight } from "lucide-react";
import {
  characters,
  characterSource,
  relationships,
} from "../../data/characters";
import { chapters } from "../../data/chapters";
import Avatar from "./Avatar";

export default function CharacterProfile({
  name,
  onSelectCharacter,
  onEnterChapter,
}: {
  name: string;
  onSelectCharacter: (name: string) => void;
  onEnterChapter?: (chapter: number) => void;
}) {
  const c = characters.find((c) => c.name === name) ?? characters[0];
  const links = relationships
    .filter((r) => r[0] === c.name || r[1] === c.name)
    .map((r) => ({
      name: r[0] === c.name ? r[1] : r[0],
      label: r[0] === c.name ? r[2] : r[3],
    }));
  return (
    <article className="character-profile" key={c.name}>
      <div className="profile-opening">
        <Avatar name={c.name} large />
        <div>
          <p className="eyebrow">{c.group.toUpperCase()}</p>
          <h2 tabIndex={-1}>{c.name}</h2>
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
              onClick={() => onSelectCharacter(l.name)}
            >
              <span className="relationship-label">{l.label}</span>
              <Avatar name={l.name} />
              <strong>{l.name}</strong>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </div>
      {onEnterChapter ? (
        <div className="character-chapters">
          <h3>Follow {c.name} in the story</h3>
          {c.chapters.map((id) => {
            const chapter = chapters.find((c) => c.id === id)!;
            return (
              <button
                key={id}
                onClick={() => onEnterChapter(chapter.number - 1)}
              >
                <span>{String(chapter.number).padStart(2, "0")}</span>
                {chapter.shortTitle}
                <ArrowRight size={16} />
              </button>
            );
          })}
        </div>
      ) : null}
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
  );
}
