import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { curriculum, totalLessons } from "../data/curriculum";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const { state, levelInfo } = useApp();

  const completed = Object.values(state.lessons).filter((l) => l.completed).length;
  const overall = totalLessons === 0 ? 0 : completed / totalLessons;
  const studyMin = Math.round(state.studySeconds / 60);
  const avgScore = (() => {
    const scores = Object.values(state.lessons)
      .filter((l) => l.completed)
      .map((l) => l.bestQuizScore);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  })();

  // next recommended lesson
  const next = (() => {
    for (const m of curriculum) {
      for (const l of m.lessons) {
        if (!state.lessons[l.id]?.completed)
          return { moduleId: m.id, lesson: l, module: m };
      }
    }
    return null;
  })();

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{state.profile?.avatar}</span>
          <div>
            <h1 className="text-2xl font-extrabold">
              Salom, {state.profile?.name}! 👋
            </h1>
            <p className="text-ink-500 dark:text-ink-400">
              {levelInfo.title} · Daraja {levelInfo.level}
            </p>
          </div>
        </div>
        {state.streak.current > 0 && (
          <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-white">
            🔥 {state.streak.current} kun · eng uzun {state.streak.longest}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Umumiy progress" value={`${Math.round(overall * 100)}%`} icon="📊" />
        <Stat label="Tugatilgan darslar" value={`${completed}/${totalLessons}`} icon="✅" />
        <Stat label="O'rtacha ball" value={`${avgScore}%`} icon="🎯" />
        <Stat label="O'qish vaqti" value={`${studyMin} daq`} icon="⏱️" />
      </div>

      {/* Progress overview */}
      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Kurs progressi</h2>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-300">
            {Math.round(overall * 100)}%
          </span>
        </div>
        <ProgressBar value={overall} height={14} />
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {curriculum.map((m) => {
            const done = m.lessons.filter((l) => state.lessons[l.id]?.completed).length;
            return (
              <Link
                key={m.id}
                to={`/modules/${m.id}`}
                className="flex items-center gap-2 rounded-xl border border-ink-200 p-2.5 text-sm transition-colors hover:border-brand-400 dark:border-ink-700"
              >
                <span className="text-lg">{m.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{m.title}</p>
                  <p className="text-xs text-ink-400">
                    {done}/{m.lessons.length} dars
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recommendation + quick actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h2 className="mb-3 text-lg font-bold">📌 Tavsiya etilgan keyingi qadam</h2>
          {next ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-ink-400">{next.module.title}</p>
                <p className="text-lg font-bold">{next.lesson.title}</p>
                <p className="text-sm text-ink-500 dark:text-ink-400">
                  {next.lesson.summary}
                </p>
              </div>
              <Link to={`/modules/${next.moduleId}`} className="btn-primary shrink-0">
                Davom etish →
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl">🎉</p>
              <p className="font-bold">Barcha darslar tugatildi!</p>
              <Link to="/exam" className="btn-primary mt-2 inline-flex">
                Yakuniy imtihonni topshiring
              </Link>
            </div>
          )}
        </div>
        <div className="card">
          <h2 className="mb-3 text-lg font-bold">Tezkor amallar</h2>
          <div className="space-y-2">
            <Link to="/practice" className="btn-secondary w-full justify-start">
              🧪 Mashqxona
            </Link>
            <Link to="/tutor" className="btn-secondary w-full justify-start">
              🤖 AI Repetitor
            </Link>
            <Link to="/achievements" className="btn-secondary w-full justify-start">
              🏅 Yutuqlar ({state.badges.length})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
      <p className="text-xs text-ink-400">{label}</p>
    </div>
  );
}
