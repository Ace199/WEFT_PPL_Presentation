import {test, expect} from "@playwright/test";
import {canvasReducer} from "../src/lib/canvas-state";
import {updatedAssetDots} from "../src/lib/production-geometry";

test("selection reducer restores pinned inspection and drops hidden selections on mode changes", () => {
  const selected = canvasReducer({mode:"organize"}, {type:"SELECT_NODE", id:"version"});
  expect(selected.pinnedNode).toBe("version");
  const hover = canvasReducer(selected, {type:"FOCUS_NODE", id:"dependency"});
  expect(canvasReducer(hover, {type:"BLUR_NODE"}).focusedNode).toBe("version");
  expect(canvasReducer(selected, {type:"SELECT_NODE", id:"version"}).focusedNode).toBeUndefined();
  expect(canvasReducer(selected, {type:"SELECT_NODE", id:"future-0"})).toEqual(selected);
  expect(canvasReducer(selected, {type:"ENTER_VIEW", view:"transform"})).toEqual({mode:"transform",scene:"preview"});
});

test("model labels and scene regions link in both directions, pin and clear", async ({page}) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  const master=page.locator("#views"), scene=page.locator("[data-production-scene]");
  await page.locator('[data-control="organize"]').click();
  await expect(master).toHaveAttribute("data-settled","true");
  for(const node of ["context","product","version","dependency","state","validation","resolution","composition"]) {
    await page.locator(`[data-hit="${node}"]`).hover();
    await expect(master).toHaveAttribute("data-focused-node",node);
    expect(await scene.locator('[data-link-state="active"]').count()).toBeGreaterThan(0);
    await expect(master.locator('[aria-live="polite"] b')).toHaveText(node.toUpperCase());
  }
  const version=scene.locator('[data-organize] [data-scene-node="version"]');
  const dependency=scene.locator('[data-organize] [data-scene-node="dependency"]');
  await version.hover();
  await expect(page.locator('[data-hit="version"]')).toHaveAttribute("data-active","true");
  await expect(scene.locator('[data-character-result]').locator("..").locator("..")).toHaveAttribute("data-link-state","active");
  await version.click();
  await expect(master).toHaveAttribute("data-pinned-node","version");
  await dependency.hover();
  await expect(master).toHaveAttribute("data-focused-node","dependency");
  await scene.getByText("PRODUCTION MODULES", {exact:true}).hover();
  await expect(master).toHaveAttribute("data-focused-node","version");
  await scene.getByText("PRODUCTION MODULES", {exact:true}).click();
  await expect(master).toHaveAttribute("data-pinned-node","");
  await expect(master).toHaveAttribute("data-focused-node","");
  await dependency.focus();
  await page.keyboard.press("Enter");
  await expect(master).toHaveAttribute("data-pinned-node","dependency");
  await page.keyboard.press("Escape");
  await expect(master).toHaveAttribute("data-pinned-node","");
  await expect(master).toHaveAttribute("data-mode","organize");
  await page.locator('[data-control="extend"]').click();
  await scene.locator('[data-scene-node="future-2"]').focus();
  await page.keyboard.press("Space");
  await expect(page.locator('[data-hit="future-2"]')).toHaveAttribute("aria-pressed","true");
  await page.locator('[data-control="organize"]').click();
  await expect(master).toHaveAttribute("data-pinned-node","");
  await expect(scene.locator('[data-future] [tabindex="0"]')).toHaveCount(0);
  await page.locator('[data-hit="version"]').click();
  await expect(master.locator('[aria-live="polite"] b')).toHaveText("VERSION");
  await master.screenshot({path:"artifacts/scene-linking-version.png",style:"[data-site-header], .skip, [class*='TextPreview_launcher'] {visibility:hidden!important}"});
});

test("inspection does not replay 02 geometry or restart its timeline", async ({page}) => {
  await page.goto("/");
  const master=page.locator("#views"), dots=page.locator("[data-result-dots]");
  await page.locator('[data-control="transform"]').click();
  await expect(master).toHaveAttribute("data-settled","true");
  for(const node of ["version","resolution","composition"]) {
    await page.locator(`[data-hit="${node}"]`).click();
    await expect(master).toHaveAttribute("data-settled","true");
    expect(await dots.getAttribute("d")).toBe(updatedAssetDots);
  }
  await page.locator('[data-control="extend"]').click();
  await page.locator('[data-hit="future-0"]').hover();
  await page.locator('[data-control="organize"]').click();
  await expect(master).toHaveAttribute("data-settled","true");
  await expect(master).toHaveAttribute("data-focused-node","");
});

test.describe("touch inspection", () => {
  test.use({viewport:{width:390,height:900},hasTouch:true,isMobile:true});
  test("diagram targets and labels share a selection on mobile", async ({page}) => {
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.goto("/");
    await page.locator('[data-control="organize"]').tap();
    const master=page.locator("#views");
    const version=page.locator('[data-organize] [data-scene-node="version"]');
    await version.tap();
    await expect(page.locator('[data-hit="version"]')).toHaveAttribute("aria-pressed","true");
    await page.locator('[data-hit="state"]').tap();
    await expect(page.locator('[data-scene-node="state"]')).toHaveAttribute("data-link-state","active");
    await page.locator('[data-production-scene]').getByText("PRODUCTION MODULES",{exact:true}).tap();
    await expect(master).toHaveAttribute("data-pinned-node","");
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  });
});
