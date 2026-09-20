import { test, expect } from "@playwright/test";

test("chapter hero keeps its natural height without a blank full-screen spacer", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [{width:1440,height:900},{width:768,height:1024},{width:390,height:844}]) {
    await page.setViewportSize(viewport);
    await page.goto("/design-innovation/");
    await page.evaluate(() => document.fonts.ready);
    for (const lang of ["zh", "en"]) {
      if (lang === "en") await page.getByRole("button", {name:"Switch to English"}).click();
      await expect(page.locator('section[aria-labelledby="design-title"]')).toHaveCSS("min-height", "0px");
      const bounds = await page.locator('section[aria-labelledby="design-title"]').evaluate(el => ({
        bottom: el.getBoundingClientRect().bottom,
        copyBottom: el.lastElementChild!.getBoundingClientRect().bottom,
        nextTop: document.getElementById("design-viewer")!.getBoundingClientRect().top,
        height: innerHeight,
      }));
      expect(bounds.nextTop).toBeLessThan(bounds.height);
      expect(Math.abs(bounds.bottom - bounds.copyBottom)).toBeLessThanOrEqual(2);
      await page.screenshot({path:`artifacts/design-hero-${viewport.width}-${lang}.png`});
      if (lang === "en") await page.getByRole("button", {name:"切换为中文"}).click();
    }
  }
});
