"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import type { GridNode, GridSector, GridTether } from "@/data/grid";

type TransitLayerProps = {
  nodes: GridNode[];
  sectors: GridSector[];
  tethers: GridTether[];
};

export function TransitLayer({ nodes, sectors, tethers }: TransitLayerProps) {
  const reduceMotion = useReducedMotion();
  const visibleNodes = nodes.filter((node) => !node.hidden);
  const lab = sectors.find((sector) => sector.id === "the-lab");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-cyan-50">
      <Image
        src="/images/homepage-transit-station-v01.jpeg"
        alt="A quiet futuristic transit station leading into The Grid"
        fill
        priority
        className="object-cover opacity-55"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.92),rgba(3,7,18,0.58)_42%,rgba(3,7,18,0.86)),radial-gradient(circle_at_70%_30%,rgba(103,232,249,0.18),transparent_34%),radial-gradient(circle_at_28%_78%,rgba(251,191,36,0.12),transparent_26%)]" />

      <motion.div
        className="absolute inset-0 opacity-35"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: [0, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full bg-[linear-gradient(115deg,transparent_0%,transparent_42%,rgba(125,211,252,0.12)_43%,transparent_44%,transparent_100%)]" />
      </motion.div>

      <section className="relative z-10 grid min-h-screen grid-rows-[auto_1fr_auto] px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-start justify-between gap-6 border-b border-cyan-100/15 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-100/70">
              Current Sector
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-cyan-50 sm:text-4xl">
              Transit Layer
            </h1>
          </div>
          <button
            type="button"
            aria-pressed="false"
            className="border border-amber-100/25 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-amber-100/85"
          >
            Audio muted
          </button>
        </header>

        <div className="grid items-end gap-8 py-10 lg:grid-cols-[300px_1fr_280px]">
          <aside className="border border-amber-100/20 bg-black/40 p-4 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-100/70">
              Operator
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-200">
              Welcome to The Grid. This station is only a threshold. The active
              systems are awake, but the Lab is where the map starts answering back.
            </p>
          </aside>

          <section className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/70">
              Route signage
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-cyan-50 sm:text-6xl">
              Select a sector. Keep moving.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              This is the orientation platform for active projects, unfinished
              systems, and the operator workspace beyond the glass.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lab"
                className="border border-cyan-100/35 bg-cyan-100 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
              >
                Enter The Lab
              </Link>
              <a
                href="#node-map"
                className="border border-cyan-100/25 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-cyan-50 transition hover:bg-cyan-100/10 focus:outline-none focus:ring-2 focus:ring-cyan-200"
              >
                View routes
              </a>
            </div>
          </section>

          <aside
            id="node-map"
            className="border border-cyan-100/15 bg-black/35 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-100/65">
                Mini map
              </p>
              <span className="font-mono text-xs text-cyan-200/80">
                {tethers.length} tethers
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {visibleNodes.map((node, index) => (
                <div
                  key={node.id}
                  className="aspect-square border border-cyan-100/15 bg-cyan-100/10 p-2 odd:bg-emerald-100/10 even:bg-amber-100/10"
                  title={node.label}
                >
                  <div className="flex h-full items-center justify-center rounded-full border border-cyan-100/30 font-mono text-[10px] text-cyan-100">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              {lab?.label ?? "The Lab"} is online. Deeper node interaction arrives in the
              next sector build.
            </p>
          </aside>
        </div>

        <footer className="grid gap-3 border-t border-cyan-100/15 pt-4 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/55 sm:grid-cols-3">
          <span>Station 08</span>
          <span>{visibleNodes.length} visible nodes</span>
          <span className="text-amber-100/70">Route status: provisional</span>
        </footer>
      </section>
    </main>
  );
}
