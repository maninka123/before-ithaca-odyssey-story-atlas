import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("core views have no automated WCAG A/AA accessibility violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/#/story/cyclops", "/#/characters", "/#/atlas"]) {
    await page.goto(route);
    if (route.includes("characters"))
      await expect(page.locator(".profile-opening")).toBeVisible();
    if (route.includes("atlas")) {
      await page.getByRole("button", { name: "Use 2D map" }).click();
      await expect(page.locator(".flat-map")).toBeVisible();
    }
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
});
