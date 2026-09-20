import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`trial editor entry is temporarily absent at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator('[data-editable="hero.title"]')).toContainText("WEFT / PPL");
    await expect(page.locator('[data-editing]')).toHaveAttribute("data-editing", "false");
    await expect(page.locator('button', { hasText: "试编辑" })).toHaveCount(0);
    await expect(page.locator('#preview-field')).toHaveCount(0);
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(page.locator('button', { hasText: /Try edit/i })).toHaveCount(0);
    await page.reload();
    await expect(page.locator('#preview-field')).toHaveCount(0);
    await expect(page.locator('button', { hasText: /试编辑|Try edit/i })).toHaveCount(0);
  });
}
