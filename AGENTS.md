# WEFT / PPL Showcase Website

## Project goal

Build a public-facing case-study website for WEFT / PPL, a Cross-DCC animation production system. The site should make WEFT / PPL itself the subject. The visitor should infer the author's system-design capability from the system's design decisions and real production evidence, rather than from self-promotional claims.

The repository contains planning, references, and an in-progress frontend implementation. Inspect current code before editing; another implementation task may be active. The production system's active status does not mean this showcase website has been completed or deployed.

## Confirmed decisions and document authority

User-confirmed on 2026-09-16: adopt the newer overview-homepage direction, and **V1 delivers only the homepage**. Separate chapters, Flow, and Evidence pages are deferred. The full multi-page V1 checklist in the technical specification does not override this scope.

Additional user decisions: **no backend/CMS integration for V1**; deployment will be on GitHub; the contact email will be provided later. Interpret GitHub hosting as GitHub Pages for planning, pending confirmation of the actual repository/site URL. Do not claim deployment is configured or complete.

Read the relevant sources before changing content, visuals, or implementation:

- [Homepage Summary V0.1](doc/WEFT_PPL_Homepage_Summary_V0.1.md): current homepage purpose, structure, copy, and three-view concept.
- [Technical Implementation Specification V2.2](doc/WEFT_PPL_Website_Technical_Implementation_Spec_V2.2.md): current architecture, static hosting, temporary text editing, and acceptance contracts. V2.1 is a historical baseline; only the interaction and rendering rules explicitly retained by V2.2 apply.
- [Visual Design Specification V0.1](doc/WEFT_PPL_Visual_Design_Spec_V0.1.md): visual grammar and evidence presentation. Its older four-block layouts and optional technology suggestions do not override the newer homepage and technical decisions.
- [Content Plan V0.3.4](doc/PPL_Showcase_Website_Plan_V0.3.4_4-Block-Structure.md): system explanations, examples, attribution, and engineering boundaries. Its seven-section homepage layout, block weights, and original reading test no longer directly govern the homepage.

Explicit user decisions take precedence. Do not silently rewrite the historical documents or infer authority solely from version numbers. Ask the user about new substantive conflicts before implementing a disputed decision. Reference-site analysis is inspiration, not a product requirement or evidence of WEFT / PPL capabilities.

## Session handoff and later confirmed refinements

Latest card-heading correction on 2026-09-20: remove the entire row between decision indexes and card frame, including DESIGN DECISION VIEWER / 05 and the active category title. Also remove the old internal category header and FIG. 02.xx from every card. Do not restore either intermediate moved/left-right-swapped title design. Five indexes and side labels still identify decisions; retain Part 01 statement titles, card body scrolling, fixed bottom navigation and viewer height. The deck region has a bilingual accessible label without a visible heading.

Latest scroll trial on 2026-09-20: user requested native light section snapping, first on the homepage and then explicitly on chapters 01 and 02. Use CSS y proximity, not mandatory paging, wheel interception, timed locks or scroll-driven card switching. Preserve existing section heights and normal scrolling inside long sections. Chapter 02 indexes and viewer snap together; its card body retains independent scrolling and overscroll containment. Contact stays natural. Enable only above 1000px with a fine hover pointer and no reduced-motion preference, after header tracking initializes. Suspend snapping for editing, open image dialogs or expanded homepage model disclosure. In active snap mode use direct anchor jumps (scroll-behavior: auto) to avoid the reproduced Chromium smooth-anchor re-snap to the old section; do not add a second animation controller. Do not expand to touch/mobile without a later user request. This is a local trial, not deployment or final tactile acceptance.

Latest navigation and Contact color correction on 2026-09-20: Chinese navigation is “02 / 设计&创新”, overriding the site-structure freeze's “设计与创新”; keep the English name and route unchanged. Contact uses Chapter 02's text palette: primary #17232c, technical labels #5c666b, introductory supporting copy #4f5a61. Preserve layout, typography sizes and mint link interaction.

Latest screenshot/copy corrections on 2026-09-20: Operate must reuse the original layered SHARED MODEL stack and original curved third-view reveal, not a new rectangular hub. Four upper branches are BUILDER / LOADER / PUBLISH / REVIEW; two lower branches are HOUDINI (left) / MAYA (right). Do not add a separate Resolver branch, USD/state label block or live-status badge; existing Resolution semantics remain in the shared model. Use solid mint for existing relationships, retaining the former third view's staggered curve / tip / label animation and reduced-motion behavior. The homepage Transform question is exactly “重新审视默认假设，由此形成新的设计判断。”; this does not change the Chapter 02 Hero. Contact keeps its restrained page, adds the light English interests subtitle, separates the two About paragraphs, uses Agent Systems & Tool Orchestration and GET IN TOUCH with a small EMAIL label above the confirmed address. No unconfirmed social links, extra graphics or animations. These corrections override the initial Operate draft below.

Latest homepage-view correction on 2026-09-20: restore ONE SYSTEM / THREE VIEWS as Organize / Transform / Operate. The third view is 03 / IN PRACTICE, “设计如何进入真实制作？”, not Contact or a future roadmap. Keep the same production modules and composed workspace; Operate reveals Builder, Loader, Publish, Resolver, Review and Maya / Houdini around the shared model with mint active relationships. This is an illustrative system-level map, not live runtime status or a universal per-DCC tool sequence. The third CTA is explicitly VIEW PRODUCTION ↘ and links to the existing homepage #production section; the first two EXPLORE links still navigate to their chapters. Top-level Contact navigation remains unchanged. No new /in-production/, /next/ or /evidence/ route is authorized. This overrides only the TWO PERSPECTIVES choice in the immediately preceding structure freeze below. Preserve inspection, keyboard cycling, reduced motion, bilingual copy and the shared scene; do not revive Extend or speculative future nodes.

Latest site-structure freeze on 2026-09-20: public navigation is 00 项目概览 / 01 系统思考 / 02 设计与创新 / 03 联系 (Overview / Systematic Thinking / Design & Innovation / Contact). Remove What Comes Next and its speculative roadmap. The homepage now has TWO PERSPECTIVES, Organize and Transform; Contact is not a Canvas mode. Remove Extend nodes, controls and motion while preserving the shared scene, inspection and remaining motion. Chapter 02 keeps Synthesis and ends with only 03 / CONTACT; remove all card detail CTAs, but retain their Project Examples and artifacts (04 still omits Part 03). Do not export /next/, /in-production/ or /evidence/ now. Retain deeper production source content for a future user-authorized documentation destination; do not restore public links just because that source exists. /contact/ is a lightweight project close with About This Work, four interests and the user-provided mailto:ace199704@icloud.com. No form, fabricated social URLs or V2 commitments. Existing navigation behavior and Ivory / Black / Mint remain. This overrides the five-anchor public-route and three-view wording below. The previous GitHub upload is a historical receipt, not publication of this new structure.

Latest background correction: chapter 01 uses the same flat `var(--paper)` Ivory background as chapter 02. Remove chapter 01's white radial-gradient overlay; preserve its dark sections.

Latest chapter typography decision: match chapter 01's Hero main title and chapter label to chapter 02. Main title uses the same body/display language choice, 750 weight, 1.12 line height, 0.015em Chinese tracking and responsive sizes (38px–80px desktop, 35px–52px at <=960px). Preserve each chapter's copy and content structure; this does not restyle all internal headings.

Latest card sizing refinement: add 40px to the desktop (>960px) Design Decision Viewer height, giving that space to the internally scrollable card body. Narrow screens retain the prior height. Preserve fixed card header/footer, document-flow indexes and natural-height Hero. The desktop viewer is now slightly taller than the previous exact viewport-minus-header fit.

Latest Card 04 removal: omit the entire Part 03 / Project Example section (including its CTA) from Task Composition only. Keep its Decision and Before / After, and preserve the examples and implementation boundary on `/in-production/#task-composition`. Other cards retain Part 03.

Latest Card 04 narrative correction: explain a ten-character shot becoming heavy and hard to divide under one Ani Task. Before lists three main and seven secondary characters. After splits Main Characters, Secondary Characters and Camera / Layout tasks, with Mint contributions to Ani Master State and retained task sources. Use “Single Shot Ani Task → Split Tasks + Shared Shot State”. Benefits are lighter working scope, clearer ownership and preserved shared state, not a measured performance claim. Directory examples use Main_Characters / Secondary_Characters / Camera, not Task_A / B / C. Preserve the existing publish-only implementation boundary.

Latest Hero correction: the user reverted Design & Innovation's full-screen Hero spacer. Restore its natural content height and original top padding; remove the viewport min-height and added bottom padding. Keep current copy, five-card Viewer and Card 04 Part 03 removal unchanged. This does not change the homepage Hero.

Latest extension on 2026-09-20: the Design Decision Viewer now has five cards: Compatibility, Modularity, State, Task Composition, Execution. Insert Task Composition as 04 and move Execution to 05; circular navigation, Synthesis and the single In Production page include the new `#task-composition` anchor. Its examples are illustrative. Publish-side Task Record + Ani Master Record aggregation is in scope; Maya Ani Builder does not yet reconstruct full multi-task shots from that master record. Preserve fixed cards and internal scrolling. Index subtitles are smaller; Task Composition's short label is only “Independent Subtasks” (remove “/ Shared Shot State” from the index, not the card's meaning).

Latest navigation wording correction on 2026-09-20: use Chinese “设计&创新”, superseding “设计/创新” below. Keep the English name and `/design-innovation/` route unchanged.

Latest user decisions on 2026-09-20: read `doc/WEFT_PPL_Development_Handoff_2026-09-20.md` first. Card 03 has no Before comparison: independent module publishing motivates partial changes plus full shot state. Card 02's project example splits resource-tree illustration and actual Shot Builder crop; Card 04 splits illustrative execution steps and a compact actual Publish thumbnail with click-to-enlarge, Escape/backdrop/close dismissal and focus return. Chinese navigation is “设计/创新”; route and English name are unchanged. Card 01 uses matching fine-grid cubes and spheres, with mint face fills for material, synchronized rotating cubes, and the revised historical compatibility captions. These override the earlier uniform Before layout; diagrams remain conceptual and screenshots retain the user's earlier public-use authorization.

Latest handoff entry: read `doc/WEFT_PPL_Development_Handoff_2026-09-20.md` before the historical September 17 handoff. The user authorized this session's normal GitHub source commit/push. This does not establish that GitHub Pages is live. The Compatibility specimen's project prefix is now a solid gray rectangle; preserve the remaining URI path and semantic highlights.

Latest user freeze on 2026-09-20: use `doc/WEFT_PPL_Chapter02_Card_Structure_Freeze_2026-09-20.md` for all four card interiors. Three consecutive sections: Decision (title, summary, one-line System Shift), Before → WEFT / PPL comparison, Project Example viewer + explanation + CTA. Absorb diagnosis into Before; do not restore the four-quadrant layout. Keep fixed card, internal scrolling and circular navigation. The supplied examples are illustrative, not verified runtime records; Camera stays outside the rigcache map, and resource states/execution sequences must be explicitly labeled illustrative.

Latest user correction on 2026-09-19: the Decision Deck is circular. Show 04 to the left of 01 and 01 to the right of 04. Side edges, previous/next, arrow keys and swipes wrap consistently; Home/End still select the first/last card.

User-confirmed on 2026-09-19: prevent shared navigation hover from intercepting the four Design decision indexes. Desktop collapsed reveal uses only the visible 8px strip with a cancellable 300ms hover delay. Mobile/coarse pointers use a visible bounded 44px toggle rather than a full-width invisible extension. Preserve keyboard reveal, Escape, Hero visibility, editing and reduced-motion behavior.

Latest user direction on 2026-09-19: Chapter 02 is a Design Decision Viewer. Remove the “问题，往往出在模型” interstitial. The user's subsequent screenshot correction explicitly retains the bordered internal card and neighboring card slivers: the card has a fixed viewport-responsive size, with a vertically scrollable body, fixed card header and persistent Prev / indicators / Next controls. Mouse-wheel input inside the body scrolls its content, not the outer document; retain generous title and diagram scale instead of shrinking everything onto one sheet. Four sticky indexes and the card compose the desktop viewport below the shared header. Narrow screens stack the content inside the same scrollable card; very short windows retain a usable minimum height. Retain Hero copy, Synthesis, Next Chapter, shared navigation and all four `/in-production/` anchors. Use ivory, monospace, line-numbered Production Artifact specimens: simplified USDA with semantic Mint highlights, resource tree, Delta / Current State JSON selector, and execution mapping. This request authorizes showing the supplied simplified USDA logical URI in this chapter. Clearly label examples; do not present illustrative records or execution stages as raw production data or passing runtime checks. Real screenshot crops remain on the deeper production page. This supersedes earlier natural-height card layout and card-only screenshot requirements; it does not authorize deployment.

Further 2026-09-19 correction: the four decision indexes must move together with the fixed card in document flow. Do not independently stick the indexes above a scrolling-away card: this caused the index bar to overlay the diagram/footer. This overrides the earlier sticky-index wording; the card's own header/footer remain fixed relative to its internal scroll body.

Later correction in the same 2026-09-18 session: remove the entire bottom IN PRODUCTION four-link index from Design & Innovation. Synthesis now leads directly to Next Chapter. Keep each decision card's IN PRODUCTION content and CTA and the shared `/in-production/` destination.

User authorization on 2026-09-18: implement `/design-innovation/` (02 / DESIGN & INNOVATION; called chapter03 in conversation) against `ref/final3.png`, with four parallel Decision views in one click-controlled Deck, not four sequential sections. Current user copy overrides the older Chapter 02 Content Spec V1. Preserve the shared `SiteHeader` navigation, Ivory / Black / Mint, and technical editorial diagrams. Remove the separate large “设计如何进入真实生产” heading/block from this chapter; retain the compact four-link In Production index and each card's production artifact and CTA. The user authorized one `/in-production/` page with compatibility / modularity / state / execution anchors, not four detail routes. Deck supports indexes, previous/next, indicators, keyboard and swipe, no autoplay or hover switching, interruptible restrained 550–750ms motion and reduced-motion replacement. Use original authorized Shot Builder / Publish crops; conceptual structures and data examples remain labeled as simplified. Other chapter scope and deployment are unchanged.

Later user correction: language selection is a global site preference, retained across page navigation. The LanguageProvider now stores only `zh` / `en` under `weft-ppl.language` in browser localStorage, so navigation and reload restore the selected language. This supersedes the earlier in-memory-only language decision. Temporary text edits remain strictly in memory and are never persisted.

Latest user authorization on 2026-09-17: implement the complete `/systematic-thinking/` chapter after reading Section02 V0.2 and the Development Handoff, designing its motion document first. `ref/final2.png` is the final visual target for this chapter (not a replacement homepage target). This explicitly expands the previous homepage-only implementation scope for this one chapter. Follow `doc/WEFT_PPL_Section02_Motion_Design_V0.1.md`; other chapters remain deferred. Six shared semantics are distinguished from execution mechanisms in this chapter. Illustrations are conceptual, not runtime evidence. This request does not authorize deployment or changes to unrelated homepage motion.

Before continuing implementation, read [Development Handoff — 2026-09-17](doc/WEFT_PPL_Development_Handoff_2026-09-17.md). It records user preferences observed in this project, explicit later decisions, code entry points, reproduced bugs, verification limits, and work still pending. Keep observations distinct from binding user instructions; inspect current code and Git status before editing.

The following explicit later decisions override conflicting earlier visual / interaction wording below: remove decorative plus / crop marks; keep natural irregular tissue cells and distance-based per-glyph Hero feedback; allow green-node hover Bloom (current radii 8 / 24px). Navigation plus Hero fills the first viewport. The desktop Master Canvas fits one viewport with its model disclosure closed; an open disclosure flows below. Navigation follows the Summary top boundary upward after it meets the header bottom, retaining a thin white strip, with manual reveal available. Do not reintroduce the obsolete leave-Hero idle-collapse rule or the status ticker pause button. The footer three-circle animation waits 1.5 seconds on first visible entry, then supports hover / keyboard / touch replay. Reduced-motion and editing behavior remain supported.

Preserve these refinements when referring to `ref/final.png`; the reference does not override later user corrections. Update this existing `AGENTS.md`, never create a duplicate lowercase `agent.md` / `Agent.md`.

User-approved Master Canvas direction on 2026-09-17: use `ref/mid_1.png`, `mid_2.png`, and `mid_3.png` as illustrative direction for independent production modules → shared organization → composed workspace. Build the camera, set, and neutral character procedurally with a shared projection; replace the illustrative “布料” label with “角色” and refine the camera frustum. All views reuse the same scene. Keep these diagrams explicitly illustrative, not production evidence. Current implementation places model inspection buttons below the scene and the three preview / EXPLORE controls in a row below it; mobile uses a vertical scene. This is a reviewable implementation, not final user visual acceptance.

Later user correction on 2026-09-17: replace the neutral character in the Master Canvas with the folded, dotted cloth-like surface shown in the mid references, but label it “资产” (Asset). Apply the surface to the independent module, version preview, and composed workspace. This overrides the earlier character decision above.

Later user confirmation on 2026-09-17: restore bidirectional inspection between the production scene and the model labels. Hover / keyboard focus highlights corresponding objects and relationships and updates the explanation; clicking / tapping pins a selection. A second click, blank-scene click, or Escape clears inspection. Changing views clears obsolete inspection. Inspection must not restart the view's geometry animation. Keep touch targets separated in the vertical mobile scene.

## Final homepage visual target

Later Hero refinement on 2026-09-18: use procedural dandelion seeds in the homepage Hero only, preserving its cluster positions, connections, gathering, breathing and pointer response. The user rejected uniformly tiny seeds: stem length and crown size must vary independently. After earlier enlargements, the latest request lengthens stems another 30% and reduces particle count another 25%, without changing crown size. Current count = round(rx * ry / 16 * .75); stem range 6.3375–31.6875 and crown range 4.29–10.92 before individual scale. Summary keeps its existing tissue-cell treatment. Visual acceptance remains iterative; do not describe the generated reference as an exact match.

Latest public terminology decision: use `IN PRODUCTION` for public-facing production section titles and short links, and `HOW IT WORKS IN PRODUCTION` for explanatory entry points. Do not use Evidence, Proof, or Verification as public first-impression headings. Internal Evidence Layer terminology, existing `/evidence/` route, component names and stable field IDs may remain unchanged. Chinese public wording should describe real production practice, not evidence acceptance.

Latest crop correction: remove top white/window-title chrome rather than using centered cover/zoom cropping. Use the final image's remaining aspect ratio as the shared frame; contain the prototype proportionally and extend any unused area with white. Preserve remaining tool content and use identical crop/fit calculations during character transitions.

Further viewer refinement: no visible X/close button; dismiss via backdrop click/tap or Escape. Add a narrow dotted outer frame. Dissolve uses fewer, larger continuous regions, and glyphs change independently in place at varied intervals (no scrolling or synchronized character sequence).

Latest image-viewer correction: remove visible surrounding titles, captions and replay text. Keep only an in-image close icon, backdrop/Escape dismissal and image-click replay. Fit prototype/final into the same fixed frame per tool with light edge cropping. Transition in two stages: prototype dissolves into a dense full-frame code field, then that field dissolves into the final image; no directional sweep. Current glyph spacing is 8×12 CSS pixels.

Later user refinement: clicking a Production Proof thumbnail opens a large image viewer showing the prototype first. Clicking that image reveals the final implementation through a short character-grid transition (# / * / other symbols). Keep the resting homepage simple; no inline comparison controls or annotation system. Support close/Escape, replay, keyboard focus containment, and immediate switching with reduced motion.

User-confirmed on 2026-09-17: keep homepage Production Proof simple: show the supplied Shot Builder and Publish final screenshots with short captions, without prototype switches or interactive annotations. Deeper comparisons belong in later chapters. The user explicitly confirmed that the project, shot and asset names visible in these supplied screenshots may be public; retain the original images without redaction.

**[ref/final.png](ref/final.png) is the user-designated final homepage visual target**, not merely a mood-board reference. Verified path: `C:\Users\63201\Documents\prj\WEFT_PPL_Presentation\ref\final.png`.

Use it as the primary reference for overall composition, section order, relative scale, typography hierarchy, ivory/charcoal contrast, thin rules, crop marks, mint highlights, diagram placement, and footer layout. Compare the implemented desktop page against it. Adapt to smaller screens while preserving hierarchy and readability; do not invent a different art direction.

The image is a static target, not a complete animation or responsive specification. Use Technical V2.2 and its retained interaction contracts for behavior. The target's `EXPLORE` / `VIEW EVIDENCE` labels do not authorize deferred pages or dead links. Its two production screenshot frames explicitly contain placeholders: they establish framing, not verified production evidence. Use real redacted screenshots for final proof; report missing assets rather than fabricate UI. Contact links require a real supplied destination. The newly authorized temporary text editor is an additional on-demand UI, not depicted in the target; preserve the target in normal browsing mode.

If faithful implementation of the target conflicts materially with confirmed scope, content accuracy, or interaction rules, explain the specific conflict and ask the user instead of silently changing the target.

## Naming convention

Use **WEFT / PPL** as the canonical public-facing name in all new documents and website naming: page titles, navigation labels, hero copy, metadata, captions, and external-facing references. **WEFT** is the public-facing name; **PPL** preserves the production-pipeline engineering identity and continuity. Do not introduce alternatives such as “PPL” alone, “WEFT” alone, or expanded names unless the user explicitly defines a context-specific exception.

Existing historical planning files retain their original filenames and wording unless the user asks for a migration or archival rename.

Default Hero treatment:

```text
WEFT / PPL
跨软件协作的动画生产系统

让不同人、不同软件产出的制作成果，能够正确交接和组合。
```

`A Cross-DCC Production System` remains an approved English descriptor. `Designing a Cross-DCC Production System` is an approved longer title where appropriate. Retain the slash in `WEFT / PPL`. Mixed-language planning documents do not establish a requirement for a bilingual site.

## Current scope

The homepage is an overview and entrance, not a compressed full case study. Within 30–60 seconds readers should understand what WEFT / PPL is, what it organizes, that it runs in real production, and its three perspectives.

```text
Header
Hero
System Summary
One System / Three Views — Interactive Master Canvas
Production Proof
Footer
```

The three views are Systematic Thinking / Organize, Design & Innovation / Transform, and What Comes Next / Extend. They are homepage preview controls in V1, not a requirement to build three routes. Use one shared graph with different layouts, visibility, and emphasis; do not replace it with three unrelated preview images.

Keep the shared model: Context, Product, Version, Dependency, State, Validation, Resolution, and Composition. Transform provides a short preview; full design cases are deferred. Extend distinguishes existing structures with solid lines from future directions with dashed lines: governance, recovery, observability, regression, and scale-aware coordination.

Header navigation is **page navigation**, never homepage section scrolling or Master Canvas view selection. Map Overview to `/`, Systematic Thinking to `/systematic-thinking/`, Design & Innovation to `/design-innovation/`, and What Comes Next to `/next/`. Preserve this meaning even while destination content is unimplemented. Minimal destination pages that clearly say the content is not yet available and provide a return-home link are allowed to make navigation functional; they are not completed chapters and do not expand V1 into full chapter implementation. Do not use dead links or silently substitute homepage anchors.

Master Canvas hover/focus (mobile tap) controls previews; its separate `EXPLORE` CTA navigates to the corresponding chapter route. `VIEW EVIDENCE` likewise refers to `/evidence/`, not an anchor to the homepage proof strip; a minimal unavailable-content destination is allowed. Only explicitly in-page actions such as `BACK TO TOP` scroll. Production Proof remains on the homepage. All static routes must respect the deployment base path.

## Four system-level design moves

These are system-level distinctions, not homepage blocks or four required full homepage sections. Preserve their meanings.

### 1. Compatibility and asset resolution

Core claim: latest is not necessarily compatible. Establish the compatible dependency range before choosing a concrete version.

Deep-dive authority: Compatibility and Asset Resolution.

### 2. Composable production modules

Core claim: Camera, Set, characters, and applicable downstream units can be versioned and selected independently rather than republished as one monolithic package.

This move explains why products must be independent. The Modular Workspace Composition deep dive explains how selected products are assembled in Houdini; do not duplicate that implementation story here. Use **Module** as the primary public term. “Slot” may appear only as visual shorthand, never as a claim that PPL has a generic plug-in registration API.

### 3. Incremental shot state

Core claim: a publish can contain only the current change while the system maintains the complete current shot state, including explicit deletion.

Deep-dive authority: Incremental Shot State.

### 4. Executable workflow and validation

Core claim: Builder establishes a correct starting context; Publish and QC enforce delivery rules at the boundary. Automation should support explicit artist choices, not conceal them.

Deep-dive authority: Publish and Executable Validation.

## Content layers

- **Homepage (V1):** Overview, system summary, three interactive perspectives, and concise real production proof.
- **Chapters (deferred):** Detailed system thinking, design moves and production stories, and engineering directions.
- **Flow (content approach, not a required route):** Follow a production story from input through state change, output, and downstream consumption. No independent Flow page is required for V1; future placement is deferred.
- **Evidence (standalone page deferred):** Verify exact implementation, scope, limitations, source evidence, and runtime behavior.

Do not leak `av/v`, record-file names, resolver URI syntax, DCC node parameters, source paths, implementation symbols, or known integration gaps into homepage body copy. Those belong in Flow or Evidence.

## Evidence and claims

Only make claims supported by project evidence. The planning documents record these publishable facts; this documentation review did not independently verify the production runtime:

- Core build: April to August 2026, approximately five months.
- Team: two people.
- Status: active production in one real production project.
- Coverage: ASSET, SET, SEQ, and SHOT across Maya 2022 and Houdini 21/22.
- Infrastructure: Rez, USD/Asset Resolver, Ftrack, and Dailies.
- CFX and Hair paths are still evolving.

Do not invent user counts, publish volumes, time savings, reliability percentages, or claims of complete stability. Preserve attribution: the author is Lead Pipeline TD / System Designer, leading architecture and core implementation. The other contributor extended Production Modules on the shared framework and led ASB core capabilities. Do not imply solo authorship.

State terminology remains unresolved: V0.3.4 describes `NEW / UPDATE / LOADED / LOST`, while the visual specification uses `READY / UPDATE / LOADED / LOST`. Do not assume READY equals NEW, or relabel a real UI. Verify the source tool before making runtime-state claims; distinguish illustrative labels from actual tool states.

Known implementation questions are Evidence work, not homepage defects: Hair Grm-generation discovery, Shot Builder record source, resolver refresh behavior, constrained-generation failure behavior, concurrent master-record updates, publish recovery, CFX source UI wiring, and Ftrack frame-range refresh.

## Writing rules

- Lead with the production problem and the design decision, then show the consequence and evidence.
- Keep WEFT / PPL as the subject. Avoid claims such as “I am a strong system builder” or “I have product thinking.”
- Use plain language for general technical readers. Explain animation-specific terms only when they are necessary.
- Distinguish verified facts, design intent, current behavior, and future work.
- Do not frame PPL as an AI system, agent runtime, package manager, or generic distributed system. Conceptual parallels, if needed, must explicitly state that they are not architectural equivalence.

## Visual and UX direction

- Follow `ref/final.png` and the Technical Editorial Poster System / Production Manual in Motion direction: large typography, ivory/charcoal/gray, thin technical lines, restrained texture, and clear relationships.
- Hero uses a restrained abstract Boot / Resolve visual. Only System Summary plays the full Fragmented → Structured → Coordinated sequence, on first entry, then holding the final state without scroll scrubbing. This V2.1 rule resolves the earlier Hero/Summary duplication.
- Real Builder / Loader / Publish / QC UI appears as quiet Production Proof: cropped, numbered, captioned figures. Screenshots prove implementation; diagrams explain ideas. Do not fabricate production UI.
- Homepage mint means active / valid / selected / connected / current. Combine color with labels and shape/line emphasis, and verify contrast. Do not introduce orange/red homepage diagram accents; never recolor real screenshots to falsify their state.
- Do not lead with a dense architecture diagram, code, or pipeline jargon. Avoid generic SaaS card grids, neon, and decorative glow.
- The old homepage block percentages no longer apply. The final target image governs the new visual hierarchy.

## Technical baseline

- Use Next.js App Router, React, TypeScript, CSS Modules (or SCSS Modules), GSAP / ScrollTrigger, SVG, and Canvas 2D.
- Default to Server Components for content, with isolated client motion components. Do not make the entire homepage a Client Component. Server queries supply typed serialized props; motion components do not query the CMS or select Draft / Published perspective.
- Keep graph data, semantic roles, view presets, state, visual targets, animation, and rendering separate. Graph topology and interaction behavior belong in code.
- Use discriminated-union Master Canvas state and a reducer. Transform scenes only exist in Transform mode; focused nodes must exist and be visible.
- One animation owner per visual property: CSS for simple feedback, GSAP for coordinated transitions, RAF for continuous Canvas graphics. React does not update state every animation frame.
- V1 does not introduce Tailwind, Redux, Zustand, XState, Framer Motion, React Spring, Three.js, PixiJS, generic page builders, or custom CMS/auth systems by default.
- V1 uses typed local content and local media, with no backend or CMS integration. Do not add Sanity dependencies, Studio, authentication, CMS Draft Preview, write APIs, webhooks, or runtime cache revalidation to V1. The explicitly authorized frontend temporary text editor below is allowed; do not confuse it with the deferred CMS editor.
- Sanity is a deferred option from V2.1, not a V1 dependency. If CMS work is authorized later, revisit hosting compatibility before adopting its server-side preview and webhook contracts. Evidence annotations use normalized coordinates and must remain aligned after crop/resize.

## Deployment and contact

- Plan for a static Next.js export hosted on GitHub Pages. Build-time Server Components are compatible with this direction; do not depend on request-time server rendering, API routes, server actions, or other server-only runtime features.
- Determine the actual GitHub repository and site URL before finalizing base paths, asset paths, canonical metadata, or deployment configuration. A repository subpath and a root/custom-domain site require different URL handling.
- Use static-host-compatible image delivery; do not depend on the default runtime image optimization service. Verify exported assets and page URLs under the intended base path before publishing.
- After homepage implementation and verification, continue preparing GitHub Pages deployment; ask if repository, permissions, or site configuration are missing. Documentation changes alone do not mean deployment. Do not claim an existing workflow, domain, or successful deployment without verification.
- The contact email is pending. Omit the contact link until a real destination is supplied; do not invent an address or use a dead placeholder link. Keep the footer layout compatible with adding it later.

## Temporary content editing — confirmed V1 feature

- All visitors, including the owner, can try text changes locally; no identity distinction or website save/publish capability exists.
- Reuse the existing typed `src/content/home.ts` as baseline. Add stable whitelisted field IDs and in-memory overrides for visible titles, subtitles, explanations, view descriptions, proof captions, and ordinary footer copy. Exclude URLs, images, metadata facts, graph labels/topology, styles, and motion parameters.
- Provide an on-demand editor, immediate preview, the notice “临时预览，刷新后恢复”, per-field/all reset, and “复制修改清单”. Closing the panel retains the current page's temporary changes; refresh restores baseline. Keep a temporary-state notice while overrides remain.
- No localStorage, sessionStorage, IndexedDB, cookies, URL persistence, backend requests, or repository write credentials. Render plain text, never executable HTML. Preserve Chinese input, line breaks, quotes, and empty strings.
- Copy only actual changes with field ID, label, original value, modified value, schema version, and source file. Clipboard failure must offer selectable text, not a false success message.
- Permanent updates require a maintainer/Codex to validate the change list against current source values, edit code, check, commit, build, and deploy. Copying changes does not save or publish them.
- Isolate edit state from Master Canvas state and from animation. Use bounded client components, not an entirely client-rendered homepage. Keep baseline content in prerendered HTML; reduce distracting motion while typing and preserve keyboard/mobile/reduced-motion behavior.
- Follow V2.2 acceptance: edit/close/reopen/reset/refresh, isolated sessions, accurate diff copying and fallback, no persistence or writes, plain-text safety, and static-export checks. Do not build a general page builder or full CMS.

## Implementation order and interaction acceptance

First milestone: **Master Canvas Interaction Prototype V0.1**, then homepage assembly. Establish types and tokens, render static SVG and HTML controls, check semantics and responsive layout, then implement view transitions, inspection, interruption, resize, reduced motion, debug output, and finally Canvas ambient effects.

- Overview, Organize, Transform Preview, and Extend support rapid switching from any state without waiting for animations to finish, leaving ghost edges, or orphaning tweens.
- Desktop hover/focus selects a preview; hover never navigates. Mobile tap selects a view; navigation, where available, is a separate real link.
- Provide keyboard controls, visible focus, semantic content outside decorative Canvas, and reduced motion. Core meaning must remain understandable without animation.
- Pause RAF offscreen and when the document is hidden. Limit DPR and particle density; avoid all-pairs proximity checks per frame.
- Treat 60fps, LCP < 2.5s, CLS < 0.1, and INP < 200ms as measured targets, not guarantees. Record test conditions and distinguish lab measurements from real-user data.
- Lazy-load heavy motion code, optimize screenshots with explicit dimensions, and keep initial content readable before animation initializes.
- Cross-page glyph transitions are deferred with the additional routes; they are not a homepage-only completion requirement.

## Working rules

- Do not revise the content plan unless the user explicitly asks.
- Before implementing a module, identify its source evidence, reader-facing claim, visual proof, and whether any deeper destination actually exists.
- Keep all public screenshots redacted and verify that no production-sensitive paths, names, identifiers, or credentials are visible.
- Check assumptions, data, copy, paths, and scope. For bugs, reproduce when feasible, fix, then verify; do not call an un-reproduced issue solved.
- Preserve unrelated user changes. Do not create a duplicate `Agent.md` alongside this `AGENTS.md`.
- Validate changed files appropriately. V1 completion concerns only the homepage: required sections, target-image comparison, functional previews, real redacted proof, no dead links, responsive layout, keyboard support, reduced motion, and appropriate build/performance checks.
- Reader validation follows the new 30–60 second overview goal. Check whether a non-pipeline reader can explain the system, what it organizes, why it is real, and the three views. The old 90-second seven-section reader test is no longer an unchanged homepage requirement; retain its plain-language and jargon checks. Do not present an agent self-review as actual human reader testing.
- Report missing production assets, human feedback, or runtime/performance tests as limitations. Do not expand scope to satisfy superseded completion checklists.
- Final reports briefly state changes, validation results, and remaining risks. Context summaries retain goals, confirmed decisions, modified files, validation status, unfinished work, and rejected approaches.
