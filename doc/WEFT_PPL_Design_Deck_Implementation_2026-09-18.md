# WEFT / PPL — Design Decision Deck implementation

User-authorized expansion: `/design-innovation/` is now the complete 02 / DESIGN & INNOVATION chapter; `/in-production/` is one page with compatibility, modularity, state and execution anchors. Other deferred chapters remain unchanged.

Latest correction: remove the entire lower In Production index. The page is Hero → four text indexes → short model judgment → one active decision poster → Synthesis → Next Chapter → footer. Each poster retains its own In Production artifact and specific CTA.

## Entry points

- `src/content/decisions.ts`: typed, bilingual content for the four parallel decisions.
- `src/components/design/DesignPage.tsx`: Server Component page, card content, synthesis and footer.
- `DecisionDeck.tsx`: bounded client controller for active decision, controls, keyboard, touch and animation. Cards arrive as server-rendered children; all baseline text is prerendered.
- `DecisionDiagrams.tsx`: four conceptual SVG diagrams; both G2 and G3 are valid, composition preserves separate module identities, state merges a delta, rules attach to execution points.
- `ProductionArtifact.tsx`: labeled simplified structure/data and display-only crops of the original public screenshots.
- `InProductionPage.tsx`: one server-rendered destination with four real anchors and documented implementation boundaries.
- `DesignPage.module.css`: chapter-local styles; `SiteHeader` is reused unchanged visually. Shared automatic Next Link prefetch is disabled because it requested missing static segment files in the local export.
- `tests/design-deck.spec.ts`: targeted interaction, responsiveness, scoped accessibility and routing checks. Full validation and visual comparison are recorded in `design-qa.md`.

## Motion contract

No autoplay or hover switching. First/last navigation buttons are disabled at the boundaries. Top indexes, indicators, Prev/Next, Arrow Left/Right, Home/End and horizontal touch gestures share one active index. Vertical touch movement remains scrolling.

One GSAP context owns all transition styles: outgoing relation dims, diagram contracts by 3%, content moves horizontally by 6%; incoming labels crossfade, lines draw, nodes appear and Mint relations resolve. Total timeline is approximately 660ms. Interrupted transitions revert their context before the next one starts; inactive panels are inert and hidden from assistive technology. Reduced motion immediately replaces content. Language changes do not restart motion or reset selection. No selection persistence or backend was added.

## Verification and limits

Final static build and four Edge tests passed. Desktop, tablet, mobile, English, rapid switching, simulated swipe, anchors, shared nav and contrast were checked. No deployment or Git push was performed. Preserve unrelated dirty changes from other active work in this repository. Remaining user visual approval, real-device testing and production-runtime questions are not implied by the frontend checks.
