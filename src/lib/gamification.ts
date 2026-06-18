import type { AppState, LevelInfo } from "../types";

/** Level titles in Uzbek mapped to mastery ranks. */
export const LEVEL_TITLES = [
  "Yangi boshlovchi", // 1
  "Boshlang'ich", // 2
  "O'rta daraja", // 3
  "Ilg'or", // 4
  "Ekspert", // 5
  "Professional", // 6
  "Magistr", // 7
  "Buyuk ustoz", // 8+
];

/** XP needed to reach the *start* of a given level (1-indexed). Quadratic curve. */
export function xpForLevel(level: number): number {
  // level 1 -> 0, level 2 -> 100, level 3 -> 280, ...
  if (level <= 1) return 0;
  let total = 0;
  for (let l = 1; l < level; l++) {
    total += 60 + l * 40;
  }
  return total;
}

export function getLevelInfo(xp: number): LevelInfo {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const totalForLevel = next - base;
  const currentXp = xp - base;
  const neededXp = totalForLevel - currentXp;
  const titleIdx = Math.min(level - 1, LEVEL_TITLES.length - 1);
  return {
    level,
    title: LEVEL_TITLES[titleIdx],
    currentXp,
    neededXp,
    totalForLevel,
    progress: totalForLevel === 0 ? 1 : currentXp / totalForLevel,
  };
}

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (s: AppState) => boolean;
}

const completedLessons = (s: AppState) =>
  Object.values(s.lessons).filter((l) => l.completed).length;

const perfectQuizzes = (s: AppState) =>
  Object.values(s.lessons).filter((l) => l.bestQuizScore >= 100).length;

export const BADGES: BadgeDef[] = [
  {
    id: "first-step",
    name: "Birinchi qadam",
    description: "Birinchi darsni yakunlang",
    icon: "🌱",
    check: (s) => completedLessons(s) >= 1,
  },
  {
    id: "explorer",
    name: "Kashfiyotchi",
    description: "5 ta darsni yakunlang",
    icon: "🧭",
    check: (s) => completedLessons(s) >= 5,
  },
  {
    id: "scholar",
    name: "Bilimdon",
    description: "15 ta darsni yakunlang",
    icon: "📚",
    check: (s) => completedLessons(s) >= 15,
  },
  {
    id: "perfectionist",
    name: "Mukammallik",
    description: "5 ta testda 100% to'plang",
    icon: "💯",
    check: (s) => perfectQuizzes(s) >= 5,
  },
  {
    id: "streak-3",
    name: "Issiq boshlanish",
    description: "3 kunlik ketma-ketlik",
    icon: "🔥",
    check: (s) => s.streak.longest >= 3,
  },
  {
    id: "streak-7",
    name: "Haftalik intizom",
    description: "7 kunlik ketma-ketlik",
    icon: "⚡",
    check: (s) => s.streak.longest >= 7,
  },
  {
    id: "venn-master",
    name: "Venn ustasi",
    description: "Venn diagrammalar moduli testidan o'ting",
    icon: "🔵",
    check: (s) => (s.modules["m5"]?.testScore ?? 0) >= 70,
  },
  {
    id: "logician",
    name: "Mantiqchi",
    description: "Mantiq moduli testidan o'ting",
    icon: "🧠",
    check: (s) => (s.modules["m6"]?.testScore ?? 0) >= 70,
  },
  {
    id: "xp-500",
    name: "Kuch to'plovchi",
    description: "500 XP to'plang",
    icon: "✨",
    check: (s) => s.xp >= 500,
  },
  {
    id: "xp-1500",
    name: "Bilim ummoni",
    description: "1500 XP to'plang",
    icon: "🌟",
    check: (s) => s.xp >= 1500,
  },
  {
    id: "graduate",
    name: "Bitiruvchi",
    description: "Yakuniy imtihondan 80%+ oling",
    icon: "🎓",
    check: (s) => s.exams.some((e) => e.id.startsWith("final") && e.percent >= 80),
  },
  {
    id: "professional",
    name: "Professional",
    description: "Barcha modullarni 70%+ bilan yakunlang",
    icon: "🏆",
    check: (s) => {
      const ids = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"];
      return ids.every((id) => (s.modules[id]?.testScore ?? 0) >= 70);
    },
  },
];

/** Returns ids of badges that are newly earned (not already in state.badges). */
export function evaluateBadges(state: AppState): string[] {
  return BADGES.filter((b) => b.check(state) && !state.badges.includes(b.id)).map(
    (b) => b.id
  );
}
