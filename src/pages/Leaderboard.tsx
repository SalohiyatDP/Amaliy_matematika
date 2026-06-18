import { useApp } from "../context/AppContext";
import { getLevelInfo } from "../lib/gamification";

// Simulyatsiya qilingan reyting — backend ulanmaguncha namuna ma'lumotlar.
const BOTS = [
  { name: "Dilnoza", avatar: "🦄", xp: 2150 },
  { name: "Jasur", avatar: "🦁", xp: 1840 },
  { name: "Madina", avatar: "🦉", xp: 1620 },
  { name: "Bekzod", avatar: "🐯", xp: 1280 },
  { name: "Nilufar", avatar: "🐼", xp: 990 },
  { name: "Sardor", avatar: "🐧", xp: 720 },
  { name: "Kamola", avatar: "🦊", xp: 540 },
  { name: "Umid", avatar: "🐙", xp: 360 },
];

export default function Leaderboard() {
  const { state } = useApp();
  const me = {
    name: state.profile?.name ?? "Siz",
    avatar: state.profile?.avatar ?? "🤓",
    xp: state.xp,
    isMe: true,
  };

  const all = [...BOTS.map((b) => ({ ...b, isMe: false })), me].sort(
    (a, b) => b.xp - a.xp
  );
  const myRank = all.findIndex((u) => "isMe" in u && u.isMe) + 1;

  const medal = (i: number) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">📈 Reyting</h1>
        <p className="text-ink-500 dark:text-ink-400">
          Sizning o'rningiz: <strong>{myRank}-o'rin</strong> ({state.xp} XP)
        </p>
      </div>

      <div className="card divide-y divide-ink-100 dark:divide-ink-800">
        {all.map((u, i) => {
          const info = getLevelInfo(u.xp);
          return (
            <div
              key={u.name + i}
              className={`flex items-center gap-4 py-3 ${
                u.isMe ? "rounded-xl bg-brand-50 px-3 dark:bg-brand-900/20" : ""
              }`}
            >
              <span className="w-8 text-center text-lg font-bold">{medal(i)}</span>
              <span className="text-2xl">{u.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="font-bold">
                  {u.name} {u.isMe && <span className="text-brand-500">(siz)</span>}
                </p>
                <p className="text-xs text-ink-400">
                  Daraja {info.level} · {info.title}
                </p>
              </div>
              <span className="font-bold text-brand-600 dark:text-brand-300">
                {u.xp} XP
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-ink-400">
        * Reyting namuna ma'lumotlardan iborat. Backend ulangach real foydalanuvchilar ko'rsatiladi.
      </p>
    </div>
  );
}
