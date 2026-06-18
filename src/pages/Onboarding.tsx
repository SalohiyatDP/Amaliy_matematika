import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import VennDiagram from "../components/VennDiagram";

const AVATARS = ["🦊", "🐼", "🦉", "🐯", "🦁", "🐧", "🦄", "🐙", "🤓", "🧑‍🎓"];

export default function Onboarding() {
  const { setProfile, state, toggleTheme } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setProfile({
      name: name.trim(),
      email: email.trim(),
      avatar,
      createdAt: Date.now(),
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ink-50 to-brand-50 dark:from-ink-950 dark:to-brand-950">
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-[size:32px_32px] opacity-50" />
      <button
        onClick={toggleTheme}
        className="btn-secondary absolute right-4 top-4 z-10 px-3"
      >
        {state.theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-2">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center lg:text-left"
        >
          <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
            🎓 0 dan professional darajagacha
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            <span className="gradient-text">To'plamlar</span> nazariyasini
            interaktiv o'rganing
          </h1>
          <p className="mt-4 text-lg text-ink-600 dark:text-ink-300">
            Venn diagrammalari, jonli mashqlar, gamifikatsiya va AI repetitor
            bilan to'plamlar ustida amallarni mukammal egallang.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            {["8 modul", "Venn diagrammalar", "XP & nishonlar", "Offline rejim"].map(
              (f) => (
                <span
                  key={f}
                  className="chip border border-ink-200 bg-white text-ink-600 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300"
                >
                  ✦ {f}
                </span>
              )
            )}
          </div>
          <div className="mx-auto mt-8 max-w-sm lg:mx-0">
            <VennDiagram preset="intersection" />
          </div>
        </motion.div>

        {/* Registration card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mx-auto w-full max-w-md"
        >
          <h2 className="text-2xl font-bold">Boshlaymizmi?</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Profilingizni yarating — progress qurilmangizda saqlanadi (offline).
          </p>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold">Ismingiz</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Salohiyat"
                className="w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-300 dark:border-ink-700 dark:bg-ink-800"
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">
                Email <span className="font-normal text-ink-400">(ixtiyoriy)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-300 dark:border-ink-700 dark:bg-ink-800"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Avatar tanlang</label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => setAvatar(a)}
                    className={`grid h-11 w-11 place-items-center rounded-xl border-2 text-2xl transition-all ${
                      avatar === a
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                        : "border-ink-200 dark:border-ink-700"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={!name.trim()} className="btn-primary w-full">
              O'rganishni boshlash 🚀
            </button>
            <p className="text-center text-xs text-ink-400">
              Hisob ma'lumotlari faqat brauzeringizda saqlanadi.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
