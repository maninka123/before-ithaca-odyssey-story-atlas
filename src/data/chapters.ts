export type Beat = {
  title: string;
  text: string;
  kind: "narration" | "interaction" | "consequence";
  object?: string;
};
export type Chapter = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  part: number;
  location: string;
  intro: string;
  characters: string[];
  beats: Beat[];
  source: string;
  sourceUrl: string;
  image: string;
  previous: string | null;
  next: string | null;
  completion: "read-final-beat";
};
export const parts = [
  "Before the journey",
  "The long journey home",
  "Return to Ithaca",
];
export const partImages = ["temple", "voyage", "temple"];
const odyssey = (book: number) =>
  `https://www.theoi.com/Text/HomerOdyssey${book}.html`;
const raw = [
  {
    id: "apple",
    title: "The apple that started a war",
    shortTitle: "The golden apple",
    part: 1,
    location: "The world of the gods",
    intro: "Before a ship sets sail, a single choice sets the story in motion.",
    characters: ["Paris", "Athena", "Helen"],
    source: "Later mythic background · Apollodorus, Epitome 3.2",
    sourceUrl: "https://www.theoi.com/Text/ApollodorusE.html",
    image: "temple",
    beats: [
      [
        "An unwelcome gift",
        "At a divine wedding, Eris, the goddess of conflict, introduces a golden apple for the fairest goddess. Hera, Athena and Aphrodite each claim it.",
      ],
      [
        "Paris must choose",
        "Paris, a prince of Troy, is asked to judge. He chooses Aphrodite, who promises him Helen, the most beautiful woman.",
      ],
      [
        "The promise has a cost",
        "Helen is already married to Menelaus, the king of Sparta. Paris’s reward threatens a marriage and two kingdoms. Next, the dispute reaches the human world.",
      ],
    ],
  },
  {
    id: "helen",
    title: "Helen leaves Sparta",
    shortTitle: "Helen and Paris",
    part: 1,
    location: "Sparta → Troy",
    intro: "A private relationship becomes a conflict between kingdoms.",
    characters: ["Helen", "Paris", "Menelaus", "Agamemnon"],
    source: "Mythic background · Apollodorus, Epitome 3.3–4; Iliad 3",
    sourceUrl: "https://www.theoi.com/Text/ApollodorusE.html",
    image: "chapters/helen",
    beats: [
      [
        "Two households divided",
        "Paris travels to Sparta. Helen leaves with him for Troy. Ancient versions disagree about her consent and the gods’ role; there is no single uncontested account.",
      ],
      [
        "A king demands her return",
        "Menelaus wants Helen back. His brother Agamemnon calls on other Greek rulers to support him. A promise made by Helen’s former suitors helps bind the alliance.",
      ],
      [
        "Why Odysseus is involved",
        "Odysseus rules the island of Ithaca. He has a wife, Penelope, and a young son, Telemachus. Joining this alliance means leaving them behind.",
      ],
    ],
  },
  {
    id: "armies",
    title: "The Greeks gather for Troy",
    shortTitle: "The Greek armies",
    part: 1,
    location: "Aulis → Troy",
    intro: "Odysseus leaves his family for a war that will last ten years.",
    characters: ["Odysseus", "Penelope", "Telemachus", "Agamemnon", "Achilles"],
    source: "Mythic background · Apollodorus, Epitome 3.6–22",
    sourceUrl: "https://www.theoi.com/Text/ApollodorusE.html",
    image: "chapters/armies",
    beats: [
      [
        "A fleet with many kings",
        "Agamemnon commands a coalition of Greek armies. Menelaus seeks Helen’s return; other kings bring their own soldiers and ambitions.",
      ],
      [
        "Meet Odysseus",
        "Odysseus is a warrior, but his greatest strength is making plans. He knows how to persuade, disguise himself and find a way out of danger.",
      ],
      [
        "Home waits behind him",
        "The fleet crosses to Troy. Penelope and Telemachus stay in Ithaca. What should have been a campaign becomes a decade of war.",
      ],
    ],
  },
  {
    id: "war",
    title: "Ten years beneath Troy’s walls",
    shortTitle: "The Trojan War",
    part: 1,
    location: "Troy",
    intro:
      "The war’s greatest heroes face enemies outside—and divisions within.",
    characters: ["Achilles", "Hector", "Agamemnon", "Odysseus"],
    source: "Homer, Iliad · Books 1, 16, 22–24",
    sourceUrl: "https://www.theoi.com/Text/HomerIliad1.html",
    image: "chapters/war",
    beats: [
      [
        "A divided army",
        "Late in the war, Agamemnon insults Achilles, the Greeks’ strongest fighter. Achilles refuses to fight. Hector, Troy’s leading defender, drives the Greeks back.",
      ],
      [
        "Grief changes the battle",
        "Achilles’s companion Patroclus fights in his armour and is killed by Hector. Achilles returns to battle, kills Hector and eventually returns his body to his grieving father, Priam.",
      ],
      [
        "The war is still unfinished",
        "The Iliad ends with Hector’s funeral. It does not tell the fall of Troy. The Greeks still need another way through the walls—and Odysseus has a plan.",
      ],
    ],
  },
  {
    id: "horse",
    title: "The horse behind the walls",
    shortTitle: "The Trojan Horse",
    part: 1,
    location: "Troy",
    intro: "After years of force, the Greeks win through deception.",
    characters: ["Odysseus", "Helen", "Menelaus"],
    source: "Homer, Odyssey · Book 8.492–520; wider Trojan War tradition",
    sourceUrl: odyssey(8),
    image: "troy",
    beats: [
      [
        "An apparent retreat",
        "The Greeks leave a huge wooden horse and appear to sail away. The Trojans bring it into the city. Greek warriors are hidden inside.",
      ],
      [
        "The city falls",
        "At night, the concealed men emerge. The Greek army returns and Troy is destroyed. Homer recalls the horse in the Odyssey; fuller accounts come from other traditions.",
      ],
      [
        "Victory is not homecoming",
        "Odysseus survives the war and leaves with twelve ships. Across the sea, Ithaca is waiting. But winning a war has not taught his men how to leave danger behind.",
      ],
    ],
  },
  {
    id: "cicones",
    title: "The first wrong turns",
    shortTitle: "Cicones & Lotus-Eaters",
    part: 2,
    location: "Ismarus · then an uncertain shore",
    intro: "The first dangers are violence, delay and the loss of purpose.",
    characters: ["Odysseus"],
    source: "Homer, Odyssey · Book 9.39–104",
    sourceUrl: odyssey(9),
    image: "voyage",
    beats: [
      [
        "A raid turns against them",
        "The Greeks raid the Cicones at Ismarus. They linger too long; reinforcements force them back to their ships with heavy losses.",
      ],
      [
        "A shore that makes them forget",
        "Later, some men eat the Lotus-Eaters’ food and no longer want to go home. Odysseus forces them back aboard.",
      ],
      [
        "Keep Ithaca in mind",
        "The crew sails on. They have already learned that danger can look like a feast or a welcome. On another shore, they enter a cave expecting hospitality.",
      ],
    ],
  },
  {
    id: "cyclops",
    title: "In the Cyclops’s cave",
    shortTitle: "The Cyclops",
    part: 2,
    location: "The land of the Cyclopes · mythic location",
    intro:
      "A clever escape saves Odysseus. One boast changes the rest of his journey.",
    characters: ["Odysseus", "Polyphemus", "Poseidon"],
    source: "Homer, Odyssey · Book 9.105–566",
    sourceUrl: odyssey(9),
    image: "cyclops",
    beats: [
      [
        "A guest becomes a prisoner",
        "Odysseus enters a cave with twelve companions. Its owner, the one-eyed giant Polyphemus, rolls a massive stone across the entrance and kills some of the men.",
      ],
      [
        "The door is the problem",
        "The men cannot move the boulder. Killing the giant would leave them trapped. Odysseus needs Polyphemus alive to open the cave.",
        "door",
      ],
      [
        "A name that hides a man",
        "Odysseus gives the giant strong wine and calls himself Nobody. When the men blind his single eye with a heated stake, his cries name no attacker.",
        "wine",
      ],
      [
        "Hidden beneath the flock",
        "At dawn, Polyphemus moves the boulder and feels his sheep as they leave. The men cling beneath the animals, beyond his hands.",
        "sheep",
      ],
      [
        "The escape becomes a curse",
        "Back at sea, Odysseus shouts his real name. Polyphemus asks his father, Poseidon, to punish him. His pride gives the sea god a target.",
      ],
      [
        "What changes now",
        "The survivors escape, but Poseidon becomes Odysseus’s enemy. Cleverness has saved him; the need to claim credit will make the journey much harder. Next, a gift of wind offers hope.",
      ],
    ],
  },
  {
    id: "aeolus",
    title: "Home is almost in sight",
    shortTitle: "The bag of winds",
    part: 2,
    location: "Aeolia · mythic location",
    intro:
      "A gift brings the fleet close to Ithaca. Suspicion carries it away again.",
    characters: ["Odysseus", "Aeolus"],
    source: "Homer, Odyssey · Book 10.1–79",
    sourceUrl: odyssey(10),
    image: "chapters/aeolus",
    beats: [
      [
        "A sealed gift",
        "Aeolus, keeper of the winds, gives Odysseus a bag holding the contrary winds. A favourable breeze carries the fleet toward Ithaca.",
      ],
      [
        "The crew opens it",
        "While Odysseus sleeps, his men suspect the bag contains treasure. They open it. The escaping winds blow the ships back to Aeolus.",
      ],
      [
        "Help is withdrawn",
        "Aeolus refuses to help again. The crew must sail on without his protection, toward a harbour that looks safe.",
      ],
    ],
  },
  {
    id: "giants",
    title: "Twelve ships become one",
    shortTitle: "The Laestrygonians",
    part: 2,
    location: "Laestrygonian harbour · mythic location",
    intro: "A sheltered harbour becomes a trap.",
    characters: ["Odysseus"],
    source: "Homer, Odyssey · Book 10.80–132",
    sourceUrl: odyssey(10),
    image: "chapters/giants",
    beats: [
      [
        "A narrow entrance",
        "The ships enter a harbour surrounded by cliffs. Odysseus keeps his own ship outside. Scouts discover that the people here are man-eating giants.",
      ],
      [
        "No room to escape",
        "The Laestrygonians hurl rocks and attack the crews. The ships inside the harbour are destroyed.",
      ],
      [
        "Only one ship remains",
        "Odysseus escapes with the vessel he kept outside. The expedition has become a single group of survivors. They reach Circe’s island needing shelter.",
      ],
    ],
  },
  {
    id: "circe",
    title: "The enchantress and the survivors",
    shortTitle: "Circe’s island",
    part: 2,
    location: "Aeaea · mythic location",
    intro: "A dangerous host becomes an essential guide.",
    characters: ["Odysseus", "Circe", "Hermes"],
    source: "Homer, Odyssey · Book 10.133–574",
    sourceUrl: odyssey(10),
    image: "chapters/circe",
    beats: [
      [
        "Men turned into animals",
        "Circe welcomes a scouting party, then transforms the men into pigs. Odysseus goes to confront her.",
      ],
      [
        "An unexpected ally",
        "Hermes gives him a protective herb. Circe’s spell fails, and Odysseus makes her restore his men. They remain on the island for a year.",
      ],
      [
        "A difficult instruction",
        "When they finally ask to leave, Circe tells Odysseus to consult the dead prophet Tiresias. Finding home now requires knowledge from beyond life.",
      ],
    ],
  },
  {
    id: "underworld",
    title: "What the dead can tell him",
    shortTitle: "The Underworld",
    part: 2,
    location: "The edge of Ocean · mythic location",
    intro: "The journey pauses to reckon with what has been lost.",
    characters: ["Odysseus", "Tiresias", "Achilles", "Agamemnon"],
    source: "Homer, Odyssey · Book 11",
    sourceUrl: odyssey(11),
    image: "underworld",
    beats: [
      [
        "Calling the shades",
        "At the edge of Ocean, Odysseus performs rites to summon the dead. This is Homer’s account of a consultation with shades, rather than a mapped descent into an underground realm.",
      ],
      [
        "A warning for the voyage",
        "Tiresias warns him to leave the cattle of the sun god Helios unharmed. If the crew kills them, disaster will follow.",
      ],
      [
        "War has followed them home",
        "Odysseus meets his mother and dead heroes. He learns of grief in Ithaca and Agamemnon’s murder on returning home. He sails back to Circe for instructions about the dangers ahead.",
      ],
    ],
  },
  {
    id: "sirens",
    title: "The song he cannot resist",
    shortTitle: "The Sirens",
    part: 2,
    location: "The Sirens’ shore · mythic location",
    intro: "Odysseus plans for the moment when his own judgement will fail.",
    characters: ["Odysseus", "Circe"],
    source: "Homer, Odyssey · Book 12.39–54, 158–200",
    sourceUrl: odyssey(12),
    image: "chapters/sirens",
    beats: [
      [
        "A promise of knowledge",
        "The Sirens’ song draws sailors toward destruction. Circe has warned Odysseus how to pass them safely.",
      ],
      [
        "Restraint before temptation",
        "The crew stops its ears with wax. Odysseus wants to listen, so he is tied to the mast. He orders the men to keep him bound, however much he begs.",
      ],
      [
        "Beyond the song",
        "The men row on and refuse to release him. Once the song fades, they untie him. Ahead lies a strait with two dangers and no harmless route.",
      ],
    ],
  },
  {
    id: "strait",
    title: "Between two impossible choices",
    shortTitle: "Scylla & Charybdis",
    part: 2,
    location: "A dangerous strait · mythic location",
    intro: "There is no route that promises to save everyone.",
    characters: ["Odysseus", "Circe"],
    source: "Homer, Odyssey · Book 12.73–126, 201–259",
    sourceUrl: odyssey(12),
    image: "chapters/strait",
    beats: [
      [
        "Two threats",
        "Charybdis draws down the sea in a whirlpool. Across the strait, the six-headed monster Scylla waits on the cliffs.",
      ],
      [
        "A terrible passage",
        "Following Circe’s advice, Odysseus passes nearer Scylla. She takes six men. The ship survives, but the loss cannot be undone.",
      ],
      [
        "The warning still matters",
        "The survivors reach the island of Helios. They must remember Tiresias’s instruction: do not harm the sun god’s cattle.",
      ],
    ],
  },
  {
    id: "helios",
    title: "The warning they do not keep",
    shortTitle: "The cattle of Helios",
    part: 2,
    location: "Thrinacia · mythic location",
    intro: "Hunger leads the crew to break the one rule they were given.",
    characters: ["Odysseus", "Zeus"],
    source: "Homer, Odyssey · Book 12.260–450",
    sourceUrl: odyssey(12),
    image: "chapters/helios",
    beats: [
      [
        "Stranded and hungry",
        "Unfavourable winds keep the ship on Thrinacia. Food runs out. While Odysseus is away, his men kill the sacred cattle.",
      ],
      [
        "The final ship is lost",
        "Helios demands punishment. Once they sail again, Zeus strikes the ship with a thunderbolt. The remaining crew dies.",
      ],
      [
        "A survivor alone",
        "Odysseus clings to wreckage and drifts to Ogygia. He has lost every ship and every companion. There, Calypso receives him.",
      ],
    ],
  },
  {
    id: "calypso",
    title: "An island that cannot be home",
    shortTitle: "Calypso & Ogygia",
    part: 2,
    location: "Ogygia · mythic location",
    intro: "Even an offer of immortality cannot replace Ithaca.",
    characters: ["Odysseus", "Calypso", "Athena", "Hermes", "Zeus", "Poseidon"],
    source: "Homer, Odyssey · Books 1 and 5",
    sourceUrl: odyssey(5),
    image: "chapters/calypso",
    beats: [
      [
        "Seven years of waiting",
        "Calypso keeps Odysseus on her island and offers him a life beyond death. He still longs for Penelope and home.",
      ],
      [
        "The gods intervene",
        "Athena argues for his release. Zeus sends Hermes to tell Calypso that Odysseus must leave. She helps him build a raft.",
      ],
      [
        "The sea is still against him",
        "Poseidon sees the raft and sends a storm. Odysseus reaches another shore exhausted and alone, where help finally comes from human strangers.",
      ],
    ],
  },
  {
    id: "phaeacians",
    title: "Strangers who carry him home",
    shortTitle: "The Phaeacians",
    part: 2,
    location: "Scheria · mythic location",
    intro: "After so many hostile shores, kindness makes the difference.",
    characters: ["Odysseus", "Nausicaa", "Alcinous", "Athena"],
    source: "Homer, Odyssey · Books 6–9 and 13",
    sourceUrl: odyssey(6),
    image: "chapters/phaeacians",
    beats: [
      [
        "Nausicaa offers help",
        "Princess Nausicaa finds the shipwrecked stranger. She gives him clothing and shows him how to seek help at the Phaeacian court.",
      ],
      [
        "A story within the story",
        "King Alcinous welcomes him. Odysseus reveals his name and tells his adventures. In Homer’s poem, this is where the voyage becomes a long flashback.",
      ],
      [
        "At last, Ithaca",
        "The Phaeacians carry him home as he sleeps. He reaches Ithaca alive—but arriving on the island is only the beginning of his return.",
      ],
    ],
  },
  {
    id: "ithaca",
    title: "Meanwhile, in Ithaca",
    shortTitle: "The waiting household",
    part: 3,
    location: "Ithaca · events during his absence",
    intro: "To understand his return, first see what has happened at home.",
    characters: ["Penelope", "Telemachus", "Athena", "Menelaus"],
    source: "Homer, Odyssey · Books 1–4; 19.137–156",
    sourceUrl: odyssey(1),
    image: "temple",
    beats: [
      [
        "A household under pressure",
        "While Odysseus is away, suitors occupy his palace, consume its wealth and pressure Penelope to marry. His son Telemachus is threatened too.",
      ],
      [
        "Penelope buys time",
        "She promises to choose after weaving a burial shroud. Each night she undoes her work. The trick delays the decision until it is discovered.",
      ],
      [
        "A son begins to act",
        "Athena encourages Telemachus to seek news of his father. He returns with experience and allies. Father and son will soon meet again.",
      ],
    ],
  },
  {
    id: "disguise",
    title: "The king nobody recognises",
    shortTitle: "Return in disguise",
    part: 3,
    location: "Ithaca",
    intro: "Odysseus must learn who he can trust before revealing himself.",
    characters: ["Odysseus", "Athena", "Telemachus", "Penelope", "Eumaeus"],
    source: "Homer, Odyssey · Books 13–20",
    sourceUrl: odyssey(13),
    image: "chapters/disguise",
    beats: [
      [
        "A disguise and a refuge",
        "Athena disguises Odysseus as a poor old stranger. The loyal swineherd Eumaeus welcomes him without knowing who he is.",
      ],
      [
        "Father and son reunited",
        "Odysseus reveals himself to Telemachus. They plan how to confront the suitors. In the palace, he remains disguised and observes their behaviour.",
      ],
      [
        "A test takes shape",
        "Penelope announces a contest using her absent husband’s bow. The stranger will ask to take a turn.",
      ],
    ],
  },
  {
    id: "bow",
    title: "The bow remembers its owner",
    shortTitle: "The bow contest",
    part: 3,
    location: "The palace hall · Ithaca",
    intro: "A familiar skill breaks the disguise.",
    characters: ["Odysseus", "Penelope", "Telemachus"],
    source: "Homer, Odyssey · Book 21",
    sourceUrl: odyssey(21),
    image: "chapters/bow",
    beats: [
      [
        "The contest",
        "Penelope will marry the man who can string Odysseus’s bow and shoot through a line of twelve axes. The suitors cannot string it.",
      ],
      [
        "The stranger asks to try",
        "Odysseus takes the bow, strings it and sends an arrow through the targets. His strength and skill reveal who has returned.",
      ],
      [
        "The room changes",
        "Telemachus stands beside him. The contest has become a confrontation with the men who have occupied their home.",
      ],
    ],
  },
  {
    id: "suitors",
    title: "A violent reckoning",
    shortTitle: "The defeat of the suitors",
    part: 3,
    location: "The palace hall · Ithaca",
    intro: "Reclaiming the household does not bring immediate peace.",
    characters: ["Odysseus", "Telemachus", "Athena", "Eumaeus"],
    source: "Homer, Odyssey · Book 22",
    sourceUrl: odyssey(22),
    image: "chapters/suitors",
    beats: [
      [
        "Odysseus names himself",
        "Odysseus kills the leading suitor Antinous, then reveals his identity. The suitors try to bargain and then fight.",
      ],
      [
        "The household is reclaimed",
        "With Telemachus, loyal servants and Athena’s help, Odysseus kills the suitors. The poem also describes harsh punishment of servants judged disloyal.",
      ],
      [
        "The cost extends beyond the hall",
        "The violence creates grieving families and a threat of revenge. Penelope still needs proof that the man before her is truly her husband.",
      ],
    ],
  },
  {
    id: "reunion",
    title: "The meaning of coming home",
    shortTitle: "Reunion & peace",
    part: 3,
    location: "Ithaca",
    intro:
      "After twenty years away, recognition rests on something only two people share.",
    characters: ["Odysseus", "Penelope", "Telemachus", "Athena", "Zeus"],
    source: "Homer, Odyssey · Books 23–24",
    sourceUrl: odyssey(23),
    image: "chapters/reunion",
    beats: [
      [
        "Penelope’s final test",
        "Penelope asks for their bed to be moved. Odysseus protests: he built it around a rooted olive tree. The secret convinces her that he is her husband.",
      ],
      [
        "Beyond the reunion",
        "Odysseus also meets his father, Laertes. The suitors’ families seek revenge, threatening a fresh cycle of violence.",
      ],
      [
        "A peace imposed by the gods",
        "Zeus and Athena bring the fighting to an end. Odysseus has reached home, but the Odyssey leaves us with the cost of war, survival and restoration. The journey is complete.",
      ],
    ],
  },
];
export const chapters: Chapter[] = raw.map((c, i) => ({
  ...c,
  number: i + 1,
  previous: raw[i - 1]?.id ?? null,
  next: raw[i + 1]?.id ?? null,
  completion: "read-final-beat",
  beats: c.beats.map((b, j) => ({
    title: b[0],
    text: b[1],
    kind: b[2]
      ? "interaction"
      : j === c.beats.length - 1
        ? "consequence"
        : "narration",
    object: b[2],
  })),
}));
export const epicOrder = [
  "ithaca",
  "calypso",
  "phaeacians",
  "cicones",
  "cyclops",
  "aeolus",
  "giants",
  "circe",
  "underworld",
  "sirens",
  "strait",
  "helios",
  "disguise",
  "bow",
  "suitors",
  "reunion",
];
export const imagePath = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}.webp`;
