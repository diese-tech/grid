"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BootSequence } from "@/components/boot-sequence";
import { TransitLayer } from "@/components/transit-layer";
import type { GridNode, GridSector } from "@/data/grid";

type GridExperienceProps = {
  nodes: GridNode[];
  sectors: GridSector[];
};

export function GridExperience({ nodes, sectors }: GridExperienceProps) {
  const [booting, setBooting] = useState(true);
  const [enteringLab, setEnteringLab] = useState(false);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  function enterLab() {
    setEnteringLab(true);
    window.setTimeout(
      () => {
        router.push("/lab");
      },
      reduceMotion ? 80 : 650,
    );
  }

  return (
    <>
      <BootSequence active={booting} onComplete={() => setBooting(false)} />
      <TransitLayer nodes={nodes} sectors={sectors} onEnterLab={enterLab} />
      <AnimatePresence>
        {enteringLab ? (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#030609] text-cyan-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
            aria-live="polite"
            aria-label="Entering The Lab"
          >
            <motion.div
              className="border border-cyan-100/25 bg-black/60 px-6 py-5 text-center shadow-2xl shadow-cyan-950/50"
              initial={reduceMotion ? false : { scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-100/70">
                Sector transfer
              </p>
              <p className="mt-3 text-2xl font-semibold">Entering The Lab</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
