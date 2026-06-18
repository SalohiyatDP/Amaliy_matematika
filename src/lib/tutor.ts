import {
  union,
  intersection,
  difference,
  symmetricDifference,
  fmt,
  parseSet,
  sameSet,
  type SetEl,
} from "./sets";

export interface GeneratedProblem {
  question: string;
  expression: string;
  a: SetEl[];
  b: SetEl[];
  op: string;
  answer: SetEl[];
}

const OPS = [
  { id: "union", sym: "A ∪ B", name: "birlashma", fn: union },
  { id: "intersection", sym: "A ∩ B", name: "kesishma", fn: intersection },
  { id: "difference", sym: "A − B", name: "ayirma", fn: difference },
  { id: "symmetric", sym: "A △ B", name: "simmetrik ayirma", fn: symmetricDifference },
];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSet(size: number, pool: number): number[] {
  const s = new Set<number>();
  while (s.size < size) s.add(randInt(1, pool));
  return [...s].sort((x, y) => x - y);
}

export function generateProblem(level = 1): GeneratedProblem {
  const op = OPS[randInt(0, OPS.length - 1)];
  const size = level >= 4 ? 4 : 3;
  const a = randomSet(size, 8);
  const b = randomSet(size, 8);
  const answer = op.fn(a, b);
  return {
    question: `A = ${fmt(a)}, B = ${fmt(b)} bo'lsa, ${op.sym} (${op.name}) ni hisoblang.`,
    expression: op.sym,
    a,
    b,
    op: op.id,
    answer,
  };
}

export function checkProblem(problem: GeneratedProblem, userInput: string): boolean {
  return sameSet(parseSet(userInput), problem.answer);
}

interface TutorReply {
  text: string;
  expression?: string;
}

const KB: { keys: string[]; reply: TutorReply }[] = [
  {
    keys: ["birlashma", "union", "∪", "u"],
    reply: {
      text: "Birlashma (A ∪ B) — A yoki B (yoki ikkalasi) ga tegishli barcha elementlar to'plami. Takror elementlar bir marta yoziladi.",
      expression: "A ∪ B = {x | x ∈ A yoki x ∈ B}",
    },
  },
  {
    keys: ["kesishma", "intersection", "∩"],
    reply: {
      text: "Kesishma (A ∩ B) — ham A ga, ham B ga tegishli umumiy elementlar. Umumiy element bo'lmasa, natija bo'sh to'plam ∅.",
      expression: "A ∩ B = {x | x ∈ A va x ∈ B}",
    },
  },
  {
    keys: ["ayirma", "difference", "farq"],
    reply: {
      text: "Ayirma (A − B) — A da bor, lekin B da yo'q elementlar. Diqqat: A − B odatda B − A ga teng emas!",
      expression: "A − B = {x | x ∈ A va x ∉ B}",
    },
  },
  {
    keys: ["toldiruvchi", "complement", "to'ldiruvchi", "′", "tashqari"],
    reply: {
      text: "To'ldiruvchi (A′) — universal to'plam U dagi A ga kirmaydigan barcha elementlar.",
      expression: "A' = U − A",
    },
  },
  {
    keys: ["de morgan", "demorgan", "morgan"],
    reply: {
      text: "De Morgan qonunlari to'ldiruvchini birlashma/kesishmaga taqsimlaganda ∪ va ∩ o'rin almashishini bildiradi.",
      expression: "(A ∪ B)' = A' ∩ B' ;  (A ∩ B)' = A' ∪ B'",
    },
  },
  {
    keys: ["qism", "subset", "⊆", "⊂"],
    reply: {
      text: "A ⊆ B — A ning har bir elementi B da bor. Agar qo'shimcha A ≠ B bo'lsa, A ⊂ B (xos qism to'plam).",
      expression: "A ⊆ B ⟺ (∀x: x ∈ A ⇒ x ∈ B)",
    },
  },
  {
    keys: ["power", "bo'lim", "bolim", "p(a)", "qism to'plamlar soni"],
    reply: {
      text: "Bo'lim to'plam P(A) — A ning barcha qism to'plamlari to'plami. Element soni 2 darajasi |A|.",
      expression: "|P(A)| = 2^{|A|}",
    },
  },
  {
    keys: ["bosh", "bo'sh", "empty", "∅"],
    reply: {
      text: "Bo'sh to'plam ∅ — elementi yo'q to'plam. U har qanday to'plamning qism to'plami: ∅ ⊆ A.",
      expression: "|∅| = 0",
    },
  },
  {
    keys: ["simmetrik", "symmetric", "△"],
    reply: {
      text: "Simmetrik ayirma (A △ B) — faqat bittasiga tegishli elementlar (ikkalasiga emas).",
      expression: "A △ B = (A − B) ∪ (B − A)",
    },
  },
];

export function answerQuestion(q: string): TutorReply {
  const lower = q.toLowerCase();

  // Try to compute an operation if input contains two sets
  const sets = lower.match(/\{[^}]*\}/g);
  if (sets && sets.length >= 2) {
    const a = parseSet(sets[0]);
    const b = parseSet(sets[1]);
    if (/(birlash|union|∪)/.test(lower))
      return { text: `A ∪ B = ${fmt(union(a, b))}`, expression: "A ∪ B" };
    if (/(kesish|intersect|∩)/.test(lower))
      return { text: `A ∩ B = ${fmt(intersection(a, b))}`, expression: "A ∩ B" };
    if (/(ayirma|difference|farq|−|-)/.test(lower))
      return { text: `A − B = ${fmt(difference(a, b))}`, expression: "A − B" };
    if (/(simmetrik|symmetric|△)/.test(lower))
      return {
        text: `A △ B = ${fmt(symmetricDifference(a, b))}`,
        expression: "A △ B",
      };
    return {
      text: `Ikki to'plam aniqlandi: A = ${fmt(a)}, B = ${fmt(b)}. Qaysi amalni bajaray? (birlashma, kesishma, ayirma, simmetrik)`,
    };
  }

  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.reply;
  }

  return {
    text: "Men to'plamlar mavzusi bo'yicha yordam beraman. Tushuntirish so'rang (masalan: \"birlashma nima?\"), yoki to'plam yozing (masalan: \"{1,2,3} va {2,3,4} kesishmasi\"), yoki 'Yangi masala' tugmasini bosing.",
  };
}
