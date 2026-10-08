import fs from "node:fs";
fs.mkdirSync("dist/legacy", { recursive: true });
fs.copyFileSync(
  "legacy/Before_Ithaca_Standalone.html",
  "dist/legacy/Before_Ithaca_Standalone.html",
);
fs.cpSync("docs/licenses", "dist/licenses", { recursive: true });
const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const notices = [
  "Third-party dependency notices. Packages listed here are runtime dependencies; not every package is used in every view.",
];
for (const [folder, metadata] of Object.entries(lock.packages)) {
  if (
    !folder.startsWith("node_modules/") ||
    metadata.dev ||
    !fs.existsSync(folder)
  )
    continue;
  const files = fs
    .readdirSync(folder)
    .filter(
      (name) =>
        /^(licen[sc]e|copying|notice)(\.|$)/i.test(name) &&
        fs.statSync(`${folder}/${name}`).isFile(),
    );
  for (const file of files)
    notices.push(
      `\n\n--- ${folder.replace(/^node_modules\//, "")} ${metadata.version || ""} / ${file} ---\n\n${fs.readFileSync(`${folder}/${file}`, "utf8")}`,
    );
}
fs.writeFileSync("dist/licenses/THIRD_PARTY_NOTICES.txt", notices.join("\n"));
