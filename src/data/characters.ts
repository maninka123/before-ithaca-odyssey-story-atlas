type Character = {
  name: string;
  role: string;
  group: string;
  description: string;
  motivation: string;
  action: string;
  chapters: string[];
  source: string;
  book: number;
};
export const characters: Character[] = [
  {
    name: "Odysseus",
    role: "King of Ithaca · the traveller",
    group: "Mortals",
    description:
      "A soldier and strategist who survives the Trojan War. His long journey home tests both his intelligence and his pride.",
    motivation: "To return to Penelope, Telemachus and his home in Ithaca.",
    action:
      "Devises escapes, tells his story and returns to reclaim his household.",
    chapters: ["armies", "horse", "cyclops", "disguise", "reunion"],
    source: "Odyssey, Books 5–24",
    book: 5,
  },
  {
    name: "Penelope",
    role: "Queen of Ithaca · the one who waits",
    group: "Mortals",
    description:
      "Odysseus’s wife protects their household while suitors pressure her to remarry. She uses patience and careful tests to resist them.",
    motivation: "To protect her family and avoid an unwanted marriage.",
    action:
      "Unweaves her shroud and tests Odysseus with the secret of their bed.",
    chapters: ["armies", "ithaca", "bow", "reunion"],
    source: "Odyssey, Books 19, 21, 23",
    book: 23,
  },
  {
    name: "Telemachus",
    role: "Son of Odysseus and Penelope",
    group: "Mortals",
    description:
      "A young man who has grown up without his father. Athena encourages him to seek news and challenge the suitors.",
    motivation: "To find his father and defend his mother and household.",
    action: "Travels for news, then stands beside his father in Ithaca.",
    chapters: ["ithaca", "disguise", "bow", "suitors"],
    source: "Odyssey, Books 1–4, 16",
    book: 1,
  },
  {
    name: "Athena",
    role: "Goddess of wisdom · protector",
    group: "Gods",
    description:
      "Athena supports Odysseus’s return and helps Telemachus become more confident. Her advice often arrives through a disguise.",
    motivation: "To help the family restore its household.",
    action:
      "Argues for Odysseus’s release, prepares his disguise and finally stops revenge.",
    chapters: ["calypso", "ithaca", "disguise", "reunion"],
    source: "Odyssey, Books 1, 13, 24",
    book: 1,
  },
  {
    name: "Poseidon",
    role: "God of the sea · opponent",
    group: "Gods",
    description:
      "The sea god is the father of Polyphemus. When Odysseus blinds the Cyclops, Poseidon becomes a powerful enemy.",
    motivation: "To avenge the injury to his son.",
    action:
      "Makes the voyage difficult and wrecks Odysseus’s raft after Ogygia.",
    chapters: ["cyclops", "calypso"],
    source: "Odyssey, Books 1, 5, 9",
    book: 9,
  },
  {
    name: "Zeus",
    role: "Ruler of the gods",
    group: "Gods",
    description:
      "Zeus oversees disputes among gods and mortals. He permits Odysseus’s release, but also punishes the killing of Helios’s cattle.",
    motivation: "To uphold divine authority and settle conflicts.",
    action:
      "Sends Hermes to Calypso, destroys the final ship and directs peace in Ithaca.",
    chapters: ["helios", "calypso", "reunion"],
    source: "Odyssey, Books 5, 12, 24",
    book: 5,
  },
  {
    name: "Hermes",
    role: "Messenger of the gods",
    group: "Gods",
    description:
      "Hermes carries divine instructions and helps Odysseus face Circe’s magic.",
    motivation: "To carry out the gods’ commands and assist the traveller.",
    action:
      "Gives Odysseus a protective herb and tells Calypso to release him.",
    chapters: ["circe", "calypso"],
    source: "Odyssey, Books 5, 10",
    book: 10,
  },
  {
    name: "Helen",
    role: "Queen of Sparta",
    group: "Mortals",
    description:
      "Helen’s departure for Troy becomes the immediate cause of the war. Ancient accounts disagree about her consent and responsibility.",
    motivation:
      "Different traditions give her different wishes and degrees of freedom.",
    action: "Leaves Sparta for Troy and later receives Telemachus in Sparta.",
    chapters: ["apple", "helen", "horse", "ithaca"],
    source: "Iliad, Book 3; Odyssey, Book 4",
    book: 4,
  },
  {
    name: "Paris",
    role: "Prince of Troy",
    group: "Mortals",
    description:
      "Paris chooses Aphrodite in the judgement of the goddesses. Her promise of Helen sets his city on a dangerous course.",
    motivation: "To obtain the reward Aphrodite offers.",
    action: "Chooses Aphrodite and takes Helen to Troy.",
    chapters: ["apple", "helen"],
    source: "Apollodorus, Epitome 3.2–4",
    book: 3,
  },
  {
    name: "Achilles",
    role: "The Greeks’ greatest fighter",
    group: "Mortals",
    description:
      "The central hero of the Iliad. His quarrel with Agamemnon and grief for Patroclus shape the final stage of the war.",
    motivation: "Honour, then vengeance for his companion.",
    action:
      "Withdraws from battle, returns after Patroclus dies and kills Hector.",
    chapters: ["armies", "war", "underworld"],
    source: "Iliad, Books 1, 16, 22–24",
    book: 11,
  },
  {
    name: "Hector",
    role: "Prince and defender of Troy",
    group: "Mortals",
    description:
      "Troy’s strongest defender fights to protect his city and family. His death brings grief to both the palace and the wider city.",
    motivation: "To defend Troy and its people.",
    action: "Kills Patroclus and is then killed by Achilles.",
    chapters: ["war"],
    source: "Iliad, Books 6, 16, 22",
    book: 11,
  },
  {
    name: "Agamemnon",
    role: "Commander of the Greek coalition",
    group: "Mortals",
    description:
      "Menelaus’s brother leads the Greek armies. His conflict with Achilles weakens them; his later murder makes homecoming seem dangerous.",
    motivation: "Victory and authority over the coalition.",
    action:
      "Leads the war; later appears among the dead in Odysseus’s account.",
    chapters: ["helen", "armies", "war", "underworld"],
    source: "Iliad, Book 1; Odyssey, Book 11",
    book: 11,
  },
  {
    name: "Menelaus",
    role: "King of Sparta · Helen’s husband",
    group: "Mortals",
    description:
      "His demand for Helen’s return brings the Greek coalition to Troy. After his own return, he helps Telemachus learn about his father.",
    motivation: "To recover Helen and restore his household.",
    action: "Fights at Troy and gives Telemachus news of Odysseus.",
    chapters: ["helen", "horse", "ithaca"],
    source: "Iliad, Book 3; Odyssey, Book 4",
    book: 4,
  },
  {
    name: "Circe",
    role: "Enchantress of Aeaea",
    group: "Mythic beings",
    description:
      "Circe first harms the crew with magic, then restores them and becomes their guide. Her role changes over the course of the visit.",
    motivation:
      "Her dealings with Odysseus change from domination to hospitality.",
    action: "Transforms the men and later explains the dangers ahead.",
    chapters: ["circe", "sirens", "strait"],
    source: "Odyssey, Books 10–12",
    book: 10,
  },
  {
    name: "Calypso",
    role: "Nymph of Ogygia",
    group: "Mythic beings",
    description:
      "Calypso keeps Odysseus on her island for years. She wants him to remain, but must release him when the gods command it.",
    motivation: "To keep Odysseus with her.",
    action: "Offers immortality and eventually helps him build a raft.",
    chapters: ["calypso"],
    source: "Odyssey, Book 5",
    book: 5,
  },
  {
    name: "Polyphemus",
    role: "The Cyclops · son of Poseidon",
    group: "Mythic beings",
    description:
      "A one-eyed giant who imprisons Odysseus’s men in his cave. His great strength makes a direct fight impossible.",
    motivation: "To control the strangers in his cave; later, revenge.",
    action: "Blocks the entrance and calls on Poseidon after the escape.",
    chapters: ["cyclops"],
    source: "Odyssey, Book 9",
    book: 9,
  },
  {
    name: "Tiresias",
    role: "The dead prophet",
    group: "Mortals",
    description:
      "Odysseus consults Tiresias among the shades. His warning gives the crew a clear rule for the journey ahead.",
    motivation: "To tell Odysseus what lies ahead.",
    action: "Warns against killing the cattle of Helios.",
    chapters: ["underworld"],
    source: "Odyssey, Book 11",
    book: 11,
  },
  {
    name: "Nausicaa",
    role: "Princess of the Phaeacians",
    group: "Mortals",
    description:
      "Nausicaa finds Odysseus after his shipwreck and helps him reach her parents’ court.",
    motivation:
      "To help a stranger while navigating the expectations of her community.",
    action: "Provides clothes and practical advice.",
    chapters: ["phaeacians"],
    source: "Odyssey, Book 6",
    book: 6,
  },
  {
    name: "Alcinous",
    role: "King of the Phaeacians",
    group: "Mortals",
    description:
      "Alcinous receives the stranger, listens to his story and gives him the passage that finally reaches Ithaca.",
    motivation: "To fulfil the duties of a generous host.",
    action: "Provides the ship that takes Odysseus home.",
    chapters: ["phaeacians"],
    source: "Odyssey, Books 7–13",
    book: 7,
  },
  {
    name: "Aeolus",
    role: "Keeper of the winds",
    group: "Mythic beings",
    description:
      "Aeolus gives Odysseus control over hostile winds, but refuses a second gift after the fleet is blown back.",
    motivation:
      "First to help his guest; later to avoid a man he believes the gods oppose.",
    action: "Seals the winds inside a bag.",
    chapters: ["aeolus"],
    source: "Odyssey, Book 10",
    book: 10,
  },
  {
    name: "Eumaeus",
    role: "The loyal swineherd",
    group: "Mortals",
    description:
      "Eumaeus welcomes the disguised Odysseus with kindness. His hospitality is proof that loyalty has survived the king’s absence.",
    motivation: "Loyalty to the household and care for his guests.",
    action: "Shelters Odysseus and later fights beside him.",
    chapters: ["disguise", "suitors"],
    source: "Odyssey, Books 14, 22",
    book: 14,
  },
];
export const relationships = [
  ["Odysseus", "Penelope", "Married to", "Married to"],
  ["Odysseus", "Telemachus", "Father of", "Son of"],
  ["Penelope", "Telemachus", "Mother of", "Son of"],
  ["Odysseus", "Athena", "Protected by", "Protects"],
  ["Odysseus", "Poseidon", "Opposed by", "Opposes"],
  ["Poseidon", "Polyphemus", "Father of", "Son of"],
  ["Odysseus", "Polyphemus", "Blinds", "Blinded by"],
  ["Odysseus", "Circe", "Guided by", "Guides"],
  ["Odysseus", "Calypso", "Detained by", "Detains"],
  ["Odysseus", "Hermes", "Helped by", "Helps"],
  ["Odysseus", "Nausicaa", "Rescued by", "Rescues"],
  ["Odysseus", "Alcinous", "Carried home by", "Carries home"],
  ["Odysseus", "Tiresias", "Warned by", "Warns"],
  ["Odysseus", "Aeolus", "Given winds by", "Gives winds to"],
  ["Odysseus", "Eumaeus", "Sheltered by", "Shelters"],
  ["Athena", "Telemachus", "Mentors", "Mentored by"],
  ["Menelaus", "Helen", "Married to", "Married to"],
  ["Menelaus", "Agamemnon", "Brother of", "Brother of"],
  ["Paris", "Helen", "Takes to Troy", "Taken to Troy by"],
  ["Achilles", "Hector", "Kills", "Killed by"],
  ["Achilles", "Agamemnon", "Quarrels with", "Quarrels with"],
  ["Zeus", "Hermes", "Sends as messenger", "Messenger for"],
  ["Zeus", "Athena", "Father of", "Daughter of"],
];
export const characterSource = (c: Character) =>
  c.name === "Paris"
    ? "https://www.theoi.com/Text/ApollodorusE.html"
    : ["Achilles", "Hector"].includes(c.name)
      ? "https://www.theoi.com/Text/HomerIliad22.html"
      : `https://www.theoi.com/Text/HomerOdyssey${c.book}.html`;
