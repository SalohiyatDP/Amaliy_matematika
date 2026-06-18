import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { curriculum } from "../data/curriculum";
import ProgressBar from "../components/ProgressBar";

export default function Modules() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Modullar</h1>
        <p className="text-ink-500 dark:text-ink-400">
          8 modul · 0 dan professional darajagacha bosqichma-bosqich
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {curriculum.map((m, i) => {
          const done = m.lessons.filter((l) => state.lessons[l.id]?.completed).length;
          const progress = done / m.lessons.length;
          const testScore = state.modules[m.id]?.testScore ?? 0;
          const prevModule = i > 0 ? curriculum[i - 1] : null;
          const prevDone = prevModule
            ? prevModule.lessons.every((l) => state.lessons[l.id]?.completed)
            : true;
          const locked = !prevDone && progress === 0;

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={locked ? "#" : `/modules/${m.id}`}
                onClick={(e) => locked && e.preventDefault()}
                className={`card block h-full transition-all ${
                  locked
                    ? "cursor-not-allowed opacity-60"
                    : "hover:-translate-y-1 hover:shadow-glow"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${m.color} text-2xl text-white`}
                  >
                    {m.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="chip bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300">
                      Modul {m.index}
                    </span>
                    {locked && <span className="text-xs text-ink-400">🔒 Qulflangan</span>}
                    {progress === 1 && <span className="text-xs text-emerald-500">✓ Tugatilgan</span>}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-bold">{m.title}</h3>
                <p className="text-sm text-ink-500 dark:text-ink-400">{m.subtitle}</p>
                <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
                  {m.description}
                </p>
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs text-ink-400">
                    <span>{done}/{m.lessons.length} dars</span>
                    {testScore > 0 && <span>Test: {testScore}%</span>}
                  </div>
                  <ProgressBar value={progress} height={8} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
