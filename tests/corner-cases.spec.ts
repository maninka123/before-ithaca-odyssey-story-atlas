import { test, expect } from "@playwright/test";
import { epicOrder } from "../src/data/chapters";

test("browser history restores views, character links and the saved beat", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "BEGIN THE JOURNEY" }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  const beat = await page.locator(".beat-copy h2").innerText();
  await page.getByRole("button", { name: "Characters", exact: true }).click();
  await page
    .locator(".character-names")
    .getByRole("button", { name: /Polyphemus/ })
    .click();
  await expect(page).toHaveURL(/characters\/Polyphemus$/);
  await page.goBack();
  await expect(page.locator(".profile-opening h2")).toHaveText("Odysseus");
  await page.goBack();
  await expect(page.locator(".beat-copy h2")).toHaveText(beat);
  await page.goForward();
  await expect(page.locator(".profile-opening h2")).toHaveText("Odysseus");
  await page.goForward();
  await expect(page.locator(".profile-opening h2")).toHaveText("Polyphemus");
  await page.reload();
  await expect(page.locator(".profile-opening h2")).toHaveText("Polyphemus");
});

test("malformed and unknown deep links return to a usable screen", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const hash of [
    "#/story/missing",
    "#/%E0%A4%A",
    "#/something",
    "#/characters/nobody",
  ]) {
    await page.goto(`/${hash}`);
    if (hash.includes("characters"))
      await expect(page.locator(".profile-opening h2")).toHaveText("Odysseus");
    else
      await expect(
        page.getByRole("heading", { name: /BEFORE.*ITHACA/ }),
      ).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("deep-link reload preserves the beat and skip links preserve the story", async ({
  page,
}) => {
  await page.goto("/#/story/cyclops");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.reload();
  await expect(page.locator(".beat-copy h2")).toHaveText(
    "The door is the problem",
  );
  await page.getByRole("link", { name: "Skip to the story" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".beat-copy h2")).toHaveText(
    "The door is the problem",
  );
  await expect(page.locator("main")).toBeFocused();
});

test("invalid stored types and action names cannot replace application behavior", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "before-ithaca-v2",
      JSON.stringify({
        version: 2,
        state: {
          chapter: 6,
          beat: 99,
          completed: ["cyclops", "cyclops", "missing", null],
          mode: 5,
          graphics: {},
          motion: "true",
          started: true,
          character: [],
          enter: null,
          setView: null,
          complete: null,
        },
      }),
    ),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "CONTINUE THE JOURNEY" }).click();
  await expect(page.locator(".beat-copy h2")).toHaveText(
    "A guest becomes a prisoner",
  );
  await page.getByRole("button", { name: "Characters", exact: true }).click();
  await expect(page.locator(".profile-opening h2")).toHaveText("Odysseus");
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem("before-ithaca-v2")!).state,
  );
  expect(saved.completed).toEqual(["cyclops"]);
  expect(saved.mode).toBe("chronological");
  expect(saved.graphics).toBe("rich");
});

test("blocked local storage still permits the complete story flow", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    }),
  );
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "BEGIN THE JOURNEY" }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Next chapter", exact: true }).click();
  await expect(page).toHaveURL(/story\/helen$/);
  expect(errors).toEqual([]);
});

test("leaving the completion screen restores normal beat navigation", async ({
  page,
}) => {
  await page.goto("/#/story/reunion");
  await page.getByRole("button", { name: "Go to beat 3" }).click();
  await page.getByRole("button", { name: "Complete journey" }).click();
  await expect(
    page.getByRole("heading", { name: "At last, home." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Previous story beat" }).click();
  await expect(page.locator(".beat-copy h2")).toHaveText("Beyond the reunion");
  await expect(
    page.getByRole("button", { name: "Continue", exact: true }),
  ).toBeVisible();
});

test("epic route explains both transitions into and out of the flashback", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Search chapters" }).click();
  await page
    .getByRole("button", { name: "Original epic order", exact: true })
    .click();
  await page.locator(".chapter-library button").first().click();
  for (const id of epicOrder) {
    await expect(page).toHaveURL(new RegExp(`/story/${id}$`));
    for (let beat = 1; beat < (id === "cyclops" ? 6 : 3); beat++)
      await page.getByRole("button", { name: "Continue", exact: true }).click();
    if (id === "phaeacians")
      await expect(page.locator(".beat-copy")).toContainText("next chapters");
    if (id === "helios")
      await expect(page.locator(".epic-note").last()).toContainText(
        "flashback ends",
      );
    await page
      .getByRole("button", {
        name: id === "reunion" ? "Complete journey" : "Next chapter",
        exact: true,
      })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "At last, home." }),
  ).toBeVisible();
});

test("small, tablet, short-desktop and wide layouts retain usable controls", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 768, height: 1024 },
    { width: 1024, height: 600 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    for (const hash of [
      "",
      "#/story/cyclops",
      "#/characters/Polyphemus",
      "#/atlas",
    ]) {
      await page.goto(`/${hash}`);
      await page.evaluate(() => document.fonts.ready);
      if (hash.includes("atlas"))
        await page
          .getByRole("button", { name: "Use 2D map", exact: true })
          .click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow at ${viewport.width} ${hash}`,
      ).toBeTruthy();
      if (!hash) {
        const bounds = await page.locator("#hero-title span").evaluate((el) => {
          const range = document.createRange();
          range.selectNodeContents(el);
          const r = range.getBoundingClientRect();
          return { left: r.left, right: r.right };
        });
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(viewport.width);
      }
      if (hash.includes("cyclops")) {
        await page.getByRole("button", { name: "Replay chapter" }).click();
        await page
          .getByRole("button", { name: "Inspect The wine and stake" })
          .click();
        await expect(page.locator(".object-note")).toContainText("Nobody");
        await page
          .getByRole("button", { name: "Close object explanation" })
          .click();
        await page
          .getByRole("button", { name: "Continue", exact: true })
          .click();
        await expect(page.locator(".beat-copy h2")).toHaveText(
          "The door is the problem",
        );
      }
    }
  }
});

test("cave zoom clamps cleanly and resets when leaving the illustration", async ({
  page,
}) => {
  await page.goto("/#/story/cyclops");
  const zoomIn = page.getByRole("button", { name: "Zoom into cave" });
  await zoomIn.click();
  await zoomIn.click();
  await expect(zoomIn).toBeDisabled();
  await page.getByRole("button", { name: "Reading view", exact: true }).click();
  await page
    .getByRole("button", { name: "Cinematic view", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Zoom out of cave" }),
  ).toBeDisabled();
  expect(
    await page.evaluate(() =>
      document.documentElement.style.getPropertyValue("--cave-scale"),
    ),
  ).toBe("1");
});

test("missing coastline data keeps destinations and chapter entry available", async ({
  page,
}) => {
  await page.route("**/geography/mediterranean.json", (route) =>
    route.fulfill({ status: 503, body: "Unavailable" }),
  );
  await page.goto("/#/atlas");
  await expect(page.locator(".flat-map")).toBeVisible();
  await page
    .locator(".destination-list")
    .getByRole("button", { name: /The Cyclops/ })
    .click();
  await page.getByRole("button", { name: "Enter this chapter" }).click();
  await expect(page).toHaveURL(/story\/cyclops$/);
});

test("no WebGL still provides an automatic 2D atlas", async ({ page }) => {
  await page.addInitScript(() => {
    const native = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      type: string,
      ...args: unknown[]
    ) {
      return type.includes("webgl")
        ? null
        : Reflect.apply(native, this, [type, ...args]);
    } as typeof native;
  });
  await page.goto("/#/atlas");
  await expect(page.locator(".flat-map")).toBeVisible();
  await expect(page.locator(".destination-list button")).toHaveCount(14);
});

test("malformed coastline responses show a usable fallback rather than a blank map", async ({
  page,
}) => {
  await page.route("**/geography/mediterranean.json", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ error: "Invalid response" }),
    }),
  );
  await page.goto("/#/atlas");
  await expect(page.locator(".map-data-note")).toContainText(
    "Coastlines could not load",
  );
  await page
    .locator(".destination-list")
    .getByRole("button", { name: /The Cyclops/ })
    .click();
  await page.getByRole("button", { name: "Enter this chapter" }).click();
  await expect(page).toHaveURL(/story\/cyclops$/);
});
