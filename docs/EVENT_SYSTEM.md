# Event System

## Purpose

This doc defines how environmental events, anomalies, lockdowns, hidden reveals, and evolving world-state behavior should function in GRID // ALPHA.

The goal is to make The Grid feel alive without turning the project into a live-service game.

---

# Core Philosophy

Events should:

- remain rare
- feel systemic
- feel environmental
- feel discoverable
- avoid becoming annoying
- avoid interrupting usability

The Grid should feel:

> subtly alive.

Not:

> constantly demanding attention.

---

# Alpha Event Scope

Alpha supports:

- visual event prototypes
- manual trigger support
- atmosphere shifts
- lockdown sequence
- hidden anomalies
- node reveal support

Alpha does NOT require:

- full scheduled global events
- multiplayer synchronization
- live-player tracking
- account systems

---

# Lockdown Event

## Purpose

The lockdown event exists to:

- reinforce world aliveness
- create memorable moments
- support major reveals later
- shift atmosphere temporarily

---

## Lockdown Flow

Example sequence:

```txt
LOCKDOWN ALERT
Testing Core Stability...
Core Stable.
Subverting Lockdown.
Initializing The Grid...
```

Possible environmental behavior:

- ambient hum lowers
- red emergency lighting
- large metal doors partially close
- node pulses pause
- operator looks up briefly
- alarms pulse softly
- tether flow changes

After recovery:

- systems resume
- subtle anomaly remains
- hidden node may appear
- route signage may change
- tether may reroute

---

# Event Frequency Philosophy

Events should remain rare.

Target feeling:

> a strange thing happened while you were here.

Not:

> the site constantly screams for attention.

---

# Hidden Anomalies

Possible anomalies:

- unfamiliar node
- rerouted tether
- hidden route sign
- altered monitor
- changed ambience
- temporary sector pulse
- visual glitch
- strange eye-like movement

These should:

- reward exploration
- reward repeat visits
- remain subtle

---

# Node Reveal System

Future launches can use the event system.

Example:

- lockdown occurs
- tether reroutes
- new dim node appears
- hidden sector begins pulsing
- route sign changes

This makes launches feel:

- environmental
- discovered
- systemic

instead of:

- simple website updates.

---

# Audio Philosophy

Audio should:

- support immersion
- remain optional
- remain subtle
- include mute control

Potential event audio:

- distant alarms
- heavy door movement
- electrical instability
- deep mechanical pulses
- train horn-like anomalies

Avoid:

- jump scares
- aggressive loops
- constant noise

---

# Event State Architecture

Alpha approach:

- local/manual triggers
- static prototype events
- simple event-state config

Future approach:

- persistent global timers
- shared event state
- hidden timed reveals
- sector evolution

Potential future storage:

- Vercel KV
- Upstash Redis

---

# Failure Conditions

The event system fails if:

- events become annoying
- the site becomes chaotic
- traversal is interrupted excessively
- anomalies overwhelm usability
- atmosphere becomes horror instead of mystery

---

# Final Principle

The event system exists to create:

> remembered moments.

Not constant stimulation.
