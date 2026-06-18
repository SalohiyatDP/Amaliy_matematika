import { useState } from "react";
import { useApp } from "../context/AppContext";
import { exportState } from "../lib/storage";
import { curriculum, totalLessons } from "../data/curriculum";

export default function Profile() {
  const { state, levelInfo, resetProgress } = useApp();
  const [confirm, setConfirm] = useState(false);

  const completed = Object.values(state.lessons).filter((l) => l.completed).length;
  const studyMin = Math.round(state.studySeconds / 60);

  const download = () => {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "toplamlar-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">👤 Profil</h1>

      <div className="card flex flex-wrap items-center gap-4">
        <span className="text-6xl">{state.profile?.avatar}</span>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{state.profile?.name}</h2>
          {state.profile?.email && (
            <p className="text-sm text-ink-400">{state.profile.email}</p>
          )}
          <p className="mt-1 text-sm text-brand-600 dark:text-brand-300">
            {levelInfo.title} · Daraja {levelInfo.level} · {state.xp} XP
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="XP" value={String(state.xp)} />
        <Stat label="Darslar" value={`${completed}/${totalLessons}`} />
        <Stat label="Nishonlar" value={String(state.badges.length)} />
        <Stat label="O'qish (daq)" value={String(studyMin)} />
        <Stat label="Seriya" value={`${state.streak.current} 🔥`} />
        <Stat label="Eng uzun seriya" value={String(state.streak.longest)} />
        <Stat label="Imtihonlar" value={String(state.exams.length)} />
        <Stat
          label="Modul testlari"
          value={`${Object.values(state.modules).filter((m) => m.testScore >= 70).length}/${curriculum.length}`}
        />
      </div>

      <div className="card">
        <h2 className="mb-2 text-lg font-bold">Ma'lumotlar boshqaruvi</h2>
        <p className="text-sm text-ink-500 dark:text-ink-400">
          Progress brauzeringizda (localStorage) saqlanadi — offline ishlaydi. Boshqa
          qurilmaga ko'chirish uchun zaxira faylini yuklab oling.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={download} className="btn-secondary">
            ⬇️ Progressni eksport qilish
          </button>
          {!confirm ? (
            <button onClick={() => setConfirm(true)} className="btn-ghost text-rose-500">
              🗑️ Progressni tozalash
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-rose-500">Ishonchingiz komilmi?</span>
              <button
                onClick={() => {
                  resetProgress();
                  setConfirm(false);
                }}
                className="btn bg-rose-500 text-white hover:bg-rose-600"
              >
                Ha, tozalash
              </button>
              <button onClick={() => setConfirm(false)} className="btn-ghost">
                Bekor
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-ink-400">
        To'plamlar Akademiyasi · oxirgi saqlash:{" "}
        {new Date(state.lastSync).toLocaleString("uz")}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-xs text-ink-400">{label}</p>
    </div>
  );
}
