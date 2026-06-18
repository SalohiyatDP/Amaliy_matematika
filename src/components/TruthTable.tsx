import { useMemo, useState } from "react";
import MathText from "./MathText";

type Expr = {
  id: string;
  label: string;
  vars: string[];
  fn: (vals: Record<string, boolean>) => boolean;
};

const EXPRS: Expr[] = [
  { id: "and", label: "p ∧ q", vars: ["p", "q"], fn: (v) => v.p && v.q },
  { id: "or", label: "p ∨ q", vars: ["p", "q"], fn: (v) => v.p || v.q },
  { id: "not", label: "¬p", vars: ["p"], fn: (v) => !v.p },
  { id: "imp", label: "p → q", vars: ["p", "q"], fn: (v) => !v.p || v.q },
  { id: "iff", label: "p ⇔ q", vars: ["p", "q"], fn: (v) => v.p === v.q },
  { id: "xor", label: "p ⊕ q", vars: ["p", "q"], fn: (v) => v.p !== v.q },
  {
    id: "demorgan",
    label: "¬(p ∧ q)",
    vars: ["p", "q"],
    fn: (v) => !(v.p && v.q),
  },
];

function rows(vars: string[]): Record<string, boolean>[] {
  const n = vars.length;
  const out: Record<string, boolean>[] = [];
  for (let i = (1 << n) - 1; i >= 0; i--) {
    const r: Record<string, boolean> = {};
    vars.forEach((v, j) => {
      r[v] = Boolean((i >> (n - 1 - j)) & 1);
    });
    out.push(r);
  }
  return out;
}

export default function TruthTable() {
  const [exprId, setExprId] = useState("and");
  const expr = EXPRS.find((e) => e.id === exprId)!;
  const data = useMemo(() => rows(expr.vars), [expr]);

  return (
    <div className="card">
      <h3 className="mb-1 text-lg font-bold">Rostlik jadvali generatori</h3>
      <p className="mb-4 text-sm text-ink-500 dark:text-ink-400">
        Mantiqiy ifodani tanlang — jadval avtomatik tuziladi.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {EXPRS.map((e) => (
          <button
            key={e.id}
            onClick={() => setExprId(e.id)}
            className={`rounded-lg border-2 px-3 py-1.5 font-math text-sm font-semibold transition-all ${
              exprId === e.id
                ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200"
                : "border-ink-200 hover:border-brand-300 dark:border-ink-700"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-ink-200 dark:border-ink-700">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="bg-ink-100 dark:bg-ink-800">
              {expr.vars.map((v) => (
                <th key={v} className="px-4 py-2 font-math font-bold">
                  {v}
                </th>
              ))}
              <th className="px-4 py-2 font-math font-bold text-brand-600 dark:text-brand-300">
                <MathText>{expr.label}</MathText>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => {
              const res = expr.fn(r);
              return (
                <tr
                  key={i}
                  className="border-t border-ink-200 dark:border-ink-700"
                >
                  {expr.vars.map((v) => (
                    <td key={v} className="px-4 py-2 font-math">
                      {r[v] ? "1" : "0"}
                    </td>
                  ))}
                  <td
                    className={`px-4 py-2 font-math font-bold ${
                      res
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-500"
                    }`}
                  >
                    {res ? "1" : "0"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink-400">
        1 = rost, 0 = yolg'on. To'plamlarda: ∧↔∩, ∨↔∪, ¬↔′.
      </p>
    </div>
  );
}
