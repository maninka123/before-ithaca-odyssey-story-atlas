import { chromium } from "@playwright/test";
import fs from "node:fs";

const ids = [
  "apple",
  "helen",
  "armies",
  "war",
  "horse",
  "cicones",
  "cyclops",
  "aeolus",
  "giants",
  "circe",
  "underworld",
  "sirens",
  "strait",
  "helios",
  "calypso",
  "phaeacians",
  "ithaca",
  "disguise",
  "bow",
  "suitors",
  "reunion",
];
const folder = ".cache/chapter-review";
fs.mkdirSync(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const problems = [];
  page.on("pageerror", (e) => problems.push(e.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const id of ids) {
      await page.goto(`http://127.0.0.1:5173/#/story/${id}`);
      await page.evaluate(() => document.fonts.ready);
      if (!["apple", "cicones", "ithaca"].includes(id))
        await page.locator(".chapter-blend.ready").waitFor();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      if (overflow) problems.push(`Horizontal overflow: ${width} ${id}`);
      await page.screenshot({
        path: `${folder}/${id}-${width}.png`,
        fullPage: true,
      });
    }
  }
  console.log(JSON.stringify({ captures: 42, problems, folder }));
} finally {
  await browser.close();
}
