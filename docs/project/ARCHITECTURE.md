# Architecture

React 19, TypeScript and Vite replace the single-file primary experience. No backend, credentials or paid narration service is required.

| Area                        | Responsibility                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------- |
| `src/app/App.tsx`           | View composition, hash entry links, document titles and modal routing                 |
| `src/data/chapters.ts`      | 21 chapters, narrative beats, sources and epic-order route                            |
| `src/data/characters.ts`    | 21 profiles and directional relationship labels                                       |
| `src/data/locations.ts`     | Clearly separate mythic positions and geographical reference points                   |
| `src/store/journey.ts`      | Zustand store, versioned local progress, quality and motion preferences               |
| `src/components/story`      | Manual beat progression, reading view, playback and Cyclops objects                   |
| `src/components/map`        | Atlas selection, chapter links, geography notes and 2D fallback                       |
| `src/scenes/WorldMap.tsx`   | Lazy Three.js/R3F map, stylised relief, route, moving ship and bounded orbit controls |
| `src/components/characters` | Search, profiles and direct relationship tree                                         |
| `src/components/ui`         | Native modal dialogs, settings and source explanation                                 |
| `src/hooks/useAudio.ts`     | Device speech synthesis and opt-in generated sea ambience; resource cleanup           |

The atlas and character screen are lazy-loaded; the 3D bundle is loaded only when requested. The primary illustrated story works without WebGL. Image and font files are local, with compressed WebP artwork and licensed WOFF2 typography. Natural Earth coastlines are clipped to the Mediterranean; relief is artistic, not an elevation dataset.

Map labels use a dedicated DOM portal so scene disposal cannot remove React-owned children. R3F manages scene lifetimes. Generated relief geometry is disposed on unmount. Quiet/reduced-motion maps render on demand; orbit controls and camera/ship transitions request frames only while necessary. Rendering caps pixel ratio at 1.5 and uses no real-time shadows.

Native dialogs trap focus, restore the invoking control and support Escape. Essential story text is outside the 3D scene. All map destinations also have ordinary buttons. Touch navigation, reduced motion, manual progression and a reading view retain the complete narrative.

In cinematic view, the app shell is a viewport-height grid with the header's actual height and a flexible story frame. Chapter navigation and playback do not shrink or move with story length. A named, keyboard-scrollable region holds location notes, cave exploration and the narrative; it resets to the beginning on a new beat. A resize observer updates the reading cue without changing the frame height. The landscape covers the same frame across beats. Reading view restores natural document scrolling.

Build with `npm run build`. Relative asset paths and hash entry links work under a GitHub Pages repository subdirectory. The Pages workflow builds `dist`; `scripts/package.mjs` includes the original reading edition as an archive. Nothing is published by local development or build commands.

## Scope of this edition

Implemented: cinematic illustrated landing; complete rewritten narrative; 18 distinct chapter illustrations over persistent part landscapes; interactive Cyclops objects; 3D atlas prototype with real coastlines and qualified mythic placement; character profiles; readable relationship tree; chronology/epic-order choice; device read-aloud; opt-in sea ambience; settings; saved progress; responsive layouts; source attribution; browser testing and replacement screenshots.

The Cyclops chapter is a complete guided **illustrated** experience. Its cave supports object explanations and zoom. Cave controls have a reserved layout row above the reading area, and explanations expand in normal flow to avoid text collisions; it is not a fully modeled, freely navigable 3D cave. Landing and chapter scenes use cinematic artwork and controlled image motion. The atlas is the actual 3D component. Each part opens on its existing background. Later chapters blend an individual illustration into that landscape with feathered CSS masks and image-load-aware crossfades; they do not claim bespoke 3D scenes. Only the current and previous overlays are retained, and a failed overlay falls back to the part landscape. Story text is 19px on desktop and 18px on mobile; interface text has a 14px floor. Chapter portraits share the character explorer's generated avatar sheets. Recorded professional narration, music, commissioned GLB environments, animated characters, full spatial cave exploration, and scene-specific simulations beyond the Cyclops are future work. Browser voices differ between devices.
