# GRID // ALPHA — Architecture & Implementation Audit (Pass 2)

**Date:** 2026-05-11  
**Branch audited:** `feature/batch-3-lab-node-dossier`  
**Scope:** Full codebase against all docs — second pass, sharper read

---

## 1. Overall Health Assessment

**YELLOW — same as Pass 1, with additional findings**

No implementation changes have occurred since Pass 1. Every violation identified previously is still present. This pass adds seven new findings that were missed or underweighted in the first audit, most of which cluster around dossier behavior and broken interactive promises. None change the overall rating but several upgrade the urgency of specific items.

---

## 2. What Is Still Working Well

Everything from Pass 1 holds:

- Stack is correct and uncluttered
- Data model is clean and faithful to spec
- Boot sequence tone and animation are appropriate
- Atmosphere foundation (images, gradients, color language) is coherent
- Implementation sequence discipline — no Phase 5–8 work started prematurely
- Accessibility baseline — `useReducedMotion`, SVG keyboard handlers, `aria-label`
- NodeMap localized visibility rule is correct
- Branching discipline is clean

---

## 3. New Findings This Pass

### F1 — Mute button is non-functional AND actively misleading (upgraded from Pass 1)

Pass 1 noted audio was absent. This is worse: the mute button at `transit-layer.tsx:52–57` has `aria-pressed="false"` hardcoded with no `onClick` handler. It does nothing when clicked. Screen readers announce it as an unpressed toggle — forever. This isn't a placeholder; it's a broken control that actively misrepresents state to both visual and assistive technology users.

### F2 — TransitLayer runs its infinite animation while hidden under the boot sequence

`grid-experience.tsx` renders both `<BootSequence>` (z-50, fixed, covers screen) and `<TransitLayer>` simultaneously from the first render. The transit layer's `motion.div` with `repeat: Infinity` (`duration: 18`) is running and burning animation resources while fully hidden under the boot overlay. The background image also loads during boot, which is intentional and good — but the infinite animation loop is wasted budget during the most animation-heavy moment (the boot sequence itself).

### F3 — Dossier always renders populated, collapsing the intended interaction flow

`LabScene` defaults to `selectedNodeId: "the-grid"` and `dossierOpen: false`. This means the dossier panel always mounts immediately with The Grid's full node data at 75% opacity. A first-time visitor lands in the Lab and sees a pre-filled sidebar before interacting with anything. This collapses the designed flow: *node click → dossier reveals*. The dossier should either start fully invisible (opacity 0, not 75%), or the default selected node should not pre-populate it, or the initial state should be `null` with no dossier rendering at all until a node is explicitly selected.

### F4 — "Lab View" button is always visible but sometimes a no-op

`lab-scene.tsx:70–77`. The "Lab View" button in the Lab header calls `setDossierOpen(false)`. When the dossier is already closed, this is a silent no-op — the button is always present, always looks interactive, and sometimes does nothing. It should be conditionally visible (only when `dossierOpen` is true) or replaced with a context-appropriate action.

### F5 — Connected nodes in the dossier panel are not interactive

`dossier-panel.tsx:96–108`. The "Connected Nodes" list renders `<li>` elements with labels and status text. They look like they should navigate to the connected node. They do nothing. `handleSelectNode` exists in `LabScene` and is passed through to the node map and the related node buttons below the map — but it is not wired into the dossier. A user who reads the dossier and sees "GodForge — active" cannot click it. This is a broken interactive promise in the primary discovery surface.

### F6 — `sectors` prop on TransitLayer is fully redundant

`transit-layer.tsx:18`. The `sectors` prop is used only to find the "the-lab" sector label, which is then used in one line of footer text: `{lab?.label ?? "The Lab"} is online.` The hardcoded fallback `"The Lab"` makes the prop unnecessary — the fallback is always correct because the lab sector always exists. The entire `sectors` array is passed through `GridExperience → TransitLayer` for this single optional label lookup. Remove the prop and hardcode the string, or resolve the sector label at the data level.

### F7 — `githubRepo` field exists on every node but the dossier has no place for it

Every node in `grid.ts` has a `githubRepo` field (e.g., `"diese-tech/godforge"`). The dossier spec in `DATA_MODEL.md` explicitly includes `githubLink`. The dossier panel renders no link, no placeholder, no stub for this field. When GitHub integration eventually needs to land, it has no UI anchor point in the current dossier. A non-functional placeholder (greyed-out link, "Source unavailable" text) would at least preserve the intended shape of the surface.

---

## 4. All Architectural Violations (Pass 1 + Pass 2)

| # | Violation | Severity | File |
|---|-----------|----------|------|
| V1 | Transit → Lab is a plain `<Link>`, not a cinematic transition | Hard blocker | `transit-layer.tsx:84–89` |
| V2 | Dossier is a persistent sidebar, not a spatial zoom into a surface | High | `dossier-panel.tsx` |
| V3 | Transit "minimap" is a numbered square grid, not a node map | High | `transit-layer.tsx:100–128` |
| V4 | `liveState` and raw `importance` values exposed as visitor-facing fields | Medium | `dossier-panel.tsx:56–73` |
| V5 | `tethers` prop on TransitLayer carries data it never meaningfully uses | Low | `transit-layer.tsx:9` |
| V6 | `sectors` prop on TransitLayer is fully redundant (new) | Low | `transit-layer.tsx:12`, `grid-experience.tsx` |
| V7 | Mute button has hardcoded `aria-pressed="false"` and no handler (new) | Medium | `transit-layer.tsx:51–57` |
| V8 | Dossier connected nodes are not clickable — broken interactive promise (new) | Medium | `dossier-panel.tsx:96–108` |
| V9 | Dossier always pre-renders with default node data, collapsing the reveal flow (new) | Medium | `lab-scene.tsx:17–18` |

---

## 5. All Recommended Cleanup / Refactors

### From Pass 1 (still unaddressed)

**C1** — Replace raw `liveState` / `importance` in dossier with human-readable output or remove them.

**C2** — Remove `tethers` prop from `TransitLayer` (and `GridExperience`). Tether data belongs to the node map.

**C3** — Simplify boot sequence completion to a single path — remove the dual `onAnimationComplete` race between the last signal and the progress bar.

**C4** — Delete the five default Next.js scaffolding SVGs from `/public` (file.svg, globe.svg, next.svg, vercel.svg, window.svg).

**C5** — Resolve or document the unexplained `pointer-events-none absolute` placeholder div at the bottom of `lab-scene.tsx:135`.

### New from Pass 2

**C6** — Fix the mute button: add a `useState` audio toggle, wire up a real `onClick`, and make `aria-pressed` reflect actual state. Even without Howler.js, the button should manage its own boolean state correctly.

**C7** — Fix the dossier initial state: change `dossierOpen` default to `false` and ensure the panel is fully invisible (opacity 0 or not rendered) until a node is explicitly selected. Consider starting `selectedNodeId` as `null` and rendering a "select a node" prompt in the dossier column instead.

**C8** — Wire `handleSelectNode` into the dossier's "Connected Nodes" list. The `LabScene` should pass `onSelectNode` down to `DossierPanel`. Connected node labels become buttons.

**C9** — Remove the `sectors` prop from `TransitLayer` and `GridExperience`. Hardcode `"The Lab"` where the label appears.

**C10** — Add a disabled/placeholder `githubRepo` link to the dossier surface. Even as greyed-out text (`Source: diese-tech/godforge`), it preserves the correct shape of the component for future integration.

**C11** — Conditionally hide or disable the "Lab View" button when `dossierOpen` is false. A button that sometimes does nothing should not always be visible.

**C12** — Stop the transit layer's infinite animation loop from running during boot. Move the ambient motion inside a conditional that checks whether the boot sequence is complete, or delay the animation start.

---

## 6. Recommended Next Implementation Focus

Same priority order as Pass 1, with C6–C9 now inserted as quick prerequisite cleanup:

**Before anything else — quick cleanup (~1–2 hours total):**
- C1, C4, C6, C7, C8, C9, C11 — these are all small, targeted, and fix broken promises in the current UI

**Priority 1: Scene transition layer**  
The hard blocker. Transit → Lab must feel spatial before any new feature is added. Implement a Framer Motion cinematic overlay in `grid-experience.tsx` between the boot, transit, and lab phases.

**Priority 2: Node pulse animation**  
Status-differentiated SVG animation on node circles. No new data needed. Changes the map from a diagram into a living system.

**Priority 3: Audio system**  
Howler.js + one ambient loop per sector + a working mute toggle. The mute button already exists in the UI — it just needs to actually work.

**Priority 4: Minimap redesign**  
Replace the numbered square grid with a scaled SVG of the actual node graph, positioned as a transparent corner overlay.

---

## 7. Things That Should Still Not Be Touched

GitHub API integration, lockdown events, hidden node reveals, mobile fallback, admin editor, Discord/Twitch/Spotify integrations, Three.js/WebGL.

---

## 8. Readiness Assessment

**Still not ready for batch 4.**

The hard blocker from Pass 1 remains: no cinematic traversal between sectors.

Additionally, Pass 2 reveals that the proof loop itself has broken interactive promises:

- You can select a node, but the dossier's connected nodes don't let you navigate onward
- The mute button exists but does nothing and lies to screen readers
- The dossier always shows pre-filled data before any interaction

**Before batch 4 ships anything new, the following should be resolved:**

| Item | Type | Cost |
|------|------|------|
| C7 — dossier initial state | Fix | ~5 lines |
| C8 — wire connected nodes to handleSelectNode | Fix | ~10 lines |
| C6 — mute button state + handler | Fix | ~10 lines |
| C1 — replace liveState/importance fields | Cleanup | ~10 lines |
| C9 — remove sectors prop | Cleanup | ~5 lines |
| C4 — delete scaffolding SVGs | Housekeeping | 5 deletes |
| V1 — cinematic transition layer | Feature | 1–2 days |

The first six items are surgical. They don't change the design or add scope — they make the existing design actually work as intended. V1 is the real investment and the gating item for the next batch.

---

## Critical Files Reference

| File | Key Issues |
|------|------------|
| `src/components/grid-experience.tsx` | Extend for transition state machine; stop TransitLayer animation during boot |
| `src/components/transit-layer.tsx` | Mute button fix; remove tethers/sectors props; minimap redesign |
| `src/components/lab-scene.tsx` | Dossier initial state; Lab View button visibility; operator placeholder |
| `src/components/dossier-panel.tsx` | Wire connected nodes; remove internal fields; add githubRepo placeholder |
| `src/components/node-map.tsx` | Add pulse animation by status |
| `src/components/boot-sequence.tsx` | Simplify completion path |
| `src/data/grid.ts` | Stable — do not modify |
