"use client";

import { useState, useEffect, useRef } from "react";

interface Student {
  nim: string;
  name: string;
  date_of_birth: string;
}

export default function MahasiswaClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [nim, setNim] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchStudents() {
    setLoading(true);
    const res = await fetch("/api/admin/mahasiswa");
    if (res.ok) setStudents(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchStudents(); }, []);

  function downloadTemplate() {
    const csv = "nim,name,date_of_birth\n2120001,Ahmad Rizky Pratama,2002-05-15\n2120002,Siti Nurhaliza,2001-11-20";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_mahasiswa.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCSVUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.trim().split("\n");
    const header = lines[0].toLowerCase();

    if (!header.includes("nim") || !header.includes("name") || !header.includes("date_of_birth")) {
      setMsg({ text: "Format CSV tidak valid. Pastikan ada kolom: nim, name, date_of_birth", type: "error" });
      return;
    }

    const rows: Student[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
      if (cols.length >= 3 && cols[0] && cols[1] && cols[2]) {
        rows.push({ nim: cols[0], name: cols[1], date_of_birth: cols[2] });
      }
    }

    if (rows.length === 0) {
      setMsg({ text: "Tidak ada data valid ditemukan dalam CSV.", type: "error" });
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/mahasiswa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rows),
    });

    if (res.ok) {
      const data = await res.json();
      setMsg({ text: `${data.inserted} mahasiswa berhasil diimport.`, type: "success" });
      fetchStudents();
    } else {
      const data = await res.json();
      setMsg({ text: data.error || "Gagal import CSV.", type: "error" });
    }
    setSaving(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    const res = await fetch("/api/admin/mahasiswa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nim, name, date_of_birth: dob }),
    });

    if (res.ok) {
      setMsg({ text: `Mahasiswa ${name} berhasil ditambahkan.`, type: "success" });
      setNim(""); setName(""); setDob("");
      setShowAdd(false);
      fetchStudents();
    } else {
      const data = await res.json();
      setMsg({ text: data.error || "Gagal menambahkan.", type: "error" });
    }
    setSaving(false);
  }

  async function handleDelete(s: Student) {
    if (!confirm(`Hapus ${s.name} (${s.nim})?`)) return;

    const res = await fetch(`/api/admin/mahasiswa/${s.nim}`, { method: "DELETE" });
    if (res.ok) {
      setMsg({ text: `${s.name} berhasil dihapus.`, type: "success" });
      fetchStudents();
    } else {
      setMsg({ text: "Gagal menghapus.", type: "error" });
    }
  }

  const filtered = students.filter(
    (s) => s.nim.includes(search) || s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">
            Data Mahasiswa
          </h1>
          <p className="text-sm text-gray-500 mt-1">{students.length} mahasiswa terdaftar</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadTemplate}
            className="px-3 py-2 text-xs font-medium text-navy border border-navy/20 rounded-lg hover:bg-navy-soft transition-colors"
          >
            Unduh Template CSV
          </button>
          <label className="px-3 py-2 text-xs font-medium text-gold-deep border border-gold/30 rounded-lg hover:bg-gold-soft transition-colors cursor-pointer">
            Import CSV
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-3 py-2 text-xs font-medium text-white bg-navy rounded-lg hover:bg-navy-deep transition-colors"
          >
            + Tambah
          </button>
        </div>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm ${
          msg.type === "success" ? "bg-teal-soft text-teal" : "bg-red-50 text-red-600"
        }`}>
          {msg.text}
        </div>
      )}

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white border border-border rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">NIM</label>
              <input value={nim} onChange={(e) => setNim(e.target.value)} required
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" placeholder="2120001" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nama Lengkap</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" placeholder="Ahmad Rizky" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Lahir</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAdd(false)}
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700">Batal</button>
            <button type="submit" disabled={saving}
              className="px-4 py-1.5 text-xs font-medium text-white bg-navy rounded-lg disabled:opacity-50">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari NIM atau nama..."
          className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50/50">
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs">NIM</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs">Nama</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs">Tgl Lahir</th>
                <th className="px-4 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Memuat...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  {search ? "Tidak ditemukan." : "Belum ada data mahasiswa."}
                </td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.nim} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs">{s.nim}</td>
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3 text-gray-500">{s.date_of_birth}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(s)}
                        className="text-red-400 hover:text-red-600 transition-colors text-xs">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
