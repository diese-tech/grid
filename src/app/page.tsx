import { nodes, sectors, tethers } from "@/data/grid";

export default function Home() {
  const visibleNodes = nodes.filter((node) => !node.hidden);

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="border-b border-cyan-300/20 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">
            GRID // ALPHA FOUNDATION
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-cyan-50 sm:text-5xl">
            Project data is online. Traversal comes next.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            This shell verifies the Next.js app, Tailwind baseline, and externalized
            node model before the cinematic layers are built.
          </p>
        </header>

        <section aria-labelledby="node-register" className="grid gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="node-register" className="text-xl font-semibold text-cyan-50">
                Node Register
              </h2>
              <p className="text-sm text-slate-400">
                {visibleNodes.length} visible nodes, {tethers.length} explicit tethers,{" "}
                {sectors.length} sectors.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {visibleNodes.map((node) => (
              <article
                key={node.id}
                className="border border-cyan-200/15 bg-cyan-950/10 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-mono text-sm uppercase text-cyan-100">
                      {node.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {node.description}
                    </p>
                  </div>
                  <span className="whitespace-nowrap border border-cyan-200/20 px-2 py-1 font-mono text-[11px] uppercase text-cyan-100/80">
                    {node.status}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-cyan-200/10 pt-4 text-xs text-slate-400">
                  <div>
                    <dt className="font-mono uppercase text-slate-500">Sector</dt>
                    <dd>{node.sector}</dd>
                  </div>
                  <div>
                    <dt className="font-mono uppercase text-slate-500">Importance</dt>
                    <dd>{node.importance}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
