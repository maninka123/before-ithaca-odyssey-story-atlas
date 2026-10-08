import { test, expect } from "@playwright/test";

test("cave controls and explanations stay clear of all six story beats", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 640, height: 450 },
    { width: 768, height: 1024 },
    { width: 1024, height: 600 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/#/story/cyclops");
    await page.evaluate(() => document.fonts.ready);
    for (let beat = 1; beat <= 6; beat++) {
      await page.getByRole("button", { name: `Go to beat ${beat}` }).click();
      const overlaps = await page.evaluate(() => {
        const intersects = (a: DOMRect, b: DOMRect) =>
          a.left < b.right &&
          a.right > b.left &&
          a.top < b.bottom &&
          a.bottom > b.top;
        const text = [
          ...document.querySelectorAll(
            ".story-narrative > .eyebrow, .story-narrative h1, .chapter-intro, .beat-copy, .story-characters, .source-link, .inspect-count, .story-location, .story-top, .epic-note",
          ),
        ].map((el) => el.getBoundingClientRect());
        return [...document.querySelectorAll(".hotspot, .scene-tools")]
          .filter((el) =>
            text.some((box) => intersects(el.getBoundingClientRect(), box)),
          )
          .map((el) => el.getAttribute("aria-label") || el.className);
      });
      expect(
        overlaps,
        `${viewport.width}×${viewport.height}, beat ${beat}`,
      ).toEqual([]);
    }
    for (const name of ["The stone door", "The wine and stake", "The sheep"]) {
      await page
        .getByRole("button", { name: `Inspect ${name}`, exact: true })
        .click();
      await expect(page.locator(".object-note h3")).toHaveText(name);
      const clear = await page.evaluate(
        () =>
          document.querySelector(".object-note")!.getBoundingClientRect()
            .bottom <=
          document.querySelector(".story-narrative")!.getBoundingClientRect()
            .top,
      );
      expect(clear).toBe(true);
      await page
        .getByRole("button", { name: "Close object explanation" })
        .click();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("epic notes and enlarged story text do not collide with cave controls", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "before-ithaca-v2",
      JSON.stringify({
        version: 2,
        state: { mode: "epic", chapter: 6, beat: 5, started: true },
      }),
    ),
  );
  await page.setViewportSize({ width: 1024, height: 600 });
  await page.goto("/#/story/cyclops");
  await expect(page.locator(".epic-note")).toContainText("FLASHBACK");
  await page.addStyleTag({
    content:
      ".story-narrative p { font-size: 26px !important; } .story-narrative h1 { font-size: 78px !important; }",
  });
  const clear = await page.evaluate(() => {
    const narrative = document
      .querySelector(".story-narrative")!
      .getBoundingClientRect();
    const note = document.querySelector(".epic-note")!.getBoundingClientRect();
    return [...document.querySelectorAll(".hotspot, .scene-tools")].every(
      (el) => {
        const box = el.getBoundingClientRect();
        return box.top >= note.bottom && box.bottom <= narrative.top;
      },
    );
  });
  expect(clear).toBe(true);
});
