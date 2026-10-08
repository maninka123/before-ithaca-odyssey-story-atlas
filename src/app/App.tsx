import { lazy, Suspense, useEffect, useState } from "react";
import { Compass } from "lucide-react";
import Header from "../components/navigation/Header";
import Landing from "../components/home/Landing";
import StoryPlayer from "../components/story/StoryPlayer";
import Modal from "../components/ui/Modal";
import ChapterLibrary from "../components/navigation/ChapterLibrary";
import Settings from "../components/ui/Settings";
import About from "../components/ui/About";
import { useJourney } from "../store/journey";
import { chapters } from "../data/chapters";
const Atlas = lazy(() => import("../components/map/Atlas"));
const CharacterExplorer = lazy(
  () => import("../components/characters/CharacterExplorer"),
);
export default function App() {
  const view = useJourney((s) => s.view),
    chapter = useJourney((s) => s.chapter);
  const [modal, setModal] = useState<
    "chapters" | "settings" | "sources" | null
  >(null);
  useEffect(() => {
    let readingLocation = false;
    const route = () => {
      const s = useJourney.getState();
      return s.view === "story"
        ? `#/story/${chapters[s.chapter].id}`
        : s.view === "characters"
          ? `#/characters/${encodeURIComponent(s.character)}`
          : s.view === "atlas"
            ? "#/atlas"
            : "";
    };
    const readHash = () => {
      readingLocation = true;
      const { enter, setView, selectCharacter, chapter, beat } =
        useJourney.getState();
      let hash = "";
      try {
        hash = decodeURIComponent(location.hash);
      } catch {
        /* Invalid links return home. */
      }
      const match = hash.match(/^#\/story\/([a-z-]+)$/);
      if (match) {
        const index = chapters.findIndex((c) => c.id === match[1]);
        if (index >= 0) enter(index, index === chapter ? beat : 0);
        else setView("home");
      } else if (hash === "#/atlas") setView("atlas");
      else if (hash === "#/characters") setView("characters");
      else if (hash.startsWith("#/characters/"))
        selectCharacter(hash.slice(13));
      else if (hash !== "#main") setView("home");
      if (hash !== "#main" && hash !== "#discover") {
        history.replaceState(
          null,
          "",
          `${location.pathname}${location.search}${route()}`,
        );
      }
      setModal(null);
      readingLocation = false;
    };
    readHash();
    const unsubscribe = useJourney.subscribe(() => {
      if (readingLocation) return;
      const hash = route();
      if (location.hash !== hash)
        history.pushState(
          null,
          "",
          `${location.pathname}${location.search}${hash}`,
        );
    });
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      unsubscribe();
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, []);
  useEffect(() => {
    document.title =
      view === "story"
        ? `${chapters[chapter].shortTitle} — Before Ithaca`
        : view === "atlas"
          ? "World atlas — Before Ithaca"
          : view === "characters"
            ? "Characters — Before Ithaca"
            : "Before Ithaca — The Odyssey Story Atlas";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view, chapter]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to the story
      </a>
      <div className="app-shell">
        <Header open={setModal} />
        <main id="main" tabIndex={-1}>
          {view === "home" ? (
            <Landing />
          ) : view === "story" ? (
            <StoryPlayer openChapters={() => setModal("chapters")} />
          ) : (
            <Suspense
              fallback={
                <div className="page-loading">
                  Opening the{" "}
                  {view === "atlas" ? "world atlas" : "character explorer"}…
                </div>
              }
            >
              {view === "atlas" ? <Atlas /> : <CharacterExplorer />}
            </Suspense>
          )}
        </main>
        {view !== "story" ? (
          <footer className="footer">
            <div>
              <Compass size={23} strokeWidth={1} />
              <span>
                BEFORE ITHACA
                <small>A journey through myth, war and homecoming.</small>
              </span>
            </div>
            <span className="footer-credit">Created by Pasindu Ranasinghe</span>
            <button onClick={() => setModal("sources")}>
              Sources & the story <span>↗</span>
            </button>
          </footer>
        ) : null}
      </div>
      {modal ? (
        <Modal
          title={
            modal === "chapters"
              ? "Choose your next chapter"
              : modal === "settings"
                ? "Your experience"
                : "About the epic"
          }
          onClose={() => setModal(null)}
          wide={modal === "chapters"}
        >
          {modal === "chapters" ? (
            <ChapterLibrary onClose={() => setModal(null)} />
          ) : modal === "settings" ? (
            <Settings />
          ) : (
            <About />
          )}
        </Modal>
      ) : null}
    </>
  );
}
