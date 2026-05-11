# RFC-001: Grid Agents

## Status

Draft

## Summary

The Grid should not only display projects as static portfolio items. It should represent projects, infrastructure, automations, and future AI workers as a living operational ecosystem.

Grid Agents are visual embodiments of backend roles inside The Grid. They are not initially autonomous AI systems. They begin as conceptual and visual entities that make the world feel alive, then later map to real workers, workflows, services, and automations.

Core principle:

> Make the agents feel real before making them fully autonomous.

## Motivation

The Grid is intended to be more than a personal website. It is a visual operating system, portfolio world, homelab dashboard, project archive, and operational command center.

A normal portfolio says:

> Here are my projects.

The Grid should say:

> Here is the living operational ecosystem behind my work.

Agents help create that feeling by giving invisible systems a physical representation. Instead of a GitHub workflow, Discord bot, Railway worker, or homelab monitor being hidden in logs, each system can have a visible presence inside the world.

This supports the larger design direction of The Grid:

- operational systems
- project nodes
- unstable tethers
- unfinished sectors
- archived fragments
- living infrastructure
- controlled chaos
- digital dreamspace / lab atmosphere

## Goals

Grid Agents should:

1. Represent backend, automation, and AI worker roles as visible system entities.
2. Make The Grid feel alive through state, presence, motion, and logs.
3. Connect agents to project nodes, infrastructure nodes, and operational sectors.
4. Provide a clean conceptual bridge between front-end worldbuilding and future backend automation.
5. Support both simulated behavior now and real worker integrations later.
6. Preserve The Grid's tone: atmospheric, operational, futuristic, personal, and slightly strange.
7. Avoid generic AI dashboard aesthetics.

## Non-Goals

This RFC does not propose building real autonomous agents immediately.

Initial implementation should not include:

- real AI execution
- autonomous decision-making
- external API calls
- Railway worker deployment
- job queues
- database-backed agent state
- authentication
- production-grade monitoring
- complex orchestration logic

The first version should prove the concept visually and structurally before adding operational complexity.

## Concept

A Grid Agent is a visible entity inside The Grid that represents an operational role.

Agents may eventually correspond to:

- Railway workers
- GitHub Actions
- Discord bots
- local homelab services
- n8n workflows
- scheduled jobs
- monitoring scripts
- AI-assisted research or coding workflows
- report generators
- deployment checkers

In the first version, agents can be mock-driven and manually defined.

The illusion of life should come from:

- persistent identity
- status changes
- assigned project nodes
- ambient movement
- visual state
- activity logs
- recent actions
- relationships to projects and sectors

The agents do not need to be intelligent at first. They need to feel present.

## Initial Agent Classes

### Repo Auditor

Scans repositories for risks, stale code, architecture issues, and next actions.

Visual direction:

- inspection drone
- scanning beam
- hovering near project nodes
- calm cyan glow

Possible future integrations:

- GitHub repository scans
- weekly repo health summaries
- dependency checks
- Codex/Claude audit handoffs

### Prompt Engineer

Turns vague ideas into concise execution-ready prompts for Claude, Codex, or other tools.

Visual direction:

- compiler station
- signal translator
- syntax fragments
- purple/cyan glow

Possible future integrations:

- prompt library generation
- handoff document creation
- repo-specific implementation prompts

### Research Agent

Collects, summarizes, and links outside context.

Visual direction:

- archive crawler
- moving through document stacks
- tethered to knowledge nodes

Possible future integrations:

- web research summaries
- transcript ingestion
- source citation tracking
- knowledge base updates

### Bot Ops Agent

Monitors Discord bots and game/community systems.

Visual direction:

- maintenance bot
- attached to Discord/project systems
- active when bot services change state

Possible future integrations:

- GodForge status
- YapHub status
- Discord command usage
- bot error logs

### Homelab Watcher

Represents local infrastructure status.

Visual direction:

- tethered sensor
- physical cable motif
- sits near hardware/network nodes

Possible future integrations:

- uptime pings
- Home Assistant
- Proxmox status
- Docker container health
- local network alerts

### Report Broadcaster

Converts activity into readable summaries.

Visual direction:

- broadcast tower
- signal pulses
- output terminal

Possible future integrations:

- weekly GitHub reports
- Discord status posts
- project digest generation
- operational summaries

### Archive Crawler

Maintains history, old projects, notes, and archived experiments.

Visual direction:

- small crawler moving through dark archive sectors
- dim amber glow
- data fragments

Possible future integrations:

- changelog indexing
- old repo summaries
- document retrieval
- project memory timeline

## Agent State Model

A Grid Agent may eventually have the following fields:

```ts
export type AgentStatus =
  | "idle"
  | "active"
  | "waiting"
  | "failed"
  | "offline";

export type AgentArchetype =
  | "drone"
  | "crawler"
  | "tower"
  | "sensor"
  | "compiler"
  | "maintenance-bot";

export type GridAgent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  archetype: AgentArchetype;
  assignedProjectId?: string;
  assignedSectorId?: string;
  description: string;
  lastAction?: string;
  currentTask?: string;
  confidence?: number;
  health?: number;
  visual: {
    glow: "cyan" | "purple" | "amber" | "red" | "blue";
    intensity: "low" | "medium" | "high";
  };
};
```

This is only a direction, not an implementation requirement.

## User Experience

Users should perceive Grid Agents as operational entities inside the world.

Possible interactions:

1. User opens The Grid.
2. Project nodes are visible.
3. Agents appear near relevant projects or sectors.
4. Active agents have subtle animation.
5. Clicking an agent opens a detail panel.
6. The panel shows:
   - name
   - role
   - status
   - assigned project
   - last action
   - current task
   - recent activity
7. The activity feed shows agent actions as operational logs.

Example activity logs:

```txt
[Repo Auditor] Scanned GodForge deployment notes.
[Prompt Engineer] Generated SwiftDispatch audit prompt.
[Bot Ops Agent] YapHub worker reported healthy.
[Homelab Watcher] ER605 lab network ping stable.
[Archive Crawler] Indexed dormant Civ 6 league notes.
```

The experience should feel like watching a system breathe, not using a generic SaaS dashboard.

## Visual Direction

Agents should feel like system entities, not mascots.

They should avoid:

- cute cartoon characters
- anime robots
- generic chatbot avatars
- overly corporate assistant icons
- humanoid AI companions
- cluttered cyberpunk UI
- excessive neon

They should lean toward:

- game UI icons
- operational machinery
- quiet sci-fi atmosphere
- clean silhouettes
- subtle animation
- physical presence inside the world
- digital-lab / dreamspace tone
- controlled instability

Good visual metaphors:

- inspection drones
- archive crawlers
- compiler stations
- signal towers
- tethered sensors
- maintenance bots
- scanning rigs
- dormant machines waking up

## Technical Direction

Initial implementation should be mock-data driven.

Recommended first technical shape:

```txt
/docs/rfcs/001-grid-agents.md
/src/data/gridAgents.ts
/src/types/grid.ts
/components/grid/AgentEntity.tsx
/components/grid/AgentDock.tsx
/components/grid/ActivityFeed.tsx
```

However, implementation should wait until the broader Grid visual system and MVP scope are clearer.

Future real-worker architecture may look like:

```txt
Railway Worker
    ↓
Job Queue
    ↓
Agent Result
    ↓
Grid API
    ↓
Agent State
    ↓
Activity Feed
```

Homelab-based services may report into The Grid through webhook pings:

```txt
Homelab Service
    ↓
Health Ping / Webhook
    ↓
Grid API
    ↓
Node + Agent Status Update
```

## MVP Scope

The first meaningful version should include:

1. A small set of mock agents.
2. Visible agent entities inside The Grid.
3. Agent-to-project relationships.
4. Agent status states.
5. Agent detail panel.
6. Activity feed with mock logs.
7. Subtle ambient animation.
8. No real automation.

Recommended MVP agents:

- Repo Auditor
- Prompt Engineer
- Research Agent
- Bot Ops Agent
- Homelab Watcher

The MVP should answer:

> Does The Grid feel more alive when operational roles have physical representation?

If yes, later phases can connect agents to real systems.

## Future Expansion

Later phases may include:

### Phase 2: Real Status

Agents receive status from real services.

Examples:

- GitHub workflow status
- Discord bot heartbeat
- Railway service health
- homelab uptime pings
- deployment events

### Phase 3: Real Workflows

Agents trigger or summarize actual workflows.

Examples:

- repo audit summaries
- prompt generation
- weekly reports
- transcript processing
- bot status reports
- ServiceNow/Airtable sync summaries

### Phase 4: Agent Memory

Agents maintain historical logs and timelines.

Examples:

- what the agent worked on
- previous failures
- recurring patterns
- project-level operational memory

### Phase 5: Command Interface

The user can summon agents through The Grid.

Examples:

- “Audit this project”
- “Summarize recent changes”
- “Generate a Claude prompt”
- “Check bot status”
- “Review deployment health”

## Risks

### Scope Creep

This idea can easily become too large too early.

Mitigation:

- Start with visual mock agents only.
- Avoid real AI execution in the first version.
- Limit MVP to 5 agents.

### Performance

Animated agents, maps, particles, and logs could make the site heavy.

Mitigation:

- Keep animations subtle.
- Avoid excessive canvas/WebGL until necessary.
- Prioritize readability and atmosphere.

### Generic AI Aesthetic

The concept could become another AI dashboard if visual direction is weak.

Mitigation:

- Treat agents as operational entities, not chatbots.
- Tie them to the world model and project nodes.
- Preserve the digital-lab / liminal infrastructure tone.

### Lore Overload

Too much worldbuilding could make the site confusing.

Mitigation:

- Keep the first interaction simple.
- Let users discover deeper lore gradually.
- Prioritize clarity over mystery.

## Open Questions

1. Should agents be visible immediately, or discovered as the user explores?
2. Should each agent have a fixed location, or move between project nodes?
3. Should agents have personalities, or remain purely operational?
4. Should The Grid expose agent logs publicly, or only curated summaries?
5. Should agent activity be simulated on page load, time-based, or event-driven?
6. Should failed/offline agents become part of the visual storytelling?
7. Should agents be tied to project categories, infra layers, or user workflows?

## Decision

Proceed with this concept as a planning artifact.

Do not build real agents yet.

Use this RFC as the source of truth for future Codex/Claude planning and implementation prompts.
