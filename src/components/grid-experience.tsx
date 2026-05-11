"use client";

import { useState } from "react";

import { BootSequence } from "@/components/boot-sequence";
import { TransitLayer } from "@/components/transit-layer";
import type { GridNode, GridSector, GridTether } from "@/data/grid";

type GridExperienceProps = {
  nodes: GridNode[];
  sectors: GridSector[];
  tethers: GridTether[];
};

export function GridExperience({ nodes, sectors, tethers }: GridExperienceProps) {
  const [booting, setBooting] = useState(true);

  return (
    <>
      <BootSequence active={booting} onComplete={() => setBooting(false)} />
      <TransitLayer nodes={nodes} sectors={sectors} tethers={tethers} />
    </>
  );
}
