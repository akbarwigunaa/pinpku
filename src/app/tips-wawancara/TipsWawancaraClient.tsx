"use client";

import { useState } from "react";

interface TipsPertanyaan {
  id: string;
  pertanyaan: string;
  kategori: string;
  tips: string;
  contohJawaban: string;
}

interface Props {
  tips: TipsPertanyaan[];
  kategoriList: string[];
}

export default function TipsWawancaraClient({ tips, kategoriList }: Props) {
  const [kategori, setKategori] = useState("Semua");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = tips.filter((p) => {
    const matchKategori = kategori === "Semua" || p.kategori === kategori;
    const matchSearch =
      !search ||
      p.pertanyaan.toLowerCase().includes(search.toLowerCase()) ||
      p.contohJawaban.toLowerCase().includes(search.toLowerCase());
    return matchKategori && matchSearch;
  });

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">Tips Wawancara</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bank pertanyaan umum beserta tips dan contoh jawaban untuk persiapan wawancara kerja.
        </p>
      </div>

      {/* Tips umum */}
      <div className="bg-navy-soft border border-navy/10 rounded-xl p-4 mb-6">
        <h2 className="font-[var(--font-display)] text-sm font-semibold text-navy mb-2">Tips Umum Wawancara</h2>
        <ul className="text-xs text-navy/80 space-y-1.5 leading-relaxed">
          <li className="flex gap-2"><span className="shrink-0">1.</span> Riset perusahaan sebelum wawancara — pahami produk, visi, dan budaya kerja.</li>
          <li className="flex gap-2"><span className="shrink-0">2.</span> Gunakan metode STAR (Situation, Task, Action, Result) untuk jawaban berbasis pengalaman.</li>
          <li className="flex gap-2"><span className="shrink-0">3.</span> Berpakaian rapi dan datang 15 menit lebih awal.</li>
          <li className="flex gap-2"><span className="shrink-0">4.</span> Jaga kontak mata, duduk tegak, dan berbicara dengan jelas.</li>
          <li className="flex gap-2"><span className="shrink-0">5.</span> Siapkan minimal 2-3 pertanyaan untuk pewawancara.</li>
        </ul>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {kategoriList.map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              kategori === k ? "bg-navy text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-4">{filtered.length} pertanyaan ditemukan</p>

      {/* Question cards */}
      <div className="space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenId(openId === p.id ? null : p.id)}
              className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50/50 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-navy-soft text-navy text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                ?
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 leading-snug">{p.pertanyaan}</h3>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-500 font-medium">
                  {p.kategori}
                </span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${openId === p.id ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {openId === p.id && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="mt-3 mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-deep mb-1.5">Tips Menjawab</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.tips}</p>
                </div>
                <div className="bg-teal-soft/50 border border-teal/10 rounded-lg p-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">Contoh Jawaban</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.contohJawaban}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Tidak ada pertanyaan yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </main>
  );
}
