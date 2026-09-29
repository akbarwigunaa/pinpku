"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { CVData, emptyCVData } from "@/lib/cv-types";
import CVForm from "@/components/cv/CVForm";
import CVPreview from "@/components/cv/CVPreview";

const STORAGE_KEY = "pinpku_cv_data";
const templates = [
  { id: "classic", label: "Klasik", desc: "Layout simetris, formal" },
  { id: "modern", label: "Modern", desc: "Aksen warna, garis tebal" },
];

function loadFromStorage(): CVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return emptyCVData;
}

function PreviewScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 400;
      const a4Width = 794; // 210mm in px at 96dpi
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
          height: `calc(297mm * ${scale > 0 ? 1 : 1})`,
          marginBottom: `calc(297mm * ${scale - 1})`,
        }}
        className="shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}

export default function CVBuilderClient({ userName }: { userName: string }) {
  const [data, setData] = useState<CVData>(emptyCVData);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(loadFromStorage());
    setLoaded(true);
  }, []);

  const saveToStorage = useCallback((d: CVData) => {
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

  function handlePrint() {
    const el = previewRef.current;
    if (!el) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8" />
<title>CV - ${data.personal.namaLengkap || userName}</title>
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
    setTimeout(() => {
      printWindow.print();
    }, 400);
  }

  function handleReset() {
    if (confirm("Hapus semua data CV? Data yang sudah diisi akan hilang.")) {
      setData(emptyCVData);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }

  if (!loaded) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse bg-gray-100 rounded-xl h-96" />
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">Buat CV</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Isi data, pilih template, lalu cetak.
            {saved && <span className="ml-2 text-teal text-xs">Tersimpan</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors lg:hidden"
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-navy text-white hover:bg-navy-mid transition-colors"
          >
            Cetak PDF
          </button>
        </div>
      </div>

      {/* Template picker */}
      <div className="flex gap-2 mb-6">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setData({ ...data, templateId: tmpl.id })}
            className={`px-3.5 py-2 rounded-lg text-sm border transition-colors ${
              data.templateId === tmpl.id
                ? "border-navy bg-navy-soft text-navy font-medium"
                : "border-border text-gray-500 hover:border-gray-300"
            }`}
          >
            <span className="font-medium">{tmpl.label}</span>
            <span className="hidden sm:inline text-xs ml-1.5 opacity-70">— {tmpl.desc}</span>
          </button>
        ))}
      </div>

      {/* Content: form + preview */}
      <div className="flex gap-6">
        {/* Form */}
        <div className={`w-full lg:w-[420px] shrink-0 ${showPreview ? "hidden lg:block" : ""}`}>
          <div className="bg-white border border-border rounded-xl p-5">
            <CVForm
              data={data}
              onChange={setData}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>

        {/* Preview */}
        <div className={`flex-1 min-w-0 ${!showPreview ? "hidden lg:block" : ""}`}>
          <div className="sticky top-[72px]">
            <PreviewScaler>
              <CVPreview ref={previewRef} data={data} />
            </PreviewScaler>
          </div>
        </div>
      </div>
    </main>
  );
}
