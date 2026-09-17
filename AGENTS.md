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

Before continuing implementation, read [Development Handoff — 2026-09-17](doc/WEFT_PPL_Development_Handoff_2026-09-17.md). It records user preferences observed in this project, explicit later decisions, code entry points, reproduced bugs, verification limits, and work still pending. Keep observations distinct from binding user instructions; inspect current code and Git status before editing.

The following explicit later decisions override conflicting earlier visual / interaction wording below: remove decorative plus / crop marks; keep natural irregular tissue cells and distance-based per-glyph Hero feedback; allow green-node hover Bloom (current radii 8 / 24px). Navigation plus Hero fills the first viewport. The desktop Master Canvas fits one viewport with its model disclosure closed; an open disclosure flows below. Navigation follows the Summary top boundary upward after it meets the header bottom, retaining a thin white strip, with manual reveal available. Do not reintroduce the obsolete leave-Hero idle-collapse rule or the status ticker pause button. The footer three-circle animation waits 1.5 seconds on first visible entry, then supports hover / keyboard / touch replay. Reduced-motion and editing behavior remain supported.

Preserve these refinements when referring to `ref/final.png`; the reference does not override later user corrections. Update this existing `AGENTS.md`, never create a duplicate lowercase `agent.md` / `Agent.md`.

## Final homepage visual target

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
