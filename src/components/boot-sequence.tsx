"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type BootSequenceProps = {
  active: boolean;
  onComplete: () => void;
};

const bootSignals = [
  "Transit lattice waking",
  "Operator channel aligned",
  "Node register mounted",
  "Station threshold open",
];

export function BootSequence({ active, onComplete }: BootSequenceProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = window.setTimeout(onComplete, reduceMotion ? 80 : 2800);
    return () => window.clearTimeout(timer);
  }, [active, onComplete, reduceMotion]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.section
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#030609] px-6 text-cyan-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
          aria-label="Grid boot sequence"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.14),transparent_34%),linear-gradient(180deg,rgba(8,47,73,0.22),transparent_55%)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-200/20" />

          <motion.div
            className="relative w-full max-w-3xl border border-cyan-200/20 bg-black/45 p-6 shadow-2xl shadow-cyan-950/40 sm:p-8"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-200/70">
                  GRID // ALPHA
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-normal text-cyan-50 sm:text-5xl">
                  Threshold initializing.
                </h1>
              </div>

              <button
                type="button"
                onClick={onComplete}
                className="border border-cyan-100/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-50 transition hover:border-cyan-100/60 hover:bg-cyan-100/10 focus:outline-none focus:ring-2 focus:ring-cyan-200/60"
              >
                Skip
              </button>
            </div>

            <div className="mt-10 grid gap-3">
              {bootSignals.map((signal, index) => (
                <motion.div
                  key={signal}
                  className="flex items-center justify-between border-b border-cyan-200/10 pb-3 font-mono text-sm text-cyan-100/80"
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.45 + index * 0.32,
                    duration: 0.45,
                  }}
                >
                  <span>{signal}</span>
                  <span className="text-amber-200">ready</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 h-1 overflow-hidden bg-cyan-950"
              aria-hidden="true"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-200 via-amber-100 to-emerald-200"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduceMotion ? 0 : 2.3, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
