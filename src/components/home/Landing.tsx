import { ArrowDown, ArrowRight, Compass, Play, RotateCcw } from "lucide-react";
import { chapters, imagePath, parts } from "../../data/chapters";
import { useJourney } from "../../store/journey";
export default function Landing() {
  const { enter, setView, started, chapter, beat, completed, motion, restart } =
    useJourney();
  return (
    <>
      <section
        className={`landing ${motion ? "moving" : ""}`}
        aria-labelledby="hero-title"
      >
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${imagePath("voyage")})` }}
          role="img"
          aria-label="An ancient Greek ship crossing the Mediterranean toward mountainous islands at dawn"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="fine-line" /> ONE MAN. A WORLD OF MYTH. THE LONG
            WAY HOME.
          </p>
          <h1 id="hero-title">
            BEFORE
            <br />
            <span>ITHACA</span>
          </h1>
          <p className="hero-subtitle">
            A journey through myth,
            <br />
            war and homecoming.
          </p>
          <p className="hero-description">
            Follow Odysseus from the walls of Troy to the shores
            <br className="desktop-break" /> of home. Discover the choices that
            changed everything.
          </p>
          <div className="hero-actions">
            <button
              className="button gold"
              onClick={() => enter(started ? chapter : 0, started ? beat : 0)}
            >
              <Play size={15} fill="currentColor" />
              {started ? "CONTINUE THE JOURNEY" : "BEGIN THE JOURNEY"}
              <ArrowRight size={18} />
            </button>
            <button className="text-button" onClick={() => setView("atlas")}>
              <Compass size={18} strokeWidth={1.5} />
              Explore the world
            </button>
          </div>
          <p className="journey-note">
            {started
              ? `Your place is saved · Chapter ${chapter + 1} of 21`
              : "21 chapters · Your progress is saved · No prior knowledge needed"}
          </p>
        </div>
        <div className="scene-caption">
          <span className="caption-rule" />
          <span>
            THE WINE-DARK SEA
            <small>Every homecoming begins with a departure.</small>
          </span>
        </div>
        <div className="hero-edge">
          AN INTERACTIVE JOURNEY INTO HOMER’S WORLD
        </div>
        <div className="hero-bottom">
          <a href="#discover" className="scroll-hint">
            <ArrowDown size={17} />
            <span>DISCOVER THE JOURNEY</span>
          </a>
          <div className="hero-bottom-note">
            <span className="status-dot" />A story 2,700 years in the making
          </div>
          <button
            className="text-button small"
            onClick={() => setView("characters")}
          >
            Meet the characters <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="journey-overview" id="discover">
        <div className="overview-heading">
          <div>
            <p className="eyebrow">THE JOURNEY, AT A GLANCE</p>
            <h2>One story. Three worlds.</h2>
          </div>
          <p>
            A war that changes everything. A sea that will not let go.
            <br />
            And a home that must be won back.
          </p>
        </div>
        <div className="part-strip">
          {parts.map((part, i) => (
            <button key={part} onClick={() => enter([0, 5, 16][i])}>
              <span className="roman">{["I", "II", "III"][i]}</span>
              <span>
                <small>
                  PART {["ONE", "TWO", "THREE"][i]} · CHAPTERS{" "}
                  {["01–05", "06–16", "17–21"][i]}
                </small>
                <strong>{part}</strong>
              </span>
              <ArrowRight size={20} />
            </button>
          ))}
        </div>
        <div className="featured-heading">
          <h3>Step into the story</h3>
          <span>Explore a chapter at your own pace</span>
        </div>
        <div className="feature-strip">
          {[
            {
              index: 4,
              image: "troy",
              tag: "STRATEGY & WAR",
              description: "How a wooden horse brought down a city.",
            },
            {
              index: 6,
              image: "cyclops",
              tag: "CUNNING & CONSEQUENCE",
              description: "An impossible escape. A dangerous boast.",
            },
            {
              index: 20,
              image: "temple",
              tag: "RECOGNITION & RETURN",
              description: "What does it mean to come home?",
            },
          ].map(({ index, image, tag, description }) => (
            <button
              className="feature"
              key={index}
              onClick={() => enter(index)}
            >
              <img src={imagePath(image)} alt="" loading="lazy" />
              <div className="feature-shade" />
              <span className="feature-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="feature-copy">
                <small>{tag}</small>
                <h3>{chapters[index].shortTitle}</h3>
                <p>{description}</p>
              </div>
              <span className="feature-arrow">
                <ArrowRight size={21} />
              </span>
            </button>
          ))}
        </div>
        {started ? (
          <div className="resume-line">
            <p>{completed.length} of 21 chapters completed</p>
            <button className="text-button" onClick={restart}>
              <RotateCcw size={15} />
              Restart the journey
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}
