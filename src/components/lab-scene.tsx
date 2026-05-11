"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { DossierPanel } from "@/components/dossier-panel";
import { NodeMap } from "@/components/node-map";
import type { GridNode, GridTether } from "@/data/grid";

type LabSceneProps = {
  nodes: GridNode[];
  tethers: GridTether[];
};

export function LabScene({ nodes, tethers }: LabSceneProps) {
  const [selectedNodeId, setSelectedNodeId] = useState("the-grid");
  const [dossierOpen, setDossierOpen] = useState(false);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? nodes[0],
    [nodes, selectedNodeId],
  );

  const relatedNodes = useMemo(
    () => nodes.filter((node) => selectedNode.connectedTo.includes(node.id)),
    [nodes, selectedNode],
  );

  const relatedTethers = useMemo(
    () =>
      tethers.filter(
        (tether) => tether.from === selectedNode.id || tether.to === selectedNode.id,
      ),
    [selectedNode, tethers],
  );

  function handleSelectNode(nodeId: string) {
    setSelectedNodeId(nodeId);
    setDossierOpen(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] px-4 py-5 text-cyan-50 sm:px-7 lg:px-9">
      <Image
        src="/images/dreamspace-lab-atmosphere-v01.png"
        alt="A cold blue lab with active workstations and suspended node systems"
        fill
        priority
        className="object-cover opacity-82"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.72),rgba(3,7,18,0.26)_48%,rgba(3,7,18,0.7)),radial-gradient(circle_at_68%_32%,rgba(103,232,249,0.08),transparent_34%),radial-gradient(circle_at_28%_82%,rgba(167,139,250,0.08),transparent_30%)]" />

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl grid-rows-[auto_1fr] gap-5">
        <header className="flex flex-col gap-4 border-b border-cyan-100/20 bg-black/12 px-3 py-3 backdrop-blur-[1px] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-100/65">
              Sector Active
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-cyan-50">The Lab</h1>
          </div>
          <nav className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="border border-cyan-100/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-100/10"
            >
              Transit
            </Link>
            <button
              type="button"
              onClick={() => setDossierOpen(false)}
              className="border border-amber-100/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-100/10"
            >
              Lab View
            </button>
          </nav>
        </header>

        <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)_340px]">
          <aside className="flex flex-col justify-between border border-amber-100/25 bg-black/18 p-4 shadow-2xl shadow-black/20 backdrop-blur-[2px]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-100/70">
                Operator Bay
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-200">
                Background systems are running. The operator stays partly out of view,
                hands on the map table, letting the nodes speak first.
              </p>
            </div>
            <div className="mt-8 grid gap-3">
              <div className="h-20 border border-cyan-100/15 bg-cyan-100/5" />
              <div className="h-12 border border-violet-100/15 bg-violet-100/5" />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                Floating displays: standby
              </p>
            </div>
          </aside>

          <section className="grid min-h-[38rem] grid-rows-[1fr_auto] gap-4">
            <NodeMap
              nodes={nodes}
              tethers={tethers}
              selectedNodeId={selectedNode.id}
              onSelectNode={handleSelectNode}
            />

            <div className="grid gap-3 sm:grid-cols-3">
              {relatedNodes.slice(0, 3).map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleSelectNode(node.id)}
                  className="border border-cyan-100/20 bg-black/18 p-3 text-left shadow-lg shadow-black/15 backdrop-blur-[1px] transition hover:bg-cyan-100/10 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100/60">
                    Direct node
                  </span>
                  <span className="mt-2 block text-sm text-cyan-50">{node.label}</span>
                </button>
              ))}
            </div>
          </section>

          <DossierPanel
            node={selectedNode}
            relatedNodes={relatedNodes}
            relatedTethers={relatedTethers}
            open={dossierOpen}
            onClose={() => setDossierOpen(false)}
          />
        </div>
      </section>
    </main>
  );
}
