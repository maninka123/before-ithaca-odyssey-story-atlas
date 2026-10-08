import { chromium } from "@playwright/test";
import fs from "node:fs";

const folder = ".cache/visual-review";
fs.mkdirSync(folder, { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  args: ["--enable-unsafe-swiftshader"],
});
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 768, height: 1024 },
    { width: 1024, height: 600 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    for (const [name, hash] of [
      ["landing", ""],
      ["cyclops", "#/story/cyclops"],
      ["characters", "#/characters/Polyphemus"],
      ["atlas", "#/atlas"],
    ]) {
      await page.goto(`http://127.0.0.1:5173/${hash}`);
      await page.evaluate(() => document.fonts.ready);
      await page.locator("img").evaluateAll(async (images) => {
        await Promise.all(
          images.map((image) => {
            image.loading = "eager";
            return image.decode().catch(() => {});
          }),
        );
      });
      if (name === "characters")
        await page.locator(".profile-opening").waitFor();
      if (name === "atlas")
        await page
          .getByRole("button", { name: "Use 2D map", exact: true })
          .click();
      await page.screenshot({
        path: `${folder}/${name}-${viewport.width}.png`,
        fullPage: true,
      });
    }
  }
  await page.setViewportSize({ width: 640, height: 450 });
  await page.goto("http://127.0.0.1:5173/#/story/cyclops");
  await page.screenshot({
    path: `${folder}/cyclops-small-landscape.png`,
    fullPage: true,
  });
  console.log(`Visual review captures saved to ${folder}`);
} finally {
  await browser.close();
}
