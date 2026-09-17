import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 768, 1440]) {
  test(`systematic layout ${width}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/systematic-thinking/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "动画生产",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await expect(
      page.locator('[data-reveal][data-motion="complete"]'),
    ).toHaveCount(5);
    await page.screenshot({
      path: `artifacts/systematic-${width}.png`,
      fullPage: true,
    });
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("chapter navigation, refresh, keyboard and motion", async ({ page }) => {
  await page.goto("/systematic-thinking/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "跳到正文" })).toBeFocused();
  const network = page.locator("[data-reveal]").first();
  await network.scrollIntoViewIfNeeded();
  await expect(network).toHaveAttribute("data-motion", "complete", {
    timeout: 15000,
  });
  for (const figure of await page.locator("[data-reveal]").all()) {
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toHaveAttribute("data-motion", "complete", {
      timeout: 15000,
    });
    for (const step of await figure.locator("[data-step]").all())
      await expect(step).toHaveCSS("opacity", "1");
  }
  await page.getByRole("link", { name: "02 / DESIGN & INNOVATION ↗" }).click();
  await expect(page).toHaveURL(/design-innovation/);
  await expect(
    page.getByRole("heading", { name: "内容尚未开放" }),
  ).toBeVisible();
  await page.goBack();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "动画生产",
  );
  await page.getByRole("link", { name: "WEFT / PPL", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("module waits half a second after entering the viewport", async ({ page }) => {
  await page.goto("/systematic-thinking/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  const module = page.locator("[data-reveal]").nth(1);
  await expect(module).toHaveAttribute("data-motion", "ready");
  await expect(module.locator("[data-step]").first()).toHaveCSS("opacity", "0");
  const elapsed = await module.evaluate(element => new Promise<number>((resolve, reject) => {
    const first = element.querySelector("[data-step]")!;
    const start = performance.now();
    element.scrollIntoView({ behavior: "instant", block: "center" });
    const sample = () => {
      const elapsed = performance.now() - start;
      if (Number(getComputedStyle(first).opacity) > 0) resolve(elapsed);
      else if (elapsed > 4000) reject(new Error("Module did not start"));
      else requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  }));
  expect(elapsed).toBeGreaterThanOrEqual(450);
  expect(elapsed).toBeLessThan(1500);
  await expect(module).toHaveAttribute("data-motion", "complete");
});

for (const width of [390, 1440]) {
  test(`English chapter content and motion ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/systematic-thinking/");
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Animation production is not a line.");
    expect(await page.locator("main").innerText()).not.toMatch(/[\u4e00-\u9fff]/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    for (const figure of await page.locator("[data-reveal]").all()) {
      await figure.scrollIntoViewIfNeeded();
      await expect(figure).toHaveAttribute("data-motion", "complete", { timeout: 15000 });
    }
    // Audit resting colors, not a transient frame of the navigation ticker fade.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => {
      (document.activeElement as HTMLElement)?.blur();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await expect(page.locator('[data-site-header]')).toHaveAttribute("data-in-hero", "true");
    await page.screenshot({ path: `artifacts/systematic-en-${width}.png`, fullPage: true });
    const audit = await new AxeBuilder({page}).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(audit.violations).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("button", { name: "切换为中文" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("动画生产");
    await expect(page.locator('[data-reveal][data-motion="complete"]')).toHaveCount(5);
  });
}

test("chapter is readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/systematic-thinking/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "动画生产",
  );
  await expect(
    page.getByRole("img", { name: "动画生产的分支与依赖网络" }),
  ).toBeVisible();
  await expect(page.getByText("统一的不是软件，")).toBeVisible();
  await context.close();
});
