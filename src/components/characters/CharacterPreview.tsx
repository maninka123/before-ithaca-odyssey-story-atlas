import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Modal from "../ui/Modal";
import CharacterProfile from "./CharacterProfile";

export default function CharacterPreview({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(name);
  const content = useRef<HTMLDivElement>(null);
  const previous = useRef(name);
  useEffect(() => {
    if (previous.current === selected) return;
    previous.current = selected;
    content.current
      ?.closest("dialog")
      ?.scrollTo({ top: 0, behavior: "instant" });
    content.current?.querySelector("h2")?.focus({ preventScroll: true });
  }, [selected]);
  return (
    <Modal title="Character details" onClose={onClose} wide>
      <div className="character-preview" ref={content}>
        <CharacterProfile name={selected} onSelectCharacter={setSelected} />
        <div className="character-preview-actions">
          <button className="button gold" onClick={onClose}>
            <ArrowLeft size={18} /> Return to the story
          </button>
        </div>
      </div>
    </Modal>
  );
}
