# 📚 To'plamlar Akademiyasi · Set Theory Academy

> To'plamlar nazariyasi va ular ustida amallarni **0 dan professional darajagacha** o'rgatuvchi zamonaviy, interaktiv ta'lim web-ilovasi.

Ilova butunlay boshlang'ich (hech qanday matematik bilimi yo'q) o'quvchini interaktiv mashqlar, vizual ko'rsatmalar, gamifikatsiya va adaptiv baholash orqali professional darajaga olib chiqishni maqsad qiladi.

**Asosiy til:** O'zbek (lotin)

---

## ✨ Imkoniyatlar

- 🎯 **8 modulli o'quv dasturi** — to'plam tushunchasidan olimpiada darajasidagi isbotlargacha
- 🔵 **Interaktiv Venn diagrammalari** — SVG + animatsiya, jonli amal vizualizatsiyasi
- 🖱️ **Drag-and-drop mashqlar** — elementlarni to'plamlarga ajratish
- ❓ **Quiz dvigateli** — bir/ko'p tanlovli, to'g'ri-noto'g'ri va kiritish savollari, darhol fikr-mulohaza bilan
- 🎮 **Gamifikatsiya** — XP, darajalar, nishonlar (badges), kunlik streak
- 📊 **Progress saqlash** — offline (localStorage), qurilmadan mustaqil
- 🌗 **Qorong'i / yorug' rejim** — matematikaga mos rang palitrasi
- 📱 **Mobile-first responsive dizayn**

---

## 🧩 O'quv dasturi (Curriculum)

| Modul | Mavzu | Daraja |
|-------|-------|--------|
| 1 | To'plamlarga kirish (∈, ∉, ∅, U) | Boshlang'ich |
| 2 | To'plam turlari (teng, ekvivalent, qism, bo'lim to'plam) | Boshlang'ich |
| 3 | To'plamlar ustida amallar (∪, ∩, −, ′, △) | O'rta |
| 4 | Murakkab amallar va De Morgan qonunlari | Ilg'or |
| 5 | Venn diagrammalari (2, 3, 4 to'plam) | O'rta–Ilg'or |
| 6 | Mantiq va to'plamlar (rostlik jadvallari) | Ilg'or |
| 7 | Amaliy matematika (DB, dasturlash, data science) | Ekspert |
| 8 | Professional daraja (isbotlar, olimpiada) | Professional |

---

## 🛠️ Texnologiyalar

| Qatlam | Texnologiya |
|--------|-------------|
| Frontend | **React 18** + **TypeScript** |
| Stillar | **Tailwind CSS** (dark mode) |
| Animatsiya | **Framer Motion** |
| Vizualizatsiya | **SVG** (Venn diagrammalari) |
| Routing | **React Router** |
| Build | **Vite** |
| Saqlash | **localStorage** (offline-first) |

---

## 🚀 Ishga tushirish

Talab: **Node.js 18+**

```bash
# Bog'liqliklarni o'rnatish
npm install

# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Build natijasini ko'rish
npm run preview
```

---

## 📁 Loyiha tuzilmasi

```
Amaliy_matematika/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── VennDiagram.tsx      # Preset asosidagi animatsion Venn diagramma
│   │   ├── VennPlayground.tsx   # Interaktiv jonli amal vizualizatsiyasi
│   │   ├── Quiz.tsx             # Quiz dvigateli (4 xil savol turi)
│   │   ├── DragDropSort.tsx     # Drag-and-drop tasniflash mashqi
│   │   ├── MathText.tsx         # Matematik belgilarni render qilish
│   │   └── ProgressBar.tsx      # Animatsion progress chizig'i
│   ├── context/
│   │   └── AppContext.tsx       # Global holat, progress, gamifikatsiya
│   ├── lib/
│   │   ├── sets.ts              # To'plam amallari (union, intersection, ...)
│   │   ├── gamification.ts      # XP, darajalar, nishonlar mantiqi
│   │   └── storage.ts           # localStorage saqlash/yuklash
│   ├── types.ts                 # TypeScript turlari
│   ├── main.tsx                 # Kirish nuqtasi
│   └── index.css                # Tailwind + global stillar
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 📌 Hozirgi holat

Loyiha faol ishlab chiqilmoqda. Quyidagilar tayyor:

- ✅ Loyiha skeleti va konfiguratsiya (Vite, TS, Tailwind)
- ✅ Dizayn tizimi va global stillar (dark/light)
- ✅ To'plam amallari kutubxonasi (`lib/sets.ts`)
- ✅ Gamifikatsiya mantiqi (XP, darajalar, nishonlar)
- ✅ Offline progress saqlash qatlami
- ✅ Asosiy komponentlar: Venn diagramma, Quiz, Drag-and-drop, Venn playground

Rejalashtirilgan (keyingi bosqich):

- ⏳ `App.tsx` va sahifalar (Dashboard, Modullar, Mashq, Imtihon, Reyting)
- ⏳ To'liq o'quv dasturi kontenti (`data/curriculum.ts`)
- ⏳ AI Tutor va mashq generatori
- ⏳ Sertifikat generatsiyasi
- ⏳ Backend (Node.js + Express + PostgreSQL), Google autentifikatsiya, ko'p qurilmali sinxronizatsiya

> Eslatma: Sahifalar va o'quv dasturi kontenti qo'shilmaguncha ilova `npm run dev` bilan to'liq ishlamaydi. Joriy commit poydevor bosqichini saqlaydi.

---

## 📄 Litsenziya

Ushbu loyiha ta'lim maqsadlarida yaratilgan.
