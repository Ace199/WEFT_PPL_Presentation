import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { assetDots, updatedAssetDots } from "../src/lib/production-geometry";

test("02 morphs the white v1 surface into the updated asset and survives interruption",async({page})=>{
  await page.goto("/");
  const master=page.locator("#views"),dots=master.locator("[data-result-dots]");
  const enter=()=>page.locator('[data-control="transform"]').click();
  await enter();
  expect((await dots.getAttribute("d"))===assetDots).toBe(true);
  await expect(master.locator("[data-character-result]")).toHaveAttribute("stroke","#e1e4da");
  await expect.poll(async()=>{
    const d=await dots.getAttribute("d");
    return d!==assetDots&&d!==updatedAssetDots;
  },{intervals:[30,50,80]}).toBe(true);
  await expect(master).toHaveAttribute("data-settled","true");
  expect((await dots.getAttribute("d"))===updatedAssetDots).toBe(true);
  await page.locator('[data-control="organize"]').click();
  await expect(master).toHaveAttribute("data-settled","true");
  expect((await dots.getAttribute("d"))===assetDots).toBe(true);
  await enter();
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(master).toHaveAttribute("data-settled","true");
  expect((await dots.getAttribute("d"))===updatedAssetDots).toBe(true);
  await expect(master.locator("[data-character-result]")).toHaveAttribute("stroke","#a0e5cb");
});

test("production scene: responsive layout, four modes, keyboard and reduced motion", async ({ page }) => {
  const errors:string[]=[];
  page.on("pageerror",e=>errors.push(e.message));
  for(const width of [1440,768,390]) {
    await page.setViewportSize({width,height:800});
    await page.goto("/");
    await page.evaluate(()=>document.fonts.ready);
    const master=page.locator("#views");
    await master.scrollIntoViewIfNeeded();
    await expect(page.locator("[data-production-scene]")).toBeVisible();
    for(const mode of ["organize","transform","extend","overview"]) {
      await page.locator(`[data-control="${mode}"]`).click();
      await expect(master).toHaveAttribute("data-mode",mode);
      await expect(master).toHaveAttribute("data-settled","true");
      const futureOpacity=await page.locator("[data-future]").evaluate(e=>+getComputedStyle(e).opacity);
      expect(futureOpacity).toBe(mode==="extend"?1:0);
      const oldOpacity=await page.locator("[data-version-old]").evaluate(e=>+getComputedStyle(e).opacity);
      expect(oldOpacity).toBe(mode==="transform"?.26:0);
      if(width===1440 && mode==="transform") {
        await master.screenshot({path:"artifacts/production-scene-transform.png",style:"[data-site-header], [class*='TextPreview_launcher'], .skip { visibility:hidden !important; }"});
      }
    }
    for(let i=0;i<12;i++) await page.locator(`[data-control="${["organize","transform","extend"][i%3]}"]`).click();
    await page.locator('[data-control="organize"]').click();
    await expect(master).toHaveAttribute("data-settled","true");
    await page.locator('[data-hit="product"]').focus();
    await expect(master.locator('[aria-live="polite"]')).toContainText("PRODUCT");
    await page.locator('[data-control="organize"]').focus();
    await page.keyboard.press("ArrowRight");
    await expect(master).toHaveAttribute("data-mode","transform");
    await page.keyboard.press("Escape");
    await expect(master).toHaveAttribute("data-mode","overview");
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.locator('[data-control="extend"]').click();
    await expect(master).toHaveAttribute("data-settled","true");
    await page.locator('[data-control="organize"]').click();
    await expect(master).toHaveAttribute("data-settled","true");
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(width===1440) expect((await master.boundingBox())!.height).toBeLessThanOrEqual(800);
    const a11y=await new AxeBuilder({page}).include("#views").withTags(["wcag2a","wcag2aa"]).analyze();
    expect(a11y.violations).toEqual([]);
    await master.screenshot({path:`artifacts/production-scene-${width}.png`,style:"[data-site-header], [class*='TextPreview_launcher'], .skip { visibility:hidden !important; }"});
    await page.emulateMedia({reducedMotion:"no-preference"});
  }
  expect(errors).toEqual([]);
});

test("03 reveals dashed branches in sequence and cleans up interrupted transitions", async ({page})=>{
  await page.setViewportSize({width:1440,height:800});
  await page.goto("/");
  const master=page.locator("#views");
  const masks=master.locator("[data-future-reveal]");
  const enter=()=>page.locator('[data-control="extend"]').click();
  await enter();
  await expect.poll(async()=>{
    const value=Number(await masks.first().getAttribute("stroke-dashoffset"));
    return value>0.02&&value<0.98;
  },{intervals:[20,30,50]}).toBe(true);
  const offsets=await masks.evaluateAll(els=>els.map(el=>Number(el.getAttribute("stroke-dashoffset"))));
  expect(offsets[4]).toBeGreaterThan(offsets[0]);
  await page.locator('[data-control="organize"]').click();
  await expect(master).toHaveAttribute("data-settled","true");
  await expect(master.locator("[data-future]")).toHaveCSS("opacity","0");
  await enter();
  await expect(master).toHaveAttribute("data-settled","true");
  for(const mask of await masks.all()) await expect(mask).toHaveAttribute("stroke-dashoffset","0");
  for(const label of await master.locator("[data-future-label]").all()) await expect(label).toHaveCSS("opacity","1");
  await expect(master.locator('[data-future] path[mask]')).toHaveCount(5);
  for(const path of await master.locator('[data-future] path[mask]').all()) await expect(path).toHaveAttribute("stroke-dasharray","4 5");
  await master.screenshot({path:"artifacts/production-scene-extend.png",style:"[data-site-header], [class*='TextPreview_launcher'], .skip { visibility:hidden !important; }"});
  await page.locator('[data-control="organize"]').click();
  await enter();
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(master).toHaveAttribute("data-settled","true");
  for(const mask of await masks.all()) await expect(mask).toHaveAttribute("stroke-dashoffset","0");
  for(const label of await master.locator("[data-future-label]").all()) await expect(label).toHaveCSS("opacity","1");
});
