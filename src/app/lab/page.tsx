import Image from "next/image";
import Link from "next/link";

import { nodes, tethers } from "@/data/grid";

export default function LabPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] px-6 py-8 text-cyan-50 sm:px-10">
      <Image
        src="/images/dreamspace-lab-atmosphere-v01.png"
        alt="A cold blue lab with active workstations and suspended node systems"
        fill
        priority
        className="object-cover opacity-45"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.94),rgba(3,7,18,0.6)_55%,rgba(3,7,18,0.86))]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between">
        <header className="flex items-center justify-between gap-4 border-b border-cyan-100/15 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-100/65">
              Sector Preview
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-cyan-50">The Lab</h1>
          </div>
          <Link
            href="/"
            className="border border-cyan-100/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan-100"
          >
            Return
          </Link>
        </header>

        <div className="grid gap-8 py-10 lg:grid-cols-[1fr_320px] lg:items-end">
          <section>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">
              Lab shell ready. Dossiers pending.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              This route confirms the homepage can move into the Lab without a normal
              landing-page jump. The full Lab scene, node interactions, and dossier
              zoom belong to batch 3.
            </p>
          </section>

          <aside className="border border-violet-100/20 bg-black/40 p-4 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-100/75">
              Active inventory
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase text-slate-500">Nodes</dt>
                <dd className="text-2xl font-semibold">{nodes.length}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase text-slate-500">Tethers</dt>
                <dd className="text-2xl font-semibold">{tethers.length}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
  );
}
