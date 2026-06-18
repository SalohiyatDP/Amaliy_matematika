import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AppState, ExamResult, UserProfile } from "../types";
import {
  defaultState,
  loadState,
  saveState,
  clearState,
  todayKey,
  daysBetween,
} from "../lib/storage";
import { evaluateBadges, getLevelInfo } from "../lib/gamification";

interface RecordLessonArgs {
  lessonId: string;
  moduleId: string;
  quizScore: number; // 0..100
  baseXp: number;
}

interface AppContextValue {
  state: AppState;
  levelInfo: ReturnType<typeof getLevelInfo>;
  /** newly earned badges to surface as a celebration toast */
  newBadges: string[];
  clearNewBadges: () => void;
  setProfile: (profile: UserProfile) => void;
  toggleTheme: () => void;
  recordLesson: (args: RecordLessonArgs) => { gainedXp: number };
  recordModuleTest: (moduleId: string, percent: number) => void;
  recordExam: (result: Omit<ExamResult, "date">) => void;
  addStudyTime: (seconds: number) => void;
  resetProgress: () => void;
  markActiveToday: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());
  const [newBadges, setNewBadges] = useState<string[]>([]);

  // Persist on every change (offline progress saving + sync timestamp)
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  // Helper: run badge evaluation after a state mutation
  const withBadges = useCallback((next: AppState): AppState => {
    const earned = evaluateBadges(next);
    if (earned.length > 0) {
      setNewBadges((prev) => [...prev, ...earned]);
      return { ...next, badges: [...next.badges, ...earned] };
    }
    return next;
  }, []);

  const updateStreak = useCallback((s: AppState): AppState => {
    const today = todayKey();
    const last = s.streak.lastActiveDay;
    if (last === today) return s;
    let current = s.streak.current;
    if (last && daysBetween(last, today) === 1) current += 1;
    else current = 1;
    const longest = Math.max(s.streak.longest, current);
    return { ...s, streak: { current, longest, lastActiveDay: today } };
  }, []);

  const setProfile = useCallback((profile: UserProfile) => {
    setState((s) => withBadges(updateStreak({ ...s, profile })));
  }, [withBadges, updateStreak]);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  }, []);

  const recordLesson = useCallback(
    ({ lessonId, moduleId, quizScore, baseXp }: RecordLessonArgs) => {
      let gained = 0;
      setState((s) => {
        const prev = s.lessons[lessonId];
        const firstTime = !prev?.completed;
        const bestQuizScore = Math.max(prev?.bestQuizScore ?? 0, quizScore);
        // XP: full base on first completion, plus bonus for quiz quality; small replay reward
        const quizBonus = Math.round((quizScore / 100) * baseXp * 0.5);
        gained = firstTime ? baseXp + quizBonus : Math.round(baseXp * 0.1);

        const lessons = {
          ...s.lessons,
          [lessonId]: {
            completed: true,
            quizScore,
            bestQuizScore,
            attempts: (prev?.attempts ?? 0) + 1,
            lastVisited: Date.now(),
          },
        };
        const modules = {
          ...s.modules,
          [moduleId]: s.modules[moduleId] ?? { testScore: 0, testAttempts: 0 },
        };
        const next: AppState = {
          ...s,
          lessons,
          modules,
          xp: s.xp + gained,
        };
        return withBadges(updateStreak(next));
      });
      return { gainedXp: gained };
    },
    [withBadges, updateStreak]
  );

  const recordModuleTest = useCallback(
    (moduleId: string, percent: number) => {
      setState((s) => {
        const prev = s.modules[moduleId] ?? { testScore: 0, testAttempts: 0 };
        const improved = percent > prev.testScore;
        const bonus = improved ? Math.round((percent / 100) * 80) : 5;
        const next: AppState = {
          ...s,
          xp: s.xp + bonus,
          modules: {
            ...s.modules,
            [moduleId]: {
              testScore: Math.max(prev.testScore, percent),
              testAttempts: prev.testAttempts + 1,
            },
          },
        };
        return withBadges(updateStreak(next));
      });
    },
    [withBadges, updateStreak]
  );

  const recordExam = useCallback(
    (result: Omit<ExamResult, "date">) => {
      setState((s) => {
        const exam: ExamResult = { ...result, date: Date.now() };
        const bonus = Math.round((result.percent / 100) * 150);
        const next: AppState = {
          ...s,
          xp: s.xp + bonus,
          exams: [exam, ...s.exams].slice(0, 50),
        };
        return withBadges(updateStreak(next));
      });
    },
    [withBadges, updateStreak]
  );

  // Throttled study-time accumulation
  const studyBuffer = useRef(0);
  const addStudyTime = useCallback((seconds: number) => {
    studyBuffer.current += seconds;
    if (studyBuffer.current >= 5) {
      const add = studyBuffer.current;
      studyBuffer.current = 0;
      setState((s) => ({ ...s, studySeconds: s.studySeconds + add }));
    }
  }, []);

  const resetProgress = useCallback(() => {
    clearState();
    setState((s) => ({ ...defaultState, profile: s.profile, theme: s.theme }));
    setNewBadges([]);
  }, []);

  const markActiveToday = useCallback(() => {
    setState((s) => withBadges(updateStreak(s)));
  }, [withBadges, updateStreak]);

  const clearNewBadges = useCallback(() => setNewBadges([]), []);

  const levelInfo = useMemo(() => getLevelInfo(state.xp), [state.xp]);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      levelInfo,
      newBadges,
      clearNewBadges,
      setProfile,
      toggleTheme,
      recordLesson,
      recordModuleTest,
      recordExam,
      addStudyTime,
      resetProgress,
      markActiveToday,
    }),
    [
      state,
      levelInfo,
      newBadges,
      clearNewBadges,
      setProfile,
      toggleTheme,
      recordLesson,
      recordModuleTest,
      recordExam,
      addStudyTime,
      resetProgress,
      markActiveToday,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
