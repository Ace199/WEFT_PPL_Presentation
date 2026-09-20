# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-scroll-snap.spec.ts >> production anchor and expanded reading stay usable
- Location: tests\home-scroll-snap.spec.ts:35:5

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   724

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - link "跳至正文" [ref=e4] [cursor=pointer]:
      - /url: "#main"
    - banner [ref=e5]:
      - button "展开导航" [ref=e6] [cursor=pointer]
      - link "WEFT / PPL" [ref=e7] [cursor=pointer]:
        - /url: /
      - navigation "章节导航" [ref=e8]:
        - link "00 / 项目概览" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "01 / 系统思考" [ref=e10] [cursor=pointer]:
          - /url: /systematic-thinking/
        - link "02 / 设计&创新" [ref=e11] [cursor=pointer]:
          - /url: /design-innovation/
        - link "03 / 联系" [ref=e12] [cursor=pointer]:
          - /url: /contact/
      - generic [ref=e13]:
        - 'group "生产状态：PRODUCTION SYSTEM，STATUS: ACTIVE，2026" [ref=e14]':
          - generic [aria-hidden] [ref=e15]:
            - generic [ref=e16]: PRODUCTION SYSTEM
            - generic [ref=e17]: "STATUS: ACTIVE"
            - generic [ref=e18]: "2026"
        - group "Language / 语言" [ref=e19]:
          - button "切换为中文" [pressed] [ref=e20] [cursor=pointer]: 中
          - generic [aria-hidden] [ref=e21]: /
          - button "Switch to English" [ref=e22] [cursor=pointer]: En
    - main [ref=e23]:
      - region "WEFT / PPL" [ref=e24]:
        - generic:
          - heading "WEFT / PPL" [level=1]:
            - generic:
              - generic: WEFT / PPL
              - generic [aria-hidden]:
                - generic:
                  - generic: W
                  - generic: E
                  - generic: F
                  - generic: T
                - generic: /
                - generic:
                  - generic: P
                  - generic: P
                  - generic: L
          - heading "跨软件协作的动画生产系统" [level=2]:
            - generic:
              - generic: 跨软件协作的动画生产系统
              - generic [aria-hidden]:
                - generic:
                  - generic: 跨
                  - generic: 软
                  - generic: 件
                  - generic: 协
                  - generic: 作
                  - generic: 的
                  - generic: 动
                  - generic: 画
                  - generic: 生
                  - generic: 产
                  - generic: 系
                  - generic: 统
          - paragraph:
            - generic:
              - generic: 让不同人、不同软件产出的制作成果，能够正确交接和组合。
              - generic [aria-hidden]:
                - generic:
                  - generic: 让
                  - generic: 不
                  - generic: 同
                  - generic: 人
                  - generic: 、
                  - generic: 不
                  - generic: 同
                  - generic: 软
                  - generic: 件
                  - generic: 产
                  - generic: 出
                  - generic: 的
                  - generic: 制
                  - generic: 作
                  - generic: 成
                  - generic: 果
                  - generic: ，
                  - generic: 能
                  - generic: 够
                  - generic: 正
                  - generic: 确
                  - generic: 交
                  - generic: 接
                  - generic: 和
                  - generic: 组
                  - generic: 合
                  - generic: 。
        - list [ref=e165]:
          - listitem [ref=e166]:
            - generic [ref=e167]: Maya / Houdini
          - listitem [ref=e172]:
            - generic [ref=e173]: 2-person team
          - listitem [ref=e179]:
            - generic [ref=e180]: Active Production
      - region [ref=e184]:
        - list [ref=e345]:
          - listitem [ref=e346]: 分散的成果
          - listitem [ref=e347]: 有序的组织
          - listitem [ref=e348]: 协同的生产
        - generic [ref=e349]:
          - heading "独立变化，也能协同工作。" [level=2] [ref=e350]
          - paragraph [ref=e351]: WEFT / PPL 将任务、制作成果、版本与依赖组织进共享的 Production Model，连接 Maya 与 Houdini 的工作流程。
      - region [ref=e352]:
        - generic [ref=e353]:
          - generic [ref=e354]:
            - heading "ONE SYSTEM / THREE VIEWS" [level=2] [ref=e355]
            - paragraph [ref=e356]: 同一个系统，三个观察角度。
          - group "检查生产模型节点" [ref=e358]:
            - generic [ref=e359]:
              - generic [ref=e360]: PRODUCTION MODULES
              - generic [ref=e361]:
                - button "图示 / 检查 相机 / PRODUCT" [ref=e362] [cursor=pointer]:
                  - generic [ref=e364]: 相机
                  - generic [ref=e365]: 独立取景
                - button "图示 / 检查 场景 / PRODUCT" [ref=e370] [cursor=pointer]:
                  - generic [ref=e372]: 场景
                  - generic [ref=e373]: 空间与环境
              - button "图示 / 检查 资产 / PRODUCT" [ref=e378] [cursor=pointer]:
                - generic [ref=e380]: 资产
                - generic [ref=e381]: 独立制作成果
                - generic [ref=e382]: v1
              - button "图示 / 检查 VERSION" [ref=e388] [cursor=pointer]:
                - generic [ref=e390]: Module
            - generic [ref=e391]:
              - button "图示 / 检查 DEPENDENCY" [ref=e392] [cursor=pointer]
              - button "图示 / 检查 RESOLUTION" [ref=e398] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=e401] [cursor=pointer]
            - generic [ref=e403]:
              - button "图示 / 检查 CONTEXT" [ref=e404] [cursor=pointer]:
                - generic [ref=e406]: SHARED MODEL
              - button "图示 / 检查 PRODUCT" [ref=e407] [cursor=pointer]
              - generic [ref=e415]:
                - generic [aria-hidden]:
                  - generic [ref=e416] [cursor=pointer]
                  - generic: 身份
                - generic [aria-hidden]:
                  - generic [ref=e417] [cursor=pointer]
                  - generic: 版本
                - generic [aria-hidden]:
                  - generic [ref=e418] [cursor=pointer]
                  - generic: 依赖
                - generic [aria-hidden]:
                  - generic [ref=e419] [cursor=pointer]
                  - generic: 校验
              - button "图示 / 检查 STATE" [ref=e420] [cursor=pointer]
              - generic [ref=e422]:
                - button "图示 / 检查 BUILDER" [ref=e423] [cursor=pointer]:
                  - generic [ref=e427]: BUILDER
                - button "图示 / 检查 LOADER" [ref=e428] [cursor=pointer]:
                  - generic [ref=e432]: LOADER
                - button "图示 / 检查 PUBLISH" [ref=e433] [cursor=pointer]:
                  - generic [ref=e437]: PUBLISH
                - button "图示 / 检查 REVIEW" [ref=e438] [cursor=pointer]:
                  - generic [ref=e442]: REVIEW
                - button "图示 / 检查 HOUDINI" [ref=e443] [cursor=pointer]:
                  - generic [ref=e447]: HOUDINI
                - button "图示 / 检查 MAYA" [ref=e448] [cursor=pointer]:
                  - generic [ref=e452]: MAYA
            - generic [ref=e453]:
              - button "图示 / 检查 COMPOSITION" [ref=e454] [cursor=pointer]:
                - generic [ref=e456]: COMPOSED WORKSPACE
              - generic [ref=e457]:
                - button "图示 / 检查 CONTEXT" [ref=e458] [cursor=pointer]
                - generic [ref=e462]:
                  - button "图示 / 检查 场景 / COMPOSITION" [ref=e463] [cursor=pointer]
                  - button "图示 / 检查 相机 / COMPOSITION" [ref=e468] [cursor=pointer]
                - button "图示 / 检查 资产 / COMPOSITION" [ref=e473] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=e478] [cursor=pointer]:
                - generic [ref=e480]: 独立选择，组合为同一个镜头
            - generic [ref=e481]:
              - generic [ref=e482]: 独立的制作成果
              - generic [ref=e483]: 执行共享模型
              - generic [ref=e484]: 协同的工作空间
          - generic "检查生产模型节点" [ref=e485]:
            - button "检查 CONTEXT" [ref=e486]: CONTEXT
            - button "检查 PRODUCT" [ref=e487]: PRODUCT
            - button "检查 VERSION" [ref=e488]: VERSION
            - button "检查 DEPENDENCY" [ref=e489]: DEPENDENCY
            - button "检查 STATE" [ref=e490]: STATE
            - button "检查 VALIDATION" [ref=e491]: VALIDATION
            - button "检查 RESOLUTION" [ref=e492]: RESOLUTION
            - button "检查 COMPOSITION" [ref=e493]: COMPOSITION
            - button "检查 BUILDER" [ref=e494]: BUILDER
            - button "检查 LOADER" [ref=e495]: LOADER
            - button "检查 PUBLISH" [ref=e496]: PUBLISH
            - button "检查 REVIEW" [ref=e497]: REVIEW
            - button "检查 MAYA" [ref=e498]: MAYA
            - button "检查 HOUDINI" [ref=e499]: HOUDINI
          - generic "观察角度" [ref=e500]:
            - generic [ref=e501]:
              - button "01 / SYSTEMATIC THINKING 复杂生产，如何成为系统？ ORGANIZE" [ref=e502] [cursor=pointer]:
                - generic [ref=e503]: 01 / SYSTEMATIC THINKING
                - strong [ref=e504]: 复杂生产，如何成为系统？
                - generic [ref=e505]: ORGANIZE
              - link "EXPLORE SYSTEMATIC THINKING" [ref=e506] [cursor=pointer]:
                - /url: /systematic-thinking/
                - text: EXPLORE ↗
            - generic [ref=e507]:
              - button "02 / DESIGN & INNOVATION 重新审视默认假设，由此形成新的设计判断。 TRANSFORM" [ref=e508] [cursor=pointer]:
                - generic [ref=e509]: 02 / DESIGN & INNOVATION
                - strong [ref=e510]: 重新审视默认假设，由此形成新的设计判断。
                - generic [ref=e511]: TRANSFORM
              - link "EXPLORE DESIGN & INNOVATION" [ref=e512] [cursor=pointer]:
                - /url: /design-innovation/
                - text: EXPLORE ↗
            - generic [ref=e513]:
              - button "03 / IN PRACTICE 设计如何进入真实制作？ OPERATE" [pressed] [ref=e514] [cursor=pointer]:
                - generic [ref=e515]: 03 / IN PRACTICE
                - strong [ref=e516]: 设计如何进入真实制作？
                - generic [ref=e517]: OPERATE
              - link "VIEW PRODUCTION" [ref=e518] [cursor=pointer]:
                - /url: "#production"
                - text: VIEW PRODUCTION ↘
          - generic [ref=e519]:
            - generic [ref=e520]: MODEL → PRACTICE
            - paragraph [ref=e521]: Builder、Loader、Publish 与跨 DCC 工作流如何执行同一套 Production Model。
          - generic [ref=e522]:
            - button "OVERVIEW" [ref=e523] [cursor=pointer]: OVERVIEW ↺
            - generic [ref=e524]: VIEW MODE / OPERATE
            - generic [ref=e525]: 执行关系示意 · 非实时运行状态
        - group [ref=e526]:
          - generic "查看模型文字说明" [ref=e527] [cursor=pointer]
      - region [ref=e528]:
        - generic [ref=e529]:
          - heading "IN PRODUCTION" [level=2] [ref=e530]
          - paragraph
          - generic [ref=e531]:
            - generic [ref=e532]:
              - term [ref=e533]:
                - generic [ref=e534]: DCC Software
                - generic [aria-hidden] [ref=e535]:
                  - generic [ref=e536]:
                    - generic: D
                    - generic: C
                    - generic: C
                  - generic [ref=e537]:
                    - generic: S
                    - generic: o
                    - generic: f
                    - generic: t
                    - generic: w
                    - generic: a
                    - generic: r
                    - generic: e
              - definition [ref=e538]:
                - generic [ref=e539]: Maya 2022 / Houdini 21–22
                - generic [aria-hidden] [ref=e540]:
                  - generic [ref=e541]:
                    - generic: M
                    - generic: a
                    - generic: "y"
                    - generic: a
                  - generic [ref=e542]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "2"
                  - generic [ref=e543]: /
                  - generic [ref=e544]:
                    - generic: H
                    - generic: o
                    - generic: u
                    - generic: d
                    - generic: i
                    - generic: "n"
                    - generic: i
                  - generic [ref=e545]:
                    - generic: "2"
                    - generic: "1"
                  - generic [ref=e546]: –
                  - generic [ref=e547]:
                    - generic: "2"
                    - generic: "2"
            - generic [ref=e548]:
              - term [ref=e549]:
                - generic [ref=e550]: SYSTEM
              - definition [ref=e553]:
                - generic [ref=e554]:
                  - link "Rez" [ref=e556] [cursor=pointer]:
                    - /url: https://rez.readthedocs.io/en/stable/#
                  - generic [ref=e561]: /
                  - link "Ftrack" [ref=e566] [cursor=pointer]:
                    - /url: https://www.ftrack.com/cn/
                  - generic [ref=e571]: /
                  - link "Pyblish" [ref=e576] [cursor=pointer]:
                    - /url: https://pyblish.com/
            - generic [ref=e581]:
              - term [ref=e582]:
                - generic [ref=e583]: WORKFLOW
              - definition [ref=e586]:
                - generic [ref=e587]: Builder / Loader / Publish / Dailies
            - generic [ref=e596]:
              - term [ref=e597]:
                - generic [ref=e598]: Production Format
              - definition [ref=e602]:
                - generic [ref=e603]: USD / Alembic
            - generic [ref=e608]:
              - term [ref=e609]:
                - generic [ref=e610]: STATUS
              - definition [ref=e613]:
                - generic [ref=e614]: Active / 2026
            - generic [ref=e619]:
              - term [ref=e620]:
                - generic [ref=e621]: PROJECT
              - definition [ref=e624]:
                - generic [ref=e625]: 动画电影《赵子龙》
        - figure "选择模块与版本，组装镜头。" [ref=e629]:
          - heading "FIG. 01 / SHOT BUILDER" [level=3] [ref=e630]
          - button "放大查看 SHOT BUILDER" [ref=e631]:
            - img "Shot Builder 实际界面：模块、版本选择与组装状态。" [ref=e632]
            - generic [ref=e633]: 放大查看 ↗
        - figure "收集、检查与发布，形成明确的交付流程。" [ref=e635]:
          - heading "FIG. 02 / PUBLISH / QC" [level=3] [ref=e636]
          - button "放大查看 PUBLISH / QC" [ref=e637]:
            - img "Publish 实际界面：收集、检查、发布与集成步骤。" [ref=e638]
            - generic [ref=e639]: 放大查看 ↗
        - generic [ref=e641]:
          - paragraph [ref=e642]: 2026.04–08 核心开发 · 两人团队。作者作为 Lead Pipeline TD / System Designer 主导架构与核心实现；另一位成员扩展 Production Modules，并主导场景组装核心能力。
          - paragraph [ref=e643]: 实际工具界面
    - contentinfo [ref=e644]:
      - generic [ref=e645]:
        - text: WEFT / PPL
        - paragraph [ref=e646]: SAME PIPELINE MORE POSSIBILITIES
      - button "人、数据与软件在同一生产系统中连接；重播动画" [ref=e647]:
        - img "人、数据与软件在同一生产系统中连接" [ref=e648]:
          - generic [ref=e657]:
            - generic [ref=e658]: PEOPLE
            - generic [ref=e659]: DATA
            - generic [ref=e660]: SOFTWARE
      - generic [ref=e661]:
        - link "03 / CONTACT" [ref=e662] [cursor=pointer]:
          - /url: /contact/
          - text: 03 / CONTACT ↗
        - link "BACK TO TOP" [ref=e663] [cursor=pointer]:
          - /url: "#top"
          - text: BACK TO TOP ↑
  - alert [ref=e664]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  4   | 
  5   | const snapType = (page: import("@playwright/test").Page) =>
  6   |   page.evaluate(() => {
  7   |     const value = getComputedStyle(document.documentElement).scrollSnapType;
  8   |     // Chromium omits the default proximity keyword in computed styles.
  9   |     return value === "y" ? "y proximity" : value;
  10  |   });
  11  | 
  12  | test("homepage wheel approaches settle at sections and can leave in both directions", async ({ page }) => {
  13  |   await page.goto("/");
  14  |   await page.evaluate(() => document.fonts.ready);
  15  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  16  |   await page.mouse.move(1420, 450);
  17  |   for (const id of ["summary", "views"]) {
  18  |     const section = page.locator(`#${id}`);
  19  |     const distance = await section.evaluate(el => el.getBoundingClientRect().top - 8 - 45);
  20  |     await page.mouse.wheel(0, distance);
  21  |     await expect.poll(async () => Math.abs((await section.boundingBox())!.y - 8)).toBeLessThan(2);
  22  |   }
  23  |   const before = await page.evaluate(() => scrollY);
  24  |   await page.mouse.wheel(0, 500);
  25  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
  26  |   const after = await page.evaluate(() => scrollY);
  27  |   await page.mouse.wheel(0, -600);
  28  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(after - 100);
  29  |   await page.keyboard.press("Control+End");
  30  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
  31  |   await page.getByRole("link", { name: /BACK TO TOP/ }).click();
  32  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(2);
  33  | });
  34  | 
  35  | test("production anchor and expanded reading stay usable", async ({ page }) => {
  36  |   await page.goto("/#views");
  37  |   await page.locator('[data-control="operate"]').click();
  38  |   await page.getByRole("link", { name: "VIEW PRODUCTION", exact: true }).click();
  39  |   await expect(page).toHaveURL(/#production$/);
  40  |   await expect.poll(() => page.locator("#production").evaluate(el => {
  41  |     const top = el.getBoundingClientRect().top;
  42  |     const documentTop = top + scrollY;
  43  |     const maxScroll = document.documentElement.scrollHeight - innerHeight;
  44  |     return Math.abs(top - Math.max(8, documentTop - maxScroll));
> 45  |   })).toBeLessThan(2);
      |       ^ Error: expect(received).toBeLessThan(expected)
  46  |   await page.locator("#production").getByRole("button", { name: /放大查看/ }).first().click();
  47  |   await expect(page.locator("dialog[open]")).toBeVisible();
  48  |   await expect.poll(() => snapType(page)).toBe("none");
  49  |   await page.keyboard.press("Escape");
  50  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  51  |   await page.locator("#views details summary").click();
  52  |   await expect.poll(() => snapType(page)).toBe("none");
  53  |   await page.locator("#views details summary").click();
  54  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  55  | });
  56  | 
  57  | test("coarse pointers and no-JavaScript fallback keep natural scrolling", async ({ browser }) => {
  58  |   for (const options of [{ hasTouch: true }, { javaScriptEnabled: false }]) {
  59  |     const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference", ...options });
  60  |     const page = await context.newPage();
  61  |     await page.goto("http://127.0.0.1:4173/");
  62  |     expect(await snapType(page)).toBe("none");
  63  |     await context.close();
  64  |   }
  65  | });
  66  | 
  67  | test("01 and 02 opt in, Contact and accessibility fallbacks keep natural scrolling", async ({ page }) => {
  68  |   await page.goto("/");
  69  |   await page.getByRole("link", { name: "02 / 设计&创新", exact: true }).click();
  70  |   await expect(page).toHaveURL(/\/design-innovation\/$/);
  71  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  72  |   await page.goto("/systematic-thinking/");
  73  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  74  |   await page.goto("/contact/");
  75  |   expect(await snapType(page)).toBe("none");
  76  |   for (const route of ["/", "/systematic-thinking/", "/design-innovation/"]) {
  77  |     await page.goto(route);
  78  |     await page.setViewportSize({ width: 390, height: 844 });
  79  |     expect(await snapType(page)).toBe("none");
  80  |     await page.setViewportSize({ width: 1440, height: 900 });
  81  |     await page.emulateMedia({ reducedMotion: "reduce" });
  82  |     expect(await snapType(page)).toBe("none");
  83  |     await page.emulateMedia({ reducedMotion: "no-preference" });
  84  |     await expect.poll(() => snapType(page)).toBe("y proximity");
  85  |   }
  86  | });
  87  | 
  88  | test("01 section stops preserve reading of the tall opening", async ({ page }) => {
  89  |   await page.goto("/systematic-thinking/");
  90  |   await page.evaluate(() => document.fonts.ready);
  91  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  92  |   await page.mouse.move(1420, 450);
  93  |   await page.mouse.wheel(0, 380);
  94  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  95  |   const section = page.locator("#systematic-change");
  96  |   await page.mouse.wheel(0, await section.evaluate(el => el.getBoundingClientRect().top - 8 - 45));
  97  |   await expect.poll(async () => Math.abs((await section.boundingBox())!.y - 8)).toBeLessThan(2);
  98  |   await page.keyboard.press("Control+End");
  99  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
  100 | });
  101 | 
  102 | test("02 viewer snaps as a unit while the card body scrolls independently", async ({ page }) => {
  103 |   await page.goto("/design-innovation/");
  104 |   await page.evaluate(() => document.fonts.ready);
  105 |   await expect.poll(() => snapType(page)).toBe("y proximity");
  106 |   await page.mouse.move(1420, 450);
  107 |   const viewer = page.locator("#design-viewer");
  108 |   await page.mouse.wheel(0, await viewer.evaluate(el => el.getBoundingClientRect().top - 8 - 45));
  109 |   await expect.poll(async () => Math.abs((await viewer.boundingBox())!.y - 8)).toBeLessThan(2);
  110 |   const outer = await page.evaluate(() => scrollY);
  111 |   const body = page.locator('#decision-compatibility [data-card-scroll]');
  112 |   const box = (await body.boundingBox())!;
  113 |   await page.mouse.move(box.x + box.width / 2, box.y + 80);
  114 |   await page.mouse.wheel(0, 450);
  115 |   await expect.poll(() => body.evaluate(el => el.scrollTop)).toBeGreaterThan(100);
  116 |   expect(Math.abs(await page.evaluate(() => scrollY) - outer)).toBeLessThan(2);
  117 |   await expect(viewer).toHaveAttribute("data-active-decision", "compatibility");
  118 |   await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  119 |   await page.mouse.wheel(0, 450);
  120 |   await page.waitForTimeout(350);
  121 |   expect(Math.abs(await page.evaluate(() => scrollY) - outer)).toBeLessThan(2);
  122 |   await page.mouse.move(1420, 450);
  123 |   await page.mouse.wheel(0, 700);
  124 |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(outer + 100);
  125 |   await expect(page.getByRole("link", { name: "03 / CONTACT", exact: true })).toBeInViewport();
  126 | });
  127 | 
```