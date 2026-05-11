"use client";

import type { GridNode, GridTether } from "@/data/grid";

type DossierPanelProps = {
  node: GridNode;
  relatedNodes: GridNode[];
  relatedTethers: GridTether[];
  open: boolean;
  onClose: () => void;
};

export function DossierPanel({
  node,
  relatedNodes,
  relatedTethers,
  open,
  onClose,
}: DossierPanelProps) {
  return (
    <aside
      className={`relative flex min-h-[26rem] flex-col border border-cyan-100/20 bg-slate-950/70 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-md transition duration-500 ${
        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-75"
      }`}
      aria-label={`${node.label} dossier`}
    >
      <div className="absolute -top-7 left-6 h-7 w-20 border-x border-t border-cyan-100/20 bg-slate-950/70" />
      <div className="flex items-start justify-between gap-4 border-b border-cyan-100/15 pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-100/70">
            Dossier Surface
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-cyan-50">{node.label}</h2>
        </div>
        {open ? (
          <button
            type="button"
            onClick={onClose}
            className="border border-cyan-100/20 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-100/10 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            Return
          </button>
        ) : null}
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-2">
        <p className="text-sm leading-6 text-slate-300">{node.metadata.summary}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="border border-cyan-100/10 bg-cyan-100/5 p-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Status
            </dt>
            <dd className="mt-1 text-cyan-100">{node.metadata.currentStatus}</dd>
          </div>
          <div className="border border-cyan-100/10 bg-cyan-100/5 p-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Signal
            </dt>
            <dd className="mt-1 text-cyan-100">{node.metadata.liveState}</dd>
          </div>
          <div className="border border-cyan-100/10 bg-cyan-100/5 p-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Importance
            </dt>
            <dd className="mt-1 text-cyan-100">{node.importance}</dd>
          </div>
          <div className="border border-cyan-100/10 bg-cyan-100/5 p-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Sector
            </dt>
            <dd className="mt-1 text-cyan-100">{node.sector}</dd>
          </div>
        </dl>

        <section className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/70">
            Tags
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="border border-amber-100/15 bg-amber-100/10 px-2 py-1 font-mono text-[11px] uppercase text-amber-100/85"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/70">
            Connected Nodes
          </h3>
          <ul className="mt-2 grid gap-2">
            {relatedNodes.map((relatedNode) => (
              <li
                key={relatedNode.id}
                className="border border-cyan-100/10 bg-black/25 px-3 py-2 text-sm text-slate-300"
              >
                {relatedNode.label}{" "}
                <span className="font-mono text-xs uppercase text-slate-500">
                  {relatedNode.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/70">
            Tether Notes
          </h3>
          <ul className="mt-2 grid gap-2">
            {relatedTethers.map((tether) => (
              <li
                key={tether.id}
                className="border-l border-cyan-100/25 pl-3 text-xs leading-5 text-slate-400"
              >
                {tether.description}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
