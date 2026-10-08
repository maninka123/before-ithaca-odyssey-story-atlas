import { test, expect } from "@playwright/test";
import { chapters, partImages } from "../src/data/chapters";

test("later chapters have their own artwork and retain the part landscape", async ({
  page,
}) => {
  const overlays = chapters.filter((c) => c.image !== partImages[c.part - 1]);
  expect(overlays).toHaveLength(18);
  expect(new Set(overlays.map((c) => c.image)).size).toBe(18);
  await page.goto("/#/story/helen");
  await expect(page.locator(".chapter-blend.ready")).toHaveAttribute(
    "data-scene",
    "chapters/helen",
  );
  const part = await page.locator(".part-backdrop").getAttribute("style");
  await page.getByRole("button", { name: "Go to beat 3" }).click();
  await page.getByRole("button", { name: "Next chapter", exact: true }).click();
  await expect(page.locator(".chapter-blend.ready")).toHaveAttribute(
    "data-scene",
    "chapters/armies",
  );
  expect(await page.locator(".part-backdrop").getAttribute("style")).toBe(part);
  await expect(page.locator(".chapter-blend")).toHaveCount(2);
});

test("portraits, names and large text fit narrow and wide chapter layouts", async ({
  page,
}) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/story/calypso");
    await expect(page.locator(".story-characters .avatar")).toHaveCount(6);
    const sizes = await page.evaluate(() => {
      const font = (selector: string) =>
        parseFloat(
          getComputedStyle(document.querySelector(selector)!).fontSize,
        );
      const avatar = getComputedStyle(
        document.querySelector(".story-characters .avatar")!,
      );
      return {
        body: font(".beat-copy p"),
        location: font(".story-location"),
        next: font(".advance-controls .button"),
        radius: avatar.borderRadius,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(sizes.body).toBeGreaterThanOrEqual(18);
    expect(sizes.location).toBeGreaterThanOrEqual(15);
    expect(sizes.next).toBeGreaterThanOrEqual(15);
    expect(sizes.radius).toBe("50%");
    expect(sizes.overflow).toBe(false);
    await page
      .locator(".story-characters")
      .getByRole("button", { name: "Hermes", exact: true })
      .click();
    await expect(page.locator(".profile-opening h2")).toHaveText("Hermes");
  }
});

test("unavailable chapter art preserves the part image and usable story", async ({
  page,
}) => {
  await page.route("**/images/chapters/helen.webp", (route) => route.abort());
  await page.goto("/#/story/helen");
  await expect(page.locator(".part-backdrop")).toBeVisible();
  await expect(page.locator(".beat-copy p")).not.toBeEmpty();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".beat-copy h2")).toHaveText(
    chapters[1].beats[1].title,
  );
  await expect(page.locator(".chapter-blend.ready")).toHaveCount(0);
});
