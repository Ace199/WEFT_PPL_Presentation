# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: production-scene.spec.ts >> production scene: responsive layout, overview and two perspectives, keyboard and reduced motion
- Location: tests\production-scene.spec.ts:28:5

# Error details

```
Error: locator.screenshot: UNKNOWN: unknown error, open 'D:\SYCP_PPL\work_report\artifacts\production-scene-768.png'
```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - generic [ref=f1e3]:
    - link "跳至正文" [ref=f1e4] [cursor=pointer]:
      - /url: "#main"
    - banner [ref=f1e5]:
      - button "收起导航" [expanded] [ref=f1e6] [cursor=pointer]: ↑
      - link "WEFT / PPL" [ref=f1e7] [cursor=pointer]:
        - /url: /
      - navigation "章节导航" [ref=f1e8]:
        - link "00 / 项目概览" [ref=f1e9] [cursor=pointer]:
          - /url: /
        - link "01 / 系统思考" [ref=f1e10] [cursor=pointer]:
          - /url: /systematic-thinking/
        - link "02 / 设计与创新" [ref=f1e11] [cursor=pointer]:
          - /url: /design-innovation/
        - link "03 / 联系" [ref=f1e12] [cursor=pointer]:
          - /url: /contact/
      - generic [ref=f1e13]:
        - generic [ref=f1e14]:
          - generic [ref=f1e15]: PRODUCTION SYSTEM
          - generic [ref=f1e16]: "STATUS: ACTIVE"
          - generic [ref=f1e17]: "2026"
        - group "Language / 语言" [ref=f1e18]:
          - button "切换为中文" [pressed] [ref=f1e19] [cursor=pointer]: 中
          - generic [aria-hidden] [ref=f1e20]: /
          - button "Switch to English" [ref=f1e21] [cursor=pointer]: En
    - main [ref=f1e22]:
      - region "WEFT / PPL" [ref=f1e23]:
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
        - list [ref=f1e24]:
          - listitem [ref=f1e25]:
            - generic [ref=f1e26]: Maya / Houdini
            - generic [aria-hidden] [ref=f1e27]:
              - generic [ref=f1e28]:
                - generic: M
                - generic: a
                - generic: "y"
                - generic: a
              - generic [ref=f1e29]: /
              - generic [ref=f1e30]:
                - generic: H
                - generic: o
                - generic: u
                - generic: d
                - generic: i
                - generic: "n"
                - generic: i
          - listitem [ref=f1e31]:
            - text: ·
            - generic [ref=f1e32]: 2-person team
            - generic [aria-hidden] [ref=f1e33]:
              - generic [ref=f1e34]: "2"
              - generic [ref=f1e35]: "-"
              - generic [ref=f1e36]:
                - generic: p
                - generic: e
                - generic: r
                - generic: s
                - generic: o
                - generic: "n"
              - generic [ref=f1e37]:
                - generic: t
                - generic: e
                - generic: a
                - generic: m
          - listitem [ref=f1e38]:
            - text: ·
            - generic [ref=f1e39]: Active Production
            - generic [aria-hidden] [ref=f1e40]:
              - generic [ref=f1e41]:
                - generic: A
                - generic: c
                - generic: t
                - generic: i
                - generic: v
                - generic: e
              - generic [ref=f1e42]:
                - generic: P
                - generic: r
                - generic: o
                - generic: d
                - generic: u
                - generic: c
                - generic: t
                - generic: i
                - generic: o
                - generic: "n"
      - region [ref=f1e43]:
        - list [ref=f1e204]:
          - listitem [ref=f1e205]: 分散的成果
          - listitem [ref=f1e206]: 有序的组织
          - listitem [ref=f1e207]: 协同的生产
        - generic [ref=f1e208]:
          - heading "独立变化，也能协同工作。" [level=2] [ref=f1e209]
          - paragraph [ref=f1e210]: WEFT / PPL 将任务、制作成果、版本与依赖组织进共享的 Production Model，连接 Maya 与 Houdini 的工作流程。
      - region [ref=f1e211]:
        - generic [ref=f1e212]:
          - generic [ref=f1e213]:
            - heading "ONE SYSTEM / THREE VIEWS" [level=2] [ref=f1e214]
            - paragraph [ref=f1e215]: 同一个系统，三个观察角度。
          - group "检查生产模型节点" [ref=f1e217]:
            - generic [ref=f1e218]:
              - generic [ref=f1e219]: PRODUCTION MODULES
              - generic [ref=f1e220]:
                - button "图示 / 检查 相机 / PRODUCT" [ref=f1e221] [cursor=pointer]:
                  - generic [ref=f1e223]: 相机
                  - generic [ref=f1e224]: 独立取景
                - button "图示 / 检查 场景 / PRODUCT" [ref=f1e229] [cursor=pointer]:
                  - generic [ref=f1e231]: 场景
                  - generic [ref=f1e232]: 空间与环境
              - button "图示 / 检查 资产 / PRODUCT" [ref=f1e237] [cursor=pointer]:
                - generic [ref=f1e239]: 资产
                - generic [ref=f1e240]: 独立制作成果
                - generic [ref=f1e241]: v1
              - button "图示 / 检查 VERSION" [ref=f1e247] [cursor=pointer]:
                - generic [ref=f1e249]: Module
            - generic [ref=f1e250]:
              - button "图示 / 检查 DEPENDENCY" [ref=f1e251] [cursor=pointer]
              - button "图示 / 检查 RESOLUTION" [ref=f1e257] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=f1e260] [cursor=pointer]
            - generic [ref=f1e262]:
              - button "图示 / 检查 CONTEXT" [ref=f1e263] [cursor=pointer]:
                - generic [ref=f1e265]: SHARED MODEL
              - button "图示 / 检查 PRODUCT" [ref=f1e266] [cursor=pointer]
              - generic [ref=f1e274]:
                - button "图示 / 检查 身份 / PRODUCT" [ref=f1e275] [cursor=pointer]:
                  - generic [ref=f1e277]: 身份
                - button "图示 / 检查 版本 / VERSION" [ref=f1e279] [cursor=pointer]:
                  - generic [ref=f1e281]: 版本
                - button "图示 / 检查 依赖 / DEPENDENCY" [ref=f1e283] [cursor=pointer]:
                  - generic [ref=f1e285]: 依赖
                - button "图示 / 检查 校验 / VALIDATION" [ref=f1e287] [cursor=pointer]:
                  - generic [ref=f1e289]: 校验
              - button "图示 / 检查 STATE" [ref=f1e291] [cursor=pointer]:
                - generic [ref=f1e294]: 完整的当前状态
                - generic [ref=f1e295]: STATE
            - generic [ref=f1e296]:
              - button "图示 / 检查 COMPOSITION" [ref=f1e297] [cursor=pointer]:
                - generic [ref=f1e299]: COMPOSED WORKSPACE
              - generic [ref=f1e300]:
                - button "图示 / 检查 CONTEXT" [ref=f1e301] [cursor=pointer]
                - generic [ref=f1e305]:
                  - button "图示 / 检查 场景 / COMPOSITION" [ref=f1e306] [cursor=pointer]
                  - button "图示 / 检查 相机 / COMPOSITION" [ref=f1e311] [cursor=pointer]
                - button "图示 / 检查 资产 / COMPOSITION" [ref=f1e316] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=f1e321] [cursor=pointer]:
                - generic [ref=f1e323]: 独立选择，组合为同一个镜头
            - generic [ref=f1e324]:
              - generic [ref=f1e325]: 独立的制作成果
              - generic [ref=f1e326]: 系统组织
              - generic [ref=f1e327]: 协同的工作空间
          - generic "检查生产模型节点" [ref=f1e328]:
            - button "检查 CONTEXT" [ref=f1e329]: CONTEXT
            - button "检查 PRODUCT" [ref=f1e330]: PRODUCT
            - button "检查 VERSION" [ref=f1e331]: VERSION
            - button "检查 DEPENDENCY" [ref=f1e332]: DEPENDENCY
            - button "检查 STATE" [ref=f1e333]: STATE
            - button "检查 VALIDATION" [ref=f1e334]: VALIDATION
            - button "检查 RESOLUTION" [ref=f1e335]: RESOLUTION
            - button "检查 COMPOSITION" [ref=f1e336]: COMPOSITION
          - generic "观察角度" [ref=f1e337]:
            - generic [ref=f1e338]:
              - button "01 / SYSTEMATIC THINKING 复杂生产，如何成为系统？ ORGANIZE" [active] [pressed] [ref=f1e339] [cursor=pointer]:
                - generic [ref=f1e340]: 01 / SYSTEMATIC THINKING
                - strong [ref=f1e341]: 复杂生产，如何成为系统？
                - generic [ref=f1e342]: ORGANIZE
              - link "EXPLORE SYSTEMATIC THINKING" [ref=f1e343] [cursor=pointer]:
                - /url: /systematic-thinking/
                - text: EXPLORE ↗
            - generic [ref=f1e344]:
              - button "02 / DESIGN & INNOVATION 重新审视生产的默认假设。 TRANSFORM" [ref=f1e345] [cursor=pointer]:
                - generic [ref=f1e346]: 02 / DESIGN & INNOVATION
                - strong [ref=f1e347]: 重新审视生产的默认假设。
                - generic [ref=f1e348]: TRANSFORM
              - link "EXPLORE DESIGN & INNOVATION" [ref=f1e349] [cursor=pointer]:
                - /url: /design-innovation/
                - text: EXPLORE ↗
            - generic [ref=f1e350]:
              - button "03 / IN PRACTICE 设计如何进入真实制作？ OPERATE" [ref=f1e351] [cursor=pointer]:
                - generic [ref=f1e352]: 03 / IN PRACTICE
                - strong [ref=f1e353]: 设计如何进入真实制作？
                - generic [ref=f1e354]: OPERATE
              - link "VIEW PRODUCTION" [ref=f1e355] [cursor=pointer]:
                - /url: "#production"
                - text: VIEW PRODUCTION ↘
          - generic [ref=f1e356]:
            - generic [ref=f1e357]: COMPLEXITY → MODEL
            - paragraph [ref=f1e358]: 将人、软件与文件之间的复杂关系，组织成共享的生产模型。
          - generic [ref=f1e359]:
            - button "OVERVIEW" [ref=f1e360] [cursor=pointer]: OVERVIEW ↺
            - generic [ref=f1e361]: VIEW MODE / ORGANIZE
            - generic [ref=f1e362]: 结构示意 · 版本号仅作说明
        - group [ref=f1e363]:
          - generic "查看模型文字说明" [ref=f1e364] [cursor=pointer]
      - region [ref=f1e365]:
        - generic [ref=f1e366]:
          - heading "IN PRODUCTION" [level=2] [ref=f1e367]
          - paragraph
          - generic [ref=f1e368]:
            - generic [ref=f1e369]:
              - term [ref=f1e370]:
                - generic [ref=f1e371]: HOSTS
                - generic [ref=f1e373]:
                  - generic: H
                  - generic: O
                  - generic: S
                  - generic: T
                  - generic: S
              - definition [ref=f1e374]:
                - generic [ref=f1e375]: Maya 2022 / Houdini 21–22
                - generic [aria-hidden] [ref=f1e376]:
                  - generic [ref=f1e377]:
                    - generic: M
                    - generic: a
                    - generic: "y"
                    - generic: a
                  - generic [ref=f1e378]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "2"
                  - generic [ref=f1e379]: /
                  - generic [ref=f1e380]:
                    - generic: H
                    - generic: o
                    - generic: u
                    - generic: d
                    - generic: i
                    - generic: "n"
                    - generic: i
                  - generic [ref=f1e381]:
                    - generic: "2"
                    - generic: "1"
                  - generic [ref=f1e382]: –
                  - generic [ref=f1e383]:
                    - generic: "2"
                    - generic: "2"
            - generic [ref=f1e384]:
              - term [ref=f1e385]:
                - generic [ref=f1e386]: SYSTEM
                - generic [ref=f1e388]:
                  - generic: S
                  - generic: "Y"
                  - generic: S
                  - generic: T
                  - generic: E
                  - generic: M
              - definition [ref=f1e389]:
                - generic [ref=f1e390]: Rez / Ftrack
                - generic [aria-hidden] [ref=f1e391]:
                  - generic [ref=f1e392]:
                    - generic: R
                    - generic: e
                    - generic: z
                  - generic [ref=f1e393]: /
                  - generic [ref=f1e394]:
                    - generic: F
                    - generic: t
                    - generic: r
                    - generic: a
                    - generic: c
                    - generic: k
            - generic [ref=f1e395]:
              - term [ref=f1e396]:
                - generic [ref=f1e397]: WORKFLOW
                - generic [ref=f1e399]:
                  - generic: W
                  - generic: O
                  - generic: R
                  - generic: K
                  - generic: F
                  - generic: L
                  - generic: O
                  - generic: W
              - definition [ref=f1e400]:
                - generic [ref=f1e401]: Build / Load / Publish / Dailes Review
                - generic [aria-hidden] [ref=f1e402]:
                  - generic [ref=f1e403]:
                    - generic: B
                    - generic: u
                    - generic: i
                    - generic: l
                    - generic: d
                  - generic [ref=f1e404]: /
                  - generic [ref=f1e405]:
                    - generic: L
                    - generic: o
                    - generic: a
                    - generic: d
                  - generic [ref=f1e406]: /
                  - generic [ref=f1e407]:
                    - generic: P
                    - generic: u
                    - generic: b
                    - generic: l
                    - generic: i
                    - generic: s
                    - generic: h
                  - generic [ref=f1e408]: /
                  - generic [ref=f1e409]:
                    - generic: D
                    - generic: a
                    - generic: i
                    - generic: l
                    - generic: e
                    - generic: s
                  - generic [ref=f1e410]:
                    - generic: R
                    - generic: e
                    - generic: v
                    - generic: i
                    - generic: e
                    - generic: w
            - generic [ref=f1e411]:
              - term [ref=f1e412]:
                - generic [ref=f1e413]: FORMAT
                - generic [ref=f1e415]:
                  - generic: F
                  - generic: O
                  - generic: R
                  - generic: M
                  - generic: A
                  - generic: T
              - definition [ref=f1e416]:
                - generic [ref=f1e417]: USD / Alembic
                - generic [aria-hidden] [ref=f1e418]:
                  - generic [ref=f1e419]:
                    - generic: U
                    - generic: S
                    - generic: D
                  - generic [ref=f1e420]: /
                  - generic [ref=f1e421]:
                    - generic: A
                    - generic: l
                    - generic: e
                    - generic: m
                    - generic: b
                    - generic: i
                    - generic: c
            - generic [ref=f1e422]:
              - term [ref=f1e423]:
                - generic [ref=f1e424]: STATUS
                - generic [ref=f1e426]:
                  - generic: S
                  - generic: T
                  - generic: A
                  - generic: T
                  - generic: U
                  - generic: S
              - definition [ref=f1e427]:
                - generic [ref=f1e428]: Active production / 2026
                - generic [aria-hidden] [ref=f1e429]:
                  - generic [ref=f1e430]:
                    - generic: A
                    - generic: c
                    - generic: t
                    - generic: i
                    - generic: v
                    - generic: e
                  - generic [ref=f1e431]:
                    - generic: p
                    - generic: r
                    - generic: o
                    - generic: d
                    - generic: u
                    - generic: c
                    - generic: t
                    - generic: i
                    - generic: o
                    - generic: "n"
                  - generic [ref=f1e432]: /
                  - generic [ref=f1e433]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "6"
        - figure "选择模块与版本，组装镜头。" [ref=f1e434]:
          - heading "FIG. 01 / SHOT BUILDER" [level=3] [ref=f1e435]
          - button "放大查看 SHOT BUILDER" [ref=f1e436]:
            - img "Shot Builder 实际界面：模块、版本选择与组装状态。" [ref=f1e437]
            - generic [ref=f1e438]: 放大查看 ↗
        - figure "收集、检查与发布，形成明确的交付流程。" [ref=f1e440]:
          - heading "FIG. 02 / PUBLISH / QC" [level=3] [ref=f1e441]
          - button "放大查看 PUBLISH / QC" [ref=f1e442]:
            - img "Publish 实际界面：收集、检查、发布与集成步骤。" [ref=f1e443]
            - generic [ref=f1e444]: 放大查看 ↗
        - generic [ref=f1e446]:
          - paragraph [ref=f1e447]: 2026.04–08 核心开发 · 两人团队。作者作为 Lead Pipeline TD / System Designer 主导架构与核心实现；另一位成员扩展 Production Modules，并主导 ASB 核心能力。
          - paragraph [ref=f1e448]: 实际工具界面；CFX 与 Hair 路径仍在演进。
    - contentinfo [ref=f1e449]:
      - generic [ref=f1e450]:
        - text: WEFT / PPL
        - paragraph [ref=f1e451]: SAME PIPELINE MORE POSSIBILITIES
      - img "人、数据与软件在同一生产系统中连接" [ref=f1e453]:
        - generic [ref=f1e462]:
          - generic [ref=f1e463]: PEOPLE
          - generic [ref=f1e464]: DATA
          - generic [ref=f1e465]: SOFTWARE
      - generic [ref=f1e466]:
        - link "03 / CONTACT" [ref=f1e467] [cursor=pointer]:
          - /url: /contact/
          - text: 03 / CONTACT ↗
        - link "BACK TO TOP" [ref=f1e468] [cursor=pointer]:
          - /url: "#top"
          - text: BACK TO TOP ↑
  - alert [ref=f1e469]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | import { assetDots, updatedAssetDots } from "../src/lib/production-geometry";
  4  | 
  5  | test("02 morphs the white v1 surface into the updated asset and survives interruption",async({page})=>{
  6  |   await page.goto("/");
  7  |   const master=page.locator("#views"),dots=master.locator("[data-result-dots]");
  8  |   const enter=()=>page.locator('[data-control="transform"]').click();
  9  |   await enter();
  10 |   expect((await dots.getAttribute("d"))===assetDots).toBe(true);
  11 |   await expect(master.locator("[data-character-result]")).toHaveAttribute("stroke","#e1e4da");
  12 |   await expect.poll(async()=>{
  13 |     const d=await dots.getAttribute("d");
  14 |     return d!==assetDots&&d!==updatedAssetDots;
  15 |   },{intervals:[30,50,80]}).toBe(true);
  16 |   await expect(master).toHaveAttribute("data-settled","true");
  17 |   expect((await dots.getAttribute("d"))===updatedAssetDots).toBe(true);
  18 |   await page.locator('[data-control="organize"]').click();
  19 |   await expect(master).toHaveAttribute("data-settled","true");
  20 |   expect((await dots.getAttribute("d"))===assetDots).toBe(true);
  21 |   await enter();
  22 |   await page.emulateMedia({reducedMotion:"reduce"});
  23 |   await expect(master).toHaveAttribute("data-settled","true");
  24 |   expect((await dots.getAttribute("d"))===updatedAssetDots).toBe(true);
  25 |   await expect(master.locator("[data-character-result]")).toHaveAttribute("stroke","#a0e5cb");
  26 | });
  27 | 
  28 | test("production scene: responsive layout, overview and two perspectives, keyboard and reduced motion", async ({ page }) => {
  29 |   const errors:string[]=[];
  30 |   page.on("pageerror",e=>errors.push(e.message));
  31 |   for(const width of [1440,768,390]) {
  32 |     await page.setViewportSize({width,height:800});
  33 |     await page.goto("/");
  34 |     await page.evaluate(()=>document.fonts.ready);
  35 |     const master=page.locator("#views");
  36 |     await master.scrollIntoViewIfNeeded();
  37 |     await expect(page.locator("[data-production-scene]")).toBeVisible();
  38 |     for(const mode of ["organize","transform","overview"]) {
  39 |       await page.locator(`[data-control="${mode}"]`).click();
  40 |       await expect(master).toHaveAttribute("data-mode",mode);
  41 |       await expect(master).toHaveAttribute("data-settled","true");
  42 |       await expect(page.locator("[data-future]")).toHaveCount(0);
  43 |       const oldOpacity=await page.locator("[data-version-old]").evaluate(e=>+getComputedStyle(e).opacity);
  44 |       expect(oldOpacity).toBe(mode==="transform"?.26:0);
  45 |       if(width===1440 && mode==="transform") {
  46 |         await master.screenshot({path:"artifacts/production-scene-transform.png",style:"[data-site-header], [class*='TextPreview_launcher'], .skip { visibility:hidden !important; }"});
  47 |       }
  48 |     }
  49 |     for(let i=0;i<12;i++) await page.locator(`[data-control="${["organize","transform"][i%2]}"]`).click();
  50 |     await page.locator('[data-control="organize"]').click();
  51 |     await expect(master).toHaveAttribute("data-settled","true");
  52 |     await page.locator('[data-hit="product"]').focus();
  53 |     await expect(master.locator('[aria-live="polite"]')).toContainText("PRODUCT");
  54 |     await page.locator('[data-control="organize"]').focus();
  55 |     await page.keyboard.press("ArrowRight");
  56 |     await expect(master).toHaveAttribute("data-mode","transform");
  57 |     await page.keyboard.press("Escape");
  58 |     await expect(master).toHaveAttribute("data-mode","overview");
  59 |     await page.emulateMedia({reducedMotion:"reduce"});
  60 |     await page.locator('[data-control="transform"]').click();
  61 |     await expect(master).toHaveAttribute("data-settled","true");
  62 |     await page.locator('[data-control="organize"]').click();
  63 |     await expect(master).toHaveAttribute("data-settled","true");
  64 |     expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  65 |     if(width===1440) expect((await master.boundingBox())!.height).toBeLessThanOrEqual(800);
  66 |     const a11y=await new AxeBuilder({page}).include("#views").withTags(["wcag2a","wcag2aa"]).analyze();
  67 |     expect(a11y.violations).toEqual([]);
> 68 |     await master.screenshot({path:`artifacts/production-scene-${width}.png`,style:"[data-site-header], [class*='TextPreview_launcher'], .skip { visibility:hidden !important; }"});
     |                  ^ Error: locator.screenshot: UNKNOWN: unknown error, open 'D:\SYCP_PPL\work_report\artifacts\production-scene-768.png'
  69 |     await page.emulateMedia({reducedMotion:"no-preference"});
  70 |   }
  71 |   expect(errors).toEqual([]);
  72 | });
  73 | 
  74 | test("no future branch can be reached after interrupted perspective changes", async ({page}) => {
  75 |   await page.goto("/");
  76 |   const master=page.locator("#views");
  77 |   for (let i=0;i<12;i++) {
  78 |     await page.locator(`[data-control="${i%2 ? "transform" : "organize"}"]`).click();
  79 |   }
  80 |   await expect(master).toHaveAttribute("data-settled","true");
  81 |   await expect(master.locator("[data-future], [data-hit^='future'], [data-control='extend']")).toHaveCount(0);
  82 |   await expect(master.locator("[data-hit]")).toHaveCount(8);
  83 |   await page.emulateMedia({reducedMotion:"reduce"});
  84 |   await page.locator('[data-control="overview"]').click();
  85 |   await expect(master).toHaveAttribute("data-settled","true");
  86 |   await expect(master.locator("[data-future]")).toHaveCount(0);
  87 | });
  88 | 
```