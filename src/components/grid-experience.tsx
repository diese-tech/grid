"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";

import { BootSequence } from "@/components/boot-sequence";
import { SectorTransition } from "@/components/sector-transition";
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
      reduceMotion ? 80 : 1350,
    );
  }

  return (
    <>
      <BootSequence active={booting} onComplete={() => setBooting(false)} />
      <TransitLayer nodes={nodes} sectors={sectors} onEnterLab={enterLab} />
      <AnimatePresence>
        <SectorTransition active={enteringLab} />
      </AnimatePresence>
    </>
  );
}
