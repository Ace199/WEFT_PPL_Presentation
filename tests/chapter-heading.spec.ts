import { test, expect } from "@playwright/test";

test("chapter 01 uses chapter 02 hero typography in both languages and at all widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({width, height:900});
    for (const language of ["zh", "en"]) {
      const samples = [];
      for (const route of ["design-innovation", "systematic-thinking"]) {
        await page.goto(`/${route}/`);
        await page.getByRole("button", {name:language === "en" ? "Switch to English" : "切换为中文"}).click();
        await page.evaluate(() => document.fonts.ready);
        samples.push(await page.getByRole("heading", {level:1}).evaluate(el => {
          const read = (node: Element) => {
            const css = getComputedStyle(node);
            return [css.fontFamily, css.fontSize, css.fontWeight, css.lineHeight, css.letterSpacing];
          };
          const surface = getComputedStyle(document.querySelector("[data-site-header]")!.parentElement!);
          return { title: read(el), label: read(el.previousElementSibling!), background: surface.backgroundColor, backgroundImage: surface.backgroundImage, overflow: el.scrollWidth > el.clientWidth + 1 };
        }));
        if (width === 1440 || width === 390) await page.screenshot({path:`artifacts/chapter-heading-${route}-${width}-${language}.png`});
      }
      expect(samples[1]).toEqual(samples[0]);
      expect(samples[1].overflow).toBe(false);
      expect(samples[1].background).toBe("rgb(245, 245, 238)");
      expect(samples[1].backgroundImage).toBe("none");
    }
  }
});
