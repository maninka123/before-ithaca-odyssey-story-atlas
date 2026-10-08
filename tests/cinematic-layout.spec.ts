import { test, expect } from "@playwright/test";
import { chapters } from "../src/data/chapters";

test("cinematic frame and navigation stay fixed through the entire journey", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 1920, height: 910 },
    { width: 1024, height: 600 },
    { width: 320, height: 568 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/#/story/apple");
    await page.evaluate(() => document.fonts.ready);
    const measure = () =>
      page.evaluate(() => {
        const box = (selector: string) => {
          const rect = document
            .querySelector(selector)!
            .getBoundingClientRect();
          return {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          };
        };
        return {
          frame: box(".story-player"),
          landscape: box(".chapter-art"),
          controls: box(".story-controls"),
          forward: box(".advance-controls .button"),
          pageWidth: document.documentElement.scrollWidth,
          pageHeight: document.documentElement.scrollHeight,
          pageScroll: window.scrollY,
          storyScroll: document.querySelector(".story-scroll")!.scrollTop,
        };
      });
    const baseline = await measure();
    expect(baseline.frame.y + baseline.frame.height).toBe(viewport.height);
    for (const chapter of chapters) {
      await expect(page).toHaveURL(new RegExp(`/story/${chapter.id}$`));
      const titleY = await page
        .locator(".story-narrative h1")
        .evaluate((el) => el.getBoundingClientRect().y);
      for (let beat = 0; beat < chapter.beats.length; beat++) {
        await expect(page.locator(".beat-copy h2")).toHaveText(
          chapter.beats[beat].title,
        );
        const current = await measure();
        expect(
          current,
          `${viewport.width}x${viewport.height}, ${chapter.id}, beat ${beat + 1}`,
        ).toEqual(baseline);
        expect(current.pageHeight).toBe(viewport.height);
        expect(current.pageWidth).toBe(viewport.width);
        expect(
          await page
            .locator(".story-narrative h1")
            .evaluate((el) => el.getBoundingClientRect().y),
        ).toBe(titleY);
        await page.locator(".advance-controls .button").click();
      }
    }
    await expect(
      page.getByRole("heading", { name: "At last, home." }),
    ).toBeVisible();
    expect(await measure()).toEqual(baseline);
  }
});

test("long text scrolls by keyboard inside the frame and reading view returns to page layout", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/story/apple");
  await page.addStyleTag({
    content:
      ".story-narrative p { font-size: 26px !important; } .story-narrative h1 { font-size: 78px !important; }",
  });
  await expect(page.locator(".story-scroll-hint")).toContainText(
    "Scroll to read more",
  );
  const story = page.getByRole("region", {
    name: "Chapter story",
    exact: true,
  });
  await story.focus();
  await page.keyboard.press("End");
  await expect(page.locator(".source-link")).toBeInViewport();
  await expect(page.locator(".story-scroll-hint")).toBeEmpty();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect.poll(() => story.evaluate((el) => el.scrollTop)).toBe(0);
  await expect(page.locator(".story-scroll-hint")).toContainText(
    "Scroll to read more",
  );
  await page.getByRole("button", { name: "Reading view", exact: true }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight > innerHeight,
    ),
  ).toBe(true);
  await expect(page.locator(".story-scroll-hint")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Cinematic view", exact: true })
    .click();
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(
    844,
  );
  await page.setViewportSize({ width: 844, height: 390 });
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(
    390,
  );
  const bottom = await page
    .locator(".story-controls")
    .evaluate((el) => el.getBoundingClientRect().bottom);
  expect(bottom).toBe(390);
  await page.getByRole("button", { name: "Before Ithaca home" }).click();
  await expect(page.locator(".landing")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight > innerHeight,
    ),
  ).toBe(true);
});
