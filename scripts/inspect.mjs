import { chromium } from "@playwright/test";
import fs from "node:fs";
fs.mkdirSync("docs/screenshots", { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
});
await page.goto("http://127.0.0.1:5173/");
await page.evaluate(() => document.fonts.ready);
await page.locator("img").evaluateAll(async (images) => {
  await Promise.all(
    images.map((image) => {
      image.loading = "eager";
      return image.decode().catch(() => {});
    }),
  );
});
await page.screenshot({ path: "docs/screenshots/landing-desktop.png" });
await page.getByRole("button", { name: "World atlas", exact: true }).click();
await page.locator("canvas").waitFor({ timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: "docs/screenshots/atlas-desktop.png" });
await page.getByRole("button", { name: "Search chapters" }).click();
await page
  .getByRole("textbox", { name: "Search story chapters" })
  .fill("cyclops");
await page.locator(".chapter-library button").click();
await page.locator(".chapter-blend.ready").waitFor();
await page.screenshot({
  path: "docs/screenshots/cyclops-desktop.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Go to beat 6" }).click();
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({
  path: "docs/screenshots/cyclops-consequence-desktop.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Replay chapter" }).click();
await page.getByRole("button", { name: "Characters", exact: true }).click();
await page.locator(".profile-opening").waitFor();
await page.screenshot({ path: "docs/screenshots/characters-desktop.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:5173/#/story/cyclops");
await page.locator(".chapter-blend.ready").waitFor();
await page.screenshot({
  path: "docs/screenshots/cyclops-mobile.png",
  fullPage: true,
});
await page.evaluate(() => localStorage.clear());
await page.goto("http://127.0.0.1:5173/");
await page.locator("img").evaluateAll(async (images) => {
  await Promise.all(
    images.map((image) => {
      image.loading = "eager";
      return image.decode().catch(() => {});
    }),
  );
});
await page.screenshot({
  path: "docs/screenshots/landing-mobile.png",
  fullPage: true,
});
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto("http://127.0.0.1:5173/#/story/sirens");
await page.locator(".chapter-blend.ready").waitFor();
await page.screenshot({
  path: "docs/screenshots/sirens-desktop.png",
  fullPage: true,
});
await page.goto("http://127.0.0.1:5173/#/story/reunion");
await page.locator(".chapter-blend.ready").waitFor();
await page.screenshot({
  path: "docs/screenshots/reunion-desktop.png",
  fullPage: true,
});
console.log(JSON.stringify({ errors }, null, 2));
await browser.close();
