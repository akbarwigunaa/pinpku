"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SuratLamaranData, emptySuratData } from "@/lib/surat-types";

const STORAGE_KEY = "pinpku_surat_data";
const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

const steps = [
  { id: "pengirim", label: "Data Pengirim" },
  { id: "tujuan", label: "Tujuan Surat" },
  { id: "pembuka", label: "Pembuka" },
  { id: "isi", label: "Isi" },
  { id: "penutup", label: "Penutup" },
];

function loadFromStorage(): SuratLamaranData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return emptySuratData;
}

function getTodayDate(): string {
  const d = new Date();
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function PreviewScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 400;
      const a4Width = 794;
      setScale(Math.min((width - 32) / a4Width, 1));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-gray-100 rounded-xl p-4 overflow-hidden">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "210mm",
          marginBottom: `calc(297mm * ${scale - 1})`,
        }}
        className="shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}

export default function SuratLamaranClient() {
  const [data, setData] = useState<SuratLamaranData>(emptySuratData);
  const [loaded, setLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState("pengirim");
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = loadFromStorage();
    if (!d.tempatTanggal.tanggal) {
      d.tempatTanggal.tanggal = getTodayDate();
    }
    setData(d);
    setLoaded(true);
  }, []);

  const saveToStorage = useCallback((d: SuratLamaranData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {}
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => saveToStorage(data), 500);
    return () => clearTimeout(timer);
  }, [data, loaded, saveToStorage]);

  function update<K extends keyof SuratLamaranData>(
    section: K,
    field: string,
    value: string
  ) {
    setData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as Record<string, string>), [field]: value },
    }));
  }

  function handlePrint() {
    const el = previewRef.current;
    if (!el) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8" />
<title>Surat Lamaran - ${data.pengirim.nama || "Dokumen"}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 0; }
  body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style>
</head>
<body>${el.outerHTML}</body>
</html>`);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 400);
  }

  function handleReset() {
    if (confirm("Hapus semua data surat lamaran?")) {
      const fresh = { ...emptySuratData, tempatTanggal: { ...emptySuratData.tempatTanggal, tanggal: getTodayDate() } };
      setData(fresh);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }

  if (!loaded) {
    return <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8"><div className="animate-pulse bg-gray-100 rounded-xl h-96" /></main>;
  }

  const hasContent = data.pengirim.nama || data.tujuan.namaPerusahaan || data.pembuka.posisiDilamar;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">Surat Lamaran Kerja</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Panduan per paragraf, terstruktur dan siap kirim.
            {saved && <span className="ml-2 text-teal text-xs">Tersimpan</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">Reset</button>
          <button onClick={() => setShowPreview(!showPreview)} className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors lg:hidden">
            {showPreview ? "Edit" : "Preview"}
          </button>
          <button onClick={handlePrint} className="px-4 py-2 rounded-lg text-sm font-semibold bg-navy text-white hover:bg-navy-mid transition-colors">Cetak PDF</button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Form */}
        <div className={`w-full lg:w-[420px] shrink-0 ${showPreview ? "hidden lg:block" : ""}`}>
          <div className="bg-white border border-border rounded-xl p-5">
            {/* Step tabs */}
            <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
              {steps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    activeStep === s.id ? "bg-navy text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Step: Pengirim */}
            {activeStep === "pengirim" && (
              <div className="space-y-4">
                <div className="bg-gold-soft/50 border border-gold/20 rounded-lg p-3 text-xs text-gold-deep leading-relaxed">
                  Data pengirim ditampilkan di bagian atas surat. Pastikan informasi kontak aktif dan mudah dihubungi.
                </div>
                <div>
                  <label className={labelClass}>Nama Lengkap</label>
                  <input className={inputClass} value={data.pengirim.nama} onChange={(e) => update("pengirim", "nama", e.target.value)} placeholder="Nama lengkap" />
                </div>
                <div>
                  <label className={labelClass}>Alamat</label>
                  <input className={inputClass} value={data.pengirim.alamat} onChange={(e) => update("pengirim", "alamat", e.target.value)} placeholder="Jl. Contoh No. 123, Sidoarjo" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>No. Telepon</label>
                    <input className={inputClass} value={data.pengirim.telepon} onChange={(e) => update("pengirim", "telepon", e.target.value)} placeholder="08xxxxxxxxxx" />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input className={inputClass} value={data.pengirim.email} onChange={(e) => update("pengirim", "email", e.target.value)} placeholder="email@contoh.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Kota</label>
                    <input className={inputClass} value={data.tempatTanggal.kota} onChange={(e) => update("tempatTanggal", "kota", e.target.value)} placeholder="Sidoarjo" />
                  </div>
                  <div>
                    <label className={labelClass}>Tanggal</label>
                    <input className={inputClass} value={data.tempatTanggal.tanggal} onChange={(e) => update("tempatTanggal", "tanggal", e.target.value)} placeholder="1 Januari 2026" />
                  </div>
                </div>
              </div>
            )}

            {/* Step: Tujuan */}
            {activeStep === "tujuan" && (
              <div className="space-y-4">
                <div className="bg-gold-soft/50 border border-gold/20 rounded-lg p-3 text-xs text-gold-deep leading-relaxed">
                  Tuliskan nama penerima surat (HRD/manajer), perusahaan, dan alamat tujuan. Jika tidak tahu nama, gunakan &quot;Yth. Bapak/Ibu HRD&quot;.
                </div>
                <div>
                  <label className={labelClass}>Nama Penerima</label>
                  <input className={inputClass} value={data.tujuan.namaHRD} onChange={(e) => update("tujuan", "namaHRD", e.target.value)} placeholder="Bapak/Ibu HRD" />
                </div>
                <div>
                  <label className={labelClass}>Jabatan Penerima</label>
                  <input className={inputClass} value={data.tujuan.jabatanHRD} onChange={(e) => update("tujuan", "jabatanHRD", e.target.value)} placeholder="Manajer HRD" />
                </div>
                <div>
                  <label className={labelClass}>Nama Perusahaan</label>
                  <input className={inputClass} value={data.tujuan.namaPerusahaan} onChange={(e) => update("tujuan", "namaPerusahaan", e.target.value)} placeholder="PT Contoh Indonesia" />
                </div>
                <div>
                  <label className={labelClass}>Alamat Perusahaan</label>
                  <input className={inputClass} value={data.tujuan.alamatPerusahaan} onChange={(e) => update("tujuan", "alamatPerusahaan", e.target.value)} placeholder="Jl. Industri No. 45, Surabaya" />
                </div>
                <div>
                  <label className={labelClass}>Perihal</label>
                  <input className={inputClass} value={data.perihal} onChange={(e) => setData({ ...data, perihal: e.target.value })} placeholder="Lamaran Pekerjaan" />
                </div>
              </div>
            )}

            {/* Step: Pembuka */}
            {activeStep === "pembuka" && (
              <div className="space-y-4">
                <div className="bg-gold-soft/50 border border-gold/20 rounded-lg p-3 text-xs text-gold-deep leading-relaxed">
                  Paragraf pembuka menjelaskan posisi yang dilamar dan dari mana Anda mengetahui lowongan tersebut. Tulis dengan singkat dan langsung ke tujuan.
                </div>
                <div>
                  <label className={labelClass}>Posisi yang Dilamar</label>
                  <input className={inputClass} value={data.pembuka.posisiDilamar} onChange={(e) => update("pembuka", "posisiDilamar", e.target.value)} placeholder="Software Engineer" />
                </div>
                <div>
                  <label className={labelClass}>Sumber Informasi Lowongan</label>
                  <input className={inputClass} value={data.pembuka.sumberInfo} onChange={(e) => update("pembuka", "sumberInfo", e.target.value)} placeholder="LinkedIn / JobStreet / website perusahaan" />
                </div>
                <div>
                  <label className={labelClass}>Kalimat Pembuka (opsional)</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={data.pembuka.kalimatPembuka}
                    onChange={(e) => update("pembuka", "kalimatPembuka", e.target.value)}
                    placeholder="Kosongkan untuk menggunakan kalimat otomatis, atau tulis kalimat pembuka Anda sendiri."
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Jika dikosongkan, akan dibuatkan kalimat pembuka standar secara otomatis.</p>
                </div>
              </div>
            )}

            {/* Step: Isi */}
            {activeStep === "isi" && (
              <div className="space-y-4">
                <div className="bg-gold-soft/50 border border-gold/20 rounded-lg p-3 text-xs text-gold-deep leading-relaxed">
                  Paragraf isi adalah bagian terpenting. Jelaskan pendidikan, pengalaman, dan keahlian yang relevan dengan posisi. Tunjukkan mengapa Anda cocok untuk pekerjaan ini.
                </div>
                <div>
                  <label className={labelClass}>Latar Belakang Pendidikan</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    value={data.isi.pendidikan}
                    onChange={(e) => update("isi", "pendidikan", e.target.value)}
                    placeholder="Contoh: Saya merupakan lulusan S1 Informatika dari Universitas Muhammadiyah Sidoarjo dengan IPK 3.75."
                  />
                </div>
                <div>
                  <label className={labelClass}>Pengalaman Relevan</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={data.isi.pengalaman}
                    onChange={(e) => update("isi", "pengalaman", e.target.value)}
                    placeholder="Contoh: Selama kuliah, saya aktif magang di PT XYZ sebagai Web Developer selama 6 bulan, di mana saya bertanggung jawab untuk..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Keahlian yang Dimiliki</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    value={data.isi.keahlian}
                    onChange={(e) => update("isi", "keahlian", e.target.value)}
                    placeholder="Contoh: Saya menguasai JavaScript, React, dan Node.js, serta memiliki kemampuan komunikasi dan kerja tim yang baik."
                  />
                </div>
                <div>
                  <label className={labelClass}>Motivasi & Alasan Melamar</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    value={data.isi.motivasi}
                    onChange={(e) => update("isi", "motivasi", e.target.value)}
                    placeholder="Contoh: Saya sangat tertarik bergabung dengan perusahaan Bapak/Ibu karena reputasi dan kesempatan berkembang yang ditawarkan."
                  />
                </div>
              </div>
            )}

            {/* Step: Penutup */}
            {activeStep === "penutup" && (
              <div className="space-y-4">
                <div className="bg-gold-soft/50 border border-gold/20 rounded-lg p-3 text-xs text-gold-deep leading-relaxed">
                  Paragraf penutup berisi harapan untuk diberikan kesempatan wawancara dan ucapan terima kasih. Jaga agar tetap sopan dan profesional.
                </div>
                <div>
                  <label className={labelClass}>Kalimat Penutup (opsional)</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={4}
                    value={data.penutup.kalimatPenutup}
                    onChange={(e) => update("penutup", "kalimatPenutup", e.target.value)}
                    placeholder="Kosongkan untuk menggunakan kalimat penutup standar, atau tulis sendiri."
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Jika dikosongkan, akan menggunakan penutup standar: &quot;Demikian surat lamaran ini saya sampaikan. Besar harapan saya untuk diberikan kesempatan wawancara...&quot;</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t border-border">
              <button
                onClick={() => {
                  const idx = steps.findIndex((s) => s.id === activeStep);
                  if (idx > 0) setActiveStep(steps[idx - 1].id);
                }}
                disabled={activeStep === steps[0].id}
                className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <button
                onClick={() => {
                  const idx = steps.findIndex((s) => s.id === activeStep);
                  if (idx < steps.length - 1) setActiveStep(steps[idx + 1].id);
                }}
                disabled={activeStep === steps[steps.length - 1].id}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-navy-soft text-navy hover:bg-navy/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className={`flex-1 min-w-0 ${!showPreview ? "hidden lg:block" : ""}`}>
          <div className="sticky top-[72px]">
            <PreviewScaler>
              <SuratPreview ref={previewRef} data={data} hasContent={!!hasContent} />
            </PreviewScaler>
          </div>
        </div>
      </div>
    </main>
  );
}

import { forwardRef } from "react";

const SuratPreview = forwardRef<HTMLDivElement, { data: SuratLamaranData; hasContent: boolean }>(
  function SuratPreview({ data, hasContent }, ref) {
    if (!hasContent) {
      return (
        <div ref={ref} className="bg-white aspect-[210/297] flex items-center justify-center text-gray-300 text-sm">
          Preview surat lamaran akan muncul di sini
        </div>
      );
    }

    const d = data;
    const pembukaText =
      d.pembuka.kalimatPembuka ||
      `Dengan hormat, berdasarkan informasi lowongan pekerjaan yang saya peroleh melalui ${d.pembuka.sumberInfo || "media online"}, saya bermaksud mengajukan lamaran untuk posisi ${d.pembuka.posisiDilamar || "[posisi]"} di ${d.tujuan.namaPerusahaan || "[perusahaan]"}.`;

    const isiParts = [d.isi.pendidikan, d.isi.pengalaman, d.isi.keahlian, d.isi.motivasi].filter(Boolean);
    const isiText = isiParts.length > 0 ? isiParts.join(" ") : "";

    const penutupText =
      d.penutup.kalimatPenutup ||
      "Demikian surat lamaran ini saya sampaikan. Besar harapan saya untuk diberikan kesempatan wawancara agar dapat menjelaskan lebih lanjut mengenai potensi yang saya miliki. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.";

    return (
      <div
        ref={ref}
        className="bg-white text-gray-900"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm 24mm",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          fontSize: "11px",
          lineHeight: "1.7",
        }}
      >
        {/* Tempat, Tanggal */}
        <div className="text-right mb-6">
          <p>{d.tempatTanggal.kota ? `${d.tempatTanggal.kota}, ` : ""}{d.tempatTanggal.tanggal}</p>
        </div>

        {/* Tujuan */}
        <div className="mb-6">
          <p>Yth. {d.tujuan.namaHRD || "Bapak/Ibu HRD"}</p>
          {d.tujuan.jabatanHRD && <p>{d.tujuan.jabatanHRD}</p>}
          <p>{d.tujuan.namaPerusahaan || "[Nama Perusahaan]"}</p>
          {d.tujuan.alamatPerusahaan && <p>{d.tujuan.alamatPerusahaan}</p>}
        </div>

        {/* Perihal */}
        <div className="mb-6">
          <p><span className="font-semibold">Perihal:</span> {d.perihal || "Lamaran Pekerjaan"}</p>
        </div>

        {/* Salam */}
        <p className="mb-4">Dengan hormat,</p>

        {/* Pembuka */}
        <p className="mb-4 text-justify">{pembukaText}</p>

        {/* Isi */}
        {isiText && <p className="mb-4 text-justify">{isiText}</p>}

        {/* Penutup */}
        <p className="mb-8 text-justify">{penutupText}</p>

        {/* TTD */}
        <div>
          <p>Hormat saya,</p>
          <div className="mt-16">
            <p className="font-semibold">{d.pengirim.nama || "[Nama Lengkap]"}</p>
            {d.pengirim.alamat && <p className="text-[10px] text-gray-600">{d.pengirim.alamat}</p>}
            <div className="flex gap-4 text-[10px] text-gray-600 mt-0.5">
              {d.pengirim.telepon && <span>{d.pengirim.telepon}</span>}
              {d.pengirim.email && <span>{d.pengirim.email}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
