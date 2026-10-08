export type Destination = {
  id: string;
  name: string;
  chapter: string;
  position: [number, number];
  note: string;
  known: boolean;
};
// Mythic positions are explicitly a story arrangement, not proposed coordinates.
export const destinations: Destination[] = [
  {
    id: "troy",
    name: "Troy",
    chapter: "horse",
    position: [7.5, -3.8],
    known: true,
    note: "The archaeological site of Troy lies in northwestern Anatolia. The epic is a mythical account, not a record of the excavated city.",
  },
  {
    id: "ismarus",
    name: "Ismarus",
    chapter: "cicones",
    position: [5.9, -4.1],
    known: true,
    note: "A named place in Thrace. Ancient Ismarus is associated with the region near Maroneia; identification is less certain than Troy.",
  },
  {
    id: "lotus",
    name: "Lotus-Eaters",
    chapter: "cicones",
    position: [3.2, -2.7],
    known: false,
    note: "An illustrative stop. Homer does not identify a modern location for the Lotus-Eaters.",
  },
  {
    id: "cyclops",
    name: "The Cyclops",
    chapter: "cyclops",
    position: [0.1, -1.3],
    known: false,
    note: "The land of the Cyclopes is a mythic destination. Its placement here helps you follow the story, not navigate a real voyage.",
  },
  {
    id: "aeolus",
    name: "Aeolia",
    chapter: "aeolus",
    position: [-3, -2.4],
    known: false,
    note: "The floating island of the keeper of the winds. No modern coordinates are established.",
  },
  {
    id: "giants",
    name: "Laestrygonians",
    chapter: "giants",
    position: [-6, -1.2],
    known: false,
    note: "A mythic harbour of man-eating giants. This is a narrative arrangement.",
  },
  {
    id: "circe",
    name: "Circe’s island",
    chapter: "circe",
    position: [-7.6, 1.5],
    known: false,
    note: "Aeaea, home of Circe. Later traditions associate it with various places; this map makes no identification.",
  },
  {
    id: "underworld",
    name: "The Underworld",
    chapter: "underworld",
    position: [-5.4, 3.7],
    known: false,
    note: "A visit to the shades at the edge of Ocean, beyond ordinary Mediterranean geography.",
  },
  {
    id: "sirens",
    name: "The Sirens",
    chapter: "sirens",
    position: [-2.3, 2.2],
    known: false,
    note: "An artistic placement of the Sirens’ shore, not a verified island.",
  },
  {
    id: "strait",
    name: "Scylla & Charybdis",
    chapter: "strait",
    position: [0.4, 4.1],
    known: false,
    note: "Later tradition often identifies the Strait of Messina. Homer’s text does not establish modern coordinates.",
  },
  {
    id: "helios",
    name: "Helios’s cattle",
    chapter: "helios",
    position: [3.3, 3],
    known: false,
    note: "Thrinacia is sometimes associated with Sicily in later interpretation. The identity remains uncertain.",
  },
  {
    id: "calypso",
    name: "Ogygia",
    chapter: "calypso",
    position: [6.8, 4.1],
    known: false,
    note: "Calypso’s island has many proposed identifications. This position is illustrative only.",
  },
  {
    id: "phaeacians",
    name: "The Phaeacians",
    chapter: "phaeacians",
    position: [7.4, 1.5],
    known: false,
    note: "Scheria is traditionally associated by some with Corfu. This atlas does not treat that identification as established.",
  },
  {
    id: "ithaca",
    name: "Ithaca",
    chapter: "disguise",
    position: [4.5, -0.3],
    known: true,
    note: "The modern Ionian island is the geographical reference for Ithaca. The precise relationship between modern geography and Homer’s descriptions is debated.",
  },
];
export const referencePlaces = [
  { name: "Troy", lon: 26.24, lat: 39.96, chapter: "horse" },
  { name: "Ithaca", lon: 20.72, lat: 38.37, chapter: "disguise" },
  { name: "Sparta", lon: 22.43, lat: 37.08, chapter: "helen" },
  { name: "Aulis", lon: 23.6, lat: 38.44, chapter: "armies" },
  { name: "Ismarus / Thrace", lon: 25.51, lat: 40.9, chapter: "cicones" },
];
