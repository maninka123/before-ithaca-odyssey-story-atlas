# Artwork and data provenance

## New cinematic artwork

The voyage, cave, coastal sanctuary, Troy, underworld and character sheets were generated specifically for this redesign using the built-in image generation tool. Optimised project copies are in `public/images/`. These are artistic interpretations of myth, not photographs, excavated reconstructions or licensed commercial game assets. No external game models or copied commercial screenshots are used. Full production prompts are recorded in `docs/artwork/PROMPTS.json` and `docs/artwork/CHAPTER_PROMPTS.json`.

| File                    | Intended use                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| `voyage.webp`           | Landing and the maritime part background                                       |
| `cyclops.webp`          | Polyphemus's cave and interactive objects                           |
| `temple.webp`           | Background for the first and third parts |
| `troy.webp`             | Trojan Horse chapter                                       |
| `underworld.webp`       | Consultation with Tiresias at the edge of Ocean                     |
| `characters.webp`       | Eight principal character interpretations                           |
| `other-characters.webp` | Additional character interpretations                                |

Fifteen further scenes were generated individually with the built-in `image_gen` tool on 8 October 2026. Source PNGs are in `docs/artwork/source/chapters/`; optimized WebP assets are in `public/images/chapters/`. They join the existing horse, cave and underworld art to give every later chapter a distinct scene. The opening chapters (01, 06 and 17) use only their part background. CSS masks feather each scene into the persistent part landscape, and decoded images crossfade on chapter changes. If a chapter asset fails to load, the part background and story remain usable. Portraits reuse the generated character sheets through a shared circular avatar component.

Generated architecture and costume are evocative rather than period-accurate documentation. The shared sanctuary artwork does not assert that Circe, Calypso and the palace at Ithaca were the same place.

## Historical material

The unmodified original edition, including its embedded artwork and credits, is preserved under `legacy/Before_Ithaca_Standalone.html`. Its footer credits public-domain paintings by Turner, Waterhouse, Jean-Baptiste Marie Pierre, Lastman and Brueghel. The original embeds paintings associated with characters and later overrides some with Wikimedia images. No duplicate extracted portraits are required by the redesigned app. The optional extraction utility writes temporary inspection copies to `.cache/`.

The archive also contains external Wikimedia and video links. Their original provenance is retained for review; preserving this archive is not a new assertion about every external photograph's licence.

## Geography

`public/geography/mediterranean.json` derives from Natural Earth's `ne_110m_land.geojson`, clipped to longitude −10–40 and latitude 26–47. [Natural Earth terms](https://www.naturalearthdata.com/about/terms-of-use/) place its vector and raster data in the public domain. [Source dataset](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson). Terrain heights are procedural stylisation and are not factual elevation data. Mythic route positions are original editorial artwork, not researched proposed coordinates.

## Fonts and interface

Cormorant Garamond and Manrope are supplied locally under the SIL Open Font License; complete notices are in `docs/licenses/`. Interface icons use Lucide (ISC). Dependency licence notices remain in installed packages. No audio recordings are embedded: sea ambience is generated in the browser and read-aloud uses installed device voices.

The production build includes the font notices and runtime dependency notices under `licenses/`; `scripts/package.mjs` assembles these from installed package licence files.

## Screenshots

`docs/screenshots/` contain browser captures of this implementation. `legacy/odyssey_preview.png` retains the previous preview. Screenshots are not generated UI mockups.
