# WEFT / PPL Showcase Website

## Project goal

Build a public-facing case-study website for WEFT / PPL, a Cross-DCC animation production system. The site should make WEFT / PPL itself the subject. The visitor should infer the author's system-design capability from the system's design decisions and real production evidence, rather than from self-promotional claims.

The authoritative content strategy is [PPL Showcase Website Plan V0.3.4 4 Block Structure](doc/PPL_Showcase_Website_Plan_V0.3.4_4-Block-Structure.md). Read it before changing copy, information architecture, visual direction, or implementation scope. V0.3.4 is the current frozen content plan; V0.3.3 is retained only as prior context.

## Naming convention

Use **WEFT / PPL** as the canonical public-facing name in all new documents and website naming: page titles, navigation labels, hero copy, metadata, captions, and external-facing references. **WEFT** is the public-facing name; **PPL** preserves the production-pipeline engineering identity and continuity. Do not introduce alternatives such as “PPL” alone, “WEFT” alone, or expanded names unless the user explicitly defines a context-specific exception.

Existing historical planning files retain their original filenames and wording unless the user asks for a migration or archival rename.

Default Hero treatment:

```text
WEFT / PPL
A Cross-DCC Production System

Coordinating production context, versioned products, dependencies, validation and workspace composition across Maya and Houdini.
```

`Designing a Cross-DCC Production System` is an approved longer Hero/subpage title. Retain the slash in `WEFT / PPL`; it is an intentional part of the system-identification visual language.

## Current scope

The immediate objective is a homepage case study, followed by Flow and Evidence depth pages. The homepage is a two-to-three-minute explanation for readers who may not know animation pipeline work. It has seven content sections, but visitors should perceive four major cognitive blocks.

### Block 0 — Hero

Section 00: What PPL is, proof that it is real, and the author's role.

### Block 1 — Systematic Thinking

Sections 01–02: why production is complex, and the shared production model: Context, Product, Version, Dependency, State, Validation, Resolution, and Composition.

### Block 2 — Design and Innovation

Sections 03–05: what PPL rethought, how those decisions behave in real production, and what changed as a consequence. This is the main body of the homepage.

### Block 3 — What Comes Next

Section 06: current engineering boundaries and the next direction: governance, recovery, observability, regression testing, and scale-aware shared-state coordination.

## Four design moves within Block 2

Treat these as the four system-level design moves, not as the four homepage blocks. Preserve their distinctions.

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

- **Homepage:** Explain the system's problem, model, consequences, and real production status. Avoid implementation detail that does not change a general reader's understanding.
- **Flow:** Follow a real production story from input through state change, output, and downstream consumption.
- **Evidence:** Verify exact implementation, scope, limitations, source evidence, and runtime behavior.

Do not leak `av/v`, record-file names, resolver URI syntax, DCC node parameters, source paths, implementation symbols, or known integration gaps into homepage body copy. Those belong in Flow or Evidence.

## Evidence and claims

Only make claims supported by verified project evidence. The current publishable facts are:

- Core build: April to August 2026, approximately five months.
- Team: two people.
- Status: active production in one real production project.
- Coverage: ASSET, SET, SEQ, and SHOT across Maya 2022 and Houdini 21/22.
- Infrastructure: Rez, USD/Asset Resolver, Ftrack, and Dailies.
- CFX and Hair paths are still evolving.

Do not invent user counts, publish volumes, time savings, reliability percentages, or claims of complete stability. Preserve contribution boundaries and attribution described in the content plan.

Known implementation questions are Evidence work, not homepage defects: Hair Grm-generation discovery, Shot Builder record source, resolver refresh behavior, constrained-generation failure behavior, concurrent master-record updates, publish recovery, CFX source UI wiring, and Ftrack frame-range refresh.

## Writing rules

- Lead with the production problem and the design decision, then show the consequence and evidence.
- Keep PPL as the subject. Avoid claims such as “I am a strong system builder” or “I have product thinking.”
- Use plain language for general technical readers. Explain animation-specific terms only when they are necessary.
- Distinguish verified facts, design intent, current behavior, and future work.
- Do not frame PPL as an AI system, agent runtime, package manager, or generic distributed system. Conceptual parallels, if needed, must explicitly state that they are not architectural equivalence.

## Visual and UX direction

- Lead with redacted, real production UI: Maya WorkManager/Builder, Maya Publish/QC, and Houdini Shot Builder.
- Use concise diagrams for the four design moves and two cases; screenshots prove the system is real but should not carry the full explanation.
- Do not lead with a dense architecture diagram, code, or pipeline jargon.
- Maintain the V0.3.4 homepage emphasis: Hero 15%, Systematic Thinking (01–02) 25%, Design and Innovation (03–05) 52%, and What Comes Next 8%.

## Working rules

- Do not revise the content plan unless the user explicitly asks.
- Before implementing a module, identify its source evidence, reader-facing claim, visual proof, and links to deeper material.
- Keep all public screenshots redacted and verify that no production-sensitive paths, names, identifiers, or credentials are visible.
- When a web implementation exists, test responsive behavior and run the 90-second reader test defined in the content plan before considering the homepage complete.
