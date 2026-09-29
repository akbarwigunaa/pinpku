"use client";

import { useState, useEffect, useRef } from "react";

interface TipItem {
  id: string;
  pertanyaan: string;
  kategori: string;
  tips: string;
  contoh_jawaban: string;
  sort_order: number;
}

const kategoriOptions = [
  "Tentang Diri",
  "Motivasi & Tujuan",
  "Pengalaman & Kompetensi",
  "Situasional",
  "Penutup",
];

const emptyTip = { pertanyaan: "", kategori: "Tentang Diri", tips: "", contoh_jawaban: "" };

export default function TipsAdminClient() {
  const [items, setItems] = useState<TipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TipItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterKat, setFilterKat] = useState("Semua");
  const fileRef = useRef<HTMLInputElement>(null);

  function downloadTemplate() {
    const csv = `pertanyaan,kategori,tips,contoh_jawaban
Ceritakan tentang diri Anda.,Tentang Diri,"Fokus pada latar belakang pendidikan dan pengalaman relevan. Hindari cerita terlalu personal.","Perkenalkan saya [Nama], lulusan [Jurusan] dari [Universitas]. Selama kuliah saya aktif di organisasi mahasiswa dan menyelesaikan proyek [X]. Saya tertarik dengan posisi ini karena sesuai dengan keahlian saya di bidang [Y]."
Apa kelebihan Anda?,Tentang Diri,"Pilih 2-3 kelebihan yang relevan dengan posisi. Berikan contoh konkret.","Saya memiliki kemampuan analisis yang kuat. Misalnya saat magang di [Perusahaan], saya berhasil menganalisis data penjualan dan memberikan rekomendasi yang meningkatkan efisiensi 15%."`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_tips_wawancara.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCSVUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const ch of text) {
      if (ch === '"') { inQuotes = !inQuotes; current += ch; }
      else if (ch === "\n" && !inQuotes) { lines.push(current); current = ""; }
      else { current += ch; }
    }
    if (current.trim()) lines.push(current);

    const header = lines[0].toLowerCase();
    if (!header.includes("pertanyaan") || !header.includes("kategori")) {
      setMsg({ text: "Format CSV tidak valid. Pastikan ada kolom: pertanyaan, kategori, tips, contoh_jawaban", type: "error" });
      return;
    }

    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols: string[] = [];
      let cur = "";
      let q = false;
      for (const ch of lines[i]) {
        if (ch === '"') { q = !q; }
        else if (ch === "," && !q) { cols.push(cur.trim()); cur = ""; }
        else { cur += ch; }
      }
      cols.push(cur.trim());

      if (cols.length < 2 || !cols[0]) continue;

      const tip = {
        pertanyaan: cols[0],
        kategori: cols[1] || "Tentang Diri",
        tips: cols[2] || "",
        contoh_jawaban: cols[3] || "",
      };

      const res = await fetch("/api/admin/tips-wawancara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tip),
      });
      if (res.ok) imported++;
    }

    setMsg({ text: `${imported} pertanyaan berhasil diimport.`, type: imported > 0 ? "success" : "error" });
    fetchTips();
    if (fileRef.current) fileRef.current.value = "";
  }

  async function fetchTips() {
    setLoading(true);
    const res = await fetch("/api/admin/tips-wawancara");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchTips(); }, []);

  function startAdd() {
    setEditing({ id: "", ...emptyTip, sort_order: 0 });
    setIsNew(true);
  }

  function startEdit(item: TipItem) {
    setEditing({ ...item });
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setMsg(null);

    const url = isNew ? "/api/admin/tips-wawancara" : `/api/admin/tips-wawancara/${editing.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    if (res.ok) {
      setMsg({ text: isNew ? "Pertanyaan berhasil ditambahkan." : "Pertanyaan berhasil diupdate.", type: "success" });
      setEditing(null);
      fetchTips();
    } else {
      const data = await res.json();
      setMsg({ text: data.error || "Gagal menyimpan.", type: "error" });
    }
    setSaving(false);
  }

  async function handleDelete(item: TipItem) {
    if (!confirm(`Hapus pertanyaan "${item.pertanyaan}"?`)) return;

    const res = await fetch(`/api/admin/tips-wawancara/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      setMsg({ text: "Pertanyaan berhasil dihapus.", type: "success" });
      fetchTips();
    } else {
      setMsg({ text: "Gagal menghapus.", type: "error" });
    }
  }

  const filtered = filterKat === "Semua" ? items : items.filter((i) => i.kategori === filterKat);
  const categories = ["Semua", ...kategoriOptions];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">Tips Wawancara</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} pertanyaan</p>
        </div>
        {!editing && (
          <div className="flex gap-2 flex-wrap">
            <button onClick={downloadTemplate}
              className="px-3 py-2 text-xs font-medium text-navy border border-navy rounded-lg hover:bg-navy-soft transition-colors">
              Unduh Template CSV
            </button>
            <label className="px-3 py-2 text-xs font-medium text-gold-deep border border-gold rounded-lg hover:bg-gold-soft transition-colors cursor-pointer">
              Import CSV
              <input ref={fileRef} type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
            </label>
            <button onClick={startAdd}
              className="px-3 py-2 text-xs font-medium text-white bg-navy rounded-lg hover:bg-navy-deep transition-colors">
              + Tambah Pertanyaan
            </button>
          </div>
        )}
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm ${
          msg.type === "success" ? "bg-teal-soft text-teal" : "bg-red-50 text-red-600"
        }`}>{msg.text}</div>
      )}

      {/* Edit/Add form */}
      {editing && (
        <div className="bg-white border border-border rounded-xl p-5 mb-6 space-y-4">
          <h2 className="font-[var(--font-display)] text-sm font-semibold text-gray-900">
            {isNew ? "Tambah Pertanyaan Baru" : "Edit Pertanyaan"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Pertanyaan</label>
              <input value={editing.pertanyaan}
                onChange={(e) => setEditing({ ...editing, pertanyaan: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                placeholder="Ceritakan tentang diri Anda." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
              <select value={editing.kategori}
                onChange={(e) => setEditing({ ...editing, kategori: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20">
                {kategoriOptions.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tips Menjawab</label>
            <textarea value={editing.tips}
              onChange={(e) => setEditing({ ...editing, tips: e.target.value })}
              rows={3} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Contoh Jawaban</label>
            <textarea value={editing.contoh_jawaban}
              onChange={(e) => setEditing({ ...editing, contoh_jawaban: e.target.value })}
              rows={4} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none" />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-xs text-gray-500 hover:text-gray-700">Batal</button>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 text-xs font-medium text-white bg-navy rounded-lg disabled:opacity-50">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {categories.map((k) => (
          <button key={k} onClick={() => setFilterKat(k)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filterKat === k ? "bg-navy text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}>
            {k} {k !== "Semua" && `(${items.filter((i) => i.kategori === k).length})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Memuat...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Tidak ada pertanyaan.</div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="bg-white border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900">{item.pertanyaan}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-navy-soft text-navy">
                    {item.kategori}
                  </span>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.tips}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(item)} className="text-xs text-navy hover:underline">Edit</button>
                  <button onClick={() => handleDelete(item)} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
