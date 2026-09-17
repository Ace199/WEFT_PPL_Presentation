import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440]) {
  test(`production screenshots remain simple and readable at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const proof = page.locator("#production");
    await proof.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    const images = proof.locator("img");
    await expect(images).toHaveCount(2);
    for (const img of await images.all()) {
      await expect(img).toBeVisible();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
    }
    await expect(proof).not.toContainText("待补");
    await expect(proof.getByRole("button", { name: /放大查看/ })).toHaveCount(2);
    await expect(proof.locator("figcaption").first()).toContainText("选择模块与版本");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await proof.screenshot({ path: `artifacts/proof-${width}.png` });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(proof.locator("figcaption").first()).toContainText("Select modules");
    await expect(proof.getByRole("img", { name: /Actual Publish interface/ })).toHaveCount(1);
  });
}
