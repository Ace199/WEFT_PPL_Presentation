import { test, expect } from "@playwright/test";

test("server first frame does not expose completed animation before scripts load", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/*.js*", route => route.abort());
  await page.goto("/");
  await expect(page.locator('[data-motion="hero"] > svg')).toHaveCSS("visibility", "hidden");
  await expect(page.locator('[data-motion="summary"] [data-phase="1"]')).toHaveCSS("opacity", "0");
  await expect(page.locator('[data-fact-typing="hero"] [data-typing-glyph]').first()).toHaveCSS("visibility", "hidden");
  await expect(page.locator("h1")).toBeVisible();
});

test("hero starts from scatter on load, reload and chapter return", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const entry of ["load", "reload", "return"]) {
    if (entry === "load") await page.goto("/");
    if (entry === "reload") await page.reload();
    if (entry === "return") {
      await page.getByRole("link", { name: "02 / 设计/创新", exact: true }).click();
      await expect(page).toHaveURL(/design-innovation/);
      await page.getByRole("link", { name: "WEFT / PPL", exact: true }).first().click();
    }
    const hero = page.locator('[data-motion="hero"]');
    await expect(hero).toHaveAttribute("data-hero-stage", /scatter|gather/);
    await expect(hero.locator('[data-boot="resolved"]')).toHaveCSS("opacity", "0");
    await expect(hero).toHaveAttribute("data-hero-stage", "complete", { timeout: 10000 });
    await expect(hero.locator('[data-boot="resolved"]')).toHaveCSS("opacity", "1");
  }
});

test("reduced motion and no JavaScript retain complete static diagrams", async ({ browser }) => {
  for (const options of [{ reducedMotion: "reduce" as const }, { javaScriptEnabled: false }]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator('[data-motion="hero"] > svg')).toHaveCSS("visibility", "visible");
    await expect(page.locator('[data-motion="summary"] [data-phase="2"]')).toHaveCSS("opacity", "1");
    await expect(page.locator('[data-fact-typing="hero"] [data-typing-glyph]').first()).toHaveCSS("visibility", "visible");
    await context.close();
  }
});
