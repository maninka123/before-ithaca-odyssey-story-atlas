import { test, expect } from "@playwright/test";
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
test("the entire 21 chapter story can be completed without exploring", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "BEGIN THE JOURNEY" }).click();
  for (let i = 0; i < ids.length; i++) {
    await expect(page).toHaveURL(new RegExp(`/story/${ids[i]}$`));
    const beats = i === 6 ? 6 : 3;
    for (let j = 0; j < beats - 1; j++) {
      await expect(page.locator(".beat-copy p")).not.toBeEmpty();
      await page.getByRole("button", { name: "Continue", exact: true }).click();
    }
    await page
      .getByRole("button", {
        name: i === 20 ? "Complete journey" : "Next chapter",
        exact: true,
      })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "At last, home." }),
  ).toBeVisible();
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem("before-ithaca-v2")!).state,
  );
  expect(saved.completed).toEqual(ids);
  expect(errors).toEqual([]);
});
test("Cyclops objects explain the plan; navigation and saved beats work", async ({
  page,
}) => {
  await page.goto("/#/story/cyclops");
  await expect(
    page.getByRole("heading", { name: "In the Cyclops’s cave" }),
  ).toBeVisible();
  for (const [name, word] of [
    ["The stone door", "boulder"],
    ["The wine and stake", "Nobody"],
    ["The sheep", "beneath"],
  ]) {
    await page.getByRole("button", { name: `Inspect ${name}` }).click();
    await expect(page.locator(".object-note")).toContainText(word);
    await page
      .getByRole("button", { name: "Close object explanation" })
      .click();
  }
  await expect(page.locator(".inspect-count")).toContainText("3/3");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "The door is the problem" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Previous story beat" }).click();
  await expect(
    page.getByRole("heading", { name: "A guest becomes a prisoner" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Reading view", exact: true }).click();
  await expect(page.locator(".story-player")).toHaveClass(/reading/);
  await page.goto("/");
  await page.getByRole("button", { name: "CONTINUE THE JOURNEY" }).click();
  await expect(
    page.getByRole("heading", { name: "The door is the problem" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Replay chapter" }).click();
  await expect(
    page.getByRole("heading", { name: "A guest becomes a prisoner" }),
  ).toBeVisible();
});
test("chapters search, epic order and focused character links work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search chapters" }).click();
  await page
    .getByRole("button", { name: "Original epic order", exact: true })
    .click();
  await page.locator(".chapter-library button").first().click();
  await expect(page).toHaveURL(/story\/ithaca$/);
  await expect(page.locator(".epic-note")).toContainText("EPIC ORDER");
  await page.getByRole("button", { name: "Search chapters" }).click();
  await page
    .getByRole("button", { name: "Story chronology", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Search story chapters" })
    .fill("cyclops");
  await page.locator(".chapter-library button").click();
  await page
    .locator(".story-characters")
    .getByRole("button", { name: "Polyphemus", exact: true })
    .click();
  await expect(page.locator(".profile-opening h2")).toHaveText("Polyphemus");
  await expect(page.locator(".relationship-branches")).toContainText("Son of");
  await page
    .locator(".relationship-branches")
    .getByRole("button", { name: /Son of.*Poseidon/ })
    .click();
  await expect(page.locator(".profile-opening h2")).toHaveText("Poseidon");
  await page
    .locator(".character-chapters")
    .getByRole("button", { name: /The Cyclops/ })
    .click();
  await expect(page).toHaveURL(/story\/cyclops$/);
});
test("atlas fallback, geographical distinction and chapter entry work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/#/atlas");
  await page.getByRole("button", { name: "Use 2D map", exact: true }).click();
  await page
    .locator(".destination-list")
    .getByRole("button", { name: /The Cyclops/ })
    .click();
  await expect(page.locator(".destination-copy h2")).toHaveText("The Cyclops");
  await expect(page.locator(".geography-note")).toContainText(
    "not navigate a real voyage",
  );
  await page
    .getByRole("button", { name: "Real geography", exact: true })
    .click();
  await expect(page.locator(".destination-list")).not.toContainText("Cyclops");
  await page
    .locator(".destination-list")
    .getByRole("button", { name: "Sparta", exact: false })
    .click();
  await page.getByRole("button", { name: "Enter this chapter" }).click();
  await expect(page).toHaveURL(/story\/helen$/);
  expect(errors).toEqual([]);
});
test("mobile navigation, no overflow, settings and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".landing")).not.toHaveClass(/moving/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("button", { name: "Characters", exact: true }).click();
  await expect(page.locator(".profile-opening h2")).toHaveText("Odysseus");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Experience settings" }).click();
  await page
    .getByRole("combobox", { name: "Visual quality" })
    .selectOption("quiet");
  await expect(
    page.getByRole("switch", { name: "Scene motion" }),
  ).not.toBeChecked();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("button", { name: "World atlas", exact: true }).click();
  await expect(page.locator(".flat-map")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
test("all chapter illustrations and local assets load", async ({ page }) => {
  const failures: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().includes("127.0.0.1"))
      failures.push(`${r.status()} ${r.url()}`);
  });
  await page.goto("/");
  for (const id of ["apple", "horse", "cyclops", "underworld", "reunion"]) {
    await page.goto(`/#/story/${id}`);
    await expect(page.locator(".story-backdrop")).toBeVisible();
    const url = await page
      .locator(".story-backdrop")
      .evaluate((el) => getComputedStyle(el).backgroundImage.slice(5, -2));
    const response = await page.request.get(url);
    expect(response.status()).toBe(200);
  }
  expect(failures).toEqual([]);
});
test("keyboard can complete story beats without pointer input", async ({
  page,
}) => {
  await page.goto("/#/story/cyclops");
  await page.locator("main").focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "The door is the problem" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("heading", { name: "A guest becomes a prisoner" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Search chapters" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Search chapters" }),
  ).toBeFocused();
});
test("corrupt saved progress does not prevent a new journey", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "before-ithaca-v2",
      JSON.stringify({
        version: 2,
        state: {
          chapter: 999,
          beat: -8,
          completed: ["not-a-chapter"],
          started: true,
        },
      }),
    ),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "CONTINUE THE JOURNEY" }).click();
  await expect(page).toHaveURL(/story\/apple$/);
  await expect(
    page.getByRole("heading", { name: "The apple that started a war" }),
  ).toBeVisible();
});
test("3D markers respond and atlas scene cleanup is safe", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "The WebGL scene is checked in Chrome and Edge; Firefox/WebKit run the full narrative and 2D fallback.",
  );
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/atlas");
  await expect(page.locator("canvas")).toBeVisible();
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
  await page.getByRole("button", { name: "Characters", exact: true }).click();
  await expect(page.locator(".profile-opening h2")).toHaveText("Odysseus");
  await page.getByRole("button", { name: "World atlas", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "The story", exact: true }).click();
  await expect(page.locator(".story-narrative h1")).toBeVisible();
  expect(errors).toEqual([]);
});
test("quality changes apply to an atlas already open", async ({ page }) => {
  await page.goto("/#/atlas");
  await page.getByRole("button", { name: "Experience settings" }).click();
  await page
    .getByRole("combobox", { name: "Visual quality" })
    .selectOption("quiet");
  await page.keyboard.press("Escape");
  await expect(page.locator(".flat-map")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page
    .locator(".destination-list")
    .getByRole("button", { name: /The Cyclops/ })
    .click();
  await page.getByRole("button", { name: "Enter this chapter" }).click();
  await expect(page.locator(".story-narrative h1")).toHaveText(
    "In the Cyclops’s cave",
  );
});
