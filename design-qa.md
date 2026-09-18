# Design & Innovation — visual QA, 2026-09-18

final result: passed

## Scope and visual truth

- Source: `ref/final3.png`, 860 × 1828 pixels.
- Implementation: `http://127.0.0.1:4173/design-innovation/`, static export.
- Desktop capture: `artifacts/design-deck-desktop.png`, 1440 × 2650 pixels; viewport 1440 × 1000 CSS px, DPR 1; Compatibility active, Chinese, page at top, no focused control.
- Both source and desktop capture were displayed together in one in-memory comparison image, each normalized to 650px wide without cropping or stretching. The supplied reference is a full-page image, not a measured browser viewport; this is proportional visual comparison, not a pixel-identical claim.
- Intentional source deviations: the existing shared navigation (including language and status) takes precedence over the reference's simplified header; user removed the entire bottom In Production index; no decorative crop marks; technical font and body font reuse the established site. Four procedural diagrams explain concepts, while the two original production UI crops remain real images.

## Focused and responsive comparisons

- `artifacts/design-deck-tablet-1.png` through `design-deck-tablet-4.png`: active-card captures at a 768 × 1024 CSS viewport, DPR 1, reduced motion. The final State capture is 664 × 1663px. State and Modularity were inspected at full readable size; Execution and the two production artifact regions were also inspected separately.
- `artifacts/design-deck-mobile-1.png` through `design-deck-mobile-4.png`: 390 × 844 CSS viewport, DPR 1, touch context, reduced motion. Compatibility full-page capture is 390 × 3081px.
- `artifacts/design-deck-english.png`: English Execution state, language restored after reload.
- Final Shot Builder and Publish crop regions were viewed together after adding explicit clipping rectangles. Original state colors, values and labels remain unchanged. The supplied Publish image does not show QC Instance; it was not fabricated.

## Findings and iteration history

1. Initial desktop capture was taken while scrolled and showed the shared sticky navigation inside the full-page screenshot. Capture now returns to the top, removes focus and waits for the header's Hero state. This was a capture-state mismatch.
2. [P2, fixed] Mobile diagram labels were too small and Synthesis nodes did not align when labels wrapped. Increased diagram label sizes and gave summary items equal label-row height. Re-captured mobile and tablet states.
3. [P2, fixed] Automated contrast checks found two small labels at 4.47/4.49:1 and a faded next-card label. Darkened these labels while preserving the neutral palette. All four active cards now pass the scoped WCAG 2 A/AA axe checks.
4. [P2, fixed] Tablet desktop columns produced a short orphan line in the State heading. Use the vertical poster layout at 960px and below. Final tablet capture has the intended two-line statement and readable diagram.
5. [P2, fixed] A flex sizing adjustment let a card CTA extend beyond its panel boundary. Restored normal article flow and added a bounds assertion for all four tablet cards; re-captures show complete CTAs.
6. [P2, fixed] SVG viewBox alone exposed source-image content outside the desired crop under letterboxing. Added explicit clip paths; final focused comparison confirms the requested image regions.
7. [P2, fixed] Shared Next Link automatic prefetch requested nonexistent static segment files (`__next.$d$section.__PAGE__.txt`). Disabled automatic prefetch in the shared SiteHeader without changing layout, labels or destinations. Actual chapter navigation and console/resource checks pass.

## Required fidelity surfaces

- Typography: established Microsoft YaHei/body fallback and Barlow Condensed technical typography retained; increased main statement, summary and diagnosis hierarchy after comparison; controlled line breaks and complete tablet CTAs verified.
- Spacing/layout: 4.35% outer margins, a 95%-width desktop poster with a narrow next-card edge, thin internal rules, 4px outer radius, stacked small-screen content and a full-width dark Synthesis band. The common panel footprint deliberately avoids navigation jumps across decisions.
- Color/tokens: Ivory / charcoal / Mint retained. Mint denotes valid relations, changed/current entries or selected controls; G2 and G3 both retain valid compatibility paths. Real screenshot colors are untouched.
- Assets: original public Shot Builder and Publish images, display-only crop, no fabricated UI; RigCache structure and record data explicitly labeled simplified. Conceptual SVGs follow the project's explicit diagram requirements.
- Copy: latest user-provided four parallel decisions override the historical sequential specification; diagnosis belongs inside each card; no user-visible Evidence/Proof/Verification heading in cards; the bottom In Production index is absent; all four concrete CTAs reach one anchored page.

## Verification

- `npm run build`: passed, including the new `/in-production/` static route.
- `npm run typecheck` and `git diff --check`: passed during implementation; final build includes TypeScript checking.
- Final `npx playwright test tests/design-deck.spec.ts --output=artifacts/design-test-results --reporter=list`: 4 passed (17.3s).
- Checks include top indexes, Prev/Next, indicators, keyboard arrows, rapid interruption, hover without switching, inactive content inertness, simulated touch swipe versus vertical movement, reduced motion, 390/768px overflow, four destination anchors, bilingual reload, actual shared navigation, active-card axe checks, CTA bounds and absence of page/console/resource errors in the navigation scenario.
- In-app automation was blocked by a local sandbox initialization fault. The user explicitly approved the existing Playwright/Edge fallback. Preview was queued to open in Codex and the static preview server was left running.

No remaining actionable P0/P1/P2 visual findings in the reviewed scope. This is agent QA, not final user visual acceptance or human reader testing. Physical touch hardware, broader cross-browser behavior, real-user performance, runtime production behavior and deployment were not validated. The actual production crops are intentionally small; the In Production destination provides a larger presentation.
