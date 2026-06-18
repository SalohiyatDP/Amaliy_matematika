import type { Module } from "../types";

/**
 * To'liq o'quv dasturi — 8 modul, har birida darslar (nazariya bloklari + quiz)
 * va bob testi. Barcha matn o'zbek (lotin) tilida.
 */
export const curriculum: Module[] = [
  // ───────────────────────── MODULE 1 ─────────────────────────
  {
    id: "m1",
    index: 1,
    title: "To'plamlarga kirish",
    subtitle: "Asosiy tushunchalar",
    description:
      "To'plam nima, elementlar, belgilanishlar, ∈ va ∉ belgilari, chekli/cheksiz to'plamlar, bo'sh va universal to'plam.",
    icon: "🌱",
    color: "from-emerald-500 to-teal-500",
    level: 1,
    lessons: [
      {
        id: "m1l1",
        title: "To'plam nima?",
        summary: "To'plam tushunchasi va elementlar bilan tanishish.",
        xp: 40,
        blocks: [
          { type: "heading", value: "To'plam tushunchasi" },
          {
            type: "text",
            value:
              "To'plam — bu aniq belgilangan obyektlar (elementlar) majmuasi. \"Aniq belgilangan\" degani: har qanday obyekt uchun u to'plamga tegishli yoki tegishli emasligini bir ma'noli aytish mumkin.",
          },
          {
            type: "example",
            title: "Kundalik hayotdan misol",
            body: "Sinfdagi o'quvchilar, savatdagi mevalar, 1 dan 10 gacha bo'lgan juft sonlar — bularning hammasi to'plamga misol.",
          },
          { type: "heading", value: "Elementlar" },
          {
            type: "text",
            value:
              "To'plamni tashkil etuvchi obyektlar uning elementlari deyiladi. To'plamlar odatda katta harf bilan (A, B, C), elementlar kichik harf bilan belgilanadi.",
          },
          {
            type: "formula",
            value: "A = {1, 2, 3, 4, 5}",
            caption: "A — birinchi beshta natural sondan iborat to'plam",
          },
          {
            type: "tip",
            value:
              "To'plam elementlari takrorlanmaydi va tartibi muhim emas: {1, 2, 3} = {3, 1, 2} = {1, 1, 2, 3}.",
          },
        ],
        quiz: [
          {
            id: "m1l1q1",
            type: "single",
            prompt: "To'plam deganda nimani tushunamiz?",
            options: [
              "Faqat sonlar ketma-ketligi",
              "Aniq belgilangan obyektlar majmuasi",
              "Tartiblangan ro'yxat",
              "Faqat harflar yig'indisi",
            ],
            answer: 1,
            explanation:
              "To'plam — aniq belgilangan obyektlar (elementlar) majmuasi. Element to'plamga tegishli yoki yo'qligini aniq aytish mumkin bo'lishi kerak.",
            level: 1,
          },
          {
            id: "m1l1q2",
            type: "truefalse",
            prompt: "To'plamda elementlarning tartibi muhim.",
            options: ["To'g'ri", "Noto'g'ri"],
            answer: 1,
            explanation:
              "Noto'g'ri. To'plamda tartib muhim emas: {1, 2, 3} va {3, 2, 1} bir xil to'plam.",
            level: 1,
          },
          {
            id: "m1l1q3",
            type: "single",
            prompt: "Quyidagilardan qaysi biri {1, 2, 2, 3} to'plamiga teng?",
            expression: "\\{1, 2, 2, 3\\}",
            options: ["{1, 2, 3}", "{1, 2, 2, 3, 3}", "{2, 3}", "{1, 2, 2}"],
            answer: 0,
            explanation:
              "To'plamda takror elementlar bir marta hisoblanadi, shuning uchun {1, 2, 2, 3} = {1, 2, 3}.",
            level: 1,
          },
        ],
      },
      {
        id: "m1l2",
        title: "Tegishlilik: ∈ va ∉",
        summary: "Element to'plamga tegishli yoki tegishli emasligini belgilash.",
        xp: 40,
        blocks: [
          { type: "heading", value: "Tegishlilik belgilari" },
          {
            type: "text",
            value:
              "Agar a elementi A to'plamiga tegishli bo'lsa, buni a ∈ A deb yozamiz (\"a A ga tegishli\"). Aks holda a ∉ A deb yoziladi.",
          },
          {
            type: "formula",
            value: "3 ∈ {1, 2, 3} ,   5 ∉ {1, 2, 3}",
            caption: "3 tegishli, 5 tegishli emas",
          },
          {
            type: "warning",
            value:
              "∈ belgisi element bilan to'plam orasida ishlatiladi, to'plam bilan to'plam orasida emas (ular uchun ⊆ ishlatiladi).",
          },
        ],
        quiz: [
          {
            id: "m1l2q1",
            type: "single",
            prompt: "B = {a, e, i, o, u} bo'lsa, qaysi ifoda to'g'ri?",
            options: ["b ∈ B", "e ∈ B", "z ∈ B", "k ∈ B"],
            answer: 1,
            explanation: "e harfi B to'plamining elementi, shuning uchun e ∈ B.",
            level: 1,
          },
          {
            id: "m1l2q2",
            type: "multiple",
            prompt: "A = {2, 4, 6, 8} bo'lsa, qaysilari to'g'ri? (bir nechta)",
            options: ["4 ∈ A", "5 ∈ A", "8 ∈ A", "3 ∉ A"],
            answer: [0, 2, 3],
            explanation: "4 va 8 — A ning elementlari; 3 esa A ga tegishli emas (3 ∉ A). 5 ∈ A noto'g'ri.",
            level: 2,
          },
        ],
      },
      {
        id: "m1l3",
        title: "Bo'sh, chekli va universal to'plam",
        summary: "∅, chekli/cheksiz to'plamlar va universal to'plam U.",
        xp: 50,
        blocks: [
          { type: "heading", value: "Bo'sh to'plam ∅" },
          {
            type: "text",
            value:
              "Hech qanday elementga ega bo'lmagan to'plam bo'sh to'plam deyiladi va ∅ yoki {} bilan belgilanadi.",
          },
          { type: "formula", value: "∅ = { }", caption: "Bo'sh to'plamda element yo'q" },
          { type: "heading", value: "Chekli va cheksiz to'plamlar" },
          {
            type: "list",
            items: [
              "Chekli to'plam — elementlar soni aniq (masalan, {1, 2, 3}).",
              "Cheksiz to'plam — elementlar soni cheksiz (masalan, barcha natural sonlar N).",
            ],
          },
          { type: "heading", value: "Universal to'plam U" },
          {
            type: "text",
            value:
              "Universal to'plam (U) — ko'rib chiqilayotgan masala doirasidagi barcha mumkin bo'lgan elementlarni o'z ichiga olgan to'plam.",
          },
          { type: "venn", preset: "complement", caption: "U ichidagi to'plam va uning tashqarisi" },
        ],
        quiz: [
          {
            id: "m1l3q1",
            type: "single",
            prompt: "Bo'sh to'plamda nechta element bor?",
            options: ["1 ta", "0 ta", "Cheksiz", "Aniqlanmagan"],
            answer: 1,
            explanation: "Bo'sh to'plamda 0 ta element bor, |∅| = 0.",
            level: 1,
          },
          {
            id: "m1l3q2",
            type: "single",
            prompt: "Quyidagilardan qaysi biri cheksiz to'plam?",
            options: [
              "Haftadagi kunlar",
              "Barcha natural sonlar",
              "Alifbodagi harflar",
              "Bir yildagi oylar",
            ],
            answer: 1,
            explanation: "Barcha natural sonlar to'plami N = {1, 2, 3, ...} cheksizdir.",
            level: 2,
          },
          {
            id: "m1l3q3",
            type: "input",
            prompt: "1 dan 5 gacha bo'lgan natural sonlar to'plamini yozing.",
            answer: "{1, 2, 3, 4, 5}",
            explanation: "1 dan 5 gacha: {1, 2, 3, 4, 5}.",
            level: 2,
          },
        ],
      },
    ],
    test: [
      {
        id: "m1t1",
        type: "single",
        prompt: "∉ belgisi nimani bildiradi?",
        options: ["Tegishli", "Tegishli emas", "Qism to'plam", "Birlashma"],
        answer: 1,
        explanation: "∉ — element to'plamga tegishli emasligini bildiradi.",
        level: 1,
      },
      {
        id: "m1t2",
        type: "single",
        prompt: "{x | x — 10 dan kichik musbat juft son} to'plami nechta elementdan iborat?",
        options: ["3", "4", "5", "6"],
        answer: 1,
        explanation: "2, 4, 6, 8 — jami 4 ta element.",
        level: 3,
      },
      {
        id: "m1t3",
        type: "truefalse",
        prompt: "∅ — bu nol soniga teng.",
        options: ["To'g'ri", "Noto'g'ri"],
        answer: 1,
        explanation: "Noto'g'ri. ∅ — bu bo'sh to'plam, 0 soni emas. {0} ≠ ∅.",
        level: 2,
      },
      {
        id: "m1t4",
        type: "input",
        prompt: "Juft tub son(lar)dan iborat to'plamni yozing.",
        answer: "{2}",
        explanation: "Yagona juft tub son — 2, shuning uchun {2}.",
        level: 3,
      },
    ],
  },

  // ───────────────────────── MODULE 2 ─────────────────────────
  {
    id: "m2",
    index: 2,
    title: "To'plam turlari",
    subtitle: "Teng, qism va bo'lim to'plamlar",
    description:
      "Teng va ekvivalent to'plamlar, singleton, qism to'plam, xos qism to'plam va bo'lim to'plam (power set).",
    icon: "🧩",
    color: "from-sky-500 to-blue-500",
    level: 2,
    lessons: [
      {
        id: "m2l1",
        title: "Teng va ekvivalent to'plamlar",
        summary: "Tenglik va ekvivalentlik o'rtasidagi farq.",
        xp: 45,
        blocks: [
          { type: "heading", value: "Teng to'plamlar" },
          {
            type: "text",
            value: "Ikki to'plam aynan bir xil elementlardan iborat bo'lsa, ular teng deyiladi: A = B.",
          },
          { type: "heading", value: "Ekvivalent to'plamlar" },
          {
            type: "text",
            value:
              "Elementlar soni (quvvati) bir xil bo'lgan to'plamlar ekvivalent deyiladi: |A| = |B|. Ekvivalent to'plamlar teng bo'lishi shart emas.",
          },
          {
            type: "example",
            title: "Misol",
            body: "A = {1, 2, 3} va B = {a, b, c} — ekvivalent (ikkalasida 3 ta element), lekin teng emas.",
          },
        ],
        quiz: [
          {
            id: "m2l1q1",
            type: "single",
            prompt: "A = {1, 2, 3}, B = {3, 2, 1}. Bu to'plamlar...",
            options: ["Faqat ekvivalent", "Teng (va ekvivalent)", "Teng emas", "Qism to'plam"],
            answer: 1,
            explanation: "Bir xil elementlardan iborat, shuning uchun teng (ham ekvivalent).",
            level: 2,
          },
          {
            id: "m2l1q2",
            type: "single",
            prompt: "A = {x, y}, B = {1, 2, 3}. Bu to'plamlar haqida nima deyish mumkin?",
            options: ["Teng", "Ekvivalent", "Ekvivalent emas", "Bir xil"],
            answer: 2,
            explanation: "|A| = 2, |B| = 3, quvvatlari har xil — ekvivalent emas.",
            level: 2,
          },
        ],
      },
      {
        id: "m2l2",
        title: "Qism to'plam va xos qism to'plam",
        summary: "⊆ va ⊂ belgilari, qism to'plam tushunchasi.",
        xp: 50,
        blocks: [
          { type: "heading", value: "Qism to'plam ⊆" },
          {
            type: "text",
            value:
              "A to'plamning har bir elementi B to'plamga tegishli bo'lsa, A — B ning qism to'plami deyiladi: A ⊆ B.",
          },
          { type: "venn", preset: "subset", caption: "A ⊆ B: A to'liq B ichida" },
          { type: "heading", value: "Xos qism to'plam ⊂" },
          {
            type: "text",
            value: "Agar A ⊆ B va A ≠ B bo'lsa, A — B ning xos qism to'plami: A ⊂ B.",
          },
          {
            type: "tip",
            value: "Bo'sh to'plam har qanday to'plamning qism to'plami: ∅ ⊆ A. Har bir to'plam o'zining qism to'plami: A ⊆ A.",
          },
        ],
        quiz: [
          {
            id: "m2l2q1",
            type: "single",
            prompt: "A = {1, 2}, B = {1, 2, 3, 4}. To'g'ri ifodani tanlang.",
            options: ["A ⊂ B", "B ⊂ A", "A = B", "A ⊄ B"],
            answer: 0,
            explanation: "A ning barcha elementlari B da bor va A ≠ B, demak A ⊂ B (xos qism).",
            level: 2,
          },
          {
            id: "m2l2q2",
            type: "truefalse",
            prompt: "Bo'sh to'plam har qanday to'plamning qism to'plami.",
            options: ["To'g'ri", "Noto'g'ri"],
            answer: 0,
            explanation: "To'g'ri. ∅ ⊆ A har doim o'rinli.",
            level: 2,
          },
        ],
      },
      {
        id: "m2l3",
        title: "Bo'lim to'plam (Power Set)",
        summary: "To'plamning barcha qism to'plamlari to'plami.",
        xp: 55,
        blocks: [
          { type: "heading", value: "Bo'lim to'plam P(A)" },
          {
            type: "text",
            value:
              "A to'plamning barcha qism to'plamlaridan iborat to'plam — bo'lim to'plam (power set), P(A) bilan belgilanadi.",
          },
          {
            type: "formula",
            value: "A = {1, 2}  ⇒  P(A) = { ∅, {1}, {2}, {1, 2} }",
          },
          {
            type: "text",
            value: "Agar |A| = n bo'lsa, P(A) da 2ⁿ ta qism to'plam bo'ladi.",
          },
          { type: "formula", value: "|P(A)| = 2^{|A|}" },
        ],
        quiz: [
          {
            id: "m2l3q1",
            type: "single",
            prompt: "A = {a, b, c} bo'lsa, P(A) nechta elementdan iborat?",
            expression: "|P(A)| = 2^{|A|}",
            options: ["6", "8", "9", "3"],
            answer: 1,
            explanation: "|A| = 3, demak |P(A)| = 2³ = 8.",
            level: 3,
          },
          {
            id: "m2l3q2",
            type: "single",
            prompt: "Bo'sh to'plamning bo'lim to'plami nimaga teng?",
            options: ["∅", "{∅}", "{{}}", "Aniqlanmagan"],
            answer: 1,
            explanation: "P(∅) = {∅} — bitta elementi (bo'sh to'plam) bor to'plam.",
            level: 4,
          },
        ],
      },
    ],
    test: [
      {
        id: "m2t1",
        type: "single",
        prompt: "|A| = 5 bo'lsa, A ning qism to'plamlari soni nechta?",
        options: ["10", "25", "32", "5"],
        answer: 2,
        explanation: "2⁵ = 32.",
        level: 3,
      },
      {
        id: "m2t2",
        type: "multiple",
        prompt: "{1, 2} to'plamining qism to'plamlarini tanlang.",
        options: ["∅", "{1}", "{3}", "{1, 2}"],
        answer: [0, 1, 3],
        explanation: "∅, {1}, {2}, {1,2} — qism to'plamlar. {3} esa emas.",
        level: 3,
      },
      {
        id: "m2t3",
        type: "single",
        prompt: "A va B ekvivalent, lekin teng emas bo'lishi mumkinmi?",
        options: ["Ha", "Yo'q", "Faqat cheksizda", "Faqat bo'sh to'plamda"],
        answer: 0,
        explanation: "Ha, masalan {1,2,3} va {a,b,c} — ekvivalent, teng emas.",
        level: 3,
      },
    ],
  },

  // ───────────────────────── MODULE 3 ─────────────────────────
  {
    id: "m3",
    index: 3,
    title: "To'plamlar ustida amallar",
    subtitle: "Birlashma, kesishma, ayirma",
    description:
      "Birlashma (∪), kesishma (∩), ayirma (−), to'ldiruvchi (′) va simmetrik ayirma (△).",
    icon: "⚙️",
    color: "from-violet-500 to-purple-500",
    level: 3,
    lessons: [
      {
        id: "m3l1",
        title: "Birlashma va kesishma",
        summary: "A ∪ B va A ∩ B amallari.",
        xp: 50,
        blocks: [
          { type: "heading", value: "Birlashma A ∪ B" },
          {
            type: "text",
            value: "A yoki B ga (yoki ikkalasiga) tegishli barcha elementlar to'plami.",
          },
          { type: "venn", preset: "union", caption: "A ∪ B — bo'yalgan hudud" },
          { type: "formula", value: "A ∪ B = {x | x ∈ A yoki x ∈ B}" },
          { type: "heading", value: "Kesishma A ∩ B" },
          {
            type: "text",
            value: "Ham A ga, ham B ga tegishli umumiy elementlar to'plami.",
          },
          { type: "venn", preset: "intersection", caption: "A ∩ B — umumiy qism" },
          { type: "formula", value: "A ∩ B = {x | x ∈ A va x ∈ B}" },
        ],
        quiz: [
          {
            id: "m3l1q1",
            type: "input",
            prompt: "A = {1, 2, 3}, B = {3, 4, 5}. A ∪ B = ?",
            expression: "A \\cup B",
            answer: "{1, 2, 3, 4, 5}",
            explanation: "Birlashmada barcha elementlar (takrorsiz): {1, 2, 3, 4, 5}.",
            level: 3,
          },
          {
            id: "m3l1q2",
            type: "input",
            prompt: "A = {1, 2, 3}, B = {3, 4, 5}. A ∩ B = ?",
            expression: "A \\cap B",
            answer: "{3}",
            explanation: "Umumiy element faqat 3, demak A ∩ B = {3}.",
            level: 3,
          },
          {
            id: "m3l1q3",
            type: "single",
            prompt: "Agar A ∩ B = ∅ bo'lsa, A va B qanday to'plamlar?",
            options: ["Teng", "Kesishmaydigan (ajralgan)", "Qism to'plam", "Ekvivalent"],
            answer: 1,
            explanation: "Umumiy elementi bo'lmagan to'plamlar kesishmaydigan (disjoint) deyiladi.",
            level: 3,
          },
        ],
      },
      {
        id: "m3l2",
        title: "Ayirma va to'ldiruvchi",
        summary: "A − B va A′ amallari.",
        xp: 50,
        blocks: [
          { type: "heading", value: "Ayirma A − B" },
          {
            type: "text",
            value: "A ga tegishli, lekin B ga tegishli bo'lmagan elementlar.",
          },
          { type: "venn", preset: "difference", caption: "A − B" },
          { type: "formula", value: "A − B = {x | x ∈ A va x ∉ B}" },
          { type: "heading", value: "To'ldiruvchi A′" },
          {
            type: "text",
            value: "Universal to'plam U dagi A ga tegishli bo'lmagan barcha elementlar.",
          },
          { type: "venn", preset: "complement", caption: "A′ = U − A" },
          { type: "formula", value: "A' = U − A" },
        ],
        quiz: [
          {
            id: "m3l2q1",
            type: "input",
            prompt: "A = {1, 2, 3, 4}, B = {3, 4, 5}. A − B = ?",
            expression: "A \\setminus B",
            answer: "{1, 2}",
            explanation: "A da bor, B da yo'q: {1, 2}.",
            level: 3,
          },
          {
            id: "m3l2q2",
            type: "single",
            prompt: "U = {1,...,5}, A = {1, 2}. A′ = ?",
            options: ["{1, 2}", "{3, 4, 5}", "{1, 2, 3, 4, 5}", "∅"],
            answer: 1,
            explanation: "A′ = U − A = {3, 4, 5}.",
            level: 3,
          },
        ],
      },
      {
        id: "m3l3",
        title: "Simmetrik ayirma",
        summary: "A △ B amali.",
        xp: 50,
        blocks: [
          { type: "heading", value: "Simmetrik ayirma A △ B" },
          {
            type: "text",
            value:
              "Faqat bittasiga tegishli (ikkalasiga emas) elementlar. Ya'ni birlashmadan kesishmani ayirish.",
          },
          { type: "venn", preset: "symmetric", caption: "A △ B" },
          { type: "formula", value: "A △ B = (A − B) ∪ (B − A) = (A ∪ B) − (A ∩ B)" },
        ],
        quiz: [
          {
            id: "m3l3q1",
            type: "input",
            prompt: "A = {1, 2, 3}, B = {2, 3, 4}. A △ B = ?",
            expression: "A \\triangle B",
            answer: "{1, 4}",
            explanation: "Faqat bittasida bor: 1 (faqat A) va 4 (faqat B) ⇒ {1, 4}.",
            level: 4,
          },
        ],
      },
    ],
    test: [
      {
        id: "m3t1",
        type: "input",
        prompt: "A = {2, 4, 6}, B = {4, 6, 8}. A ∪ B = ?",
        answer: "{2, 4, 6, 8}",
        explanation: "{2, 4, 6, 8}.",
        level: 3,
      },
      {
        id: "m3t2",
        type: "input",
        prompt: "A = {2, 4, 6}, B = {4, 6, 8}. A ∩ B = ?",
        answer: "{4, 6}",
        explanation: "Umumiy: {4, 6}.",
        level: 3,
      },
      {
        id: "m3t3",
        type: "single",
        prompt: "A − B va B − A har doim teng bo'ladimi?",
        options: ["Ha, doim", "Yo'q, umuman olganda teng emas", "Faqat A = B bo'lsa", "Faqat bo'sh to'plamda"],
        answer: 1,
        explanation: "Umuman olganda A − B ≠ B − A. Ular faqat A = B bo'lganda (ikkalasi ∅) teng.",
        level: 4,
      },
      {
        id: "m3t4",
        type: "input",
        prompt: "A = {1, 2, 3, 4}, B = {3, 4, 5, 6}. A △ B = ?",
        answer: "{1, 2, 5, 6}",
        explanation: "(A−B)∪(B−A) = {1,2}∪{5,6} = {1, 2, 5, 6}.",
        level: 4,
      },
    ],
  },

  // ───────────────────────── MODULE 4 ─────────────────────────
  {
    id: "m4",
    index: 4,
    title: "Murakkab amallar",
    subtitle: "De Morgan va to'plamlar algebrasi",
    description:
      "Ko'p to'plamli amallar, ichma-ich amallar, De Morgan qonunlari va to'plamlar algebrasi qonunlari.",
    icon: "🔬",
    color: "from-fuchsia-500 to-pink-500",
    level: 4,
    lessons: [
      {
        id: "m4l1",
        title: "To'plamlar algebrasi qonunlari",
        summary: "Kommutativlik, assotsiativlik, distributivlik.",
        xp: 60,
        blocks: [
          { type: "heading", value: "Asosiy qonunlar" },
          {
            type: "list",
            items: [
              "Kommutativlik: A ∪ B = B ∪ A,  A ∩ B = B ∩ A",
              "Assotsiativlik: (A ∪ B) ∪ C = A ∪ (B ∪ C)",
              "Distributivlik: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
              "Idempotentlik: A ∪ A = A,  A ∩ A = A",
            ],
          },
          {
            type: "tip",
            value:
              "Distributivlik ∩ va ∪ orasida ikki tomonlama ishlaydi — bu ko'pchilik isbotlarning kaliti.",
          },
        ],
        quiz: [
          {
            id: "m4l1q1",
            type: "single",
            prompt: "A ∩ (B ∪ C) nimaga teng (distributivlik)?",
            expression: "A \\cap (B \\cup C)",
            options: [
              "(A ∩ B) ∪ (A ∩ C)",
              "(A ∪ B) ∩ (A ∪ C)",
              "A ∪ B ∪ C",
              "(A ∩ B) ∩ C",
            ],
            answer: 0,
            explanation: "Distributivlik: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).",
            level: 4,
          },
          {
            id: "m4l1q2",
            type: "truefalse",
            prompt: "A ∪ A = A (idempotentlik qonuni).",
            options: ["To'g'ri", "Noto'g'ri"],
            answer: 0,
            explanation: "To'g'ri, idempotentlik qonuni bo'yicha A ∪ A = A.",
            level: 3,
          },
        ],
      },
      {
        id: "m4l2",
        title: "De Morgan qonunlari",
        summary: "To'ldiruvchining birlashma va kesishmaga ta'siri.",
        xp: 65,
        blocks: [
          { type: "heading", value: "De Morgan qonunlari" },
          { type: "formula", value: "(A ∪ B)' = A' ∩ B'" },
          { type: "formula", value: "(A ∩ B)' = A' ∪ B'" },
          {
            type: "text",
            value:
              "To'ldiruvchi olinganda ∪ va ∩ o'rin almashadi. Bu qonunlar mantiqdagi inkor qoidalariga to'g'ridan-to'g'ri mos keladi.",
          },
          {
            type: "example",
            title: "Tekshirish",
            body: "U={1..5}, A={1,2}, B={2,3}. (A∪B)′ = {1,2,3}′ = {4,5}. A′∩B′ = {3,4,5}∩{1,4,5} = {4,5}. Tasdiqlandi!",
          },
        ],
        quiz: [
          {
            id: "m4l2q1",
            type: "single",
            prompt: "(A ∪ B)′ nimaga teng?",
            expression: "(A \\cup B)'",
            options: ["A′ ∪ B′", "A′ ∩ B′", "A ∩ B", "A′ − B′"],
            answer: 1,
            explanation: "De Morgan: (A ∪ B)′ = A′ ∩ B′.",
            level: 4,
          },
          {
            id: "m4l2q2",
            type: "single",
            prompt: "(A ∩ B)′ nimaga teng?",
            expression: "(A \\cap B)'",
            options: ["A′ ∩ B′", "A′ ∪ B′", "A ∪ B", "∅"],
            answer: 1,
            explanation: "De Morgan: (A ∩ B)′ = A′ ∪ B′.",
            level: 4,
          },
        ],
      },
    ],
    test: [
      {
        id: "m4t1",
        type: "single",
        prompt: "A ∪ (B ∩ C) ifodasi quyidagidan qaysiga teng?",
        options: [
          "(A ∪ B) ∩ (A ∪ C)",
          "(A ∩ B) ∪ C",
          "A ∩ B ∩ C",
          "(A ∪ B) ∪ C",
        ],
        answer: 0,
        explanation: "Distributivlik: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C).",
        level: 5,
      },
      {
        id: "m4t2",
        type: "single",
        prompt: "(A′)′ nimaga teng?",
        options: ["A′", "A", "U", "∅"],
        answer: 1,
        explanation: "Ikki marta to'ldiruvchi — o'zini beradi: (A′)′ = A.",
        level: 4,
      },
      {
        id: "m4t3",
        type: "truefalse",
        prompt: "(A ∩ B)′ = A′ ∩ B′ (De Morgan).",
        options: ["To'g'ri", "Noto'g'ri"],
        answer: 1,
        explanation: "Noto'g'ri. To'g'risi: (A ∩ B)′ = A′ ∪ B′.",
        level: 4,
      },
    ],
  },

  // ───────────────────────── MODULE 5 ─────────────────────────
  {
    id: "m5",
    index: 5,
    title: "Venn diagrammalari",
    subtitle: "Vizual tahlil",
    description:
      "Ikki va uch to'plamli diagrammalar, hududlarni aniqlash va real hayotiy masalalar.",
    icon: "🔵",
    color: "from-cyan-500 to-sky-500",
    level: 3,
    lessons: [
      {
        id: "m5l1",
        title: "Ikki va uch to'plamli diagrammalar",
        summary: "Venn diagrammasi hududlarini o'qish.",
        xp: 55,
        blocks: [
          { type: "heading", value: "Venn diagrammasi nima?" },
          {
            type: "text",
            value:
              "Venn diagrammasi — to'plamlar orasidagi munosabatlarni doiralar yordamida vizual ko'rsatish usuli.",
          },
          { type: "venn", preset: "three-union", caption: "Uch to'plamli birlashma" },
          { type: "venn", preset: "three-intersection", caption: "Uch to'plam kesishmasi A ∩ B ∩ C" },
          {
            type: "tip",
            value:
              "Uch to'plamli diagrammada 8 ta hudud bor (tashqarisi bilan birga). Mashq sahifasida ularni jonli sinab ko'ring!",
          },
        ],
        quiz: [
          {
            id: "m5l1q1",
            type: "single",
            prompt: "Uch to'plamli Venn diagrammasida (tashqarisini hisobga olmaganda) nechta hudud bor?",
            options: ["6", "7", "8", "4"],
            answer: 1,
            explanation: "Ichki hududlar 7 ta; tashqarisi bilan birga 8 ta.",
            level: 4,
          },
          {
            id: "m5l1q2",
            type: "single",
            prompt: "A ∩ B ∩ C qaysi hududni bildiradi?",
            options: [
              "Faqat A",
              "Uchala doiraning umumiy markaziy qismi",
              "Tashqarisi",
              "Faqat A va B",
            ],
            answer: 1,
            explanation: "Uchala to'plamga ham tegishli markaziy umumiy hudud.",
            level: 3,
          },
        ],
      },
      {
        id: "m5l2",
        title: "Real hayotiy masalalar",
        summary: "Venn diagrammasi yordamida masala yechish.",
        xp: 60,
        blocks: [
          { type: "heading", value: "Qo'shish-ayirish prinsipi" },
          { type: "formula", value: "|A ∪ B| = |A| + |B| − |A ∩ B|" },
          {
            type: "example",
            title: "Masala",
            body: "30 o'quvchidan 18 tasi matematikani, 15 tasi fizikani yoqtiradi, 8 tasi ikkalasini ham. Faqat bittasini yoqtiruvchilar nechta? |A∪B| = 18+15−8 = 25.",
          },
        ],
        quiz: [
          {
            id: "m5l2q1",
            type: "single",
            prompt: "|A|=18, |B|=15, |A∩B|=8 bo'lsa, |A∪B| nechaga teng?",
            expression: "|A \\cup B| = |A| + |B| - |A \\cap B|",
            options: ["33", "25", "41", "23"],
            answer: 1,
            explanation: "18 + 15 − 8 = 25.",
            level: 4,
          },
          {
            id: "m5l2q2",
            type: "single",
            prompt: "Yuqoridagi misolda faqat matematikani (fizikani emas) yoqtiruvchilar nechta?",
            options: ["18", "10", "8", "7"],
            answer: 1,
            explanation: "|A| − |A∩B| = 18 − 8 = 10.",
            level: 4,
          },
        ],
      },
    ],
    test: [
      {
        id: "m5t1",
        type: "single",
        prompt: "|A|=20, |B|=25, |A∪B|=35. |A∩B| nechta?",
        options: ["10", "5", "15", "45"],
        answer: 0,
        explanation: "|A∩B| = |A|+|B|−|A∪B| = 20+25−35 = 10.",
        level: 5,
      },
      {
        id: "m5t2",
        type: "truefalse",
        prompt: "Venn diagrammasida kesishmaydigan to'plamlar bir-biriga tegmaydigan doiralar bilan ko'rsatiladi.",
        options: ["To'g'ri", "Noto'g'ri"],
        answer: 0,
        explanation: "To'g'ri, ajralgan (disjoint) to'plamlar tegishmaydigan doiralar bilan tasvirlanadi.",
        level: 3,
      },
    ],
  },

  // ───────────────────────── MODULE 6 ─────────────────────────
  {
    id: "m6",
    index: 6,
    title: "Mantiq va to'plamlar",
    subtitle: "Mulohazalar va rostlik jadvallari",
    description:
      "Mulohazalar, mantiqiy operatorlar (∧, ∨, ¬), rostlik jadvallari va mantiq–to'plam bog'lanishi.",
    icon: "🧠",
    color: "from-amber-500 to-orange-500",
    level: 4,
    lessons: [
      {
        id: "m6l1",
        title: "Mantiqiy operatorlar",
        summary: "VA (∧), YOKI (∨), INKOR (¬).",
        xp: 60,
        blocks: [
          { type: "heading", value: "Mulohaza" },
          {
            type: "text",
            value: "Mulohaza — rost (1) yoki yolg'on (0) bo'lishi mumkin bo'lgan darak gap.",
          },
          { type: "heading", value: "Operatorlar va to'plam mosligi" },
          {
            type: "list",
            items: [
              "Konyunksiya p ∧ q  ↔  kesishma A ∩ B",
              "Dizyunksiya p ∨ q  ↔  birlashma A ∪ B",
              "Inkor ¬p  ↔  to'ldiruvchi A′",
            ],
          },
          {
            type: "tip",
            value: "Mantiq va to'plamlar bir xil Bul algebrasi qonunlariga bo'ysunadi.",
          },
        ],
        quiz: [
          {
            id: "m6l1q1",
            type: "single",
            prompt: "Konyunksiya (p ∧ q) qaysi to'plam amaliga mos keladi?",
            options: ["Birlashma ∪", "Kesishma ∩", "Ayirma −", "To'ldiruvchi ′"],
            answer: 1,
            explanation: "VA (∧) — ikkalasi ham rost bo'lishini talab qiladi, bu kesishma ∩ ga mos.",
            level: 4,
          },
          {
            id: "m6l1q2",
            type: "single",
            prompt: "p = 1, q = 0 bo'lsa, p ∨ q qiymati?",
            options: ["0", "1", "Aniqlanmagan", "p"],
            answer: 1,
            explanation: "YOKI (∨) — kamida bittasi rost bo'lsa rost. 1 ∨ 0 = 1.",
            level: 3,
          },
        ],
      },
      {
        id: "m6l2",
        title: "Rostlik jadvallari",
        summary: "Mantiqiy ifodalarni jadval bilan tahlil qilish.",
        xp: 60,
        blocks: [
          { type: "heading", value: "Rostlik jadvali" },
          {
            type: "text",
            value:
              "Rostlik jadvali barcha mumkin bo'lgan kirish qiymatlari uchun ifoda natijasini ko'rsatadi. Mashq sahifasidagi generator yordamida ularni avtomatik tuzing.",
          },
          {
            type: "formula",
            value: "p ∧ q:  (1,1)→1,  (1,0)→0,  (0,1)→0,  (0,0)→0",
          },
        ],
        quiz: [
          {
            id: "m6l2q1",
            type: "single",
            prompt: "2 ta o'zgaruvchili rostlik jadvalida nechta qator bo'ladi?",
            options: ["2", "3", "4", "8"],
            answer: 2,
            explanation: "2² = 4 qator.",
            level: 3,
          },
          {
            id: "m6l2q2",
            type: "single",
            prompt: "¬(p ∧ q) ifodasi nimaga teng (De Morgan)?",
            options: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∨ q", "p ∧ q"],
            answer: 1,
            explanation: "Mantiqiy De Morgan: ¬(p ∧ q) = ¬p ∨ ¬q.",
            level: 5,
          },
        ],
      },
    ],
    test: [
      {
        id: "m6t1",
        type: "single",
        prompt: "3 o'zgaruvchili rostlik jadvalida nechta qator bo'ladi?",
        options: ["6", "8", "9", "3"],
        answer: 1,
        explanation: "2³ = 8 qator.",
        level: 4,
      },
      {
        id: "m6t2",
        type: "single",
        prompt: "Inkor (¬p) qaysi to'plam amaliga mos?",
        options: ["Birlashma", "To'ldiruvchi", "Kesishma", "Ayirma"],
        answer: 1,
        explanation: "Inkor to'ldiruvchiga (A′) mos keladi.",
        level: 4,
      },
    ],
  },

  // ───────────────────────── MODULE 7 ─────────────────────────
  {
    id: "m7",
    index: 7,
    title: "Amaliy matematika",
    subtitle: "Real dunyodagi qo'llanishlar",
    description:
      "Ma'lumotlar bazasi so'rovlari, dasturlash, ehtimollar nazariyasi, data science va sun'iy intellekt bilan bog'liqlik.",
    icon: "💼",
    color: "from-rose-500 to-red-500",
    level: 5,
    lessons: [
      {
        id: "m7l1",
        title: "Ma'lumotlar bazasi va dasturlash",
        summary: "SQL JOIN va to'plam amallari bog'liqligi.",
        xp: 65,
        blocks: [
          { type: "heading", value: "SQL va to'plamlar" },
          {
            type: "list",
            items: [
              "INNER JOIN ↔ kesishma (A ∩ B)",
              "UNION ↔ birlashma (A ∪ B)",
              "EXCEPT / MINUS ↔ ayirma (A − B)",
            ],
          },
          { type: "heading", value: "Dasturlashda Set" },
          {
            type: "text",
            value:
              "Python, JavaScript va boshqa tillarda Set ma'lumot strukturasi takrorlanmas elementlarni saqlaydi va union/intersection metodlarini taqdim etadi.",
          },
          {
            type: "example",
            title: "JavaScript",
            body: "const a = new Set([1,2,3]); const b = new Set([2,3,4]); kesishma = [...a].filter(x => b.has(x)); // [2, 3]",
          },
        ],
        quiz: [
          {
            id: "m7l1q1",
            type: "single",
            prompt: "SQL'dagi INNER JOIN qaysi to'plam amaliga eng yaqin?",
            options: ["Birlashma", "Kesishma", "Ayirma", "To'ldiruvchi"],
            answer: 1,
            explanation: "INNER JOIN faqat mos keluvchi (umumiy) yozuvlarni qaytaradi — kesishma.",
            level: 5,
          },
          {
            id: "m7l1q2",
            type: "single",
            prompt: "Python'da {1,2,3} & {2,3,4} natijasi?",
            options: ["{1,2,3,4}", "{2,3}", "{1,4}", "{1}"],
            answer: 1,
            explanation: "& — kesishma operatori: {2, 3}.",
            level: 5,
          },
        ],
      },
      {
        id: "m7l2",
        title: "Ehtimollar va data science",
        summary: "To'plamlar — ehtimollar va ma'lumotlar tahlilining asosi.",
        xp: 65,
        blocks: [
          { type: "heading", value: "Hodisalar — to'plam sifatida" },
          {
            type: "text",
            value:
              "Ehtimollar nazariyasida hodisalar elementar natijalar to'plamidir. P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
          },
          { type: "formula", value: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)" },
          { type: "heading", value: "Data science va AI" },
          {
            type: "text",
            value:
              "Ma'lumotlarni filtrlash, klassifikatsiya, Jaccard o'xshashligi (|A∩B| / |A∪B|) — barchasi to'plam amallariga asoslanadi.",
          },
        ],
        quiz: [
          {
            id: "m7l2q1",
            type: "single",
            prompt: "Jaccard o'xshashligi formulasi qanday?",
            expression: "J(A,B) = ?",
            options: [
              "|A ∩ B| / |A ∪ B|",
              "|A ∪ B| / |A ∩ B|",
              "|A| / |B|",
              "|A − B|",
            ],
            answer: 0,
            explanation: "Jaccard = kesishma quvvati / birlashma quvvati.",
            level: 6,
          },
          {
            id: "m7l2q2",
            type: "single",
            prompt: "P(A)=0.5, P(B)=0.4, P(A∩B)=0.2. P(A∪B) = ?",
            options: ["0.9", "0.7", "0.6", "1.1"],
            answer: 1,
            explanation: "0.5 + 0.4 − 0.2 = 0.7.",
            level: 5,
          },
        ],
      },
    ],
    test: [
      {
        id: "m7t1",
        type: "single",
        prompt: "SQL UNION qaysi amalga mos?",
        options: ["Kesishma", "Birlashma", "Ayirma", "To'ldiruvchi"],
        answer: 1,
        explanation: "UNION — birlashma (A ∪ B), takrorsiz.",
        level: 5,
      },
      {
        id: "m7t2",
        type: "single",
        prompt: "Tavsiya tizimlarida foydalanuvchilar o'xshashligini o'lchashda qaysi metrika to'plamlarga asoslanadi?",
        options: ["Jaccard", "Tezlik", "Hajm", "Tartib"],
        answer: 0,
        explanation: "Jaccard o'xshashligi to'plam kesishma/birlashmasiga asoslanadi.",
        level: 6,
      },
    ],
  },

  // ───────────────────────── MODULE 8 ─────────────────────────
  {
    id: "m8",
    index: 8,
    title: "Professional daraja",
    subtitle: "Isbotlar va olimpiada",
    description:
      "To'plam ayniyatlari, formal isbotlar, abstrakt fikrlash, notatsiya ustasi va olimpiada masalalari.",
    icon: "🏆",
    color: "from-indigo-500 to-violet-600",
    level: 6,
    lessons: [
      {
        id: "m8l1",
        title: "Formal isbotlar",
        summary: "To'plam tengligini element usuli bilan isbotlash.",
        xp: 80,
        blocks: [
          { type: "heading", value: "Element usuli" },
          {
            type: "text",
            value:
              "Ikki to'plam tengligini isbotlash uchun A ⊆ B va B ⊆ A ekanini ko'rsatamiz. Ya'ni har bir x ∈ A uchun x ∈ B va aksincha.",
          },
          {
            type: "example",
            title: "Isbot: (A ∪ B)′ = A′ ∩ B′",
            body: "x ∈ (A∪B)′ ⟺ x ∉ (A∪B) ⟺ x∉A va x∉B ⟺ x∈A′ va x∈B′ ⟺ x ∈ A′∩B′. Demak tenglik isbotlandi.",
          },
          {
            type: "warning",
            value: "Formal isbotda har bir qadam ⟺ (teng kuchli) bo'lishi yoki ikki tomonlama qamrov ko'rsatilishi kerak.",
          },
        ],
        quiz: [
          {
            id: "m8l1q1",
            type: "single",
            prompt: "A = B ni isbotlash uchun nimani ko'rsatish kerak?",
            options: [
              "Faqat A ⊆ B",
              "A ⊆ B va B ⊆ A",
              "|A| = |B|",
              "A ∩ B = ∅",
            ],
            answer: 1,
            explanation: "Ikki tomonlama qamrov: A ⊆ B va B ⊆ A.",
            level: 6,
          },
        ],
      },
      {
        id: "m8l2",
        title: "Olimpiada masalalari",
        summary: "Murakkab, ko'p bosqichli masalalar.",
        xp: 90,
        blocks: [
          { type: "heading", value: "Qo'shish-ayirish prinsipi (3 to'plam)" },
          {
            type: "formula",
            value:
              "|A∪B∪C| = |A|+|B|+|C| − |A∩B| − |A∩C| − |B∩C| + |A∩B∩C|",
          },
          {
            type: "example",
            title: "Olimpiada misoli",
            body: "100 talabadan 50 tasi ingliz, 40 tasi rus, 30 tasi arab tilini biladi; 20 ingliz+rus, 15 ingliz+arab, 10 rus+arab, 5 uchchalasini. Kamida bitta tilni biluvchilar: 50+40+30−20−15−10+5 = 80.",
          },
        ],
        quiz: [
          {
            id: "m8l2q1",
            type: "single",
            prompt: "Yuqoridagi misolda hech qaysi tilni bilmaydiganlar nechta (100 dan)?",
            options: ["20", "15", "10", "0"],
            answer: 0,
            explanation: "100 − 80 = 20.",
            level: 6,
          },
          {
            id: "m8l2q2",
            type: "single",
            prompt: "|A∪B∪C| formulasida +|A∩B∩C| nima uchun qo'shiladi?",
            options: [
              "Tasodifan",
              "Uch marta ayrilgani uchun qayta tiklash kerak",
              "Har doim 0 bo'lgani uchun",
              "Birlashma kattalashishi uchun",
            ],
            answer: 1,
            explanation:
              "A∩B∩C uch juft kesishmada uch marta ayriladi, shuning uchun bir marta qaytarib qo'shiladi.",
            level: 6,
          },
        ],
      },
    ],
    test: [
      {
        id: "m8t1",
        type: "single",
        prompt: "|A∪B∪C| ni hisoblashda qaysi had QO'SHILADI?",
        options: ["|A∩B|", "|A∩B∩C|", "|A∩C|", "|B∩C|"],
        answer: 1,
        explanation: "Faqat |A∩B∩C| oxirida qo'shiladi; juft kesishmalar ayriladi.",
        level: 6,
      },
      {
        id: "m8t2",
        type: "single",
        prompt: "Formal isbotda \"⟺\" belgisi nimani bildiradi?",
        options: ["Tegishlilik", "Teng kuchlilik (ikki tomonlama)", "Qism to'plam", "Birlashma"],
        answer: 1,
        explanation: "⟺ — teng kuchlilik: ikki mulohaza bir vaqtda rost yoki yolg'on.",
        level: 6,
      },
      {
        id: "m8t3",
        type: "truefalse",
        prompt: "A ⊆ B va B ⊆ A bo'lsa, A = B.",
        options: ["To'g'ri", "Noto'g'ri"],
        answer: 0,
        explanation: "To'g'ri — bu to'plam tengligining ta'rifi (antisimmetriklik).",
        level: 5,
      },
    ],
  },
];

export const getModule = (id: string): Module | undefined =>
  curriculum.find((m) => m.id === id);

export const getLesson = (moduleId: string, lessonId: string) => {
  const mod = getModule(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
};

export const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);
