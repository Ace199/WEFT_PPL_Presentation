# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: model-disclosure.spec.ts >> model disclosure stays below the canvas and preserves controls at 768px
- Location: tests\model-disclosure.spec.ts:4:7

# Error details

```
Error: locator.screenshot: UNKNOWN: unknown error, open 'D:\SYCP_PPL\work_report\artifacts\model-expanded-768.png'
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - link "跳至正文" [ref=e4] [cursor=pointer]:
      - /url: "#main"
    - banner [ref=e5]:
      - button "收起导航" [expanded] [ref=e6] [cursor=pointer]: ↑
      - link "WEFT / PPL" [ref=e7] [cursor=pointer]:
        - /url: /
      - navigation "章节导航" [ref=e8]:
        - link "00 / 项目概览" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "01 / 系统思考" [ref=e10] [cursor=pointer]:
          - /url: /systematic-thinking/
        - link "02 / 设计与创新" [ref=e11] [cursor=pointer]:
          - /url: /design-innovation/
        - link "03 / 联系" [ref=e12] [cursor=pointer]:
          - /url: /contact/
      - generic [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]: PRODUCTION SYSTEM
          - generic [ref=e16]: "STATUS: ACTIVE"
          - generic [ref=e17]: "2026"
        - group "Language / 语言" [ref=e18]:
          - button "切换为中文" [pressed] [ref=e19] [cursor=pointer]: 中
          - generic [aria-hidden] [ref=e20]: /
          - button "Switch to English" [ref=e21] [cursor=pointer]: En
    - main [ref=e22]:
      - region "WEFT / PPL" [ref=e23]:
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
        - list [ref=e24]:
          - listitem [ref=e25]:
            - generic [ref=e26]: Maya / Houdini
            - generic [aria-hidden] [ref=e27]:
              - generic [ref=e28]:
                - generic: M
                - generic: a
                - generic: "y"
                - generic: a
              - generic [ref=e29]: /
              - generic [ref=e30]:
                - generic: H
                - generic: o
                - generic: u
                - generic: d
                - generic: i
                - generic: "n"
                - generic: i
          - listitem [ref=e31]:
            - text: ·
            - generic [ref=e32]: 2-person team
            - generic [aria-hidden] [ref=e33]:
              - generic [ref=e34]: "2"
              - generic [ref=e35]: "-"
              - generic [ref=e36]:
                - generic: p
                - generic: e
                - generic: r
                - generic: s
                - generic: o
                - generic: "n"
              - generic [ref=e37]:
                - generic: t
                - generic: e
                - generic: a
                - generic: m
          - listitem [ref=e38]:
            - text: ·
            - generic [ref=e39]: Active Production
            - generic [aria-hidden] [ref=e40]:
              - generic [ref=e41]:
                - generic: A
                - generic: c
                - generic: t
                - generic: i
                - generic: v
                - generic: e
              - generic [ref=e42]:
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
      - region [ref=e43]:
        - list [ref=e204]:
          - listitem [ref=e205]: 分散的成果
          - listitem [ref=e206]: 有序的组织
          - listitem [ref=e207]: 协同的生产
        - generic [ref=e208]:
          - heading "独立变化，也能协同工作。" [level=2] [ref=e209]
          - paragraph [ref=e210]: WEFT / PPL 将任务、制作成果、版本与依赖组织进共享的 Production Model，连接 Maya 与 Houdini 的工作流程。
      - region [ref=e211]:
        - generic [ref=e212]:
          - generic [ref=e213]:
            - heading "ONE SYSTEM / THREE VIEWS" [level=2] [ref=e214]
            - paragraph [ref=e215]: 同一个系统，三个观察角度。
          - group "检查生产模型节点" [ref=e217]:
            - generic [ref=e218]:
              - generic [ref=e219]: PRODUCTION MODULES
              - generic [ref=e220]:
                - button "图示 / 检查 相机 / PRODUCT" [ref=e221] [cursor=pointer]:
                  - generic [ref=e223]: 相机
                  - generic [ref=e224]: 独立取景
                - button "图示 / 检查 场景 / PRODUCT" [ref=e229] [cursor=pointer]:
                  - generic [ref=e231]: 场景
                  - generic [ref=e232]: 空间与环境
              - button "图示 / 检查 资产 / PRODUCT" [ref=e237] [cursor=pointer]:
                - generic [ref=e239]: 资产
                - generic [ref=e240]: 独立制作成果
                - generic [ref=e241]: v1
              - button "图示 / 检查 VERSION" [ref=e247] [cursor=pointer]:
                - generic [ref=e249]: Module
            - generic [ref=e250]:
              - button "图示 / 检查 DEPENDENCY" [ref=e251] [cursor=pointer]
              - button "图示 / 检查 RESOLUTION" [ref=e257] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=e260] [cursor=pointer]
            - generic [ref=e262]:
              - button "图示 / 检查 CONTEXT" [ref=e263] [cursor=pointer]:
                - generic [ref=e265]: SHARED MODEL
              - button "图示 / 检查 PRODUCT" [ref=e266] [cursor=pointer]
              - generic [ref=e274]:
                - generic [aria-hidden]:
                  - generic [ref=e275] [cursor=pointer]
                  - generic: 身份
                - generic [aria-hidden]:
                  - generic [ref=e276] [cursor=pointer]
                  - generic: 版本
                - generic [aria-hidden]:
                  - generic [ref=e277] [cursor=pointer]
                  - generic: 依赖
                - generic [aria-hidden]:
                  - generic [ref=e278] [cursor=pointer]
                  - generic: 校验
              - button "图示 / 检查 STATE" [ref=e279] [cursor=pointer]:
                - generic [ref=e282]: 完整的当前状态
                - generic [ref=e283]: STATE
            - generic [ref=e284]:
              - button "图示 / 检查 COMPOSITION" [ref=e285] [cursor=pointer]:
                - generic [ref=e287]: COMPOSED WORKSPACE
              - generic [ref=e288]:
                - button "图示 / 检查 CONTEXT" [ref=e289] [cursor=pointer]
                - generic [ref=e293]:
                  - button "图示 / 检查 场景 / COMPOSITION" [ref=e294] [cursor=pointer]
                  - button "图示 / 检查 相机 / COMPOSITION" [ref=e299] [cursor=pointer]
                - button "图示 / 检查 资产 / COMPOSITION" [ref=e304] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=e309] [cursor=pointer]:
                - generic [ref=e311]: 独立选择，组合为同一个镜头
            - generic [ref=e312]:
              - generic [ref=e313]: 独立的制作成果
              - generic [ref=e314]: 系统组织
              - generic [ref=e315]: 协同的工作空间
          - generic "检查生产模型节点" [ref=e316]:
            - button "检查 CONTEXT" [ref=e317]: CONTEXT
            - button "检查 PRODUCT" [ref=e318]: PRODUCT
            - button "检查 VERSION" [ref=e319]: VERSION
            - button "检查 DEPENDENCY" [ref=e320]: DEPENDENCY
            - button "检查 STATE" [ref=e321]: STATE
            - button "检查 VALIDATION" [ref=e322]: VALIDATION
            - button "检查 RESOLUTION" [ref=e323]: RESOLUTION
            - button "检查 COMPOSITION" [ref=e324]: COMPOSITION
          - generic "观察角度" [ref=e325]:
            - generic [ref=e326]:
              - button "01 / SYSTEMATIC THINKING 复杂生产，如何成为系统？ ORGANIZE" [ref=e327] [cursor=pointer]:
                - generic [ref=e328]: 01 / SYSTEMATIC THINKING
                - strong [ref=e329]: 复杂生产，如何成为系统？
                - generic [ref=e330]: ORGANIZE
              - link "EXPLORE SYSTEMATIC THINKING" [ref=e331] [cursor=pointer]:
                - /url: /systematic-thinking/
                - text: EXPLORE ↗
            - generic [ref=e332]:
              - button "02 / DESIGN & INNOVATION 重新审视生产的默认假设。 TRANSFORM" [ref=e333] [cursor=pointer]:
                - generic [ref=e334]: 02 / DESIGN & INNOVATION
                - strong [ref=e335]: 重新审视生产的默认假设。
                - generic [ref=e336]: TRANSFORM
              - link "EXPLORE DESIGN & INNOVATION" [ref=e337] [cursor=pointer]:
                - /url: /design-innovation/
                - text: EXPLORE ↗
            - generic [ref=e338]:
              - button "03 / IN PRACTICE 设计如何进入真实制作？ OPERATE" [ref=e339] [cursor=pointer]:
                - generic [ref=e340]: 03 / IN PRACTICE
                - strong [ref=e341]: 设计如何进入真实制作？
                - generic [ref=e342]: OPERATE
              - link "VIEW PRODUCTION" [ref=e343] [cursor=pointer]:
                - /url: "#production"
                - text: VIEW PRODUCTION ↘
          - generic [ref=e344]:
            - generic [ref=e345]: SHARED PRODUCTION MODEL
            - paragraph [ref=e346]: 任务、制作成果、版本与依赖，在同一模型中连接。
          - generic [ref=e347]:
            - button "OVERVIEW" [active] [pressed] [ref=e348] [cursor=pointer]: OVERVIEW ↺
            - generic [ref=e349]: VIEW MODE / OVERVIEW
            - generic [ref=e350]: 结构示意 · 版本号仅作说明
        - group [ref=e351]:
          - generic "查看模型文字说明" [ref=e352] [cursor=pointer]
          - generic [ref=e353]:
            - generic [ref=e354]:
              - term [ref=e355]: CONTEXT
              - definition [ref=e356]: 任务上下文：明确这次工作属于哪里。
            - generic [ref=e357]:
              - term [ref=e358]: PRODUCT
              - definition [ref=e359]: 制作成果：可以独立交付、选择和组合的单位。
            - generic [ref=e360]:
              - term [ref=e361]: VERSION
              - definition [ref=e362]: 版本：记录某项制作成果的一次具体交付。
            - generic [ref=e363]:
              - term [ref=e364]: DEPENDENCY
              - definition [ref=e365]: 依赖：记录制作成果之间需要满足的关系。
            - generic [ref=e366]:
              - term [ref=e367]: STATE
              - definition [ref=e368]: 状态：保留完整的当前镜头状态，包括明确删除。
            - generic [ref=e369]:
              - term [ref=e370]: VALIDATION
              - definition [ref=e371]: 校验：在发布边界执行交付规则。
            - generic [ref=e372]:
              - term [ref=e373]: RESOLUTION
              - definition [ref=e374]: 解析：先确定兼容范围，再选择具体版本。
            - generic [ref=e375]:
              - term [ref=e376]: COMPOSITION
              - definition [ref=e377]: 组合：将独立选定的制作模块组装到工作环境。
      - region [ref=e378]:
        - generic [ref=e379]:
          - heading "IN PRODUCTION" [level=2] [ref=e380]
          - paragraph
          - generic [ref=e381]:
            - generic [ref=e382]:
              - term [ref=e383]:
                - generic [ref=e384]: HOSTS
                - generic [ref=e386]:
                  - generic: H
                  - generic: O
                  - generic: S
                  - generic: T
                  - generic: S
              - definition [ref=e387]:
                - generic [ref=e388]: Maya 2022 / Houdini 21–22
                - generic [aria-hidden] [ref=e389]:
                  - generic [ref=e390]:
                    - generic: M
                    - generic: a
                    - generic: "y"
                    - generic: a
                  - generic [ref=e391]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "2"
                  - generic [ref=e392]: /
                  - generic [ref=e393]:
                    - generic: H
                    - generic: o
                    - generic: u
                    - generic: d
                    - generic: i
                    - generic: "n"
                    - generic: i
                  - generic [ref=e394]:
                    - generic: "2"
                    - generic: "1"
                  - generic [ref=e395]: –
                  - generic [ref=e396]:
                    - generic: "2"
                    - generic: "2"
            - generic [ref=e397]:
              - term [ref=e398]:
                - generic [ref=e399]: SYSTEM
                - generic [ref=e401]:
                  - generic: S
                  - generic: "Y"
                  - generic: S
                  - generic: T
                  - generic: E
                  - generic: M
              - definition [ref=e402]:
                - generic [ref=e403]: Rez / Ftrack
                - generic [aria-hidden] [ref=e404]:
                  - generic [ref=e405]:
                    - generic: R
                    - generic: e
                    - generic: z
                  - generic [ref=e406]: /
                  - generic [ref=e407]:
                    - generic: F
                    - generic: t
                    - generic: r
                    - generic: a
                    - generic: c
                    - generic: k
            - generic [ref=e408]:
              - term [ref=e409]:
                - generic [ref=e410]: WORKFLOW
                - generic [ref=e412]:
                  - generic: W
                  - generic: O
                  - generic: R
                  - generic: K
                  - generic: F
                  - generic: L
                  - generic: O
                  - generic: W
              - definition [ref=e413]:
                - generic [ref=e414]: Build / Load / Publish / Dailes Review
                - generic [aria-hidden] [ref=e415]:
                  - generic [ref=e416]:
                    - generic: B
                    - generic: u
                    - generic: i
                    - generic: l
                    - generic: d
                  - generic [ref=e417]: /
                  - generic [ref=e418]:
                    - generic: L
                    - generic: o
                    - generic: a
                    - generic: d
                  - generic [ref=e419]: /
                  - generic [ref=e420]:
                    - generic: P
                    - generic: u
                    - generic: b
                    - generic: l
                    - generic: i
                    - generic: s
                    - generic: h
                  - generic [ref=e421]: /
                  - generic [ref=e422]:
                    - generic: D
                    - generic: a
                    - generic: i
                    - generic: l
                    - generic: e
                    - generic: s
                  - generic [ref=e423]:
                    - generic: R
                    - generic: e
                    - generic: v
                    - generic: i
                    - generic: e
                    - generic: w
            - generic [ref=e424]:
              - term [ref=e425]:
                - generic [ref=e426]: FORMAT
                - generic [ref=e428]:
                  - generic: F
                  - generic: O
                  - generic: R
                  - generic: M
                  - generic: A
                  - generic: T
              - definition [ref=e429]:
                - generic [ref=e430]: USD / Alembic
                - generic [aria-hidden] [ref=e431]:
                  - generic [ref=e432]:
                    - generic: U
                    - generic: S
                    - generic: D
                  - generic [ref=e433]: /
                  - generic [ref=e434]:
                    - generic: A
                    - generic: l
                    - generic: e
                    - generic: m
                    - generic: b
                    - generic: i
                    - generic: c
            - generic [ref=e435]:
              - term [ref=e436]:
                - generic [ref=e437]: STATUS
                - generic [ref=e439]:
                  - generic: S
                  - generic: T
                  - generic: A
                  - generic: T
                  - generic: U
                  - generic: S
              - definition [ref=e440]:
                - generic [ref=e441]: Active production / 2026
                - generic [aria-hidden] [ref=e442]:
                  - generic [ref=e443]:
                    - generic: A
                    - generic: c
                    - generic: t
                    - generic: i
                    - generic: v
                    - generic: e
                  - generic [ref=e444]:
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
                  - generic [ref=e445]: /
                  - generic [ref=e446]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "6"
        - figure "选择模块与版本，组装镜头。" [ref=e447]:
          - heading "FIG. 01 / SHOT BUILDER" [level=3] [ref=e448]
          - button "放大查看 SHOT BUILDER" [ref=e449]:
            - img "Shot Builder 实际界面：模块、版本选择与组装状态。" [ref=e450]
            - generic [ref=e451]: 放大查看 ↗
        - figure "收集、检查与发布，形成明确的交付流程。" [ref=e453]:
          - heading "FIG. 02 / PUBLISH / QC" [level=3] [ref=e454]
          - button "放大查看 PUBLISH / QC" [ref=e455]:
            - img "Publish 实际界面：收集、检查、发布与集成步骤。" [ref=e456]
            - generic [ref=e457]: 放大查看 ↗
        - generic [ref=e459]:
          - paragraph [ref=e460]: 2026.04–08 核心开发 · 两人团队。作者作为 Lead Pipeline TD / System Designer 主导架构与核心实现；另一位成员扩展 Production Modules，并主导 ASB 核心能力。
          - paragraph [ref=e461]: 实际工具界面；CFX 与 Hair 路径仍在演进。
    - contentinfo [ref=e462]:
      - generic [ref=e463]:
        - text: WEFT / PPL
        - paragraph [ref=e464]: SAME PIPELINE MORE POSSIBILITIES
      - img "人、数据与软件在同一生产系统中连接" [ref=e466]:
        - generic [ref=e475]:
          - generic [ref=e476]: PEOPLE
          - generic [ref=e477]: DATA
          - generic [ref=e478]: SOFTWARE
      - generic [ref=e479]:
        - link "03 / CONTACT" [ref=e480] [cursor=pointer]:
          - /url: /contact/
          - text: 03 / CONTACT ↗
        - link "BACK TO TOP" [ref=e481] [cursor=pointer]:
          - /url: "#top"
          - text: BACK TO TOP ↑
  - alert [ref=e482]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | for (const width of [390, 768, 1440]) {
  4  |   test(`model disclosure stays below the canvas and preserves controls at ${width}px`, async ({ page }) => {
  5  |     await page.setViewportSize({ width, height: 1000 });
  6  |     await page.emulateMedia({ reducedMotion: "reduce" });
  7  |     await page.goto("/");
  8  |     const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
  9  |     const disclosure = region.locator("details");
  10 |     const positions = () => region.evaluate((root) => {
  11 |       const origin = root.getBoundingClientRect();
  12 |       return [...root.querySelectorAll('[data-control], [aria-live="polite"]')].map((element) => {
  13 |         const box = element.getBoundingClientRect();
  14 |         return { x: box.x - origin.x, y: box.y - origin.y, width: box.width, height: box.height };
  15 |       });
  16 |     });
  17 |     const before = await positions();
  18 |     await disclosure.locator("summary").focus();
  19 |     await page.keyboard.press("Enter");
  20 |     await expect(disclosure).toHaveAttribute("open", "");
  21 |     expect(await positions()).toEqual(before);
  22 |     for (const mode of ["organize", "transform", "operate", "overview"]) {
  23 |       await region.locator(`[data-control="${mode}"]`).focus();
  24 |       await page.keyboard.press("Enter");
  25 |       await expect(region).toHaveAttribute("data-mode", mode);
  26 |       const overlaps = await region.evaluate((root) => {
  27 |         const text = root.querySelector("details")!.getBoundingClientRect();
  28 |         return [...root.querySelectorAll('[data-control], [aria-live="polite"]')].some((element) => {
  29 |           const box = element.getBoundingClientRect();
  30 |           return box.bottom > text.top && box.top < text.bottom && box.right > text.left && box.left < text.right;
  31 |         });
  32 |       });
  33 |       expect(overlaps).toBe(false);
  34 |       const explanation = (await region.locator('[aria-live="polite"]').boundingBox())!;
  35 |       const overview = (await region.locator('[data-control="overview"]').boundingBox())!;
  36 |       expect(explanation.y + explanation.height).toBeLessThanOrEqual(overview.y);
  37 |     }
  38 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
> 39 |     await region.screenshot({
     |                  ^ Error: locator.screenshot: UNKNOWN: unknown error, open 'D:\SYCP_PPL\work_report\artifacts\model-expanded-768.png'
  40 |       path: `artifacts/model-expanded-${width}.png`,
  41 |       // Isolate the component capture from sticky page chrome during stitching.
  42 |       style: '[data-site-header], .skip { visibility: hidden; }',
  43 |     });
  44 |     await disclosure.locator("summary").focus();
  45 |     await page.keyboard.press("Space");
  46 |     await expect(disclosure).not.toHaveAttribute("open");
  47 |     expect(await positions()).toEqual(before);
  48 |   });
  49 | }
  50 | 
```