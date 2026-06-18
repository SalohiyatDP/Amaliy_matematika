import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DragItem {
  id: string;
  label: string;
  correctBin: string;
}

interface Bin {
  id: string;
  label: string;
  hint?: string;
}

interface DragDropSortProps {
  title?: string;
  instruction: string;
  items: DragItem[];
  bins: Bin[];
  onSolved?: () => void;
}

export default function DragDropSort({
  title,
  instruction,
  items,
  bins,
  onSolved,
}: DragDropSortProps) {
  const [placement, setPlacement] = useState<Record<string, string | null>>(
    () => Object.fromEntries(items.map((i) => [i.id, null]))
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const pool = useMemo(
    () => items.filter((i) => placement[i.id] === null),
    [items, placement]
  );

  const allPlaced = pool.length === 0;
  const allCorrect = useMemo(
    () => items.every((i) => placement[i.id] === i.correctBin),
    [items, placement]
  );

  const drop = (binId: string | null) => {
    if (!dragging) return;
    setPlacement((p) => ({ ...p, [dragging]: binId }));
    setChecked(false);
    setDragging(null);
  };

  const check = () => {
    setChecked(true);
    if (allCorrect) onSolved?.();
  };

  const reset = () => {
    setPlacement(Object.fromEntries(items.map((i) => [i.id, null])));
    setChecked(false);
  };

  return (
    <div className="card">
      {title && <h3 className="mb-1 text-lg font-bold">{title}</h3>}
      <p className="mb-4 text-sm text-ink-500 dark:text-ink-400">{instruction}</p>

      {/* Pool */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => drop(null)}
        className="mb-4 flex min-h-[56px] flex-wrap gap-2 rounded-xl border-2 border-dashed border-ink-200 p-3 dark:border-ink-700"
      >
        <AnimatePresence>
          {pool.length === 0 && (
            <span className="text-sm text-ink-400">Barcha elementlar joylashtirildi</span>
          )}
          {pool.map((it) => (
            <Chip
              key={it.id}
              item={it}
              onDragStart={() => setDragging(it.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Bins */}
      <div className="grid gap-3 sm:grid-cols-2">
        {bins.map((bin) => {
          const inBin = items.filter((i) => placement[i.id] === bin.id);
          return (
            <div
              key={bin.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => drop(bin.id)}
              className="rounded-xl border-2 border-ink-200 bg-ink-50 p-3 transition-colors dark:border-ink-700 dark:bg-ink-800/50"
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-math text-base font-bold text-brand-600 dark:text-brand-300">
                  {bin.label}
                </span>
                {bin.hint && (
                  <span className="text-xs text-ink-400">{bin.hint}</span>
                )}
              </div>
              <div className="flex min-h-[44px] flex-wrap gap-2">
                {inBin.map((it) => {
                  const ok = it.correctBin === bin.id;
                  return (
                    <Chip
                      key={it.id}
                      item={it}
                      state={checked ? (ok ? "ok" : "bad") : undefined}
                      onDragStart={() => setDragging(it.id)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={reset} className="btn-ghost text-sm">
          Qayta boshlash
        </button>
        <button onClick={check} disabled={!allPlaced} className="btn-primary">
          Tekshirish
        </button>
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 rounded-xl p-3 text-sm font-semibold ${
              allCorrect
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
            }`}
          >
            {allCorrect
              ? "🎉 Barchasi to'g'ri joylashtirildi!"
              : "Ba'zi elementlar noto'g'ri. Qizil belgilarni to'g'rilang."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({
  item,
  state,
  onDragStart,
}: {
  item: DragItem;
  state?: "ok" | "bad";
  onDragStart: () => void;
}) {
  const color =
    state === "ok"
      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40"
      : state === "bad"
        ? "border-rose-500 bg-rose-50 dark:bg-rose-900/40"
        : "border-brand-300 bg-white dark:border-brand-700 dark:bg-ink-900";
  return (
    <motion.div
      layout
      draggable
      onDragStart={onDragStart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-grab select-none rounded-lg border-2 px-3 py-1.5 font-math text-sm font-semibold shadow-sm active:cursor-grabbing ${color}`}
    >
      {item.label}
    </motion.div>
  );
}
