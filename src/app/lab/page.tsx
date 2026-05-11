import { LabScene } from "@/components/lab-scene";
import { nodes, tethers } from "@/data/grid";

export default function LabPage() {
  return <LabScene nodes={nodes} tethers={tethers} />;
}
