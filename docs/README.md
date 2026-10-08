# Project documentation

| Folder | Contents |
| --- | --- |
| `project/` | Original experience audit, narrative structure and implementation architecture |
| `artwork/` | Generated artwork prompts, provenance and original PNG source files |
| `licenses/` | Font licence notices |
| `screenshots/` | Current desktop and mobile app captures used by the README |
| `verification/` | Browser, accessibility, production and deployment results |

Application code is in `src/`, served assets in `public/`, checks in `tests/`, and development utilities in `scripts/`. The original standalone edition and old screenshot are preserved in `legacy/`. Generated build output is in `dist/`; temporary verification, portrait extracts and TypeScript data are in `.cache/`. Both are ignored by Git.

The compatibility URL `Before_Ithaca_Standalone.html` is provided by `public/`, so no duplicate entry file is needed in the repository root.
