# Branching and Release Workflow

## Purpose

This doc defines how The Grid should be built without destabilizing the live site. The Grid has unusual risks: traversal, audio, node states, scene transitions, large assets, and persistent events can all break the experience if merged carelessly.

---

# Core Rule

`main` is production-stable.

Feature work happens on branches.

The normal path is:

```txt
branch → preview URL → checks → review → merge → production deploy
```

---

# Branch Naming

Use focused feature branches.

Examples:

```txt
feature/boot-sequence
feature/transit-homepage
feature/lab-scene
feature/node-map
feature/github-integration
feature/audio-layer
feature/event-system
feature/dossier-view
feature/mobile-fallback
```

Avoid vague branches like:

```txt
feature/grid
feature/update
feature/misc
feature/final-site
```

---

# Local Workflow

Before starting work:

```powershell
git checkout main
git pull --rebase origin main
git checkout -b feature/example-name
```

While working:

```powershell
git status
git add .
git commit -m "Describe the change"
git push -u origin feature/example-name
```

After merge:

```powershell
git checkout main
git pull --rebase origin main
git branch -d feature/example-name
```

---

# When Branches Are Required

Use branches for:

- traversal changes
- route/scene transitions
- Lab scene changes
- node map changes
- audio system changes
- lockdown/event system changes
- GitHub/live data integration
- asset pipeline changes
- mobile fallback changes
- layout rewrites

Small docs/reference edits can be done directly, but implementation work should use branches.

---

# Pull Request Rules

A PR should include:

- what changed
- what was intentionally not changed
- screenshots or preview notes when visual
- test notes
- known risks

A PR should not merge unless:

- build passes
- typecheck passes
- lint passes
- core traversal still works
- risky features are behind flags if incomplete

---

# Preview Deployment Rule

Every implementation branch should be tested through a preview deployment before merging.

Preview testing should verify:

- boot sequence still works
- homepage loads
- Lab transition works
- node click/dossier flow works
- sound can be muted
- no obvious layout break
- no major performance regression

---

# Main Branch Rule

Merging to `main` may trigger production deployment.

Do not merge if:

- the feature feels incomplete and visible
- traversal is broken
- audio is annoying or unmuted without control
- node map is unreadable
- performance is obviously poor
- the experience feels like a generic portfolio

---

# Feature Flag Rule

Unfinished rooms, nodes, sectors, or events may exist in production only if hidden behind a feature flag or disabled state.

Good:

```txt
feature exists but is hidden
node exists but is unrevealed
sector exists but is not linked
lockdown event is disabled until ready
```

Bad:

```txt
half-built sector visible to visitors
broken route sign
placeholder page pretending to be finished
```

---

# Rollback Rule

If production breaks, rollback to the previous known-good Vercel deployment.

Rollback is preferred over panic-fixing directly on `main`.

---

# Final Principle

The Grid should ship like an evolving world, not a chaotic experiment.

Move fast, but protect the core experience.
