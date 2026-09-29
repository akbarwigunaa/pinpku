"use client";

import { CVData } from "@/lib/cv-types";
import { forwardRef } from "react";

interface CVPreviewProps {
  data: CVData;
}

function SectionDivider({ title, template }: { title: string; template: string }) {
  if (template === "modern") {
    return (
      <div className="mt-5 mb-2">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A2E4A] border-b-2 border-[#1A2E4A] pb-1">{title}</h2>
      </div>
    );
  }
  return (
    <div className="mt-5 mb-2">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-900 border-b border-gray-300 pb-1">{title}</h2>
    </div>
  );
}

function BulletList({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length <= 1) return <p className="text-[9.5px] text-gray-700 leading-relaxed">{text}</p>;
  return (
    <ul className="list-disc list-outside ml-3.5 space-y-0.5">
      {lines.map((line, i) => (
        <li key={i} className="text-[9.5px] text-gray-700 leading-relaxed">
          {line.replace(/^[-•]\s*/, "")}
        </li>
      ))}
    </ul>
  );
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(function CVPreview({ data }, ref) {
  const t = data.templateId;
  const hasContent =
    data.personal.namaLengkap ||
    data.pendidikan.length > 0 ||
    data.pengalaman.length > 0 ||
    data.keahlian.length > 0;

  if (!hasContent) {
    return (
      <div ref={ref} className="bg-white aspect-[210/297] flex items-center justify-center text-gray-300 text-sm">
        Preview CV akan muncul di sini
      </div>
    );
  }

  const groupedSkills = data.keahlian.reduce<Record<string, string[]>>((acc, k) => {
    if (!k.nama) return acc;
    const cat = k.kategori || "Lainnya";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(k.nama);
    return acc;
  }, {});

  return (
    <div
      ref={ref}
      className="bg-white text-gray-900"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: t === "modern" ? "14mm 16mm" : "16mm 18mm",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: "10px",
        lineHeight: "1.5",
      }}
    >
      {/* Header */}
      {t === "modern" ? (
        <div className="pb-3 border-b-2 border-[#1A2E4A]">
          <h1 className="text-[20px] font-bold text-[#1A2E4A] tracking-wide">{data.personal.namaLengkap}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-[9px] text-gray-600">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.telepon && <span>{data.personal.telepon}</span>}
            {data.personal.alamat && <span>{data.personal.alamat}</span>}
            {data.personal.linkedIn && <span>{data.personal.linkedIn}</span>}
          </div>
        </div>
      ) : (
        <div className="text-center pb-3">
          <h1 className="text-[18px] font-bold text-gray-900">{data.personal.namaLengkap}</h1>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 mt-1 text-[9px] text-gray-600">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.telepon && <span>| {data.personal.telepon}</span>}
            {data.personal.alamat && <span>| {data.personal.alamat}</span>}
            {data.personal.linkedIn && <span>| {data.personal.linkedIn}</span>}
          </div>
        </div>
      )}

      {/* Deskripsi */}
      {data.personal.deskripsi && (
        <>
          <SectionDivider title="Profil" template={t} />
          <p className="text-[9.5px] text-gray-700 leading-relaxed">{data.personal.deskripsi}</p>
        </>
      )}

      {/* Pendidikan */}
      {data.pendidikan.length > 0 && (
        <>
          <SectionDivider title="Pendidikan" template={t} />
          <div className="space-y-2">
            {data.pendidikan.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold">{p.institusi}</span>
                  <span className="text-[9px] text-gray-500 shrink-0 ml-4">{p.tahunMasuk}{p.tahunLulus ? ` – ${p.tahunLulus}` : ""}</span>
                </div>
                <div className="text-[9.5px] text-gray-600">
                  {p.jenjang} {p.jurusan}{p.ipk ? ` — IPK: ${p.ipk}` : ""}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pengalaman */}
      {data.pengalaman.length > 0 && (
        <>
          <SectionDivider title="Pengalaman" template={t} />
          <div className="space-y-3">
            {data.pengalaman.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold">{p.posisi}</span>
                  <span className="text-[9px] text-gray-500 shrink-0 ml-4">{p.mulai}{p.masihBekerja ? " – Sekarang" : p.selesai ? ` – ${p.selesai}` : ""}</span>
                </div>
                <div className="text-[9.5px] text-gray-600">{p.perusahaan}{p.lokasi ? `, ${p.lokasi}` : ""}</div>
                {p.deskripsi && <div className="mt-1"><BulletList text={p.deskripsi} /></div>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Organisasi */}
      {data.organisasi.length > 0 && (
        <>
          <SectionDivider title="Organisasi & Kegiatan" template={t} />
          <div className="space-y-2">
            {data.organisasi.map((o) => (
              <div key={o.id}>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold">{o.nama}</span>
                  <span className="text-[9px] text-gray-500 shrink-0 ml-4">{o.tahunMulai}{o.tahunSelesai ? ` – ${o.tahunSelesai}` : ""}</span>
                </div>
                <div className="text-[9.5px] text-gray-600">{o.posisi}</div>
                {o.deskripsi && <div className="mt-0.5"><BulletList text={o.deskripsi} /></div>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Keahlian */}
      {Object.keys(groupedSkills).length > 0 && (
        <>
          <SectionDivider title="Keahlian" template={t} />
          <div className="space-y-1">
            {Object.entries(groupedSkills).map(([cat, skills]) => (
              <div key={cat} className="text-[9.5px]">
                <span className="font-semibold text-gray-800">{cat}:</span>{" "}
                <span className="text-gray-600">{skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sertifikasi */}
      {data.sertifikasi.length > 0 && (
        <>
          <SectionDivider title="Sertifikasi" template={t} />
          <div className="space-y-1">
            {data.sertifikasi.map((s) => (
              <div key={s.id} className="flex justify-between items-baseline">
                <span className="text-[9.5px]">
                  <span className="font-semibold">{s.nama}</span>
                  {s.penerbit && <span className="text-gray-600"> — {s.penerbit}</span>}
                </span>
                {s.tahun && <span className="text-[9px] text-gray-500 shrink-0 ml-4">{s.tahun}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default CVPreview;
