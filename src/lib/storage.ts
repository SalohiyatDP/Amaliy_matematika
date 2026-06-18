import type { AppState } from "../types";

const STORAGE_KEY = "toplamlar-akademiyasi:v1";

export const defaultState: AppState = {
  profile: null,
  theme: "light",
  xp: 0,
  studySeconds: 0,
  lessons: {},
  modules: {},
  badges: [],
  exams: [],
  streak: { current: 0, longest: 0, lastActiveDay: null },
  lastSync: Date.now(),
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw) as Partial<AppState>;
    // Merge with defaults so new fields don't break older saves (sync-friendly)
    return {
      ...defaultState,
      ...parsed,
      streak: { ...defaultState.streak, ...(parsed.streak ?? {}) },
      lessons: parsed.lessons ?? {},
      modules: parsed.modules ?? {},
      badges: parsed.badges ?? [],
      exams: parsed.exams ?? [],
    };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, lastSync: Date.now() })
    );
  } catch {
    // storage might be unavailable (private mode) — fail silently, app still works in-memory
  }
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00Z").getTime();
  const db = new Date(b + "T00:00:00Z").getTime();
  return Math.round((db - da) / 86_400_000);
}
