import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { chapters } from "../src/data/chapters";

test("character details preserve the story, scrolling and focus in both reading modes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const reading of [false, true]) {
      await page.goto("/#/story/cyclops");
      await page.getByRole("button", { name: "Go to beat 6" }).click();
      const viewToggle = page.getByRole("button", {
        name: reading ? "Reading view" : "Cinematic view",
        exact: true,
      });
      if (await viewToggle.count()) await viewToggle.click();
      const opener = page
        .locator(".story-characters")
        .getByRole("button", { name: "Polyphemus", exact: true });
      await opener.scrollIntoViewIfNeeded();
      await opener.focus();
      const measure = () =>
        page.evaluate(() => ({
          route: location.hash,
          history: history.length,
          saved: localStorage.getItem("before-ithaca-v2"),
          pageScroll: scrollY,
          storyScroll: document.querySelector(".story-scroll")!.scrollTop,
          reading: document
            .querySelector(".story-player")!
            .classList.contains("reading"),
          beat: document.querySelector(".beat-copy h2")!.textContent,
        }));
      const before = await measure();
      await opener.click();
      const popup = page.getByRole("dialog", { name: "Character details" });
      await expect(popup).toBeVisible();
      await expect(popup.locator(".profile-opening h2")).toHaveText(
        "Polyphemus",
      );
      await expect(popup.locator(".profile-facts")).toContainText(
        "WHAT THEY WANT",
      );
      await expect(popup.locator(".profile-facts")).toContainText(
        "HOW THEY CHANGE THE STORY",
      );
      await expect(popup.locator(".source-link")).toHaveAttribute(
        "href",
        /^https:/,
      );
      await expect(popup.locator(".character-chapters")).toHaveCount(0);
      await page.keyboard.press("ArrowRight");
      expect(await measure()).toEqual(before);
      await popup
        .locator(".relationship-branches")
        .getByRole("button", { name: /Son of.*Poseidon/ })
        .click();
      await expect(popup.locator(".profile-opening h2")).toHaveText("Poseidon");
      await expect(popup.locator(".profile-opening h2")).toBeFocused();
      expect(await measure()).toEqual(before);
      expect(
        await popup.evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
      await page.keyboard.press("Escape");
      await expect(popup).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await measure()).toEqual(before);
      await opener.click();
      await popup.getByRole("button", { name: "Close dialog" }).click();
      await expect(opener).toBeFocused();
      expect(await measure()).toEqual(before);
      await opener.click();
      await popup.getByRole("button", { name: "Return to the story" }).click();
      await expect(opener).toBeFocused();
      expect(await measure()).toEqual(before);
      await page
        .getByRole("button", { name: "Next chapter", exact: true })
        .click();
      await expect(page).toHaveURL(/story\/aeolus$/);
    }
  }
});

test("every chapter portrait opens the correct profile without leaving the story", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 568 });
  for (const chapter of chapters) {
    await page.goto(`/#/story/${chapter.id}`);
    for (const name of chapter.characters) {
      await page
        .locator(".story-characters")
        .getByRole("button", { name, exact: true })
        .click();
      const popup = page.getByRole("dialog", { name: "Character details" });
      await expect(popup.locator(".profile-opening h2")).toHaveText(name);
      expect(
        await popup.evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
      await popup.getByRole("button", { name: "Close dialog" }).click();
      await expect(page).toHaveURL(new RegExp(`/story/${chapter.id}$`));
    }
  }
});

test("the character popup is accessible, traps focus and closes from its backdrop", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/story/cyclops");
  const opener = page
    .locator(".story-characters")
    .getByRole("button", { name: "Polyphemus", exact: true });
  await opener.click();
  const popup = page.getByRole("dialog", { name: "Character details" });
  await expect(
    popup.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      // Native dialogs can focus the document as Tab wraps; outside controls remain inert.
      await popup.evaluate(
        (el) =>
          el.contains(document.activeElement) ||
          document.activeElement === document.body,
      ),
    ).toBe(true);
  }
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations.map((v) => v.id)).toEqual([]);
  await page.mouse.click(2, 2);
  await expect(popup).toHaveCount(0);
  await expect(opener).toBeFocused();
  await page.getByRole("button", { name: "Before Ithaca home" }).click();
  await expect(
    page.getByText("Created by Pasindu Ranasinghe", { exact: false }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "About the epic" }).click();
  await expect(
    page.getByText("Created by Pasindu Ranasinghe", { exact: false }),
  ).toHaveCount(0);
});
