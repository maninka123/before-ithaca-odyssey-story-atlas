# Verification

Verified locally on Windows and published to GitHub Pages on 8 October 2026.

## Results

| Check | Result |
| --- | --- |
| `npm run build` | Passed: TypeScript, Vite production bundles and legacy archive packaging |
| `npx playwright test` | 90 passed, 2 explicitly skipped across Chrome, Edge, Firefox and WebKit |
| Automated accessibility | No axe WCAG 2 A/AA or WCAG 2.1 AA violations in the landing, story, character and 2D atlas views in all four browser projects |
| `node scripts/production-smoke.mjs` | Passed against the built site under `/before-ithaca-odyssey-story-atlas/` at port 4180, with no page errors or failed HTTP responses |
| `node scripts/inspect.mjs` | Refreshed six desktop/mobile screenshots under `docs/screenshots/`; no page errors or failed HTTP responses |

The browser suite completes all 21 chapters and checks saved progress, damaged saved-state recovery, chapter search, chronology/epic-order navigation, Cyclops object explanations, replay and previous/next beats, reading view, character relationships, chapter links, keyboard navigation, dialog focus restoration, reduced motion, mobile navigation and horizontal overflow at 390 × 844. Quality changes also apply while the atlas is already open.

The follow-up audit adds browser Back/Forward, character deep links, same-chapter beat restoration after reload, malformed links, poisoned saved types/action names, blocked storage, navigation after completing the journey, both epic-order flashback transitions, cave zoom rounding/reset, missing or malformed coastline responses, and automatic 2D fallback without WebGL. Layout checks now cover 320 × 568, 768 × 1024, 1024 × 600 and 1920 × 1080. Text bounds verify that the narrow-phone title is not clipped, and cave controls remain clickable on short desktop screens.

The interactive 3D markers, geographical-reference switching and repeated atlas mounting/unmounting pass in installed Chrome and Edge using software WebGL. The two deliberate skips are these same 3D checks in Firefox and WebKit; both run the complete story, accessibility and 2D-map checks.

The production smoke check verifies local fonts and artwork load during navigation, the 3D-to-2D quality switch, the compatibility redirect and HTTP 200 for the preserved legacy edition. Sea ambience creates no AudioContext before user activation; activation, suspension and cleanup on leaving the story were checked. This checks the audio lifecycle, not perceived sound quality.

## Visual and component review

The landing, Cyclops chapter, atlas and character screenshots were inspected. The mobile landing and Cyclops captures were inspected for readable text, usable controls and image framing. Screenshots are actual captures of the running app, not mockups. The README now displays the replacement preview; the original screenshot remains in `legacy/`.

The follow-up visual review corrected the narrow-phone title, the short-desktop cave label/text overlap and the narrow-map Troy/Ismarus label overlap. The screenshot utilities explicitly load lazy images before full-page captures. Mythic map numbers now match chapter numbers in both map modes and the destination list; reference places use neutral dots. Completed-route highlights cover only adjacent completed destinations, so jumping to a later chapter cannot imply that all earlier chapters were completed. Map camera reset is disabled in the fixed 2D view.

Files were regrouped into `docs/project/`, `docs/artwork/`, `docs/screenshots/`, `docs/verification/` and `legacy/`. All local Markdown links were checked. The original HTML matches its original Git blob, and the compatibility URL remains available through `public/`. Production output now carries font and runtime dependency notices in `licenses/`.

The structured content audit validates all 21 chapters, 66 beats, 21 character profiles, 14 atlas destinations, relationship endpoints, epic-order references and artwork paths. No broken internal content references were found.

## Published verification

[The live story atlas](https://maninka123.github.io/before-ithaca-odyssey-story-atlas/) is served from the production artifact, with Pages configured to use GitHub Actions.

[Workflow run 37760624666](https://github.com/maninka123/before-ithaca-odyssey-story-atlas/actions/runs/37760624666) passed browser checks on Ubuntu/Node 22: **67 passed and 2 scoped WebGL checks skipped** across Chrome, Firefox and WebKit. TypeScript compilation, production packaging, artifact upload and the Pages deployment all succeeded for commit `952e03e354f84df7ccb0d80834c84651c72d1346`.

The production smoke script was then run against the public HTTPS URL. Story progression, reading view, character navigation, interactive 3D markers, real-geography switching, quiet-mode fallback, local fonts/artwork, the compatibility redirect, archived original and licence notices all passed. No page errors or failed HTTP responses were recorded. Audio lifecycle checks passed for activation, suspension and cleanup. Pages reports the site as built.

The React review covered semantic controls, native dialog focus, effect cleanup, local-storage validation, lazy loading, stable scene ownership and resource disposal. The primary story does not require the Three.js bundle. The atlas caps pixel ratio, supports reduced-motion rendering and provides equivalent destination buttons outside the canvas.

## Practical limits

- Playwright WebKit on Windows is an engine check, not a test on a physical Safari/iPhone device. Mobile checks emulate viewport size; real touch hardware and mobile GPU performance remain unverified.
- Automated accessibility checks cannot establish complete accessibility compliance. Manual keyboard and focus paths were checked, but a full screen-reader evaluation remains separate work.
- Device narration quality and audible ambience were not listened to. Speech voices depend on the device; recorded narration and music are not included.
- The atlas is 3D. Chapter environments are cinematic illustrations with image motion; the Cyclops scene adds clickable objects and zoom. They are not fully modeled 3D environments.
- The local host used Node 20.11 for these checks. Node 22 or newer is specified for installation and CI because a transitive camera-controls package requires a newer engine.

## Reproduce

With the development server running, run `npm test` and `node scripts/inspect.mjs`. The suite expects installed Chrome and Edge; install Playwright Firefox and WebKit with `npx playwright install firefox webkit`.

Run `npm run build`, then `npm run preview` in a separate terminal, then `node scripts/production-smoke.mjs`. Set `PREVIEW_URL` if the preview server uses a different address.
