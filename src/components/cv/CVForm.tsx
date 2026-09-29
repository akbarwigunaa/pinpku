"use client";

import { CVData, Pendidikan, Pengalaman, Keahlian, Organisasi, Sertifikasi, generateId } from "@/lib/cv-types";

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const sectionClass = "space-y-4";

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
  activeSection: string;
  onSectionChange: (s: string) => void;
}

const sections = [
  { id: "personal", label: "Data Pribadi" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "keahlian", label: "Keahlian" },
  { id: "organisasi", label: "Organisasi" },
  { id: "sertifikasi", label: "Sertifikasi" },
];

export default function CVForm({ data, onChange, activeSection, onSectionChange }: CVFormProps) {
  function updatePersonal(field: string, value: string) {
    onChange({ ...data, personal: { ...data.personal, [field]: value } });
  }

  function addPendidikan() {
    onChange({
      ...data,
      pendidikan: [
        ...data.pendidikan,
        { id: generateId(), institusi: "", jurusan: "", jenjang: "S1", tahunMasuk: "", tahunLulus: "", ipk: "" },
      ],
    });
  }

  function updatePendidikan(id: string, field: keyof Pendidikan, value: string) {
    onChange({
      ...data,
      pendidikan: data.pendidikan.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  }

  function removePendidikan(id: string) {
    onChange({ ...data, pendidikan: data.pendidikan.filter((p) => p.id !== id) });
  }

  function addPengalaman() {
    onChange({
      ...data,
      pengalaman: [
        ...data.pengalaman,
        { id: generateId(), perusahaan: "", posisi: "", lokasi: "", mulai: "", selesai: "", masihBekerja: false, deskripsi: "" },
      ],
    });
  }

  function updatePengalaman(id: string, field: keyof Pengalaman, value: string | boolean) {
    onChange({
      ...data,
      pengalaman: data.pengalaman.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  }

  function removePengalaman(id: string) {
    onChange({ ...data, pengalaman: data.pengalaman.filter((p) => p.id !== id) });
  }

  function addKeahlian() {
    onChange({
      ...data,
      keahlian: [...data.keahlian, { id: generateId(), nama: "", kategori: "Teknis" }],
    });
  }

  function updateKeahlian(id: string, field: keyof Keahlian, value: string) {
    onChange({
      ...data,
      keahlian: data.keahlian.map((k) => (k.id === id ? { ...k, [field]: value } : k)),
    });
  }

  function removeKeahlian(id: string) {
    onChange({ ...data, keahlian: data.keahlian.filter((k) => k.id !== id) });
  }

  function addOrganisasi() {
    onChange({
      ...data,
      organisasi: [
        ...data.organisasi,
        { id: generateId(), nama: "", posisi: "", tahunMulai: "", tahunSelesai: "", deskripsi: "" },
      ],
    });
  }

  function updateOrganisasi(id: string, field: keyof Organisasi, value: string) {
    onChange({
      ...data,
      organisasi: data.organisasi.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    });
  }

  function removeOrganisasi(id: string) {
    onChange({ ...data, organisasi: data.organisasi.filter((o) => o.id !== id) });
  }

  function addSertifikasi() {
    onChange({
      ...data,
      sertifikasi: [...data.sertifikasi, { id: generateId(), nama: "", penerbit: "", tahun: "" }],
    });
  }

  function updateSertifikasi(id: string, field: keyof Sertifikasi, value: string) {
    onChange({
      ...data,
      sertifikasi: data.sertifikasi.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    });
  }

  function removeSertifikasi(id: string) {
    onChange({ ...data, sertifikasi: data.sertifikasi.filter((s) => s.id !== id) });
  }

  return (
    <div>
      {/* Section tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSectionChange(s.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              activeSection === s.id
                ? "bg-navy text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Personal */}
      {activeSection === "personal" && (
        <div className={sectionClass}>
          <div>
            <label className={labelClass}>Nama Lengkap</label>
            <input className={inputClass} value={data.personal.namaLengkap} onChange={(e) => updatePersonal("namaLengkap", e.target.value)} placeholder="Nama lengkap sesuai KTP" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Email</label>
              <input className={inputClass} type="email" value={data.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} placeholder="email@contoh.com" />
            </div>
            <div>
              <label className={labelClass}>No. Telepon</label>
              <input className={inputClass} type="tel" value={data.personal.telepon} onChange={(e) => updatePersonal("telepon", e.target.value)} placeholder="08xxxxxxxxxx" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Alamat</label>
            <input className={inputClass} value={data.personal.alamat} onChange={(e) => updatePersonal("alamat", e.target.value)} placeholder="Kota, Provinsi" />
          </div>
          <div>
            <label className={labelClass}>LinkedIn (opsional)</label>
            <input className={inputClass} value={data.personal.linkedIn} onChange={(e) => updatePersonal("linkedIn", e.target.value)} placeholder="linkedin.com/in/username" />
          </div>
          <div>
            <label className={labelClass}>Deskripsi Profil</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              value={data.personal.deskripsi}
              onChange={(e) => updatePersonal("deskripsi", e.target.value)}
              placeholder="Ringkasan singkat tentang diri, pengalaman, dan tujuan karir..."
            />
          </div>
        </div>
      )}

      {/* Pendidikan */}
      {activeSection === "pendidikan" && (
        <div className={sectionClass}>
          {data.pendidikan.map((p, i) => (
            <div key={p.id} className="p-4 rounded-lg border border-border bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase">Pendidikan {i + 1}</span>
                <button onClick={() => removePendidikan(p.id)} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
              </div>
              <div>
                <label className={labelClass}>Institusi</label>
                <input className={inputClass} value={p.institusi} onChange={(e) => updatePendidikan(p.id, "institusi", e.target.value)} placeholder="Universitas Muhammadiyah Sidoarjo" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Jurusan / Program Studi</label>
                  <input className={inputClass} value={p.jurusan} onChange={(e) => updatePendidikan(p.id, "jurusan", e.target.value)} placeholder="Informatika" />
                </div>
                <div>
                  <label className={labelClass}>Jenjang</label>
                  <select className={inputClass} value={p.jenjang} onChange={(e) => updatePendidikan(p.id, "jenjang", e.target.value)}>
                    <option>SMA/SMK</option>
                    <option>D3</option>
                    <option>D4</option>
                    <option>S1</option>
                    <option>S2</option>
                    <option>S3</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Tahun Masuk</label>
                  <input className={inputClass} value={p.tahunMasuk} onChange={(e) => updatePendidikan(p.id, "tahunMasuk", e.target.value)} placeholder="2020" />
                </div>
                <div>
                  <label className={labelClass}>Tahun Lulus</label>
                  <input className={inputClass} value={p.tahunLulus} onChange={(e) => updatePendidikan(p.id, "tahunLulus", e.target.value)} placeholder="2024" />
                </div>
                <div>
                  <label className={labelClass}>IPK (opsional)</label>
                  <input className={inputClass} value={p.ipk} onChange={(e) => updatePendidikan(p.id, "ipk", e.target.value)} placeholder="3.75" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addPendidikan} className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-navy hover:text-navy transition-colors">
            + Tambah Pendidikan
          </button>
        </div>
      )}

      {/* Pengalaman */}
      {activeSection === "pengalaman" && (
        <div className={sectionClass}>
          {data.pengalaman.map((p, i) => (
            <div key={p.id} className="p-4 rounded-lg border border-border bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase">Pengalaman {i + 1}</span>
                <button onClick={() => removePengalaman(p.id)} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Perusahaan / Instansi</label>
                  <input className={inputClass} value={p.perusahaan} onChange={(e) => updatePengalaman(p.id, "perusahaan", e.target.value)} placeholder="PT Contoh Indonesia" />
                </div>
                <div>
                  <label className={labelClass}>Posisi</label>
                  <input className={inputClass} value={p.posisi} onChange={(e) => updatePengalaman(p.id, "posisi", e.target.value)} placeholder="Software Engineer" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Lokasi</label>
                <input className={inputClass} value={p.lokasi} onChange={(e) => updatePengalaman(p.id, "lokasi", e.target.value)} placeholder="Surabaya, Jawa Timur" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Mulai</label>
                  <input className={inputClass} value={p.mulai} onChange={(e) => updatePengalaman(p.id, "mulai", e.target.value)} placeholder="Jan 2023" />
                </div>
                <div>
                  <label className={labelClass}>Selesai</label>
                  <input
                    className={inputClass}
                    value={p.masihBekerja ? "" : p.selesai}
                    onChange={(e) => updatePengalaman(p.id, "selesai", e.target.value)}
                    placeholder="Des 2024"
                    disabled={p.masihBekerja}
                  />
                  <label className="flex items-center gap-1.5 mt-1.5">
                    <input
                      type="checkbox"
                      checked={p.masihBekerja}
                      onChange={(e) => updatePengalaman(p.id, "masihBekerja", e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-500">Masih bekerja</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Deskripsi Pekerjaan</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={p.deskripsi}
                  onChange={(e) => updatePengalaman(p.id, "deskripsi", e.target.value)}
                  placeholder="Tuliskan tanggung jawab dan pencapaian utama. Pisahkan setiap poin dengan baris baru."
                />
              </div>
            </div>
          ))}
          <button onClick={addPengalaman} className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-navy hover:text-navy transition-colors">
            + Tambah Pengalaman
          </button>
        </div>
      )}

      {/* Keahlian */}
      {activeSection === "keahlian" && (
        <div className={sectionClass}>
          {data.keahlian.length > 0 && (
            <div className="space-y-2">
              {data.keahlian.map((k) => (
                <div key={k.id} className="flex items-center gap-2">
                  <input
                    className={`${inputClass} flex-1`}
                    value={k.nama}
                    onChange={(e) => updateKeahlian(k.id, "nama", e.target.value)}
                    placeholder="Nama keahlian"
                  />
                  <select
                    className={`${inputClass} w-32`}
                    value={k.kategori}
                    onChange={(e) => updateKeahlian(k.id, "kategori", e.target.value)}
                  >
                    <option>Teknis</option>
                    <option>Bahasa</option>
                    <option>Soft Skill</option>
                    <option>Tools</option>
                  </select>
                  <button onClick={() => removeKeahlian(k.id)} className="text-red-400 hover:text-red-600 shrink-0 p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <button onClick={addKeahlian} className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-navy hover:text-navy transition-colors">
            + Tambah Keahlian
          </button>
        </div>
      )}

      {/* Organisasi */}
      {activeSection === "organisasi" && (
        <div className={sectionClass}>
          {data.organisasi.map((o, i) => (
            <div key={o.id} className="p-4 rounded-lg border border-border bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase">Organisasi {i + 1}</span>
                <button onClick={() => removeOrganisasi(o.id)} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Nama Organisasi</label>
                  <input className={inputClass} value={o.nama} onChange={(e) => updateOrganisasi(o.id, "nama", e.target.value)} placeholder="BEM Fakultas Teknik" />
                </div>
                <div>
                  <label className={labelClass}>Posisi / Jabatan</label>
                  <input className={inputClass} value={o.posisi} onChange={(e) => updateOrganisasi(o.id, "posisi", e.target.value)} placeholder="Ketua Divisi IT" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Tahun Mulai</label>
                  <input className={inputClass} value={o.tahunMulai} onChange={(e) => updateOrganisasi(o.id, "tahunMulai", e.target.value)} placeholder="2021" />
                </div>
                <div>
                  <label className={labelClass}>Tahun Selesai</label>
                  <input className={inputClass} value={o.tahunSelesai} onChange={(e) => updateOrganisasi(o.id, "tahunSelesai", e.target.value)} placeholder="2023" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Deskripsi (opsional)</label>
                <textarea className={`${inputClass} resize-none`} rows={2} value={o.deskripsi} onChange={(e) => updateOrganisasi(o.id, "deskripsi", e.target.value)} placeholder="Kegiatan dan kontribusi utama..." />
              </div>
            </div>
          ))}
          <button onClick={addOrganisasi} className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-navy hover:text-navy transition-colors">
            + Tambah Organisasi
          </button>
        </div>
      )}

      {/* Sertifikasi */}
      {activeSection === "sertifikasi" && (
        <div className={sectionClass}>
          {data.sertifikasi.map((s, i) => (
            <div key={s.id} className="p-4 rounded-lg border border-border bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase">Sertifikasi {i + 1}</span>
                <button onClick={() => removeSertifikasi(s.id)} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
              </div>
              <div>
                <label className={labelClass}>Nama Sertifikasi</label>
                <input className={inputClass} value={s.nama} onChange={(e) => updateSertifikasi(s.id, "nama", e.target.value)} placeholder="Google Data Analytics Certificate" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Penerbit</label>
                  <input className={inputClass} value={s.penerbit} onChange={(e) => updateSertifikasi(s.id, "penerbit", e.target.value)} placeholder="Google / Coursera" />
                </div>
                <div>
                  <label className={labelClass}>Tahun</label>
                  <input className={inputClass} value={s.tahun} onChange={(e) => updateSertifikasi(s.id, "tahun", e.target.value)} placeholder="2024" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addSertifikasi} className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-navy hover:text-navy transition-colors">
            + Tambah Sertifikasi
          </button>
        </div>
      )}
    </div>
  );
}
