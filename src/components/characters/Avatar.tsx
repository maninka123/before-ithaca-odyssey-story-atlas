export default function Avatar({
  name,
  large = false,
  decorative = false,
}: {
  name: string;
  large?: boolean;
  decorative?: boolean;
}) {
  const sprite = [
    "Odysseus",
    "Penelope",
    "Telemachus",
    "Athena",
    "Poseidon",
    "Circe",
    "Calypso",
    "Polyphemus",
  ].indexOf(name);
  const otherSprite = [
    "Zeus",
    "Hermes",
    "Helen",
    "Paris",
    "Achilles",
    "Hector",
    "Agamemnon",
    "Menelaus",
    "Tiresias",
    "Nausicaa",
    "Alcinous",
    "Aeolus",
    "Eumaeus",
  ].indexOf(name);
  const index = sprite >= 0 ? sprite : otherSprite;
  return (
    <span className={`avatar ${large ? "large" : ""}`}>
      <span
        className="portrait-sprite"
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={
          decorative ? undefined : `Artistic interpretation of ${name}`
        }
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/${sprite >= 0 ? "characters" : "other-characters"}.webp)`,
          backgroundSize: sprite >= 0 ? "400% 200%" : "400% 400%",
          backgroundPosition: `${((index % 4) * 100) / 3}% ${(Math.floor(index / 4) * 100) / (sprite >= 0 ? 1 : 3)}%`,
        }}
      />
    </span>
  );
}
