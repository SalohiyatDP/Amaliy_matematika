import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { BADGES, getLevelInfo } from "../lib/gamification";
import ProgressBar from "./ProgressBar";

const NAV = [
  { to: "/dashboard", label: "Boshqaruv paneli", icon: "🏠" },
  { to: "/modules", label: "Modullar", icon: "📚" },
  { to: "/practice", label: "Mashqxona", icon: "🧪" },
  { to: "/tutor", label: "AI Repetitor", icon: "🤖" },
  { to: "/exam", label: "Imtihon", icon: "📝" },
  { to: "/achievements", label: "Yutuqlar", icon: "🏅" },
  { to: "/leaderboard", label: "Reyting", icon: "📈" },
  { to: "/profile", label: "Profil", icon: "👤" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, toggleTheme, newBadges, clearNewBadges, addStudyTime, markActiveToday } =
    useApp();
  const location = useLocation();

  // Mark today as active when the app opens (keeps daily streak alive)
  useEffect(() => {
    markActiveToday();
  }, [markActiveToday]);

  // study-time tracker
  useEffect(() => {
    const id = setInterval(() => addStudyTime(10), 10_000);
    return () => clearInterval(id);
  }, [addStudyTime]);

  // auto-dismiss badge toast
  useEffect(() => {
    if (newBadges.length === 0) return;
    const id = setTimeout(clearNewBadges, 5000);
    return () => clearTimeout(id);
  }, [newBadges, clearNewBadges]);

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-200 bg-white/80 p-4 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/80 lg:flex">
        <Brand />
        <LevelCard />
        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
          {NAV.map((n) => (
            <NavItem key={n.to} {...n} />
          ))}
        </nav>
        <ThemeButton theme={state.theme} onToggle={toggleTheme} />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-200 bg-white/90 px-4 py-3 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/90 lg:hidden">
        <Brand compact />
        <div className="flex items-center gap-2">
          <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
            ⚡ {state.xp} XP
          </span>
          <ThemeButton theme={state.theme} onToggle={toggleTheme} compact />
        </div>
      </header>

      {/* Main */}
      <main className="min-w-0 flex-1 pb-24 lg:pb-8">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-ink-200 bg-white/95 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/95 lg:hidden">
        {NAV.slice(0, 5).map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${
                isActive ? "text-brand-600 dark:text-brand-300" : "text-ink-400"
              }`
            }
          >
            <span className="text-lg">{n.icon}</span>
            {n.label.split(" ")[0]}
          </NavLink>
        ))}
      </nav>

      {/* Badge celebration toast */}
      <AnimatePresence>
        {newBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 lg:bottom-6"
          >
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-600 to-accent-500 px-5 py-3 text-white shadow-glow">
              <span className="text-3xl">
                {BADGES.find((b) => b.id === newBadges[0])?.icon ?? "🏅"}
              </span>
              <div>
                <p className="text-xs opacity-90">Yangi nishon!</p>
                <p className="font-bold">
                  {BADGES.find((b) => b.id === newBadges[0])?.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <NavLink to="/dashboard" className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-glow">
        <span className="font-math text-lg">∪</span>
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="text-sm font-extrabold">To'plamlar</p>
          <p className="text-xs text-ink-400">Akademiyasi</p>
        </div>
      )}
      {compact && <span className="font-extrabold">To'plamlar Akademiyasi</span>}
    </NavLink>
  );
}

function LevelCard() {
  const { state } = useApp();
  const info = getLevelInfo(state.xp);
  return (
    <div className="mt-4 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 p-3 text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-90">Daraja {info.level}</span>
        <span className="text-xs font-semibold">⚡ {state.xp} XP</span>
      </div>
      <p className="text-sm font-bold">{info.title}</p>
      <div className="mt-2">
        <ProgressBar value={info.progress} height={6} color="bg-white" />
      </div>
      <p className="mt-1 text-[10px] opacity-80">
        Keyingi darajagacha {info.neededXp} XP
      </p>
      {state.streak.current > 0 && (
        <p className="mt-1 text-xs">🔥 {state.streak.current} kunlik seriya</p>
      )}
    </div>
  );
}

function NavItem({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
            : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
}

function ThemeButton({
  theme,
  onToggle,
  compact,
}: {
  theme: string;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={`btn-secondary ${compact ? "px-2.5" : "mt-2 w-full"}`}
      aria-label="Mavzuni almashtirish"
    >
      {theme === "dark" ? "☀️" : "🌙"}
      {!compact && <span>{theme === "dark" ? "Yorug' rejim" : "Qorong'i rejim"}</span>}
    </button>
  );
}
