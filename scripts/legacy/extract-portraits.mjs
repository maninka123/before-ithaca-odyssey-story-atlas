import fs from "node:fs";
import vm from "node:vm";
const html = fs.readFileSync("legacy/Before_Ithaca_Standalone.html", "utf8");
const context = vm.createContext({});
const start = html.indexOf("const characters =");
const end = html.indexOf("function commonsImage", start);
vm.runInContext(
  html.slice(start, end) + "; globalThis.profiles = characters;",
  context,
  { timeout: 1000 },
);
const exported = [];
fs.mkdirSync(".cache/legacy-portraits", { recursive: true });
for (const c of context.profiles) {
  const match = c.image?.match(/^data:image\/(\w+);base64,(.+)$/s);
  if (match) {
    const path = `.cache/legacy-portraits/portrait-${c.id.toLowerCase()}.${match[1] === "jpeg" ? "jpg" : match[1]}`;
    fs.writeFileSync(path, Buffer.from(match[2], "base64"));
    exported.push({ name: c.id, path, position: c.pos });
  }
}
fs.writeFileSync(".cache/legacy-portrait-inventory.json", JSON.stringify(exported, null, 2));
console.log(
  `Extracted ${exported.length} archived illustrations; see docs/artwork/PROVENANCE.md for provenance notes.`,
);
