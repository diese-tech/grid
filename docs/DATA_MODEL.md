# Data Model

## Purpose

This doc defines how The Grid represents projects, nodes, sectors, states, and relationships during GRID // ALPHA.

The goal is to keep the system flexible enough for future growth while remaining simple enough to ship.

---

# Core Philosophy

Projects are not just portfolio cards.

Projects are represented as:

- nodes
- operational systems
- active experiments
- archives
- hidden sectors
- connected ambitions

Relationships matter as much as the projects themselves.

---

# Initial Data Approach

Use local TypeScript/JSON config files first.

Example structure:

```txt
/src/data/nodes/
/src/data/sectors/
/src/data/events/
```

Why:

- easy iteration
- easy Git review
- easy branching
- no backend required initially

---

# Core Node Structure

Suggested alpha structure:

```ts
{
  id: string,
  label: string,
  description: string,
  status: string,
  importance: number,
  sector: string,
  connectedTo: string[],
  githubRepo?: string,
  hidden: boolean,
  unlockType?: string,
  audioProfile?: string,
  tags?: string[],
}
```

---

# Node Status Types

## Active

Stable, visible, operational.

Examples:

- GodForge
- SwiftDispatch

Visual behavior:

- stable pulse
- greenish glow
- active tether flow

---

## Experimental

Interesting but unstable.

Visual behavior:

- cyan/blue hues
- irregular motion
- exploratory feel

---

## Archived

Past work or inactive systems.

Visual behavior:

- dimmed
- quieter
- lower saturation

---

## Under Construction

Actively evolving sectors.

Visual behavior:

- unfinished surfaces
- construction energy
- rough infrastructure

---

## Corrupted

Unstable or dangerous systems.

Visual behavior:

- restrained red/orange fractures
- instability pulses
- broken tethers

---

## Hidden / Redacted

Not immediately visible.

Reveal methods may include:

- time investment
- exploration
- event triggers
- hidden routes

---

# Sector Structure

Sectors represent environmental contexts.

Examples:

- homepage transit layer
- The Lab
- unfinished sectors
- simulation rooms
- archive zones
- hidden sectors

Suggested alpha structure:

```ts
{
  id: string,
  label: string,
  atmosphere: string,
  musicProfile?: string,
  nodeTypes: string[],
  connectedSectors: string[],
  hidden?: boolean,
}
```

---

# Relationship System

Relationships are critical.

Nodes should visually reveal:

- lineage
- inspiration
- progression
- dependency
- emotional significance

Example:

```txt
GodForge
→ OCR Stat Bot
→ League Site
→ Production App
```

The map should feel like:

> a living ambition graph.

---

# Dossier Model

Clicking a node should open a dossier surface.

Suggested alpha fields:

```ts
{
  title,
  summary,
  tags,
  currentStatus,
  githubLink,
  liveState,
  screenshots,
  relatedNodes,
}
```

---

# Live Data Philosophy

Prefer live data where practical.

Potential future live fields:

- latest commit
- deployment status
- GitHub stars
- uptime
- issue count
- active development state

Alpha should remain resilient if APIs fail.

Static fallback text is acceptable.

---

# Future Admin System

Eventually:

- lightweight admin editor
- no-code node edits
- node reveal toggles
- event-state controls
- hidden-sector activation

This is intentionally deferred until after alpha.

---

# Final Principle

The data model should support:

- atmosphere
- traversal
- lineage
- exploration
- evolution

not just project storage.
