import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });

const snapType = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const value = getComputedStyle(document.documentElement).scrollSnapType;
    // Chromium omits the default proximity keyword in computed styles.
    return value === "y" ? "y proximity" : value;
  });

test("homepage wheel approaches settle at sections and can leave in both directions", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => snapType(page)).toBe("y proximity");
  await page.mouse.move(1420, 450);
  for (const id of ["summary", "views"]) {
    const section = page.locator(`#${id}`);
    const distance = await section.evaluate(el => el.getBoundingClientRect().top - 8 - 45);
    await page.mouse.wheel(0, distance);
    await expect.poll(async () => Math.abs((await section.boundingBox())!.y - 8)).toBeLessThan(2);
  }
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
  const after = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, -600);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(after - 100);
  await page.keyboard.press("Control+End");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
  await page.getByRole("link", { name: /BACK TO TOP/ }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(2);
});

test("production anchor and expanded reading stay usable", async ({ page }) => {
  await page.goto("/#views");
  await page.locator('[data-control="operate"]').click();
  await page.getByRole("link", { name: "VIEW PRODUCTION", exact: true }).click();
  await expect(page).toHaveURL(/#production$/);
  await expect.poll(() => page.locator("#production").evaluate(el => {
    const top = el.getBoundingClientRect().top;
    const documentTop = top + scrollY;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    return Math.abs(top - Math.max(8, documentTop - maxScroll));
  })).toBeLessThan(2);
  await page.locator("#production").getByRole("button", { name: /放大查看/ }).first().click();
  await expect(page.locator("dialog[open]")).toBeVisible();
  await expect.poll(() => snapType(page)).toBe("none");
  await page.keyboard.press("Escape");
  await expect.poll(() => snapType(page)).toBe("y proximity");
  await page.locator("#views details summary").click();
  await expect.poll(() => snapType(page)).toBe("none");
  await page.locator("#views details summary").click();
  await expect.poll(() => snapType(page)).toBe("y proximity");
});

test("coarse pointers and no-JavaScript fallback keep natural scrolling", async ({ browser }) => {
  for (const options of [{ hasTouch: true }, { javaScriptEnabled: false }]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference", ...options });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4173/");
    expect(await snapType(page)).toBe("none");
    await context.close();
  }
});

test("01 and 02 opt in, Contact and accessibility fallbacks keep natural scrolling", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "02 / 设计&创新", exact: true }).click();
  await expect(page).toHaveURL(/\/design-innovation\/$/);
  await expect.poll(() => snapType(page)).toBe("y proximity");
  await page.goto("/systematic-thinking/");
  await expect.poll(() => snapType(page)).toBe("y proximity");
  await page.goto("/contact/");
  expect(await snapType(page)).toBe("none");
  for (const route of ["/", "/systematic-thinking/", "/design-innovation/"]) {
    await page.goto(route);
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await snapType(page)).toBe("none");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(await snapType(page)).toBe("none");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect.poll(() => snapType(page)).toBe("y proximity");
  }
});

test("01 section stops preserve reading of the tall opening", async ({ page }) => {
  await page.goto("/systematic-thinking/");
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => snapType(page)).toBe("y proximity");
  await page.mouse.move(1420, 450);
  await page.mouse.wheel(0, 380);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  const section = page.locator("#systematic-change");
  await page.mouse.wheel(0, await section.evaluate(el => el.getBoundingClientRect().top - 8 - 45));
  await expect.poll(async () => Math.abs((await section.boundingBox())!.y - 8)).toBeLessThan(2);
  await page.keyboard.press("Control+End");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
});

test("02 viewer snaps as a unit while the card body scrolls independently", async ({ page }) => {
  await page.goto("/design-innovation/");
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => snapType(page)).toBe("y proximity");
  await page.mouse.move(1420, 450);
  const viewer = page.locator("#design-viewer");
  await page.mouse.wheel(0, await viewer.evaluate(el => el.getBoundingClientRect().top - 8 - 45));
  await expect.poll(async () => Math.abs((await viewer.boundingBox())!.y - 8)).toBeLessThan(2);
  const outer = await page.evaluate(() => scrollY);
  const body = page.locator('#decision-compatibility [data-card-scroll]');
  const box = (await body.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + 80);
  await page.mouse.wheel(0, 450);
  await expect.poll(() => body.evaluate(el => el.scrollTop)).toBeGreaterThan(100);
  expect(Math.abs(await page.evaluate(() => scrollY) - outer)).toBeLessThan(2);
  await expect(viewer).toHaveAttribute("data-active-decision", "compatibility");
  await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  await page.mouse.wheel(0, 450);
  await page.waitForTimeout(350);
  expect(Math.abs(await page.evaluate(() => scrollY) - outer)).toBeLessThan(2);
  await page.mouse.move(1420, 450);
  await page.mouse.wheel(0, 700);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(outer + 100);
  await expect(page.getByRole("link", { name: /^03 \/ CONTACT/ })).toBeInViewport();
});
