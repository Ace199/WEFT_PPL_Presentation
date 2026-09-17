import { test, expect } from "@playwright/test";

test("language preference survives navigation, refresh and switching back", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await page.getByRole("navigation").getByRole("link", { name: /Systematic Thinking/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Animation production");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("navigation").getByRole("link", { name: /Design/ }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "WEFT / PPL", exact: true }).click();
  await expect(page.locator('[data-editable="hero.subtitle"]')).toContainText("Cross-DCC Animation");
  await page.getByRole("button", { name: "切换为中文" }).click();
  await page.getByRole("navigation").getByRole("link", { name: /系统思考/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("动画生产");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual({ "weft-ppl.language": "zh" });
});

test("storage unavailable still allows language switching", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Blocked", "SecurityError"); } });
  });
  await page.goto("/systematic-thinking/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Animation production");
});
