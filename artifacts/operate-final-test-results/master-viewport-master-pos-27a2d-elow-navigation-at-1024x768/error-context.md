# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: master-viewport.spec.ts >> master poster fits below navigation at 1024x768
- Location: tests\master-viewport.spec.ts:4:7

# Error details

```
Error: UNKNOWN: unknown error, open 'D:\SYCP_PPL\work_report\artifacts\master-viewport-1024.png'
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - link "跳至正文" [ref=e4] [cursor=pointer]:
      - /url: "#main"
    - banner [ref=e5]:
      - button "收起导航" [expanded] [ref=e6] [cursor=pointer]
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
      - region [ref=e353]:
        - generic [ref=e354]:
          - heading "IN PRODUCTION" [level=2] [ref=e355]
          - paragraph
          - generic [ref=e356]:
            - generic [ref=e357]:
              - term [ref=e358]:
                - generic [ref=e359]: HOSTS
                - generic [ref=e361]:
                  - generic: H
                  - generic: O
                  - generic: S
                  - generic: T
                  - generic: S
              - definition [ref=e362]:
                - generic [ref=e363]: Maya 2022 / Houdini 21–22
                - generic [aria-hidden] [ref=e364]:
                  - generic [ref=e365]:
                    - generic: M
                    - generic: a
                    - generic: "y"
                    - generic: a
                  - generic [ref=e366]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "2"
                  - generic [ref=e367]: /
                  - generic [ref=e368]:
                    - generic: H
                    - generic: o
                    - generic: u
                    - generic: d
                    - generic: i
                    - generic: "n"
                    - generic: i
                  - generic [ref=e369]:
                    - generic: "2"
                    - generic: "1"
                  - generic [ref=e370]: –
                  - generic [ref=e371]:
                    - generic: "2"
                    - generic: "2"
            - generic [ref=e372]:
              - term [ref=e373]:
                - generic [ref=e374]: SYSTEM
                - generic [ref=e376]:
                  - generic: S
                  - generic: "Y"
                  - generic: S
                  - generic: T
                  - generic: E
                  - generic: M
              - definition [ref=e377]:
                - generic [ref=e378]: Rez / Ftrack
                - generic [aria-hidden] [ref=e379]:
                  - generic [ref=e380]:
                    - generic: R
                    - generic: e
                    - generic: z
                  - generic [ref=e381]: /
                  - generic [ref=e382]:
                    - generic: F
                    - generic: t
                    - generic: r
                    - generic: a
                    - generic: c
                    - generic: k
            - generic [ref=e383]:
              - term [ref=e384]:
                - generic [ref=e385]: WORKFLOW
                - generic [ref=e387]:
                  - generic: W
                  - generic: O
                  - generic: R
                  - generic: K
                  - generic: F
                  - generic: L
                  - generic: O
                  - generic: W
              - definition [ref=e388]:
                - generic [ref=e389]: Build / Load / Publish / Dailes Review
                - generic [aria-hidden] [ref=e390]:
                  - generic [ref=e391]:
                    - generic: B
                    - generic: u
                    - generic: i
                    - generic: l
                    - generic: d
                  - generic [ref=e392]: /
                  - generic [ref=e393]:
                    - generic: L
                    - generic: o
                    - generic: a
                    - generic: d
                  - generic [ref=e394]: /
                  - generic [ref=e395]:
                    - generic: P
                    - generic: u
                    - generic: b
                    - generic: l
                    - generic: i
                    - generic: s
                    - generic: h
                  - generic [ref=e396]: /
                  - generic [ref=e397]:
                    - generic: D
                    - generic: a
                    - generic: i
                    - generic: l
                    - generic: e
                    - generic: s
                  - generic [ref=e398]:
                    - generic: R
                    - generic: e
                    - generic: v
                    - generic: i
                    - generic: e
                    - generic: w
            - generic [ref=e399]:
              - term [ref=e400]:
                - generic [ref=e401]: FORMAT
                - generic [ref=e403]:
                  - generic: F
                  - generic: O
                  - generic: R
                  - generic: M
                  - generic: A
                  - generic: T
              - definition [ref=e404]:
                - generic [ref=e405]: USD / Alembic
                - generic [aria-hidden] [ref=e406]:
                  - generic [ref=e407]:
                    - generic: U
                    - generic: S
                    - generic: D
                  - generic [ref=e408]: /
                  - generic [ref=e409]:
                    - generic: A
                    - generic: l
                    - generic: e
                    - generic: m
                    - generic: b
                    - generic: i
                    - generic: c
            - generic [ref=e410]:
              - term [ref=e411]:
                - generic [ref=e412]: STATUS
                - generic [ref=e414]:
                  - generic: S
                  - generic: T
                  - generic: A
                  - generic: T
                  - generic: U
                  - generic: S
              - definition [ref=e415]:
                - generic [ref=e416]: Active production / 2026
                - generic [aria-hidden] [ref=e417]:
                  - generic [ref=e418]:
                    - generic: A
                    - generic: c
                    - generic: t
                    - generic: i
                    - generic: v
                    - generic: e
                  - generic [ref=e419]:
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
                  - generic [ref=e420]: /
                  - generic [ref=e421]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "6"
        - figure "选择模块与版本，组装镜头。" [ref=e422]:
          - heading "FIG. 01 / SHOT BUILDER" [level=3] [ref=e423]
          - button "放大查看 SHOT BUILDER" [ref=e424]:
            - img "Shot Builder 实际界面：模块、版本选择与组装状态。" [ref=e425]
            - generic [ref=e426]: 放大查看 ↗
        - figure "收集、检查与发布，形成明确的交付流程。" [ref=e428]:
          - heading "FIG. 02 / PUBLISH / QC" [level=3] [ref=e429]
          - button "放大查看 PUBLISH / QC" [ref=e430]:
            - img "Publish 实际界面：收集、检查、发布与集成步骤。" [ref=e431]
            - generic [ref=e432]: 放大查看 ↗
        - generic [ref=e434]:
          - paragraph [ref=e435]: 2026.04–08 核心开发 · 两人团队。作者作为 Lead Pipeline TD / System Designer 主导架构与核心实现；另一位成员扩展 Production Modules，并主导 ASB 核心能力。
          - paragraph [ref=e436]: 实际工具界面；CFX 与 Hair 路径仍在演进。
    - contentinfo [ref=e437]:
      - generic [ref=e438]:
        - text: WEFT / PPL
        - paragraph [ref=e439]: SAME PIPELINE MORE POSSIBILITIES
      - img "人、数据与软件在同一生产系统中连接" [ref=e441]:
        - generic [ref=e450]:
          - generic [ref=e451]: PEOPLE
          - generic [ref=e452]: DATA
          - generic [ref=e453]: SOFTWARE
      - generic [ref=e454]:
        - link "03 / CONTACT" [ref=e455] [cursor=pointer]:
          - /url: /contact/
          - text: 03 / CONTACT ↗
        - link "BACK TO TOP" [ref=e456] [cursor=pointer]:
          - /url: "#top"
          - text: BACK TO TOP ↑
  - alert [ref=e457]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | for (const [width, height] of [[1024, 768], [1366, 768], [1440, 800], [1920, 1080]]) {
  4  |   test(`master poster fits below navigation at ${width}x${height}`, async ({ page }) => {
  5  |     await page.setViewportSize({ width, height });
  6  |     await page.emulateMedia({ reducedMotion: "reduce" });
  7  |     await page.goto("/");
  8  |     await page.evaluate(() => document.fonts.ready);
  9  |     const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
  10 |     const headerHeight = await page.locator('[data-site-header]').evaluate(el => el.getBoundingClientRect().height);
  11 |     await region.evaluate((el, offset) => window.scrollTo({
  12 |       top: scrollY + el.getBoundingClientRect().top - offset, behavior: "instant",
  13 |     }), headerHeight);
  14 |     const box = (await region.boundingBox())!;
  15 |     expect(box.height + headerHeight).toBeLessThanOrEqual(height);
  16 |     expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
  17 | 
  18 |     for (const mode of ["organize", "transform", "operate", "overview"]) {
  19 |       await region.locator(`[data-control="${mode}"]`).focus();
  20 |       await page.keyboard.press("Enter");
  21 |       await expect(region).toHaveAttribute("data-mode", mode);
  22 |       await expect(region).toHaveAttribute("data-settled", "true");
  23 |       const inspect = () => region.evaluate(root => {
  24 |         const bounds = root.getBoundingClientRect();
  25 |         const elements = [...root.querySelectorAll('header, [data-control], a, [aria-live], details')];
  26 |         const boxes = elements.map(el => el.getBoundingClientRect());
  27 |         const clipped = boxes.some(b => b.top < bounds.top || b.bottom > bounds.bottom || b.left < 0 || b.right > innerWidth);
  28 |         const overlaps = boxes.some((a, i) => boxes.slice(i + 1).some(b =>
  29 |           a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top));
  30 |         const hits = [...root.querySelectorAll('[data-hit]')].map(el=>el.getBoundingClientRect());
  31 |         const inspectable = hits.length >= 8 && hits.every(b=>b.width>0 && b.height>0 && b.left>=bounds.left && b.right<=bounds.right && b.bottom<=bounds.bottom);
  32 |         return { clipped, overlaps, inspectable };
  33 |       });
  34 |       // Focus and Enter each dispatch a view update; wait for the rendered
  35 |       // geometry, rather than sampling between React and the GSAP effect.
  36 |       await expect.poll(async () => (await inspect()).inspectable).toBe(true);
  37 |       const problems = await inspect();
  38 |       expect(problems.clipped).toBe(false);
  39 |       expect(problems.overlaps).toBe(false);
  40 |     }
  41 |     await region.evaluate((el, offset) => window.scrollTo({
  42 |       top: scrollY + el.getBoundingClientRect().top - offset, behavior: "instant",
  43 |     }), headerHeight);
> 44 |     await page.screenshot({ path: `artifacts/master-viewport-${width}.png` });
     |     ^ Error: UNKNOWN: unknown error, open 'D:\SYCP_PPL\work_report\artifacts\master-viewport-1024.png'
  45 |   });
  46 | }
  47 | 
```