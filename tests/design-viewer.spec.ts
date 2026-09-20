import { test, expect } from "@playwright/test";

test("decision indexes never slide over the card while the outer page scrolls", async ({page}) => {
  await page.setViewportSize({width:1440,height:800});
  await page.goto('/design-innovation/');
  await page.evaluate(()=>document.fonts.ready);
  for (const offset of [0,150,350,550]) {
    await page.locator('#design-viewer').evaluate((el,delta)=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY+delta,behavior:'instant'}),offset);
    const bounds=await page.locator('#design-viewer').evaluate(el=>({
      tabs:el.querySelector('[data-index]')!.parentElement!.getBoundingClientRect().bottom,
      card:el.querySelector('[data-panel]')!.getBoundingClientRect().top,
    }));
    expect(bounds.tabs).toBeLessThanOrEqual(bounds.card);
  }
});

for (const language of ["zh", "en"]) {
  test(`desktop viewer adds 40px of reading space and keeps controls reachable (${language})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/design-innovation/");
    if (language === "en")
      await page.getByRole("button", { name: "Switch to English" }).click();
    await page.evaluate(() => document.fonts.ready);
    const viewer = page.locator("#design-viewer");
    await expect(
      page.getByText("问题，往往出在模型。", { exact: true }),
    ).toHaveCount(0);
    for (let i = 0; i < 5; i++) {
      await page.locator("[data-index]").nth(i).click();
      if (i === 2)
        await page
          .getByRole("button", { name: "CURRENT STATE", exact: true })
          .click();
      await viewer.evaluate((el) =>
        window.scrollTo({
          top:
            el.getBoundingClientRect().top +
            scrollY -
            document
              .querySelector("[data-site-header]")!
              .getBoundingClientRect().height,
          behavior: "instant",
        }),
      );
      await expect
        .poll(() =>
          viewer.evaluate((el) => {
            const header = document
              .querySelector("[data-site-header]")!
              .getBoundingClientRect();
            return (
              Math.abs(el.getBoundingClientRect().height -
              (innerHeight - header.height + 40)) <= 2
            );
          }),
        )
        .toBe(true);
      await page.getByRole("button", { name: "NEXT →", exact: true }).scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollBy({top: 4, behavior: "instant"}));
      await expect(
        page.getByRole("button", { name: "NEXT →", exact: true }),
      ).toBeInViewport({ ratio: 1 });
      const body = page.locator(
        '[data-panel][data-active="true"] [data-card-scroll]',
      );
      await expect(body.locator("[data-card-part]")).toHaveCount(i === 3 ? 2 : 3);
      expect(await body.locator("[data-card-part]").evaluateAll(els => els.map(el => el.getAttribute("data-card-part")))).toEqual(i === 3 ? ["decision", "comparison"] : ["decision", "comparison", "example"]);
      await expect(body.getByText("MODEL DIAGNOSIS", { exact: true })).toHaveCount(0);
      await body.evaluate((el) => (el.scrollTop = 0));
      await page.screenshot({
        path: `artifacts/design-viewer-${language}-${i + 1}.png`,
      });
      const pageY = await page.evaluate(() => scrollY);
      const navY = await page
        .getByRole("button", { name: "NEXT →", exact: true })
        .evaluate((el) => el.getBoundingClientRect().top);
      await body.hover();
      await page.mouse.wheel(0, 500);
      await expect
        .poll(() => body.evaluate((el) => el.scrollTop))
        .toBeGreaterThan(0);
      expect(await page.evaluate(() => scrollY)).toBe(pageY);
      await body.evaluate((el) => (el.scrollTop = el.scrollHeight));
      await expect(
        page.locator(i === 3 ? '#decision-task-composition figcaption' : '[data-panel][data-active="true"] a'),
      ).toBeInViewport({ ratio: 1 });
      expect(
        await page
          .getByRole("button", { name: "NEXT →", exact: true })
          .evaluate((el) => el.getBoundingClientRect().top),
      ).toBe(navY);
      if (i === 0)
        await page.screenshot({
          path: `artifacts/design-viewer-${language}-scrolled.png`,
        });
    }
  });
}

test("record switch preserves decision and displays parseable delta and full state", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/design-innovation/");
  await page.locator("[data-index]").nth(2).click();
  const read = (id: string) =>
    page
      .locator(`${id} code`)
      .evaluate((el) =>
        JSON.parse(
          [...el.querySelectorAll(":scope > span > span:last-child")]
            .map((line) => line.textContent)
            .join(""),
        ),
      );
  expect(await read("#record-delta")).toEqual({
    rigcache: { Character_A: { version: "v003" } },
  });
  await page
    .getByRole("button", { name: "CURRENT STATE", exact: true })
    .click();
  expect(await read("#record-current")).toEqual({
    rigcache: {
      Character_A: { version: "v003" },
      Character_B: { version: "v001" },
    },
    camera: { version: "v003" },
  });
  await page
    .getByRole("button", { name: "CURRENT STATE", exact: true })
    .press("ArrowRight");
  await expect(page.locator("#design-viewer")).toHaveAttribute(
    "data-active-decision",
    "state",
  );
  await expect(page.locator("#record-delta")).toBeHidden();
  await page.getByRole("button", { name: "DELTA", exact: true }).click();
  await expect(page.locator("#record-current")).toBeHidden();
  await page.locator("[data-index]").nth(0).press("End");
  await expect(page.locator("#design-viewer")).toHaveAttribute(
    "data-active-decision",
    "execution",
  );
  await page.locator("[data-index]").nth(4).press("Home");
  await expect(
    page.getByRole("button", { name: "← PREV", exact: true }),
  ).toBeEnabled();
  const previous = page.getByRole("button", { name: "上一张决策卡", exact: true });
  const next = page.getByRole("button", { name: "下一张决策卡", exact: true });
  await expect(previous).toHaveText("05 / EXECUTION");
  await previous.click();
  await expect(page.locator("#design-viewer")).toHaveAttribute("data-active-decision", "execution");
  await expect(next).toHaveText("01 / COMPATIBILITY");
  await next.click();
  await expect(page.locator("#design-viewer")).toHaveAttribute("data-active-decision", "compatibility");
  await page.locator("[data-index]").nth(0).press("ArrowLeft");
  await expect(page.locator("[data-index]").nth(4)).toBeFocused();
  await page.locator("[data-index]").nth(4).press("ArrowRight");
  await expect(page.locator("[data-index]").nth(0)).toBeFocused();
});

test("short and mobile cards expose scrollable content and retain navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const size of [
    { width: 1280, height: 600 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/design-innovation/");
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator('[data-panel][data-active=true] [data-card-part="example"] pre')
      .scrollIntoViewIfNeeded();
    await page
      .locator("#design-viewer")
      .evaluate((el) =>
        window.scrollTo({
          top:
            el.getBoundingClientRect().top +
            scrollY -
            document
              .querySelector("[data-site-header]")!
              .getBoundingClientRect().height,
          behavior: "instant",
        }),
      );
    await page.getByRole("button", { name: "NEXT →", exact: true }).scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("button", { name: "NEXT →", exact: true }),
    ).toBeInViewport({ ratio: 1 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const panel = page.locator("[data-panel][data-active=true]");
    const body = panel.locator("[data-card-scroll]");
    expect(
      await body.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true);
    await body.evaluate((el) => (el.scrollTop = el.scrollHeight));
    await expect(panel.getByRole("link")).toBeInViewport({ ratio: 1 });
    expect(
      await panel.evaluate((el) => el.scrollHeight <= el.clientHeight + 1),
    ).toBe(true);
    await page.screenshot({
      path: `artifacts/design-viewer-scroll-${size.width}.png`,
    });
  }
});
