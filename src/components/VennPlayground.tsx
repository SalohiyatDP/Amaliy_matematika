import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  union,
  intersection,
  difference,
  symmetricDifference,
  complement,
  parseSet,
  fmt,
  type SetEl,
} from "../lib/sets";
import MathText from "./MathText";

type Op = "union" | "intersection" | "difference" | "symmetric" | "complementA" | "complementB";

const OPS: { id: Op; label: string; symbol: string }[] = [
  { id: "union", label: "Birlashma", symbol: "A ∪ B" },
  { id: "intersection", label: "Kesishma", symbol: "A ∩ B" },
  { id: "difference", label: "Ayirma", symbol: "A ∖ B" },
  { id: "symmetric", label: "Simmetrik ayirma", symbol: "A △ B" },
  { id: "complementA", label: "A to'ldiruvchisi", symbol: "A′" },
  { id: "complementB", label: "B to'ldiruvchisi", symbol: "B′" },
];

export default function VennPlayground() {
  const [aInput, setAInput] = useState("1, 2, 3, 4");
  const [bInput, setBInput] = useState("3, 4, 5, 6");
  const [uInput, setUInput] = useState("1, 2, 3, 4, 5, 6, 7, 8");
  const [op, setOp] = useState<Op>("union");

  const A = useMemo(() => parseSet(aInput), [aInput]);
  const B = useMemo(() => parseSet(bInput), [bInput]);
  const U = useMemo(() => {
    const base = parseSet(uInput);
    // ensure universe contains A and B
    return union(union(base, A), B);
  }, [uInput, A, B]);

  const result = useMemo<SetEl[]>(() => {
    switch (op) {
      case "union":
        return union(A, B);
      case "intersection":
        return intersection(A, B);
      case "difference":
        return difference(A, B);
      case "symmetric":
        return symmetricDifference(A, B);
      case "complementA":
        return complement(U, A);
      case "complementB":
        return complement(U, B);
    }
  }, [op, A, B, U]);

  const inResult = (el: SetEl) => result.map(String).includes(String(el));

  const aOnly = difference(A, B);
  const inter = intersection(A, B);
  const bOnly = difference(B, A);
  const outside = U.filter(
    (x) => !A.map(String).includes(String(x)) && !B.map(String).includes(String(x))
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-4">
        <div className="card space-y-4">
          <Field label="A to'plami" value={aInput} onChange={setAInput} color="brand" />
          <Field label="B to'plami" value={bInput} onChange={setBInput} color="accent" />
          <Field label="Universal to'plam (U)" value={uInput} onChange={setUInput} color="ink" />
        </div>

        <div className="card">
          <p className="mb-3 text-sm font-semibold text-ink-500 dark:text-ink-400">
            Amalni tanlang
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {OPS.map((o) => (
              <button
                key={o.id}
                onClick={() => setOp(o.id)}
                className={`rounded-xl border-2 px-2 py-2.5 text-center transition-all ${
                  op === o.id
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                    : "border-ink-200 hover:border-brand-300 dark:border-ink-700"
                }`}
              >
                <MathText className="block text-base font-bold text-brand-600 dark:text-brand-300">
                  {o.symbol}
                </MathText>
                <span className="text-[11px] text-ink-500">{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card bg-gradient-to-br from-brand-600 to-accent-500 text-white">
          <p className="text-sm opacity-90">Natija</p>
          <MathText block className="mt-1 text-2xl font-bold">
            {fmt(result)}
          </MathText>
          <p className="mt-2 text-center text-sm opacity-90">
            Elementlar soni: |natija| = {result.length}
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="card flex flex-col items-center justify-center">
        <svg viewBox="0 0 320 240" className="w-full">
          <rect
            x="6"
            y="6"
            width="308"
            height="228"
            rx="12"
            className="fill-ink-50 stroke-ink-300 dark:fill-ink-800/40 dark:stroke-ink-700"
            strokeWidth="1.5"
          />
          <text x="300" y="24" textAnchor="end" className="fill-ink-400 font-math" fontSize="13">U</text>
          <circle
            cx="120"
            cy="120"
            r="80"
            className="fill-brand-500/10 stroke-brand-500"
            strokeWidth="2.5"
          />
          <circle
            cx="200"
            cy="120"
            r="80"
            className="fill-accent-500/10 stroke-accent-500"
            strokeWidth="2.5"
          />
          <text x="70" y="60" className="fill-brand-600 font-math font-bold" fontSize="18">A</text>
          <text x="250" y="60" className="fill-accent-600 font-math font-bold" fontSize="18">B</text>

          <RegionElements els={aOnly} cx={85} cy={120} inResult={inResult} />
          <RegionElements els={inter} cx={160} cy={120} inResult={inResult} />
          <RegionElements els={bOnly} cx={235} cy={120} inResult={inResult} />
          <RegionElements els={outside} cx={160} cy={215} inResult={inResult} spread />
        </svg>
        <p className="mt-2 text-center text-xs text-ink-400">
          Yashil elementlar — natijaga kiruvchi elementlar
        </p>
      </div>
    </div>
  );
}

function RegionElements({
  els,
  cx,
  cy,
  inResult,
  spread,
}: {
  els: SetEl[];
  cx: number;
  cy: number;
  inResult: (el: SetEl) => boolean;
  spread?: boolean;
}) {
  return (
    <>
      {els.map((el, i) => {
        const cols = spread ? els.length : 2;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = cx + (col - (cols - 1) / 2) * 26;
        const y = cy + row * 26 - (spread ? 0 : 12);
        const active = inResult(el);
        return (
          <motion.g
            key={String(el)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <motion.circle
              cx={x}
              cy={y}
              r="11"
              animate={{
                fill: active ? "#10b981" : "#94a3b8",
              }}
              transition={{ duration: 0.4 }}
            />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fontSize="11"
              className="fill-white font-bold"
            >
              {String(el)}
            </text>
          </motion.g>
        );
      })}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  color,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  color: "brand" | "accent" | "ink";
}) {
  const ring =
    color === "brand"
      ? "focus:border-brand-500 focus:ring-brand-300"
      : color === "accent"
        ? "focus:border-accent-500 focus:ring-accent-300"
        : "focus:border-ink-500 focus:ring-ink-300";
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-ink-300 bg-white px-3 py-2 font-math outline-none focus:ring-2 dark:border-ink-700 dark:bg-ink-800 ${ring}`}
        placeholder="masalan: 1, 2, 3"
      />
    </div>
  );
}
