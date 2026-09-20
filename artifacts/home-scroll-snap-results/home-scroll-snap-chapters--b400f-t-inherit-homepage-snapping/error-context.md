# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-scroll-snap.spec.ts >> chapters, narrow screens and reduced motion do not inherit homepage snapping
- Location: tests\home-scroll-snap.spec.ts:48:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "y proximity"
Received: "y"

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - generic [ref=f3e3]:
    - link "跳至正文" [ref=f3e4] [cursor=pointer]:
      - /url: "#main"
    - banner [ref=f3e5]:
      - link "WEFT / PPL" [ref=f3e6] [cursor=pointer]:
        - /url: /
      - navigation "章节导航" [ref=f3e7]:
        - link "00 / 项目概览" [ref=f3e8] [cursor=pointer]:
          - /url: /
        - link "01 / 系统思考" [ref=f3e9] [cursor=pointer]:
          - /url: /systematic-thinking/
        - link "02 / 设计&创新" [ref=f3e10] [cursor=pointer]:
          - /url: /design-innovation/
        - link "03 / 联系" [ref=f3e11] [cursor=pointer]:
          - /url: /contact/
      - generic [ref=f3e12]:
        - 'group "生产状态：PRODUCTION SYSTEM，STATUS: ACTIVE，2026" [ref=f3e13]':
          - generic [aria-hidden] [ref=f3e14]:
            - generic [ref=f3e15]: PRODUCTION SYSTEM
            - generic [ref=f3e16]: "STATUS: ACTIVE"
            - generic [ref=f3e17]: "2026"
        - group "Language / 语言" [ref=f3e18]:
          - button "切换为中文" [pressed] [ref=f3e19] [cursor=pointer]: 中
          - generic [aria-hidden] [ref=f3e20]: /
          - button "Switch to English" [ref=f3e21] [cursor=pointer]: En
    - main [ref=f3e22]:
      - region "WEFT / PPL" [ref=f3e23]:
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
        - list [ref=f3e164]:
          - listitem [ref=f3e165]:
            - generic [ref=f3e166]: Maya / Houdini
            - generic [aria-hidden] [ref=f3e167]:
              - generic [ref=f3e168]:
                - generic: M
                - generic: a
                - generic: "y"
                - generic: a
              - generic [ref=f3e169]: /
              - generic [ref=f3e170]:
                - generic: H
                - generic: o
                - generic: u
                - generic: d
                - generic: i
                - generic: "n"
                - generic: i
          - listitem [ref=f3e171]:
            - text: ·
            - generic [ref=f3e172]: 2-person team
            - generic [aria-hidden] [ref=f3e173]:
              - generic [ref=f3e174]: "2"
              - generic [ref=f3e175]: "-"
              - generic [ref=f3e176]:
                - generic: p
                - generic: e
                - generic: r
                - generic: s
                - generic: o
                - generic: "n"
              - generic [ref=f3e177]:
                - generic: t
                - generic: e
                - generic: a
                - generic: m
          - listitem [ref=f3e178]:
            - text: ·
            - generic [ref=f3e179]: Active Production
            - generic [aria-hidden] [ref=f3e180]:
              - generic [ref=f3e181]:
                - generic: A
                - generic: c
                - generic: t
                - generic: i
                - generic: v
                - generic: e
              - generic [ref=f3e182]:
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
      - region [ref=f3e183]:
        - list [ref=f3e344]:
          - listitem [ref=f3e345]: 分散的成果
          - listitem [ref=f3e346]: 有序的组织
          - listitem [ref=f3e347]: 协同的生产
        - generic [ref=f3e348]:
          - heading "独立变化，也能协同工作。" [level=2] [ref=f3e349]
          - paragraph [ref=f3e350]: WEFT / PPL 将任务、制作成果、版本与依赖组织进共享的 Production Model，连接 Maya 与 Houdini 的工作流程。
      - region [ref=f3e351]:
        - generic [ref=f3e352]:
          - generic [ref=f3e353]:
            - heading "ONE SYSTEM / THREE VIEWS" [level=2] [ref=f3e354]
            - paragraph [ref=f3e355]: 同一个系统，三个观察角度。
          - group "检查生产模型节点" [ref=f3e357]:
            - generic [ref=f3e358]:
              - generic [ref=f3e359]: PRODUCTION MODULES
              - generic [ref=f3e360]:
                - button "图示 / 检查 相机 / PRODUCT" [ref=f3e361] [cursor=pointer]:
                  - generic [ref=f3e363]: 相机
                  - generic [ref=f3e364]: 独立取景
                - button "图示 / 检查 场景 / PRODUCT" [ref=f3e369] [cursor=pointer]:
                  - generic [ref=f3e371]: 场景
                  - generic [ref=f3e372]: 空间与环境
              - button "图示 / 检查 资产 / PRODUCT" [ref=f3e377] [cursor=pointer]:
                - generic [ref=f3e379]: 资产
                - generic [ref=f3e380]: 独立制作成果
                - generic [ref=f3e381]: v1
              - button "图示 / 检查 VERSION" [ref=f3e387] [cursor=pointer]:
                - generic [ref=f3e389]: Module
            - generic [ref=f3e390]:
              - button "图示 / 检查 DEPENDENCY" [ref=f3e391] [cursor=pointer]
              - button "图示 / 检查 RESOLUTION" [ref=f3e397] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=f3e400] [cursor=pointer]
            - generic [ref=f3e402]:
              - button "图示 / 检查 CONTEXT" [ref=f3e403] [cursor=pointer]:
                - generic [ref=f3e405]: SHARED MODEL
              - button "图示 / 检查 PRODUCT" [ref=f3e406] [cursor=pointer]
              - generic [ref=f3e414]:
                - generic [aria-hidden]:
                  - generic [ref=f3e415] [cursor=pointer]
                  - generic: 身份
                - generic [aria-hidden]:
                  - generic [ref=f3e416] [cursor=pointer]
                  - generic: 版本
                - generic [aria-hidden]:
                  - generic [ref=f3e417] [cursor=pointer]
                  - generic: 依赖
                - generic [aria-hidden]:
                  - generic [ref=f3e418] [cursor=pointer]
                  - generic: 校验
              - button "图示 / 检查 STATE" [ref=f3e419] [cursor=pointer]:
                - generic [ref=f3e422]: 完整的当前状态
                - generic [ref=f3e423]: STATE
            - generic [ref=f3e424]:
              - button "图示 / 检查 COMPOSITION" [ref=f3e425] [cursor=pointer]:
                - generic [ref=f3e427]: COMPOSED WORKSPACE
              - generic [ref=f3e428]:
                - button "图示 / 检查 CONTEXT" [ref=f3e429] [cursor=pointer]
                - generic [ref=f3e433]:
                  - button "图示 / 检查 场景 / COMPOSITION" [ref=f3e434] [cursor=pointer]
                  - button "图示 / 检查 相机 / COMPOSITION" [ref=f3e439] [cursor=pointer]
                - button "图示 / 检查 资产 / COMPOSITION" [ref=f3e444] [cursor=pointer]
              - button "图示 / 检查 COMPOSITION" [ref=f3e449] [cursor=pointer]:
                - generic [ref=f3e451]: 独立选择，组合为同一个镜头
            - generic [ref=f3e452]:
              - generic [ref=f3e453]: 独立的制作成果
              - generic [ref=f3e454]: 系统组织
              - generic [ref=f3e455]: 协同的工作空间
          - generic "检查生产模型节点" [ref=f3e456]:
            - button "检查 CONTEXT" [ref=f3e457]: CONTEXT
            - button "检查 PRODUCT" [ref=f3e458]: PRODUCT
            - button "检查 VERSION" [ref=f3e459]: VERSION
            - button "检查 DEPENDENCY" [ref=f3e460]: DEPENDENCY
            - button "检查 STATE" [ref=f3e461]: STATE
            - button "检查 VALIDATION" [ref=f3e462]: VALIDATION
            - button "检查 RESOLUTION" [ref=f3e463]: RESOLUTION
            - button "检查 COMPOSITION" [ref=f3e464]: COMPOSITION
          - generic "观察角度" [ref=f3e465]:
            - generic [ref=f3e466]:
              - button "01 / SYSTEMATIC THINKING 复杂生产，如何成为系统？ ORGANIZE" [ref=f3e467] [cursor=pointer]:
                - generic [ref=f3e468]: 01 / SYSTEMATIC THINKING
                - strong [ref=f3e469]: 复杂生产，如何成为系统？
                - generic [ref=f3e470]: ORGANIZE
              - link "EXPLORE SYSTEMATIC THINKING" [ref=f3e471] [cursor=pointer]:
                - /url: /systematic-thinking/
                - text: EXPLORE ↗
            - generic [ref=f3e472]:
              - button "02 / DESIGN & INNOVATION 重新审视默认假设，由此形成新的设计判断。 TRANSFORM" [ref=f3e473] [cursor=pointer]:
                - generic [ref=f3e474]: 02 / DESIGN & INNOVATION
                - strong [ref=f3e475]: 重新审视默认假设，由此形成新的设计判断。
                - generic [ref=f3e476]: TRANSFORM
              - link "EXPLORE DESIGN & INNOVATION" [ref=f3e477] [cursor=pointer]:
                - /url: /design-innovation/
                - text: EXPLORE ↗
            - generic [ref=f3e478]:
              - button "03 / IN PRACTICE 设计如何进入真实制作？ OPERATE" [ref=f3e479] [cursor=pointer]:
                - generic [ref=f3e480]: 03 / IN PRACTICE
                - strong [ref=f3e481]: 设计如何进入真实制作？
                - generic [ref=f3e482]: OPERATE
              - link "VIEW PRODUCTION" [ref=f3e483] [cursor=pointer]:
                - /url: "#production"
                - text: VIEW PRODUCTION ↘
          - generic [ref=f3e484]:
            - generic [ref=f3e485]: SHARED PRODUCTION MODEL
            - paragraph [ref=f3e486]: 任务、制作成果、版本与依赖，在同一模型中连接。
          - generic [ref=f3e487]:
            - button "OVERVIEW" [pressed] [ref=f3e488] [cursor=pointer]: OVERVIEW ↺
            - generic [ref=f3e489]: VIEW MODE / OVERVIEW
            - generic [ref=f3e490]: 结构示意 · 版本号仅作说明
        - group [ref=f3e491]:
          - generic "查看模型文字说明" [ref=f3e492] [cursor=pointer]
      - region [ref=f3e493]:
        - generic [ref=f3e494]:
          - heading "IN PRODUCTION" [level=2] [ref=f3e495]
          - paragraph
          - generic [ref=f3e496]:
            - generic [ref=f3e497]:
              - term [ref=f3e498]:
                - generic [ref=f3e499]: DCC Software
                - generic [aria-hidden] [ref=f3e500]:
                  - generic [ref=f3e501]:
                    - generic: D
                    - generic: C
                    - generic: C
                  - generic [ref=f3e502]:
                    - generic: S
                    - generic: o
                    - generic: f
                    - generic: t
                    - generic: w
                    - generic: a
                    - generic: r
                    - generic: e
              - definition [ref=f3e503]:
                - generic [ref=f3e504]: Maya 2022 / Houdini 21–22
                - generic [aria-hidden] [ref=f3e505]:
                  - generic [ref=f3e506]:
                    - generic: M
                    - generic: a
                    - generic: "y"
                    - generic: a
                  - generic [ref=f3e507]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "2"
                  - generic [ref=f3e508]: /
                  - generic [ref=f3e509]:
                    - generic: H
                    - generic: o
                    - generic: u
                    - generic: d
                    - generic: i
                    - generic: "n"
                    - generic: i
                  - generic [ref=f3e510]:
                    - generic: "2"
                    - generic: "1"
                  - generic [ref=f3e511]: –
                  - generic [ref=f3e512]:
                    - generic: "2"
                    - generic: "2"
            - generic [ref=f3e513]:
              - term [ref=f3e514]:
                - generic [ref=f3e515]: SYSTEM
                - generic [ref=f3e517]:
                  - generic: S
                  - generic: "Y"
                  - generic: S
                  - generic: T
                  - generic: E
                  - generic: M
              - definition [ref=f3e518]:
                - generic [ref=f3e519]:
                  - link "Rez" [ref=f3e521] [cursor=pointer]:
                    - /url: https://rez.readthedocs.io/en/stable/#
                    - generic [ref=f3e522]:
                      - generic [ref=f3e523]: Rez
                      - generic [ref=f3e525]:
                        - generic: R
                        - generic: e
                        - generic: z
                  - generic [ref=f3e526]:
                    - generic [ref=f3e527]: /
                    - generic [ref=f3e529]: /
                  - link "Ftrack" [ref=f3e531] [cursor=pointer]:
                    - /url: https://www.ftrack.com/cn/
                    - generic [ref=f3e532]:
                      - generic [ref=f3e533]: Ftrack
                      - generic [ref=f3e535]:
                        - generic: F
                        - generic: t
                        - generic: r
                        - generic: a
                        - generic: c
                        - generic: k
                  - generic [ref=f3e536]:
                    - generic [ref=f3e537]: /
                    - generic [ref=f3e539]: /
                  - link "Pyblish" [ref=f3e541] [cursor=pointer]:
                    - /url: https://pyblish.com/
                    - generic [ref=f3e542]:
                      - generic [ref=f3e543]: Pyblish
                      - generic [ref=f3e545]:
                        - generic: P
                        - generic: "y"
                        - generic: b
                        - generic: l
                        - generic: i
                        - generic: s
                        - generic: h
            - generic [ref=f3e546]:
              - term [ref=f3e547]:
                - generic [ref=f3e548]: WORKFLOW
                - generic [ref=f3e550]:
                  - generic: W
                  - generic: O
                  - generic: R
                  - generic: K
                  - generic: F
                  - generic: L
                  - generic: O
                  - generic: W
              - definition [ref=f3e551]:
                - generic [ref=f3e552]: Builder / Loader / Publish / Dailies
                - generic [aria-hidden] [ref=f3e553]:
                  - generic [ref=f3e554]:
                    - generic: B
                    - generic: u
                    - generic: i
                    - generic: l
                    - generic: d
                    - generic: e
                    - generic: r
                  - generic [ref=f3e555]: /
                  - generic [ref=f3e556]:
                    - generic: L
                    - generic: o
                    - generic: a
                    - generic: d
                    - generic: e
                    - generic: r
                  - generic [ref=f3e557]: /
                  - generic [ref=f3e558]:
                    - generic: P
                    - generic: u
                    - generic: b
                    - generic: l
                    - generic: i
                    - generic: s
                    - generic: h
                  - generic [ref=f3e559]: /
                  - generic [ref=f3e560]:
                    - generic: D
                    - generic: a
                    - generic: i
                    - generic: l
                    - generic: i
                    - generic: e
                    - generic: s
            - generic [ref=f3e561]:
              - term [ref=f3e562]:
                - generic [ref=f3e563]: Production Format
                - generic [aria-hidden] [ref=f3e564]:
                  - generic [ref=f3e565]:
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
                  - generic [ref=f3e566]:
                    - generic: F
                    - generic: o
                    - generic: r
                    - generic: m
                    - generic: a
                    - generic: t
              - definition [ref=f3e567]:
                - generic [ref=f3e568]: USD / Alembic
                - generic [aria-hidden] [ref=f3e569]:
                  - generic [ref=f3e570]:
                    - generic: U
                    - generic: S
                    - generic: D
                  - generic [ref=f3e571]: /
                  - generic [ref=f3e572]:
                    - generic: A
                    - generic: l
                    - generic: e
                    - generic: m
                    - generic: b
                    - generic: i
                    - generic: c
            - generic [ref=f3e573]:
              - term [ref=f3e574]:
                - generic [ref=f3e575]: STATUS
                - generic [ref=f3e577]:
                  - generic: S
                  - generic: T
                  - generic: A
                  - generic: T
                  - generic: U
                  - generic: S
              - definition [ref=f3e578]:
                - generic [ref=f3e579]: Active / 2026
                - generic [aria-hidden] [ref=f3e580]:
                  - generic [ref=f3e581]:
                    - generic: A
                    - generic: c
                    - generic: t
                    - generic: i
                    - generic: v
                    - generic: e
                  - generic [ref=f3e582]: /
                  - generic [ref=f3e583]:
                    - generic: "2"
                    - generic: "0"
                    - generic: "2"
                    - generic: "6"
            - generic [ref=f3e584]:
              - term [ref=f3e585]:
                - generic [ref=f3e586]: PROJECT
                - generic [ref=f3e588]:
                  - generic: P
                  - generic: R
                  - generic: O
                  - generic: J
                  - generic: E
                  - generic: C
                  - generic: T
              - definition [ref=f3e589]:
                - generic [ref=f3e590]:
                  - generic [ref=f3e591]: 动画电影《赵子龙》
                  - generic [ref=f3e593]:
                    - generic: 动
                    - generic: 画
                    - generic: 电
                    - generic: 影
                    - generic: 《
                    - generic: 赵
                    - generic: 子
                    - generic: 龙
                    - generic: 》
        - figure "选择模块与版本，组装镜头。" [ref=f3e594]:
          - heading "FIG. 01 / SHOT BUILDER" [level=3] [ref=f3e595]
          - button "放大查看 SHOT BUILDER" [ref=f3e596]:
            - img "Shot Builder 实际界面：模块、版本选择与组装状态。" [ref=f3e597]
            - generic [ref=f3e598]: 放大查看 ↗
        - figure "收集、检查与发布，形成明确的交付流程。" [ref=f3e600]:
          - heading "FIG. 02 / PUBLISH / QC" [level=3] [ref=f3e601]
          - button "放大查看 PUBLISH / QC" [ref=f3e602]:
            - img "Publish 实际界面：收集、检查、发布与集成步骤。" [ref=f3e603]
            - generic [ref=f3e604]: 放大查看 ↗
        - generic [ref=f3e606]:
          - paragraph [ref=f3e607]: 2026.04–08 核心开发 · 两人团队。作者作为 Lead Pipeline TD / System Designer 主导架构与核心实现；另一位成员扩展 Production Modules，并主导场景组装核心能力。
          - paragraph [ref=f3e608]: 实际工具界面
    - contentinfo [ref=f3e609]:
      - generic [ref=f3e610]:
        - text: WEFT / PPL
        - paragraph [ref=f3e611]: SAME PIPELINE MORE POSSIBILITIES
      - button "人、数据与软件在同一生产系统中连接；重播动画" [ref=f3e612]:
        - img "人、数据与软件在同一生产系统中连接" [ref=f3e613]:
          - generic [ref=f3e622]:
            - generic [ref=f3e623]: PEOPLE
            - generic [ref=f3e624]: DATA
            - generic [ref=f3e625]: SOFTWARE
      - generic [ref=f3e626]:
        - link "03 / CONTACT" [ref=f3e627] [cursor=pointer]:
          - /url: /contact/
          - text: 03 / CONTACT ↗
        - link "BACK TO TOP" [ref=f3e628] [cursor=pointer]:
          - /url: "#top"
          - text: BACK TO TOP ↑
  - alert [ref=f3e629]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  4  | 
  5  | const snapType = (page: import("@playwright/test").Page) =>
  6  |   page.evaluate(() => getComputedStyle(document.documentElement).scrollSnapType);
  7  | 
  8  | test("homepage wheel approaches settle at sections and can leave in both directions", async ({ page }) => {
  9  |   await page.goto("/");
  10 |   await page.evaluate(() => document.fonts.ready);
  11 |   await expect.poll(() => snapType(page)).toBe("y proximity");
  12 |   await page.mouse.move(1420, 450);
  13 |   for (const id of ["summary", "views"]) {
  14 |     const section = page.locator(`#${id}`);
  15 |     const distance = await section.evaluate(el => el.getBoundingClientRect().top - 8 - 45);
  16 |     await page.mouse.wheel(0, distance);
  17 |     await expect.poll(async () => Math.abs((await section.boundingBox())!.y - 8)).toBeLessThan(2);
  18 |   }
  19 |   const before = await page.evaluate(() => scrollY);
  20 |   await page.mouse.wheel(0, 500);
  21 |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
  22 |   const after = await page.evaluate(() => scrollY);
  23 |   await page.mouse.wheel(0, -600);
  24 |   await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(after - 100);
  25 |   await page.keyboard.press("Control+End");
  26 |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
  27 |   await page.getByRole("link", { name: /BACK TO TOP/ }).click();
  28 |   await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(2);
  29 | });
  30 | 
  31 | test("production anchor and expanded reading stay usable", async ({ page }) => {
  32 |   await page.goto("/#views");
  33 |   await page.locator('[data-control="operate"]').click();
  34 |   await page.getByRole("link", { name: "VIEW PRODUCTION", exact: true }).click();
  35 |   await expect(page).toHaveURL(/#production$/);
  36 |   await expect.poll(async () => Math.abs((await page.locator("#production").boundingBox())!.y - 8)).toBeLessThan(2);
  37 |   await page.getByRole("button", { name: /放大查看 Shot Builder/ }).click();
  38 |   await expect(page.locator("dialog[open]")).toBeVisible();
  39 |   await expect.poll(() => snapType(page)).toBe("none");
  40 |   await page.keyboard.press("Escape");
  41 |   await expect.poll(() => snapType(page)).toBe("y proximity");
  42 |   await page.locator("#views details summary").click();
  43 |   await expect.poll(() => snapType(page)).toBe("none");
  44 |   await page.locator("#views details summary").click();
  45 |   await expect.poll(() => snapType(page)).toBe("y proximity");
  46 | });
  47 | 
  48 | test("chapters, narrow screens and reduced motion do not inherit homepage snapping", async ({ page }) => {
  49 |   await page.goto("/");
  50 |   await page.getByRole("link", { name: "02 / 设计&创新", exact: true }).click();
  51 |   await expect(page).toHaveURL(/\/design-innovation\/$/);
  52 |   await expect.poll(() => snapType(page)).toBe("none");
  53 |   for (const route of ["/systematic-thinking/", "/contact/"]) {
  54 |     await page.goto(route);
  55 |     expect(await snapType(page)).toBe("none");
  56 |   }
  57 |   await page.goto("/");
  58 |   await page.setViewportSize({ width: 390, height: 844 });
  59 |   expect(await snapType(page)).toBe("none");
  60 |   await page.setViewportSize({ width: 1440, height: 900 });
  61 |   await page.emulateMedia({ reducedMotion: "reduce" });
  62 |   expect(await snapType(page)).toBe("none");
  63 |   await page.emulateMedia({ reducedMotion: "no-preference" });
> 64 |   await expect.poll(() => snapType(page)).toBe("y proximity");
     |                                           ^ Error: expect(received).toBe(expected) // Object.is equality
  65 | });
  66 | 
```