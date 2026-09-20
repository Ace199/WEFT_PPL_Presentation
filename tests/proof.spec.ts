import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440]) {
  test(`production screenshots remain simple and readable at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const proof = page.locator("#production");
    await expect(proof.getByRole("heading", { name: "IN PRODUCTION", exact: true })).toBeVisible();
    await expect(proof.locator('dt [data-glyph-text]')).toHaveText([
      "HOSTS", "SYSTEM", "WORKFLOW", "FORMAT", "STATUS",
    ]);
    await expect(proof.locator('dd [data-glyph-text]')).toHaveText([
      "Maya 2022 / Houdini 21–22", "Rez / Ftrack",
      "Build / Load / Publish / Dailes Review", "USD / Alembic",
      "Active production / 2026",
    ]);
    await expect(proof.getByRole("link", { name: /HOW IT WORKS IN PRODUCTION/ })).toHaveAttribute("href", "/evidence/");
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

test("production terminology remains welcoming across the destination languages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText(/\b(EVIDENCE|PROOF|VERIFICATION)\b/i);
  await page.getByRole("link", { name: /HOW IT WORKS IN PRODUCTION/ }).click();
  await expect(page).toHaveURL(/\/evidence\/$/);
  await expect(page.getByRole("heading", { name: "真实生产中的实践" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/证据|验收/);
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { name: "How it works in production" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/\b(evidence|proof|verification)\b/i);
});
