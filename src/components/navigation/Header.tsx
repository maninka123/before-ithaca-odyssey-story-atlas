import { Compass, Menu, Search, Settings2, X } from "lucide-react";
import { useState } from "react";
import { useJourney } from "../../store/journey";
export default function Header({
  open,
}: {
  open: (name: "chapters" | "settings" | "sources") => void;
}) {
  const view = useJourney((s) => s.view),
    setView = useJourney((s) => s.setView),
    enter = useJourney((s) => s.enter),
    chapter = useJourney((s) => s.chapter),
    beat = useJourney((s) => s.beat),
    started = useJourney((s) => s.started);
  const [menu, setMenu] = useState(false);
  const navigate = (v: "story" | "atlas" | "characters") => {
    if (v === "story") enter(started ? chapter : 0, started ? beat : 0);
    else setView(v);
    setMenu(false);
  };
  return (
    <header className="header">
      <button
        className="brand"
        onClick={() => {
          setView("home");
          setMenu(false);
        }}
        aria-label="Before Ithaca home"
      >
        <Compass size={34} strokeWidth={1} />
        <span>
          BEFORE ITHACA<small>THE ODYSSEY STORY ATLAS</small>
        </span>
      </button>
      <nav
        className={menu ? "main-nav open" : "main-nav"}
        aria-label="Main navigation"
      >
        <button
          className={view === "home" || view === "story" ? "active" : ""}
          onClick={() => navigate("story")}
        >
          The story
        </button>
        <button
          className={view === "atlas" ? "active" : ""}
          onClick={() => navigate("atlas")}
        >
          World atlas
        </button>
        <button
          className={view === "characters" ? "active" : ""}
          onClick={() => navigate("characters")}
        >
          Characters
        </button>
        <button
          onClick={(e) => {
            e.currentTarget.focus();
            open("sources");
            setMenu(false);
          }}
        >
          About the epic <span className="nav-dot" />
        </button>
      </nav>
      <div className="header-tools">
        <button
          className="icon-button"
          onClick={(e) => {
            e.currentTarget.focus();
            open("chapters");
            setMenu(false);
          }}
          aria-label="Search chapters"
        >
          <Search size={19} />
        </button>
        <span className="tool-divider" />
        <button
          className="icon-button"
          onClick={(e) => {
            e.currentTarget.focus();
            open("settings");
            setMenu(false);
          }}
          aria-label="Experience settings"
        >
          <Settings2 size={19} />
        </button>
        <button
          className="icon-button mobile-menu"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
        >
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
