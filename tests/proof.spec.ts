import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440]) {
  test(`production screenshots remain simple and readable at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const proof = page.locator("#production");
    await expect(proof.getByRole("heading", { name: "IN PRODUCTION", exact: true })).toBeVisible();
    await expect(proof.locator('dt [data-glyph-text]')).toHaveText([
      "DCC Software", "SYSTEM", "WORKFLOW", "Production Format", "STATUS", "PROJECT",
    ]);
    expect(await proof.locator('dd').evaluateAll(elements => elements.map(element =>
      [...element.querySelectorAll('[data-glyph-text]')].map(span => span.textContent).join('')
    ))).toEqual([
      "Maya 2022 / Houdini 21–22", "Rez / Ftrack / Pyblish",
      "Builder / Loader / Publish / Dailies", "USD / Alembic",
      "Active / 2026", "动画电影《赵子龙》",
    ]);
    await expect(proof.getByRole("link")).toHaveCount(3);
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
    await proof.screenshot({ path: test.info().outputPath(`proof-${width}.png`) });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(proof.locator("figcaption").first()).toContainText("Select modules");
    await expect(proof.getByRole("img", { name: /Actual Publish interface/ })).toHaveCount(1);
  });
}

test("production terminology remains welcoming across the destination languages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText(/\b(EVIDENCE|PROOF|VERIFICATION)\b/i);
  await page.getByRole("link", { name: "03 / CONTACT" }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("我们可以聊聊");
  await expect(page.locator("body")).not.toContainText(/证据|验收/);
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("let’s talk");
  await expect(page.locator("body")).not.toContainText(/\b(evidence|proof|verification)\b/i);
});
