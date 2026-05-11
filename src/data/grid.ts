export const nodeStatuses = [
  "active",
  "experimental",
  "archived",
  "under-construction",
  "corrupted",
  "hidden",
  "redacted",
] as const;

export type NodeStatus = (typeof nodeStatuses)[number];

export type GridSector = {
  id: string;
  label: string;
  atmosphere: string;
  musicProfile?: string;
  nodeTypes: NodeStatus[];
  connectedSectors: string[];
  hidden?: boolean;
};

export type GridNode = {
  id: string;
  label: string;
  description: string;
  status: NodeStatus;
  importance: number;
  sector: string;
  connectedTo: string[];
  githubRepo?: string;
  hidden: boolean;
  unlockType?: string;
  audioProfile?: string;
  tags: string[];
  metadata: {
    summary: string;
    currentStatus: string;
    liveState: "static-seed" | "github-ready" | "manual";
    screenshots: string[];
  };
};

export type GridTether = {
  id: string;
  from: string;
  to: string;
  relationship:
    | "lineage"
    | "shared-infrastructure"
    | "active-experiment"
    | "portfolio-anchor"
    | "operator-focus";
  strength: number;
  description: string;
};

export const sectors: GridSector[] = [
  {
    id: "transit-layer",
    label: "Homepage Transit Layer",
    atmosphere: "Station signage, route pressure, and the first glimpse of the graph.",
    musicProfile: "low-transit-hum",
    nodeTypes: ["active", "experimental", "under-construction"],
    connectedSectors: ["the-lab", "archive-zone"],
  },
  {
    id: "the-lab",
    label: "The Lab",
    atmosphere: "Operator systems, node tethers, and dossier surfaces.",
    musicProfile: "fluorescent-lab-loop",
    nodeTypes: ["active", "experimental", "corrupted", "hidden"],
    connectedSectors: ["transit-layer", "archive-zone"],
  },
  {
    id: "archive-zone",
    label: "Archive Zone",
    atmosphere: "Dimmed historical work and low-signal project remnants.",
    nodeTypes: ["archived", "redacted"],
    connectedSectors: ["transit-layer", "the-lab"],
  },
];

export const nodes: GridNode[] = [
  {
    id: "godforge",
    label: "GodForge",
    description: "A drafting and session engine that informs The Grid's agent-facing systems.",
    status: "active",
    importance: 95,
    sector: "the-lab",
    connectedTo: ["the-grid", "hersonbot"],
    githubRepo: "diese-tech/godforge",
    hidden: false,
    audioProfile: "stable-core",
    tags: ["agents", "drafting", "systems"],
    metadata: {
      summary: "Operational reference point for modular bot and agent workflows.",
      currentStatus: "Stable reference system",
      liveState: "github-ready",
      screenshots: [],
    },
  },
  {
    id: "swiftdispatch",
    label: "SwiftDispatch",
    description: "A logistics-oriented product node with operational dashboard energy.",
    status: "active",
    importance: 88,
    sector: "transit-layer",
    connectedTo: ["the-grid", "stickyricekitchen"],
    githubRepo: "diese-tech/swiftdispatch",
    hidden: false,
    audioProfile: "route-pulse",
    tags: ["logistics", "operations", "dashboard"],
    metadata: {
      summary: "Represents practical SaaS/product execution inside the graph.",
      currentStatus: "Active product node",
      liveState: "github-ready",
      screenshots: [],
    },
  },
  {
    id: "stickyricekitchen",
    label: "StickyRiceKitchen",
    description: "A food and venue node that keeps the graph grounded in real-world texture.",
    status: "under-construction",
    importance: 70,
    sector: "transit-layer",
    connectedTo: ["swiftdispatch", "the-grid"],
    githubRepo: "diese-tech/stickyricekitchen",
    hidden: false,
    audioProfile: "warm-room-tone",
    tags: ["restaurant", "brand", "local"],
    metadata: {
      summary: "A warmer counterweight to the colder lab and systems nodes.",
      currentStatus: "Brand and site work in progress",
      liveState: "github-ready",
      screenshots: [],
    },
  },
  {
    id: "hersonbot",
    label: "HersonBot",
    description: "A Discord automation node tied to community utility and bot operations.",
    status: "experimental",
    importance: 78,
    sector: "the-lab",
    connectedTo: ["godforge", "the-grid"],
    githubRepo: "diese-tech/hersonbot",
    hidden: false,
    audioProfile: "bot-relay",
    tags: ["discord", "automation", "community"],
    metadata: {
      summary: "A live-feeling utility node for Discord and automation patterns.",
      currentStatus: "Experimental automation node",
      liveState: "github-ready",
      screenshots: [],
    },
  },
  {
    id: "the-grid",
    label: "The Grid",
    description: "The spatial interface that connects projects as an explorable system.",
    status: "under-construction",
    importance: 100,
    sector: "the-lab",
    connectedTo: ["godforge", "swiftdispatch", "stickyricekitchen", "hersonbot"],
    githubRepo: "diese-tech/grid",
    hidden: false,
    unlockType: "alpha-foundation",
    audioProfile: "grid-core",
    tags: ["portfolio", "spatial-interface", "alpha"],
    metadata: {
      summary: "The container experience for traversal, dossiers, and project lineage.",
      currentStatus: "Alpha foundation",
      liveState: "github-ready",
      screenshots: [],
    },
  },
];

export const tethers: GridTether[] = [
  {
    id: "the-grid-godforge",
    from: "the-grid",
    to: "godforge",
    relationship: "operator-focus",
    strength: 0.95,
    description: "GodForge shapes the modular command and agent patterns The Grid will use.",
  },
  {
    id: "the-grid-swiftdispatch",
    from: "the-grid",
    to: "swiftdispatch",
    relationship: "portfolio-anchor",
    strength: 0.86,
    description: "SwiftDispatch anchors the product and operations side of the graph.",
  },
  {
    id: "swiftdispatch-stickyrice",
    from: "swiftdispatch",
    to: "stickyricekitchen",
    relationship: "shared-infrastructure",
    strength: 0.62,
    description: "Both nodes pull from practical business workflow and public-facing UX.",
  },
  {
    id: "godforge-hersonbot",
    from: "godforge",
    to: "hersonbot",
    relationship: "lineage",
    strength: 0.74,
    description: "Discord and automation work informs the agent and bot design language.",
  },
  {
    id: "the-grid-hersonbot",
    from: "the-grid",
    to: "hersonbot",
    relationship: "active-experiment",
    strength: 0.68,
    description: "HersonBot is a future candidate for live system telemetry inside dossiers.",
  },
];
