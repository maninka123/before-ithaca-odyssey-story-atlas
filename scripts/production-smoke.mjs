import { chromium, expect } from "@playwright/test";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  await page.addInitScript(() => {
    window.smokeAudioContexts = [];
    const NativeAudioContext = window.AudioContext;
    window.AudioContext = new Proxy(NativeAudioContext, {
      construct(target, args) {
        const context = new target(...args);
        window.smokeAudioContexts.push(context);
        return context;
      },
    });
  });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("button", { name: "BEGIN THE JOURNEY" }).click();
  expect(await page.evaluate(() => window.smokeAudioContexts.length)).toBe(0);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Enable sea ambience" }).click();
  await expect(
    page.getByRole("button", { name: "Mute sea ambience" }),
  ).toBeVisible();
  expect(await page.evaluate(() => window.smokeAudioContexts[0].state)).toBe(
    "running",
  );
  await page.getByRole("button", { name: "Mute sea ambience" }).click();
  expect(await page.evaluate(() => window.smokeAudioContexts[0].state)).toBe(
    "suspended",
  );
  await page.getByRole("button", { name: "Reading view", exact: true }).click();
  await expect(page.locator(".story-player")).toHaveClass(/reading/);
  await page.getByRole("button", { name: "Characters", exact: true }).click();
  await expect(page.locator(".profile-opening h2")).toHaveText("Odysseus");
  expect(await page.evaluate(() => window.smokeAudioContexts[0].state)).toBe(
    "closed",
  );
  await page.getByRole("button", { name: "World atlas", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Select The Cyclops", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Select The Cyclops", exact: true })
    .click();
  await expect(page.locator(".destination-copy h2")).toHaveText("The Cyclops");
  await page
    .getByRole("button", { name: "Real geography", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Select Troy", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Experience settings" }).click();
  await page
    .getByRole("combobox", { name: "Visual quality" })
    .selectOption("quiet");
  await page.keyboard.press("Escape");
  await expect(page.locator(".flat-map")).toBeVisible();
  await page.goto(new URL("Before_Ithaca_Standalone.html", base).href);
  await expect(
    page.getByRole("button", { name: "CONTINUE THE JOURNEY" }),
  ).toBeVisible();
  const archive = await page.request.get(
    new URL("legacy/Before_Ithaca_Standalone.html", base).href,
  );
  expect(archive.status()).toBe(200);
  const licenses = await page.request.get(
    new URL("licenses/THIRD_PARTY_NOTICES.txt", base).href,
  );
  expect(licenses.status()).toBe(200);
  for (const [id, overlay] of [
    ["apple", false],
    ["cicones", false],
    ["ithaca", false],
    ["helen", true],
    ["armies", true],
    ["war", true],
    ["horse", true],
    ["cyclops", true],
    ["aeolus", true],
    ["giants", true],
    ["circe", true],
    ["underworld", true],
    ["sirens", true],
    ["strait", true],
    ["helios", true],
    ["calypso", true],
    ["phaeacians", true],
    ["disguise", true],
    ["bow", true],
    ["suitors", true],
    ["reunion", true],
  ]) {
    await page.goto(new URL(`#/story/${id}`, base).href);
    await expect(page.locator(".part-backdrop")).toBeVisible();
    if (overlay)
      await expect(page.locator(".chapter-blend.ready")).toBeVisible();
    else await expect(page.locator(".chapter-blend.ready")).toHaveCount(0);
    expect(
      await page.locator(".story-characters .avatar").count(),
    ).toBeGreaterThan(0);
    expect(
      await page
        .locator(".beat-copy p")
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(18);
  }
  expect(errors).toEqual([]);
  console.log(
    JSON.stringify(
      {
        productionSmoke: "passed",
        errors,
        audioLifecycle: "opt-in, running, suspended, closed",
        archive: archive.status(),
        artwork: "21 chapters checked; 18 overlays and three part openings",
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
