import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { BADGES } from "../lib/gamification";

export default function Achievements() {
  const { state } = useApp();
  const earned = new Set(state.badges);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">🏅 Yutuqlar</h1>
        <p className="text-ink-500 dark:text-ink-400">
          {earned.size}/{BADGES.length} nishon qo'lga kiritildi
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {BADGES.map((b, i) => {
          const has = earned.has(b.id);
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`card text-center transition-all ${
                has ? "border-brand-400 shadow-glow" : "opacity-60 grayscale"
              }`}
            >
              <div className="text-4xl">{has ? b.icon : "🔒"}</div>
              <p className="mt-2 text-sm font-bold">{b.name}</p>
              <p className="mt-1 text-xs text-ink-400">{b.description}</p>
              {has && (
                <span className="chip mt-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                  ✓ Olingan
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
