import { useEffect, useState } from "react";
import { imagePath, partImages, type Chapter } from "../../data/chapters";

// Keep the part's landscape underneath every chapter. Each scene has feathered
// edges, rather than an opaque rectangle that replaces the surrounding world.
export default function ChapterBackdrop({ chapter }: { chapter: Chapter }) {
  const [layers, setLayers] = useState<string[]>([]);
  const [shown, setShown] = useState<string>();
  const partImage = partImages[chapter.part - 1];
  const opening = chapter.image === partImage;
  useEffect(() => {
    let active = true;
    let frame = 0;
    let nextFrame = 0;
    if (opening) {
      setShown(undefined);
      return;
    }
    const image = new Image();
    image.src = imagePath(chapter.image);
    image
      .decode()
      .then(() => {
        if (!active) return;
        setLayers((images) => [
          ...new Set([...images.slice(-1), chapter.image]),
        ]);
        frame = requestAnimationFrame(() => {
          nextFrame = requestAnimationFrame(() => {
            if (active) setShown(chapter.image);
          });
        });
      })
      .catch(() => {});
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [chapter.image, opening]);
  return (
    <div className="chapter-art" aria-hidden="true">
      <div
        className="part-backdrop"
        style={{ backgroundImage: `url(${imagePath(partImage)})` }}
      />
      {layers.map((name) => (
        <div
          key={name}
          className={`chapter-blend ${!opening && shown === name ? "ready" : ""}`}
          data-scene={name}
        >
          <div
            className="story-backdrop"
            style={{ backgroundImage: `url(${imagePath(name)})` }}
          />
        </div>
      ))}
    </div>
  );
}
