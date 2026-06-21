import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Question } from "../types";
import { sameSet, parseSet } from "../lib/sets";
import MathText from "./MathText";
import ProgressBar from "./ProgressBar";

interface QuizProps {
  questions: Question[];
  title?: string;
  /** called with percent (0..100) and list of failed question prompts (weak topics) */
  onComplete?: (percent: number, weak: string[]) => void;
  /** instant feedback shows explanation right after answering */
  instantFeedback?: boolean;
  /** optional action button shown on the results screen */
  onExit?: () => void;
  exitLabel?: string;
}

function isCorrect(q: Question, response: number[] | string): boolean {
  if (q.type === "input") {
    const ans = q.answer as string;
    const given = String(response).trim();
    // set-aware comparison when answer looks like a set
    if (/[{},]/.test(ans) || /[{},]/.test(given)) {
      return sameSet(parseSet(given), parseSet(ans));
    }
    return given.toLowerCase().replace(/\s+/g, "") === ans.toLowerCase().replace(/\s+/g, "");
  }
  const sel = (response as number[]) ?? [];
  if (q.type === "multiple") {
    const correct = q.answer as number[];
    return (
      sel.length === correct.length && correct.every((c) => sel.includes(c))
    );
  }
  // single / truefalse
  return sel.length === 1 && sel[0] === (q.answer as number);
}

export default function Quiz({
  questions,
  title,
  onComplete,
  instantFeedback = true,
  onExit,
  exitLabel = "Davom etish",
}: QuizProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [weak, setWeak] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];
  const total = questions.length;

  const correctNow = useMemo(() => {
    if (!q) return false;
    return isCorrect(q, q.type === "input" ? textAnswer : selected);
  }, [q, selected, textAnswer]);

  if (!q) return null;

  const toggle = (i: number) => {
    if (checked) return;
    if (q.type === "multiple") {
      setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
    } else {
      setSelected([i]);
    }
  };

  const check = () => {
    if (checked) return;
    setChecked(true);
    if (correctNow) setScore((s) => s + 1);
    else setWeak((w) => [...w, q.prompt]);
  };

  const next = () => {
    if (idx + 1 >= total) {
      const percent = Math.round((score / total) * 100);
      setFinished(true);
      onComplete?.(percent, weak);
    } else {
      setIdx((i) => i + 1);
      setSelected([]);
      setTextAnswer("");
      setChecked(false);
    }
  };

  if (finished) {
    const percent = Math.round((score / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center"
      >
        <div className="mb-2 text-5xl">
          {percent >= 80 ? "🎉" : percent >= 50 ? "👍" : "💪"}
        </div>
        <h3 className="text-xl font-bold">
          {percent >= 80
            ? "Ajoyib natija!"
            : percent >= 50
              ? "Yaxshi, davom eting!"
              : "Mashq qilishda davom eting!"}
        </h3>
        <p className="mt-1 text-ink-500 dark:text-ink-400">
          {total} ta savoldan {score} tasi to'g'ri
        </p>
        <div className="mx-auto mt-4 max-w-xs">
          <ProgressBar value={percent / 100} showLabel />
        </div>
        {onExit && (
          <button onClick={onExit} className="btn-primary mt-5">
            {exitLabel}
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
          {title ?? "Savol"} · {idx + 1}/{total}
        </span>
        <span className="text-xs font-medium text-ink-400">
          Daraja {q.level}
        </span>
      </div>
      <ProgressBar value={(idx + (checked ? 1 : 0)) / total} height={6} />

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="mt-5"
        >
          <h3 className="text-lg font-semibold leading-snug">{q.prompt}</h3>
          {q.expression && (
            <MathText block className="my-3 text-brand-600 dark:text-brand-300">
              {q.expression}
            </MathText>
          )}

          {q.type === "input" ? (
            <input
              type="text"
              value={textAnswer}
              disabled={checked}
              onChange={(e) => setTextAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder="Javobingiz, masalan: {1, 2, 3}"
              className="mt-4 w-full rounded-xl border border-ink-300 bg-white px-4 py-3 font-math text-lg outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-300 dark:border-ink-700 dark:bg-ink-800"
            />
          ) : (
            <div className="mt-4 grid gap-2.5">
              {q.options?.map((opt, i) => {
                const isSel = selected.includes(i);
                const showState = checked && instantFeedback;
                const correctOption =
                  q.type === "multiple"
                    ? (q.answer as number[]).includes(i)
                    : (q.answer as number) === i;
                let cls =
                  "border-ink-200 bg-white hover:border-brand-400 dark:border-ink-700 dark:bg-ink-800";
                if (showState && correctOption)
                  cls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30";
                else if (showState && isSel && !correctOption)
                  cls = "border-rose-500 bg-rose-50 dark:bg-rose-900/30";
                else if (isSel)
                  cls = "border-brand-500 bg-brand-50 dark:bg-brand-900/30";
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    disabled={checked}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${cls}`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                        q.type === "multiple" ? "rounded-md" : ""
                      } ${isSel ? "border-brand-500 bg-brand-500 text-white" : "border-ink-300 dark:border-ink-600"}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <MathText>{opt}</MathText>
                  </button>
                );
              })}
            </div>
          )}

          <AnimatePresence>
            {checked && instantFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-4 overflow-hidden rounded-xl border-l-4 p-4 text-sm ${
                  correctNow
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                }`}
              >
                <p className="mb-1 font-bold">
                  {correctNow ? "✅ To'g'ri!" : "❌ Noto'g'ri"}
                </p>
                <p className="text-ink-600 dark:text-ink-300">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex justify-end gap-2">
            {!checked ? (
              <button
                onClick={check}
                disabled={q.type === "input" ? !textAnswer.trim() : selected.length === 0}
                className="btn-primary"
              >
                Tekshirish
              </button>
            ) : (
              <button onClick={next} className="btn-primary">
                {idx + 1 >= total ? "Yakunlash" : "Keyingi savol"}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
