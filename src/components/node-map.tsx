"use client";

import type { GridNode, GridTether, NodeStatus } from "@/data/grid";

type NodeMapProps = {
  nodes: GridNode[];
  tethers: GridTether[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
};

type NodePosition = {
  x: number;
  y: number;
};

const nodePositions: Record<string, NodePosition> = {
  "the-grid": { x: 470, y: 255 },
  godforge: { x: 290, y: 170 },
  swiftdispatch: { x: 665, y: 165 },
  stickyricekitchen: { x: 690, y: 360 },
  hersonbot: { x: 305, y: 365 },
};

const statusStyles: Record<NodeStatus, { fill: string; stroke: string; glow: string }> = {
  active: {
    fill: "rgba(16, 185, 129, 0.24)",
    stroke: "rgb(110, 231, 183)",
    glow: "rgba(16, 185, 129, 0.5)",
  },
  experimental: {
    fill: "rgba(34, 211, 238, 0.22)",
    stroke: "rgb(103, 232, 249)",
    glow: "rgba(34, 211, 238, 0.5)",
  },
  archived: {
    fill: "rgba(148, 163, 184, 0.16)",
    stroke: "rgb(148, 163, 184)",
    glow: "rgba(148, 163, 184, 0.3)",
  },
  "under-construction": {
    fill: "rgba(251, 191, 36, 0.24)",
    stroke: "rgb(252, 211, 77)",
    glow: "rgba(251, 191, 36, 0.45)",
  },
  corrupted: {
    fill: "rgba(248, 113, 113, 0.2)",
    stroke: "rgb(251, 146, 60)",
    glow: "rgba(248, 113, 113, 0.5)",
  },
  hidden: {
    fill: "rgba(100, 116, 139, 0.16)",
    stroke: "rgb(100, 116, 139)",
    glow: "rgba(100, 116, 139, 0.3)",
  },
  redacted: {
    fill: "rgba(100, 116, 139, 0.16)",
    stroke: "rgb(71, 85, 105)",
    glow: "rgba(100, 116, 139, 0.25)",
  },
};

const pulseDurations: Record<NodeStatus, string> = {
  active: "3.8s",
  experimental: "2.6s",
  archived: "6s",
  "under-construction": "3.1s",
  corrupted: "1.8s",
  hidden: "5s",
  redacted: "5s",
};

export function NodeMap({ nodes, tethers, selectedNodeId, onSelectNode }: NodeMapProps) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const selectedNode = nodeById.get(selectedNodeId) ?? nodes[0];
  const visibleIds = new Set([selectedNode.id, ...selectedNode.connectedTo]);
  const visibleNodes = nodes.filter((node) => visibleIds.has(node.id) && !node.hidden);
  const visibleTethers = tethers.filter(
    (tether) => visibleIds.has(tether.from) && visibleIds.has(tether.to),
  );

  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden border border-cyan-100/20 bg-slate-950/50 shadow-2xl shadow-cyan-950/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_38%),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(125,211,252,0.08)_1px,transparent_1px)] bg-[length:auto,48px_48px,48px_48px]" />
      <svg
        viewBox="0 0 960 520"
        role="img"
        aria-label="Interactive node map"
        className="relative z-10 h-full min-h-[22rem] w-full"
      >
        <defs>
          <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="tether-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.2)" />
            <stop offset="50%" stopColor="rgba(252,211,77,0.72)" />
            <stop offset="100%" stopColor="rgba(110,231,183,0.25)" />
          </linearGradient>
        </defs>

        {visibleTethers.map((tether) => {
          const from = nodePositions[tether.from];
          const to = nodePositions[tether.to];
          if (!from || !to) {
            return null;
          }

          return (
            <g key={tether.id}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(14,165,233,0.16)"
                strokeWidth="10"
              />
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="url(#tether-gradient)"
                strokeDasharray="14 10"
                strokeLinecap="round"
                strokeWidth={Math.max(2, tether.strength * 4)}
              />
            </g>
          );
        })}

        <path
          d="M122 430 C210 482 292 485 365 438"
          fill="none"
          stroke="rgba(148,163,184,0.26)"
          strokeDasharray="8 15"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M780 88 C835 72 870 102 903 138"
          fill="none"
          stroke="rgba(248,113,113,0.22)"
          strokeDasharray="4 12"
          strokeLinecap="round"
          strokeWidth="3"
        />

        {visibleNodes.map((node) => {
          const position = nodePositions[node.id];
          if (!position) {
            return null;
          }

          const isSelected = node.id === selectedNode.id;
          const style = statusStyles[node.status];
          const radius = isSelected ? 38 : Math.max(24, node.importance / 3.2);

          return (
            <g
              key={node.id}
              aria-label={`Select ${node.label}`}
              className="cursor-pointer focus:outline-none"
              role="button"
              tabIndex={0}
              transform={`translate(${position.x} ${position.y})`}
              onClick={() => onSelectNode(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectNode(node.id);
                }
              }}
            >
              <circle
                r={radius + 10}
                fill={style.glow}
                filter="url(#node-glow)"
                opacity={isSelected ? 0.75 : 0.38}
              >
                <animate
                  attributeName="opacity"
                  dur={pulseDurations[node.status]}
                  repeatCount="indefinite"
                  values={
                    node.status === "archived"
                      ? "0.18;0.28;0.18"
                      : node.status === "experimental"
                        ? "0.32;0.72;0.42;0.58;0.32"
                        : "0.34;0.72;0.34"
                  }
                />
                <animate
                  attributeName="r"
                  dur={pulseDurations[node.status]}
                  repeatCount="indefinite"
                  values={`${radius + 8};${radius + 14};${radius + 8}`}
                />
              </circle>
              <circle
                r={radius}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={isSelected ? 3 : 2}
              />
              <circle
                r={radius - 10}
                fill="rgba(2,6,23,0.82)"
                stroke="rgba(255,255,255,0.14)"
              />
              <text
                y="-5"
                textAnchor="middle"
                className="select-none fill-cyan-50 font-mono text-[13px] uppercase"
              >
                {node.label}
              </text>
              <text
                y="14"
                textAnchor="middle"
                className="select-none fill-slate-300 font-mono text-[10px] uppercase"
              >
                {node.status}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-3 left-3 border border-slate-300/10 bg-black/40 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-300">
        Local view: {visibleNodes.length} nodes
      </div>
    </div>
  );
}
