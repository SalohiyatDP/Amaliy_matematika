// ----- Curriculum domain types -----

export type LessonBlock =
  | { type: "text"; value: string }
  | { type: "heading"; value: string }
  | { type: "formula"; value: string; caption?: string }
  | { type: "example"; title: string; body: string }
  | { type: "tip"; value: string }
  | { type: "warning"; value: string }
  | { type: "venn"; preset: VennPreset; caption?: string }
  | { type: "list"; items: string[]; ordered?: boolean };

export type VennPreset =
  | "union"
  | "intersection"
  | "difference"
  | "complement"
  | "symmetric"
  | "subset"
  | "disjoint"
  | "three-union"
  | "three-intersection";

export type QuestionType = "single" | "multiple" | "truefalse" | "input";

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  /** Optional formula / math expression shown under prompt */
  expression?: string;
  options?: string[];
  /** index(es) into options, or string for input answers */
  answer: number | number[] | string;
  explanation: string;
  /** difficulty 1..6 maps to learning levels */
  level: number;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  blocks: LessonBlock[];
  quiz: Question[];
  xp: number;
}

export interface Module {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  level: number; // primary target level 1..6
  lessons: Lesson[];
  test: Question[]; // chapter test
}

// ----- Gamification & progress types -----

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** predicate key resolved in gamification logic */
  condition: string;
}

export interface LessonProgress {
  completed: boolean;
  quizScore: number; // 0..100
  bestQuizScore: number;
  attempts: number;
  lastVisited: number | null;
}

export interface ModuleProgress {
  testScore: number; // best 0..100
  testAttempts: number;
}

export interface ExamResult {
  id: string;
  title: string;
  score: number;
  total: number;
  percent: number;
  date: number;
  weakTopics: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string; // emoji
  createdAt: number;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDay: string | null; // YYYY-MM-DD
}

export interface AppState {
  profile: UserProfile | null;
  theme: "light" | "dark";
  xp: number;
  studySeconds: number;
  lessons: Record<string, LessonProgress>;
  modules: Record<string, ModuleProgress>;
  badges: string[]; // earned badge ids
  exams: ExamResult[];
  streak: StreakState;
  lastSync: number;
}

export interface LevelInfo {
  level: number;
  title: string;
  currentXp: number;
  neededXp: number;
  totalForLevel: number;
  progress: number; // 0..1
}
