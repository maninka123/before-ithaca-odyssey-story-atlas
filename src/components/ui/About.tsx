import { chapters } from "../../data/chapters";
export default function About() {
  return (
    <div className="about-content">
      <p className="large-copy">
        An ancient story. A clearer way to follow it.
      </p>
      <p>
        <em>Before Ithaca</em> follows Odysseus, the king of Ithaca, from the
        Trojan War to his homecoming. Its primary route tells the events in an
        accessible chronology, with a look back at what happened in Ithaca
        during his absence.
      </p>
      <h3>A story told in layers</h3>
      <p>
        The <em>Odyssey</em> itself opens near the end of the voyage. The first
        four books follow Telemachus. Odysseus tells his earlier adventures in
        Books 9–12 as a flashback at the Phaeacian court. Choose Original epic
        order in the chapter list to explore this structure.
      </p>
      <h3>Myth is not a navigational chart</h3>
      <p>
        Troy, Sparta and Ithaca have geographical reference points. The
        Cyclopes, Ogygia, Aeaea and many other stops cannot be given verified
        modern coordinates. The mythic atlas is an artistic route; the reference
        map keeps these uncertain islands separate.
      </p>
      <h3>Sources and artistic interpretation</h3>
      <p>
        Chapter text is a modern retelling, not a quotation from Homer.
        Background stories draw on later mythographers and wider Trojan War
        traditions. The Iliad ends with Hector’s funeral. The wooden horse is
        recalled in the Odyssey and described in other ancient works.
      </p>
      <div className="source-directory">
        {Array.from(new Set(chapters.map((c) => c.sourceUrl))).map((url) => (
          <a key={url} href={url} target="_blank" rel="noreferrer">
            {url.includes("Apollodorus")
              ? "Apollodorus · The Library, Epitome"
              : url.includes("Iliad")
                ? "Homer · Iliad, Book 1"
                : `Homer · Odyssey, Book ${url.match(/Odyssey(\d+)/)?.[1]}`}
            <span>↗</span>
          </a>
        ))}
      </div>
      <p className="library-note">
        Cinematic environments were created for this project using AI image
        generation and are labelled artistic reconstructions. Character
        portraits are newly created artistic interpretations of the mythical
        figures. Atlas coastlines use public-domain Natural Earth data; its
        relief is stylised. These depictions do not establish the historical
        appearance of mythical people or places.
      </p>
      <p className="made-by">
        Created by Pasindu Ranasinghe · A guide to ancient myth.
      </p>
    </div>
  );
}
