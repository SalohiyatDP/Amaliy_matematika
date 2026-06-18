import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { curriculum } from "../data/curriculum";
import Quiz from "../components/Quiz";
import Certificate from "../components/Certificate";
import type { Question } from "../types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildExam(): Question[] {
  const pool: Question[] = [];
  for (const m of curriculum) {
    pool.push(...m.test);
    for (const l of m.lessons) pool.push(...l.quiz);
  }
  return shuffle(pool).slice(0, 12);
}

export default function Exam() {
  const { state, recordExam } = useApp();
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<{ percent: number; weak: string[] } | null>(
    null
  );
  const questions = useMemo(() => (started ? buildExam() : []), [started]);

  const completedLessons = Object.values(state.lessons).filter(
    (l) => l.completed
  ).length;

  const lastFinal = state.exams.find((e) => e.id.startsWith("final"));

  if (result) {
    const passed = result.percent >= 80;
    return (
      <div className="space-y-6">
        <div className="card text-center">
          <div className="text-6xl">{passed ? "🎓" : "📚"}</div>
          <h1 className="mt-2 text-2xl font-extrabold">
            {passed ? "Tabriklaymiz! Imtihondan o'tdingiz" : "Yana bir bor urinib ko'ring"}
          </h1>
          <p className="mt-1 text-ink-500 dark:text-ink-400">
            Natijangiz: <span className="font-bold text-brand-600">{result.percent}%</span>{" "}
            (o'tish balli: 80%)
          </p>
          {result.weak.length > 0 && (
            <div className="mx-auto mt-4 max-w-md rounded-xl bg-amber-50 p-4 text-left text-sm dark:bg-amber-900/15">
              <p className="mb-2 font-bold text-amber-700 dark:text-amber-300">
                🔍 Zaif tomonlar (takrorlang):
              </p>
              <ul className="ml-4 list-disc space-y-1 text-ink-600 dark:text-ink-300">
                {result.weak.slice(0, 5).map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => {
              setResult(null);
              setStarted(false);
            }}
            className="btn-secondary mt-5"
          >
            Bosh sahifaga
          </button>
        </div>

        {passed && <Certificate name={state.profile?.name ?? "O'quvchi"} percent={result.percent} />}
      </div>
    );
  }

  if (started) {
    return (
      <div className="space-y-5">
        <h1 className="text-2xl font-extrabold">📝 Yakuniy sertifikatsiya imtihoni</h1>
        <Quiz
          title="Yakuniy imtihon"
          questions={questions}
          onComplete={(percent, weak) => {
            recordExam({
              id: `final-${Date.now()}`,
              title: "Yakuniy imtihon",
              score: Math.round((percent / 100) * questions.length),
              total: questions.length,
              percent,
              weakTopics: weak,
            });
            setResult({ percent, weak });
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">📝 Imtihonlar</h1>
        <p className="text-ink-500 dark:text-ink-400">
          Bilimingizni sinab ko'ring va sertifikat oling.
        </p>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold">🎓 Yakuniy sertifikatsiya imtihoni</h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Barcha modullardan 12 ta tasodifiy savol. O'tish balli — 80%. Muvaffaqiyatli
          topshirsangiz, sertifikat olasiz.
        </p>
        <ul className="mt-3 space-y-1 text-sm text-ink-600 dark:text-ink-300">
          <li>• Savollar soni: 12</li>
          <li>• Tugatilgan darslar: {completedLessons}</li>
          <li>• Avtomatik baholash va zaiflik tahlili</li>
        </ul>
        {completedLessons < 5 && (
          <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/15 dark:text-amber-300">
            💡 Imtihondan oldin kamida bir nechta modulni o'rganish tavsiya etiladi.
          </div>
        )}
        <button onClick={() => setStarted(true)} className="btn-primary mt-4">
          Imtihonni boshlash
        </button>
      </div>

      {state.exams.length > 0 && (
        <div className="card">
          <h2 className="mb-3 text-lg font-bold">Oldingi natijalar</h2>
          <div className="space-y-2">
            {state.exams.slice(0, 8).map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-xl border border-ink-200 px-4 py-2.5 text-sm dark:border-ink-700"
              >
                <span>{new Date(e.date).toLocaleDateString("uz")}</span>
                <span
                  className={`font-bold ${
                    e.percent >= 80 ? "text-emerald-500" : "text-amber-500"
                  }`}
                >
                  {e.percent}% ({e.score}/{e.total})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {lastFinal && lastFinal.percent >= 80 && (
        <Certificate name={state.profile?.name ?? "O'quvchi"} percent={lastFinal.percent} />
      )}
    </div>
  );
}
