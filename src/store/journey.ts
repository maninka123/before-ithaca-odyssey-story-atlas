import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { chapters } from "../data/chapters";
import { characters } from "../data/characters";
type View = "home" | "story" | "atlas" | "characters";
type Journey = {
  view: View;
  chapter: number;
  beat: number;
  completed: string[];
  mode: "chronological" | "epic";
  graphics: "rich" | "quiet";
  motion: boolean;
  started: boolean;
  character: string;
  setView: (view: View) => void;
  enter: (chapter: number, beat?: number) => void;
  setBeat: (beat: number) => void;
  complete: () => void;
  restart: () => void;
  setMode: (mode: Journey["mode"]) => void;
  setGraphics: (graphics: Journey["graphics"]) => void;
  setMotion: (motion: boolean) => void;
  selectCharacter: (character: string) => void;
};
const safeStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Keep current-session progress. */
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* Keep current-session progress. */
    }
  },
};
const validChapter = (value: unknown) =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= 0 &&
  value < chapters.length
    ? value
    : 0;
const validBeat = (value: unknown, chapter: number) =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= 0 &&
  value < chapters[chapter].beats.length
    ? value
    : 0;
export const useJourney = create<Journey>()(
  persist(
    (set, get) => ({
      view: "home",
      chapter: 0,
      beat: 0,
      completed: [],
      mode: "chronological",
      graphics: "rich",
      motion: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      started: false,
      character: "Odysseus",
      setView: (view) => set({ view }),
      enter: (value, beat = 0) => {
        const chapter = validChapter(value);
        set({
          chapter,
          beat: validBeat(beat, chapter),
          view: "story",
          started: true,
        });
      },
      setBeat: (beat) => set({ beat: validBeat(beat, get().chapter) }),
      complete: () =>
        set({
          completed: [
            ...new Set([...get().completed, chapters[get().chapter].id]),
          ],
        }),
      restart: () =>
        set({
          chapter: 0,
          beat: 0,
          completed: [],
          started: true,
          view: "story",
          mode: "chronological",
        }),
      setMode: (mode) => set({ mode }),
      setGraphics: (graphics) => set({ graphics }),
      setMotion: (motion) => set({ motion }),
      selectCharacter: (character) =>
        set({
          character: characters.some((c) => c.name === character)
            ? character
            : "Odysseus",
          view: "characters",
        }),
    }),
    {
      name: "before-ithaca-v2",
      version: 2,
      storage: createJSONStorage(() => safeStorage),
      partialize: ({
        chapter,
        beat,
        completed,
        mode,
        graphics,
        motion,
        started,
        character,
      }) => ({
        chapter,
        beat,
        completed,
        mode,
        graphics,
        motion,
        started,
        character,
      }),
      merge: (persisted, current) => {
        const p =
          persisted && typeof persisted === "object"
            ? (persisted as Partial<Journey>)
            : {};
        const chapter = validChapter(p.chapter);
        return {
          ...current,
          view: "home",
          chapter,
          beat: validBeat(p.beat, chapter),
          mode: p.mode === "epic" ? "epic" : "chronological",
          graphics: p.graphics === "quiet" ? "quiet" : "rich",
          motion: typeof p.motion === "boolean" ? p.motion : current.motion,
          started: p.started === true,
          character: characters.some((c) => c.name === p.character)
            ? p.character!
            : "Odysseus",
          completed: Array.isArray(p.completed)
            ? [
                ...new Set(
                  p.completed.filter((id) => chapters.some((c) => c.id === id)),
                ),
              ]
            : [],
        };
      },
    },
  ),
);
