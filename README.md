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

## 🐳 Tez ishga tushirish — Docker

Loyihada production-ready, multi-stage `Dockerfile` mavjud: ilova `node:20-alpine` da build qilinadi va siqilgan statik fayllar `nginx` orqali tarqatiladi (React Router uchun SPA fallback sozlangan).

### Variant 1 — Docker Compose (tavsiya etiladi)

```bash
# Image'ni build qilib, konteynerni ishga tushirish
docker compose up -d --build

# Ilova: http://localhost:8080

# To'xtatish
docker compose down
```

### Variant 2 — Docker CLI

```bash
# Image build qilish
docker build -t toplamlar-akademiyasi .

# Konteynerni ishga tushirish (8080 -> 80)
docker run -d -p 8080:80 --name toplamlar-akademiyasi toplamlar-akademiyasi

# Loglarni ko'rish
docker logs -f toplamlar-akademiyasi

# To'xtatish va o'chirish
docker rm -f toplamlar-akademiyasi
```

> **Eslatma:** Portni o'zgartirish uchun `docker-compose.yml` dagi `"8080:80"` ni tahrirlang yoki `docker run -p <host>:80` da boshqa portni bering. Konteyner `HEALTHCHECK` bilan jihozlangan — `docker ps` da sog'liq holati ko'rinadi.

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

Ilova **to'liq ishlaydi** (frontend). Tayyor:

- ✅ Loyiha skeleti va konfiguratsiya (Vite, TS, Tailwind)
- ✅ Dizayn tizimi, dark/light rejim, mobile-first responsive
- ✅ To'plam amallari kutubxonasi (`lib/sets.ts`)
- ✅ Gamifikatsiya: XP, darajalar, nishonlar, streak
- ✅ Offline progress saqlash (localStorage) + eksport
- ✅ 8 modulli to'liq o'quv dasturi (darslar, quizlar, bob testlari)
- ✅ Sahifalar: Onboarding, Dashboard, Modullar, Dars ko'rish, Mashqxona, AI Repetitor, Imtihon, Yutuqlar, Reyting, Profil
- ✅ Interaktiv: Venn diagramma, Venn playground, drag-and-drop, rostlik jadvali generatori
- ✅ AI Repetitor (qoidaga asoslangan) + cheksiz mashq generatori
- ✅ Yakuniy imtihon + sertifikat generatsiyasi

Keyingi bosqich (rejada):

- ⏳ Backend (Node.js + Express + PostgreSQL)
- ⏳ Google autentifikatsiya, ko'p qurilmali real sinxronizatsiya
- ⏳ Real foydalanuvchilar reytingi

> Ishga tushirish: `npm install` → `npm run dev` → http://localhost:5173

---

## 📄 Litsenziya

Ushbu loyiha ta'lim maqsadlarida yaratilgan.
