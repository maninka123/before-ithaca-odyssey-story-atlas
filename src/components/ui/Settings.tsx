import { useJourney } from "../../store/journey";
export default function Settings() {
  const { graphics, setGraphics, motion, setMotion } = useJourney();
  return (
    <div className="settings-content">
      <p>Make the journey comfortable for your device and your reading pace.</p>
      <div className="setting">
        <div>
          <h3>Visual quality</h3>
          <p>
            Quiet mode uses the 2D atlas. All story content stays available.
          </p>
        </div>
        <select
          value={graphics}
          onChange={(e) => setGraphics(e.target.value as "rich" | "quiet")}
          aria-label="Visual quality"
        >
          <option value="rich">Cinematic</option>
          <option value="quiet">Quiet · 2D</option>
        </select>
      </div>
      <div className="setting">
        <div>
          <h3>Scene motion</h3>
          <p>
            Gentle camera and image movement. Your reduced-motion preference is
            respected on first visit.
          </p>
        </div>
        <button
          className={`toggle ${motion ? "on" : ""}`}
          onClick={() => setMotion(!motion)}
          role="switch"
          aria-checked={motion}
          aria-label="Scene motion"
        >
          <span />
        </button>
      </div>
      <div className="setting">
        <div>
          <h3>Reading and sound</h3>
          <p>
            Use Reading view in any chapter. Read aloud uses your device’s
            installed voice. Sea ambience starts only when you enable it. The
            story never requires sound.
          </p>
        </div>
      </div>
      <p className="library-note">
        Music and recorded narration are not included in this edition. Journey
        progress stays in this browser; no account is needed.
      </p>
    </div>
  );
}
