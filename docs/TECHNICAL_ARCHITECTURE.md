# Technical Architecture

## Purpose

This doc defines the recommended technical direction for GRID // ALPHA. The goal is to build a cinematic spatial web experience without accidentally building a full game engine or overpaying for infrastructure too early.

---

# Core Technical Philosophy

Prioritize free or low-cost tools first.

Spend money only when it clearly protects quality, uptime, performance, or developer velocity.

The alpha should prove:

- boot sequence
- transit homepage
- Lab scene
- node click
- dossier zoom
- basic audio
- live-feeling project data
- traversal illusion

The alpha should not attempt to build a full 3D game, CMS, database platform, or backend-heavy operating system.

---

# Recommended Alpha Stack

## Framework

**Next.js + TypeScript**

Why:

- strong web app foundation
- Vercel-friendly
- API routes available
- good for static + dynamic hybrid pages
- easy future integrations

---

## Styling

**Tailwind CSS**

Why:

- fast custom UI work
- design-system friendly
- avoids CSS sprawl
- good for atmospheric layouts and responsive fallbacks

---

## Motion

**Framer Motion / Motion**

Why:

- best fit for boot sequence, scene transitions, node interactions, and dossier zoom effects
- easier than custom animation code
- enough for alpha traversal illusion

---

## Spatial Illusion

**Layered 2.5D scenes**

Implementation approach:

- layered images
- CSS transforms
- parallax
- opacity/blur shifts
- scene state transitions
- animated overlays

Why:

- creates spatial feel without Unity or Three.js
- keeps deployment simple
- easier to optimize
- easier to iterate

---

## Node Map

**SVG first**

Why:

- easy clickable nodes
- easy styling
- easy animation
- accessible enough for alpha
- works well with Framer Motion

Canvas can be considered later if the map grows too large or performance becomes an issue.

---

## Audio

**Howler.js**

Why:

- reliable web audio abstraction
- ambient loops
- click sounds
- event sounds
- mute control
- volume management

Alpha should include:

- ambient audio
- click/interaction sounds
- rare event-state sounds
- obvious mute control

---

## Data

**Local TypeScript/JSON config first**

Why:

- fastest to build
- easy to review
- no database needed for alpha
- keeps node/project structure explicit

Eventually, an admin-style editor can be added so light edits do not require deployments.

Admin editor is a future goal, not an alpha requirement.

---

## Live Data

**GitHub API through Next.js server route**

Why:

- keeps tokens private if needed
- supports live repository metadata
- allows caching/rate-limit control
- grounds nodes in real activity

Alpha should prefer live data where practical.

Static fallbacks are acceptable when live data would create unnecessary scope creep.

---

## Event State

**Manual/local event trigger first, Vercel KV or Upstash Redis later**

Why:

- visual prototype and manual trigger are enough for alpha
- global timed state can be added after the experience works
- avoids premature backend complexity

---

## Hosting

**Vercel**

Why:

- best fit for Next.js
- preview deployments
- simple production deployment
- environment variable management
- rollback support

---

## Analytics

**Vercel Analytics / Speed Insights first**

Why:

- low-friction
- easy to enable
- useful for performance and traffic monitoring

---

## Error Monitoring

**Sentry later**

Why:

- useful once interactive systems become complex
- not required for first static/interactive alpha

---

# Testing and Limit Testing

## Unit / Logic Testing

**Vitest**

Use for:

- node-state logic
- event-state logic
- data transforms
- utility functions

---

## Component / Flow Testing

**Playwright**

Use for smoke testing:

- boot loads
- homepage loads
- Lab transition works
- node click works
- dossier appears
- mute control works

---

## Load Testing

**k6**

Use for:

- API route load tests
- GitHub proxy endpoint checks
- event endpoint checks
- basic rate-limit testing

This keeps room for load testing and limit tests without forcing heavy infrastructure now.

---

## Performance Testing

**Lighthouse CI**

Use for:

- page weight checks
- load performance
- image/audio regression detection
- accessibility baseline

---

# Avoid In Alpha

Do not start alpha with:

- Unity
- Three.js as core architecture
- database
- auth
- CMS
- admin editor
- full live telemetry
- Discord/Twitch/Spotify integrations
- multiplayer/presence
- heavy backend

These may come later if the core loop proves itself.

---

# Cost Philosophy

Start free/low-cost.

Accept paid services only when they clearly solve a real problem:

- Vercel paid tier if deployment/performance limits require it
- Upstash/Vercel KV if global event state needs persistence
- Sentry if errors become hard to track
- paid design tools only if they meaningfully improve concept quality

---

# Final Technical Direction

GRID // ALPHA should be:

> a Next.js cinematic web experience using layered 2.5D scenes, SVG nodes, Framer Motion traversal, Howler audio, local node data, and selectively live GitHub data.

The technical goal is not realism.

The technical goal is:

> perceived spatiality with controlled complexity.
