import VennPlayground from "../components/VennPlayground";
import TruthTable from "../components/TruthTable";
import VennDiagram from "../components/VennDiagram";
import type { VennPreset } from "../types";

const GALLERY: { preset: VennPreset; label: string }[] = [
  { preset: "union", label: "Birlashma A ∪ B" },
  { preset: "intersection", label: "Kesishma A ∩ B" },
  { preset: "difference", label: "Ayirma A − B" },
  { preset: "symmetric", label: "Simmetrik A △ B" },
  { preset: "complement", label: "To'ldiruvchi A′" },
  { preset: "subset", label: "Qism to'plam A ⊆ B" },
];

export default function Practice() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold">🧪 Mashqxona</h1>
        <p className="text-ink-500 dark:text-ink-400">
          To'plamlar bilan jonli tajriba o'tkazing — natijani real vaqtda ko'ring.
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold">Interaktiv Venn laboratoriyasi</h2>
        <VennPlayground />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Amallar galereyasi</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g) => (
            <div key={g.preset} className="card flex flex-col items-center">
              <VennDiagram preset={g.preset} />
              <p className="mt-2 text-center text-sm font-semibold">{g.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Mantiq simulyatori</h2>
        <TruthTable />
      </section>
    </div>
  );
}
