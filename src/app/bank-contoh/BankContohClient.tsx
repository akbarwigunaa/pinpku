"use client";

import { useState } from "react";

interface ContohDokumen {
  id: string;
  judul: string;
  tipe: "CV" | "Surat Lamaran";
  bidang: string;
  ringkasan: string;
  poin: string[];
  mengapaBarik: string[];
}

const tipeFilter = ["Semua", "CV", "Surat Lamaran"] as const;

export default function BankContohClient({ docs }: { docs: ContohDokumen[] }) {
  const [tipe, setTipe] = useState<string>("Semua");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = docs.filter((d) => tipe === "Semua" || d.tipe === tipe);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">Bank Contoh Dokumen</h1>
        <p className="text-sm text-gray-500 mt-1">
          Referensi CV dan surat lamaran terbaik dari berbagai bidang. Pelajari strukturnya, lalu buat versimu sendiri.
        </p>
      </div>

      {/* Panduan */}
      <div className="bg-gold-soft border border-gold/20 rounded-xl p-4 mb-6">
        <h2 className="font-[var(--font-display)] text-sm font-semibold text-gold-deep mb-2">Cara Menggunakan</h2>
        <ul className="text-xs text-gold-deep/80 space-y-1 leading-relaxed">
          <li>1. Pilih contoh dokumen yang sesuai bidangmu.</li>
          <li>2. Pelajari struktur dan poin-poin penting yang digunakan.</li>
          <li>3. Baca analisis mengapa dokumen tersebut bagus.</li>
          <li>4. Adaptasi ke dokumenmu sendiri — jangan copy paste!</li>
        </ul>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {tipeFilter.map((t) => (
          <button
            key={t}
            onClick={() => setTipe(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tipe === t ? "bg-navy text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {t} {t !== "Semua" && `(${docs.filter((d) => d.tipe === t).length})`}
          </button>
        ))}
      </div>

      {/* Document cards */}
      <div className="space-y-3">
        {filtered.map((doc) => (
          <div key={doc.id} className="bg-white border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenId(openId === doc.id ? null : doc.id)}
              className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50/50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  doc.tipe === "CV" ? "bg-navy-soft text-navy" : "bg-gold-soft text-gold-deep"
                }`}
              >
                {doc.tipe === "CV" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 leading-snug">{doc.judul}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    doc.tipe === "CV" ? "bg-navy-soft text-navy" : "bg-gold-soft text-gold-deep"
                  }`}>
                    {doc.tipe}
                  </span>
                  <span className="text-[10px] text-gray-400">{doc.bidang}</span>
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${openId === doc.id ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {openId === doc.id && (
              <div className="px-4 pb-4 border-t border-border">
                <p className="text-sm text-gray-600 mt-3 mb-4 leading-relaxed">{doc.ringkasan}</p>

                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-navy mb-2">Struktur & Poin Penting</h4>
                  <ul className="space-y-1.5">
                    {doc.poin.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-navy-soft text-navy text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-teal-soft/50 border border-teal/10 rounded-lg p-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-teal mb-2">Mengapa Dokumen Ini Bagus?</h4>
                  <ul className="space-y-1">
                    {doc.mengapaBarik.map((m, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
