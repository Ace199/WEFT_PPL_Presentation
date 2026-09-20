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

test("production scene: responsive layout, overview and three views, keyboard and reduced motion", async ({ page }) => {
  const errors:string[]=[];
  page.on("pageerror",e=>errors.push(e.message));
  for(const width of [1440,768,390]) {
    await page.setViewportSize({width,height:800});
    await page.goto("/");
    await page.evaluate(()=>document.fonts.ready);
    const master=page.locator("#views");
    await master.scrollIntoViewIfNeeded();
    await expect(page.locator("[data-production-scene]")).toBeVisible();
    for(const mode of ["organize","transform","operate","overview"]) {
      await page.locator(`[data-control="${mode}"]`).click();
      await expect(master).toHaveAttribute("data-mode",mode);
      await expect(master).toHaveAttribute("data-settled","true");
      await expect(page.locator("[data-future]")).toHaveCount(0);
      const oldOpacity=await page.locator("[data-version-old]").evaluate(e=>+getComputedStyle(e).opacity);
      expect(oldOpacity).toBe(mode==="transform"?.26:0);
      if(width===1440 && mode==="transform") {
        await master.screenshot({path:"artifacts/production-scene-transform.png",style:"[data-site-header], [class*='TextPreview_launcher'], .skip { visibility:hidden !important; }"});
      }
    }
    for(let i=0;i<12;i++) await page.locator(`[data-control="${["organize","transform"][i%2]}"]`).click();
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
    await page.locator('[data-control="transform"]').click();
    await expect(master).toHaveAttribute("data-settled","true");
    await page.locator('[data-control="organize"]').click();
    await expect(master).toHaveAttribute("data-settled","true");
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(width===1440) expect((await master.boundingBox())!.height).toBeLessThanOrEqual(800);
    const a11y=await new AxeBuilder({page}).include("#views").withTags(["wcag2a","wcag2aa"]).analyze();
    expect(a11y.violations).toEqual([]);
    await page.mouse.move(0,0);
    await master.screenshot({path:`artifacts/operate-scene-${width}.png`,style:"[data-site-header], [class*='TextPreview_launcher'], .skip { visibility:hidden !important; }"});
    await page.emulateMedia({reducedMotion:"no-preference"});
  }
  expect(errors).toEqual([]);
});

test("no future branch can be reached after interrupted perspective changes", async ({page}) => {
  await page.goto("/");
  const master=page.locator("#views");
  for (let i=0;i<12;i++) {
    await page.locator(`[data-control="${i%2 ? "transform" : "organize"}"]`).click();
  }
  await expect(master).toHaveAttribute("data-settled","true");
  await expect(master.locator("[data-future], [data-hit^='future'], [data-control='extend']")).toHaveCount(0);
  await expect(master.locator("[data-hit]")).toHaveCount(8);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.locator('[data-control="overview"]').click();
  await expect(master).toHaveAttribute("data-settled","true");
  await expect(master.locator("[data-future]")).toHaveCount(0);
});
