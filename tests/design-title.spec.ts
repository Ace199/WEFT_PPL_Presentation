import { test, expect } from "@playwright/test";

test("indexes lead directly to cards without a title row or FIG label", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/design-innovation/");
  const viewer = page.locator("#design-viewer");
  for (const width of [320, 390, 768, 1440, 1764]) {
    await page.setViewportSize({ width, height: 900 });
    for (let i = 0; i < 5; i++) {
      await viewer.locator("[data-index]").nth(i).click();
      await expect(viewer.locator("article > header, #deck-title, [data-active-decision-title]")).toHaveCount(0);
      await expect(viewer).not.toContainText("DESIGN DECISION VIEWER");
      await expect(viewer).not.toContainText("FIG. 02.");
      const body = viewer.locator('[data-panel][data-active="true"] [data-card-scroll]');
      expect((await body.boundingBox())!.height).toBeGreaterThan(200);
      await body.evaluate(el => { el.scrollTop = 160; });
      expect(await body.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});
