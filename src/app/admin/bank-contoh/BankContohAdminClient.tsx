"use client";

import { useState, useEffect, useRef } from "react";

interface Dokumen {
  id: string;
  judul: string;
  tipe: "CV" | "Surat Lamaran";
  bidang: string;
  ringkasan: string;
  poin: string[];
  mengapa_barik: string[];
}

const emptyDoc: Omit<Dokumen, "id"> & { id: string } = {
  id: "",
  judul: "",
  tipe: "CV",
  bidang: "",
  ringkasan: "",
  poin: [""],
  mengapa_barik: [""],
};

export default function BankContohAdminClient() {
  const [docs, setDocs] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Dokumen | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function downloadTemplate() {
    const csv = `id,judul,tipe,bidang,ringkasan,poin (pisahkan dengan |),mengapa_barik (pisahkan dengan |)
cv-5,CV Lulusan Akuntansi,CV,Akuntansi & Keuangan,CV untuk lulusan akuntansi yang menonjolkan sertifikasi dan pengalaman magang.,Profil singkat 2-3 kalimat|Pendidikan dengan IPK|Pengalaman magang di KAP|Sertifikasi: Brevet A/B,Struktur rapi dan profesional|Sertifikasi relevan dicantumkan|Pengalaman diukur dengan angka
sl-4,Surat Lamaran Data Analyst,Surat Lamaran,Teknologi Informasi,Surat lamaran untuk posisi data analyst.,Pembuka menyebutkan posisi|Latar belakang pendidikan|Pengalaman analisis data|Motivasi bergabung,Menyebutkan tools yang dikuasai|Menunjukkan hasil analisis konkret`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_bank_contoh.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCSVUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.trim().split("\n");
    const header = lines[0].toLowerCase();

    if (!header.includes("id") || !header.includes("judul") || !header.includes("tipe")) {
      setMsg({ text: "Format CSV tidak valid. Pastikan ada kolom: id, judul, tipe, bidang, ringkasan, poin, mengapa_barik", type: "error" });
      return;
    }

    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
      if (cols.length < 5 || !cols[0] || !cols[1]) continue;

      const doc = {
        id: cols[0],
        judul: cols[1],
        tipe: cols[2] || "CV",
        bidang: cols[3] || "",
        ringkasan: cols[4] || "",
        poin: cols[5] ? cols[5].split("|").map((s) => s.trim()).filter(Boolean) : [],
        mengapa_barik: cols[6] ? cols[6].split("|").map((s) => s.trim()).filter(Boolean) : [],
      };

      const res = await fetch("/api/admin/bank-contoh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      if (res.ok) imported++;
    }

    setMsg({ text: `${imported} dokumen berhasil diimport.`, type: imported > 0 ? "success" : "error" });
    fetchDocs();
    if (fileRef.current) fileRef.current.value = "";
  }

  async function fetchDocs() {
    setLoading(true);
    const res = await fetch("/api/admin/bank-contoh");
    if (res.ok) setDocs(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchDocs(); }, []);

  function startAdd() {
    setEditing({ ...emptyDoc });
    setIsNew(true);
  }

  function startEdit(doc: Dokumen) {
    setEditing({ ...doc, poin: [...doc.poin], mengapa_barik: [...doc.mengapa_barik] });
    setIsNew(false);
  }

  function updateField(field: keyof Dokumen, value: string) {
    if (!editing) return;
    setEditing({ ...editing, [field]: value } as Dokumen);
  }

  function updateArrayItem(field: "poin" | "mengapa_barik", idx: number, value: string) {
    if (!editing) return;
    const arr = [...editing[field]];
    arr[idx] = value;
    setEditing({ ...editing, [field]: arr });
  }

  function addArrayItem(field: "poin" | "mengapa_barik") {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...editing[field], ""] });
  }

  function removeArrayItem(field: "poin" | "mengapa_barik", idx: number) {
    if (!editing) return;
    setEditing({ ...editing, [field]: editing[field].filter((_, i) => i !== idx) });
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setMsg(null);

    const payload = {
      ...editing,
      poin: editing.poin.filter((p) => p.trim()),
      mengapa_barik: editing.mengapa_barik.filter((m) => m.trim()),
    };

    const url = isNew ? "/api/admin/bank-contoh" : `/api/admin/bank-contoh/${editing.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMsg({ text: isNew ? "Dokumen berhasil ditambahkan." : "Dokumen berhasil diupdate.", type: "success" });
      setEditing(null);
      fetchDocs();
    } else {
      const data = await res.json();
      setMsg({ text: data.error || "Gagal menyimpan.", type: "error" });
    }
    setSaving(false);
  }

  async function handleDelete(doc: Dokumen) {
    if (!confirm(`Hapus "${doc.judul}"?`)) return;

    const res = await fetch(`/api/admin/bank-contoh/${doc.id}`, { method: "DELETE" });
    if (res.ok) {
      setMsg({ text: "Dokumen berhasil dihapus.", type: "success" });
      fetchDocs();
    } else {
      setMsg({ text: "Gagal menghapus.", type: "error" });
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">Bank Contoh Dokumen</h1>
          <p className="text-sm text-gray-500 mt-1">{docs.length} dokumen</p>
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
              + Tambah Dokumen
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
            {isNew ? "Tambah Dokumen Baru" : `Edit: ${editing.judul}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isNew && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">ID (unik)</label>
                <input value={editing.id} onChange={(e) => updateField("id", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" placeholder="cv-5" />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Judul</label>
              <input value={editing.judul} onChange={(e) => updateField("judul", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tipe</label>
              <select value={editing.tipe} onChange={(e) => updateField("tipe", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20">
                <option value="CV">CV</option>
                <option value="Surat Lamaran">Surat Lamaran</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Bidang</label>
              <input value={editing.bidang} onChange={(e) => updateField("bidang", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" placeholder="Teknologi Informasi" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Ringkasan</label>
            <textarea value={editing.ringkasan} onChange={(e) => updateField("ringkasan", e.target.value)}
              rows={2} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none" />
          </div>

          {/* Poin */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Struktur & Poin Penting</label>
            {editing.poin.map((p, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <span className="text-xs text-gray-400 mt-2.5 w-4 shrink-0">{i + 1}.</span>
                <input value={p} onChange={(e) => updateArrayItem("poin", i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" />
                <button onClick={() => removeArrayItem("poin", i)} className="text-red-400 hover:text-red-600 text-xs px-1">x</button>
              </div>
            ))}
            <button onClick={() => addArrayItem("poin")}
              className="text-xs text-navy hover:underline">+ Tambah poin</button>
          </div>

          {/* Mengapa Barik */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Mengapa Dokumen Ini Bagus?</label>
            {editing.mengapa_barik.map((m, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={m} onChange={(e) => updateArrayItem("mengapa_barik", i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" />
                <button onClick={() => removeArrayItem("mengapa_barik", i)} className="text-red-400 hover:text-red-600 text-xs px-1">x</button>
              </div>
            ))}
            <button onClick={() => addArrayItem("mengapa_barik")}
              className="text-xs text-navy hover:underline">+ Tambah alasan</button>
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

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Memuat...</div>
        ) : docs.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Belum ada dokumen.</div>
        ) : (
          docs.map((doc) => (
            <div key={doc.id} className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                doc.tipe === "CV" ? "bg-navy-soft text-navy" : "bg-gold-soft text-gold-deep"
              }`}>
                <span className="text-xs font-bold">{doc.tipe === "CV" ? "CV" : "SL"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{doc.judul}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    doc.tipe === "CV" ? "bg-navy-soft text-navy" : "bg-gold-soft text-gold-deep"
                  }`}>{doc.tipe}</span>
                  <span className="text-[10px] text-gray-400">{doc.bidang}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{doc.ringkasan}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(doc)} className="text-xs text-navy hover:underline">Edit</button>
                <button onClick={() => handleDelete(doc)} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
