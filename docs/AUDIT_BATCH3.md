# GRID // ALPHA — Architecture & Implementation Audit

**Date:** 2026-05-11  
**Branch audited:** `feature/batch-3-lab-node-dossier` (3 committed batches)  
**Scope:** Full codebase against all docs

---

## 1. Overall Health Assessment

**YELLOW**

The skeleton is correct and disciplined. The data model is well-designed, the stack matches the spec, and the three batches have built a coherent foundation without obvious overbuilding. However, the single most important promise of this project — that traversal feels spatial and cinematic — is not yet delivered. The experience is currently a boot animation followed by two regular web pages linked by a standard `<Link>`. Until traversal continuity exists, no additional feature work should ship.

---

## 2. What Is Working Well

- **Stack is correct.** Next.js, TypeScript, Tailwind, Framer Motion (`motion`) — all per spec. Nothing extraneous added.
- **Data model is clean and well-structured.** `grid.ts` faithfully implements the spec: `GridNode`, `GridSector`, `GridTether`, all status types, sector data, tether relationships. This is solid ground.
- **Boot sequence is on-tone.** The animation, progress bar, reduced-motion handling, and skip button are appropriate. The text signals ("Transit lattice waking", "Operator channel aligned") read correctly — not fake terminal, not cringe hacker.
- **Atmosphere foundation is present.** The two background images, the overlay gradient compositions, and the color language (dark base, cyan/amber/emerald accents) are visually coherent and aligned with the reference material.
- **Implementation sequence has been respected.** Phases 0–1 are complete. Phase 2–4 shells exist. Nothing from Phase 5–8 has been prematurely started. No auth, database, CMS, admin editor, or Three.js drift.
- **Accessibility baseline is present.** `useReducedMotion` is implemented in the boot sequence. SVG node map has `role="button"`, `tabIndex`, keyboard handlers, and `aria-label`. `aria-pressed` exists on the mute button.
- **NodeMap locality rule is implemented.** The "localized visibility" logic — showing only the selected node and its directly connected nodes — matches the wireframe spec exactly.
- **Branching discipline is correct.** Feature branches used, main is clean, commit history is clear.

---

## 3. Biggest Current Risks

### Risk 1 — Traversal is broken (critical)

The transition from Transit Layer → The Lab is `<Link href="/lab">` — a standard Next.js page navigation. The experience docs say this should feel cinematic, spatial, and "not like opening another webpage." Currently it IS opening another webpage. This is the core failure mode the project was designed to avoid.

### Risk 2 — Generic dashboard energy in the dossier

`DossierPanel` displays raw internal fields: `importance: 95`, `liveState: github-ready`, `sector: the-lab`. These are data model internals leaking into the UI. A visitor sees dashboard metadata, not an operational world. This risks exactly the "generic portfolio cards" feeling the charter explicitly forbids.

### Risk 3 — Node map is completely static

Every node in `NodeMap` is a static SVG circle. No pulse, no breathing, no status-differentiated animation. The docs specify: "stable pulse" for active, "irregular motion" for experimental, "flickering pulse" for unstable. Without this, the map reads as a diagram, not a living system.

### Risk 4 — No audio system at all

Howler.js is not in `package.json`. The data model has `audioProfile` on every node. The boot sequence, transit layer, and lab all reference audio in the docs. Every major experience beat (boot completion, sector entry, node click) is missing audio. The absence is noticeable.

### Risk 5 — The transit layer "minimap" misrepresents what a minimap is

The current minimap is a 3×2 grid of colored squares with index numbers. It doesn't reflect the actual node graph topology, doesn't reveal relationships, and doesn't match the "MOBA-inspired, transparent, corner-positioned, exploratory" spec. It currently looks like a placeholder that was meant to be replaced.

---

## 4. Architectural Violations

### V1 — Traversal continuity (WIREFRAME_ARCHITECTURE.md, HOMEPAGE_WIREFRAME.md)

> "The transition should feel cinematic, restrained, systemic, spatial. NOT like opening another webpage."

Current: `<Link href="/lab">` with no transition. Full page reload.  
File: `src/components/transit-layer.tsx:86`

### V2 — Dossier is a sidebar panel, not a zoom/surface interaction (LAB_WIREFRAME.md)

> "Project exploration should happen through zooming into nodes, moving toward dossier surfaces, environmental transitions."

Current: `DossierPanel` is a persistent right-column panel that slides in with CSS opacity/translate. It does not zoom, does not emerge from the node, does not feel spatially embedded.  
File: `src/components/dossier-panel.tsx`

### V3 — Minimap placement and behavior (WIREFRAME_ARCHITECTURE.md)

> "transparent, small, corner-positioned, clickable, unlabeled, exploratory, MOBA-inspired"

Current: The Transit Layer minimap is a content section in the main three-column layout — not a persistent overlay, not transparent, not corner-positioned, and it has labels (index numbers).  
File: `src/components/transit-layer.tsx:100–128`

### V4 — `liveState` internals exposed to visitors

The `liveState` value (`"github-ready"`, `"static-seed"`, `"manual"`) is a data pipeline status — not a human-readable signal. It's showing as a labeled field in the dossier surface.  
File: `src/components/dossier-panel.tsx:58–62`

### V5 — `tethers` prop on TransitLayer is structurally unnecessary

The homepage transit layer receives `tethers` only to display `tethers.length` as a label. Tether data belongs to the node map system, not the transit layer.  
Files: `src/components/transit-layer.tsx:9`, `src/app/page.tsx:5`

---

## 5. Recommended Cleanup / Refactors

Small, targeted fixes — not feature additions.

### C1 — Hide internal dossier fields from visitors

Replace the raw `liveState` value with a human-readable signal label. Replace the numeric `importance` score with a visual indicator or remove it. The `sector` field should display the sector's `label`, not its raw `id`.

### C2 — Remove `tethers` prop from `TransitLayer`

The transit layer doesn't need tether data. Remove the prop from `TransitLayer` and `GridExperience`. Tether data should only live in the node map system.

### C3 — Fix the boot sequence dual-completion path

Both the last signal's `onAnimationComplete` and the progress bar's `onAnimationComplete` can call `onComplete`. The conditional guards currently handle the split correctly but this is fragile. Consider a single completion path using a flag or `useRef`.

### C4 — Remove default Next.js scaffolding assets

Remove `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`. These are unused boilerplate leftovers.

### C5 — Resolve the unexplained bottom placeholder in LabScene

`src/components/lab-scene.tsx:135` has an `absolute` positioned empty div with no semantic purpose visible to the reader. If it's a reserved space for the operator silhouette, document it or place it behind a disabled state. As-is it renders as a visible empty box.

---

## 6. Recommended Next Implementation Focus

**In strict priority order — do not skip ahead.**

### Priority 1: Scene transition layer (Phase 3 completion blocker)

Before any new feature, the Transit → Lab transition must feel spatial. This does not require complexity:

- A full-screen cinematic overlay triggered on "Enter The Lab" click, using Framer Motion `AnimatePresence`
- The transition can be a dark wipe + brief sector text ("Entering The Lab...") + fade-in — roughly 600ms total
- Implement in `GridExperience` as a transition state between `boot`, `transit`, and `lab` phases rather than relying on Next.js routing between pages

### Priority 2: Node pulse animation

Add SVG/CSS animation to nodes based on `status`. Active nodes breathe (slow opacity/scale pulse). Experimental nodes have slightly irregular timing. This is pure animation — no new data or logic. It transforms the map from a diagram into a living system.

### Priority 3: Audio system foundation (Phase 7 start)

Add Howler.js. Implement: one ambient loop for the transit layer, one for the lab, click sounds on node interaction, mute toggle that actually works. A working mute button is already in the UI but `aria-pressed` is hardcoded to `false`.

### Priority 4: Minimap redesign

Replace the colored square grid with a small, true SVG representation of the node graph — using the same `nodePositions` data at reduced scale. Position as a persistent overlay (bottom-right corner), transparent background, no text labels.

---

## 7. Things That Should NOT Be Touched Yet

- **GitHub API integration** — `liveState: "github-ready"` is seeded in the data but no integration should be built until the visual loop is complete.
- **Lockdown / event system** — Depends on the environment feeling alive first. A lockdown in a static diagram is meaningless.
- **Hidden/redacted node reveals** — Infrastructure exists in the data model. Don't activate until traversal and audio work.
- **Mobile fallback** — Phase 8 work.
- **Admin editor** — Explicitly deferred in all docs.
- **Discord / Twitch / Spotify integrations** — Excluded from alpha scope.
- **Three.js / WebGL** — No drift toward this yet. Keep it that way.

---

## 8. Is the Repo Ready for the Next Batch?

**Not yet.**

**Hard blocker:** The traversal gap (V1) must be resolved first. Every new feature built on top of page-navigation traversal will need to be rebuilt once traversal is fixed.

**Quick wins before batch 4 begins:**

1. C1 — dossier internal fields (~10 lines)
2. C4 — remove scaffolding SVGs (5 deletes)

Once the scene transition layer exists and nodes have a pulse animation, the repo is ready to move into audio, minimap redesign, and hidden content scaffolding.

---

## Critical Files Reference

| File | Status |
|------|--------|
| `src/data/grid.ts` | Solid. Do not overcomplicate. |
| `src/components/grid-experience.tsx` | Extend here for transition state machine |
| `src/components/transit-layer.tsx` | Needs transition trigger + minimap redesign |
| `src/components/lab-scene.tsx` | Operator presence placeholder needs resolution |
| `src/components/node-map.tsx` | Needs animation pass; hard-coded positions need future strategy |
| `src/components/dossier-panel.tsx` | Needs internal field cleanup |
| `src/components/boot-sequence.tsx` | Working well; completion logic could be simplified |
