import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { getModule } from "../data/curriculum";
import LessonBlocks from "../components/LessonBlocks";
import Quiz from "../components/Quiz";
import DragDropSort from "../components/DragDropSort";
import ProgressBar from "../components/ProgressBar";
import type { Lesson } from "../types";

type View = { kind: "list" } | { kind: "lesson"; lesson: Lesson } | { kind: "test" };

export default function ModuleDetail() {
  const { moduleId = "" } = useParams();
  const mod = getModule(moduleId);
  const navigate = useNavigate();
  const { state, recordLesson, recordModuleTest } = useApp();
  const [view, setView] = useState<View>({ kind: "list" });
  const [showQuiz, setShowQuiz] = useState(false);

  if (!mod) {
    return (
      <div className="card text-center">
        <p>Modul topilmadi.</p>
        <Link to="/modules" className="btn-primary mt-3 inline-flex">
          Modullarga qaytish
        </Link>
      </div>
    );
  }

  const done = mod.lessons.filter((l) => state.lessons[l.id]?.completed).length;
  const allDone = done === mod.lessons.length;

  // ---- Lesson view ----
  if (view.kind === "lesson") {
    const lesson = view.lesson;
    const lessonIdx = mod.lessons.findIndex((l) => l.id === lesson.id);
    const nextLesson =
      lessonIdx >= 0 && lessonIdx < mod.lessons.length - 1
        ? mod.lessons[lessonIdx + 1]
        : null;

    const goToList = () => {
      setView({ kind: "list" });
      setShowQuiz(false);
    };
    const goToNext = () => {
      if (nextLesson) {
        setView({ kind: "lesson", lesson: nextLesson });
        setShowQuiz(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        goToList();
      }
    };

    return (
      <div className="space-y-5">
        <button onClick={goToList} className="btn-ghost text-sm">
          ← {mod.title}
        </button>

        <div>
          <h1 className="text-2xl font-extrabold">{lesson.title}</h1>
          <p className="text-ink-500 dark:text-ink-400">{lesson.summary}</p>
        </div>

        {!showQuiz ? (
          <>
            <div className="card">
              <LessonBlocks blocks={lesson.blocks} />
            </div>

            {/* Interactive drag-drop for the very first lesson */}
            {lesson.id === "m1l1" && (
              <DragDropSort
                title="Interaktiv mashq: elementlarni ajrating"
                instruction="Quyidagi obyektlarni to'g'ri to'plamga torting."
                bins={[
                  { id: "even", label: "Juft sonlar to'plami", hint: "2 ga bo'linadi" },
                  { id: "odd", label: "Toq sonlar to'plami", hint: "2 ga bo'linmaydi" },
                ]}
                items={[
                  { id: "1", label: "2", correctBin: "even" },
                  { id: "2", label: "7", correctBin: "odd" },
                  { id: "3", label: "4", correctBin: "even" },
                  { id: "4", label: "9", correctBin: "odd" },
                  { id: "5", label: "6", correctBin: "even" },
                ]}
              />
            )}

            <div className="flex justify-end">
              <button onClick={() => setShowQuiz(true)} className="btn-primary">
                Mashqqa o'tish ({lesson.quiz.length} savol) →
              </button>
            </div>
          </>
        ) : (
          <Quiz
            title="Dars mashqi"
            questions={lesson.quiz}
            onComplete={(percent) =>
              recordLesson({
                lessonId: lesson.id,
                moduleId: mod.id,
                quizScore: percent,
                baseXp: lesson.xp,
              })
            }
            onExit={goToNext}
            exitLabel={nextLesson ? "Keyingi dars →" : "Modulga qaytish"}
          />
        )}
      </div>
    );
  }

  // ---- Chapter test view ----
  if (view.kind === "test") {
    return (
      <div className="space-y-5">
        <button onClick={() => setView({ kind: "list" })} className="btn-ghost text-sm">
          ← {mod.title}
        </button>
        <div>
          <h1 className="text-2xl font-extrabold">{mod.title} — Bob testi</h1>
          <p className="text-ink-500 dark:text-ink-400">
            Modulni mustahkamlash uchun {mod.test.length} savol.
          </p>
        </div>
        <Quiz
          title="Bob testi"
          questions={mod.test}
          onComplete={(percent) => recordModuleTest(mod.id, percent)}
          onExit={() => setView({ kind: "list" })}
          exitLabel="Modulga qaytish"
        />
      </div>
    );
  }

  // ---- Lesson list view ----
  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/modules")} className="btn-ghost text-sm">
        ← Orqaga
      </button>

      <div
        className={`rounded-2xl bg-gradient-to-br ${mod.color} p-6 text-white`}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{mod.icon}</span>
          <div>
            <p className="text-sm opacity-90">Modul {mod.index}</p>
            <h1 className="text-2xl font-extrabold">{mod.title}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-2xl opacity-95">{mod.description}</p>
        <div className="mt-4 max-w-sm">
          <ProgressBar value={done / mod.lessons.length} color="bg-white" />
          <p className="mt-1 text-sm opacity-90">
            {done}/{mod.lessons.length} dars tugatildi
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {mod.lessons.map((l, i) => {
          const p = state.lessons[l.id];
          return (
            <motion.button
              key={l.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setView({ kind: "lesson", lesson: l })}
              className="card flex w-full items-center gap-4 text-left transition-all hover:border-brand-400"
            >
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  p?.completed
                    ? "bg-emerald-500 text-white"
                    : "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
                }`}
              >
                {p?.completed ? "✓" : i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{l.title}</p>
                <p className="truncate text-sm text-ink-500 dark:text-ink-400">
                  {l.summary}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs font-semibold text-brand-500">+{l.xp} XP</p>
                {p?.completed && (
                  <p className="text-xs text-ink-400">{p.bestQuizScore}%</p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Chapter test */}
      <div className="card flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div>
          <h3 className="font-bold">📝 Bob testi</h3>
          <p className="text-sm text-ink-500 dark:text-ink-400">
            {allDone
              ? "Barcha darslar tugatildi — testga tayyorsiz!"
              : "Test uchun avval barcha darslarni tugatish tavsiya etiladi."}
          </p>
        </div>
        <button onClick={() => setView({ kind: "test" })} className="btn-primary shrink-0">
          Testni boshlash
        </button>
      </div>
    </div>
  );
}
