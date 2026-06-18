import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  answerQuestion,
  generateProblem,
  checkProblem,
  type GeneratedProblem,
} from "../lib/tutor";
import MathText from "../components/MathText";
import { useApp } from "../context/AppContext";

interface Msg {
  role: "tutor" | "user";
  text: string;
  expression?: string;
}

const SUGGESTIONS = [
  "Birlashma nima?",
  "Kesishma nima?",
  "De Morgan qonunlari",
  "{1,2,3} va {2,3,4} kesishmasi",
];

export default function Tutor() {
  const { levelInfo } = useApp();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "tutor",
      text: "Salom! Men sizning AI repetitoringizman 🤖. To'plamlar haqida savol bering yoki 'Yangi masala' tugmasini bosing.",
    },
  ]);
  const [input, setInput] = useState("");
  const [problem, setProblem] = useState<GeneratedProblem | null>(null);
  const [problemInput, setProblemInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const reply = answerQuestion(text);
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "tutor", text: reply.text, expression: reply.expression },
    ]);
    setInput("");
  };

  const newProblem = () => {
    const p = generateProblem(levelInfo.level);
    setProblem(p);
    setProblemInput("");
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!problem) return;
    const ok = checkProblem(problem, problemInput);
    setFeedback(
      ok
        ? "✅ To'g'ri! Ajoyib ish."
        : `❌ Noto'g'ri. To'g'ri javob: ${setToStr(problem.answer)}`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">🤖 AI Repetitor</h1>
        <p className="text-ink-500 dark:text-ink-400">
          Savollaringizga javob beradi, xatolarni tushuntiradi va cheksiz mashq generatsiya qiladi.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat */}
        <div className="lg:col-span-2">
          <div className="card flex h-[460px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.role === "user"
                        ? "bg-brand-600 text-white"
                        : "bg-ink-100 text-ink-800 dark:bg-ink-800 dark:text-ink-100"
                    }`}
                  >
                    {m.role === "tutor" && <span className="mr-1">🤖</span>}
                    {m.text}
                    {m.expression && (
                      <MathText block className="mt-2 text-brand-600 dark:text-brand-300">
                        {m.expression}
                      </MathText>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="chip border border-ink-200 text-ink-500 hover:border-brand-400 dark:border-ink-700 dark:text-ink-300"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="mt-3 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savolingizni yozing..."
                className="flex-1 rounded-xl border border-ink-300 bg-white px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-300 dark:border-ink-700 dark:bg-ink-800"
              />
              <button type="submit" className="btn-primary">
                Yuborish
              </button>
            </form>
          </div>
        </div>

        {/* Problem generator */}
        <div className="card flex flex-col">
          <h2 className="mb-2 text-lg font-bold">🎲 Mashq generatori</h2>
          <p className="mb-3 text-sm text-ink-500 dark:text-ink-400">
            Sizning darajangizga moslangan tasodifiy masala.
          </p>
          {problem ? (
            <div className="flex flex-1 flex-col">
              <div className="rounded-xl bg-ink-50 p-3 text-sm dark:bg-ink-800/50">
                {problem.question}
              </div>
              <input
                value={problemInput}
                onChange={(e) => setProblemInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Javob: {1, 2, 3}"
                className="mt-3 w-full rounded-xl border border-ink-300 bg-white px-3 py-2 font-math outline-none focus:border-brand-500 dark:border-ink-700 dark:bg-ink-800"
              />
              {feedback && (
                <div
                  className={`mt-2 rounded-lg p-2 text-sm font-semibold ${
                    feedback.startsWith("✅")
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200"
                  }`}
                >
                  {feedback}
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <button onClick={checkAnswer} className="btn-primary flex-1">
                  Tekshirish
                </button>
                <button onClick={newProblem} className="btn-secondary">
                  Yangi
                </button>
              </div>
            </div>
          ) : (
            <button onClick={newProblem} className="btn-primary mt-auto">
              Yangi masala yaratish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function setToStr(s: (number | string)[]): string {
  return s.length === 0 ? "∅" : `{${s.join(", ")}}`;
}
