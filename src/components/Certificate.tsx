interface CertificateProps {
  name: string;
  percent: number;
}

export default function Certificate({ name, percent }: CertificateProps) {
  const date = new Date().toLocaleDateString("uz", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const print = () => window.print();

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border-4 border-brand-500 bg-gradient-to-br from-white to-brand-50 p-8 text-center dark:from-ink-900 dark:to-brand-950">
        <div className="pointer-events-none absolute -right-10 -top-10 text-[180px] opacity-10">
          ∪
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
          Sertifikat
        </p>
        <h2 className="mt-2 text-2xl font-extrabold">To'plamlar Akademiyasi</h2>
        <p className="mt-4 text-sm text-ink-500 dark:text-ink-400">
          Ushbu sertifikat quyidagi shaxsga beriladi:
        </p>
        <p className="mt-2 font-math text-3xl font-bold gradient-text">{name}</p>
        <p className="mt-4 mx-auto max-w-md text-sm text-ink-600 dark:text-ink-300">
          "To'plamlar nazariyasi va ular ustida amallar" kursini muvaffaqiyatli yakunlagani
          va yakuniy imtihonni <strong>{percent}%</strong> natija bilan topshirgani uchun.
        </p>
        <div className="mt-6 flex items-center justify-center gap-8 text-sm">
          <div>
            <p className="font-bold">{date}</p>
            <p className="text-xs text-ink-400">Sana</p>
          </div>
          <div className="text-4xl">🎓</div>
          <div>
            <p className="font-bold">Professional</p>
            <p className="text-xs text-ink-400">Daraja</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center print:hidden">
        <button onClick={print} className="btn-secondary">
          🖨️ Sertifikatni chop etish / saqlash
        </button>
      </div>
    </div>
  );
}
