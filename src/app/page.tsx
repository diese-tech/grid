import { GridExperience } from "@/components/grid-experience";
import { nodes, sectors, tethers } from "@/data/grid";

export default function Home() {
  return <GridExperience nodes={nodes} sectors={sectors} tethers={tethers} />;
}
