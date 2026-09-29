import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const features = [
  {
    href: "/cv-builder",
    title: "Buat CV",
    desc: "Template ATS-friendly, langsung cetak atau simpan PDF",
    color: "bg-navy-soft text-navy",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    href: "/surat-lamaran",
    title: "Surat Lamaran",
    desc: "Panduan per paragraf, terstruktur dan siap kirim",
    color: "bg-gold-soft text-gold-deep",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    href: "/tips-wawancara",
    title: "Tips Wawancara",
    desc: "Bank pertanyaan umum beserta contoh jawaban",
    color: "bg-teal-soft text-teal",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/bank-contoh",
    title: "Bank Contoh",
    desc: "Koleksi CV dan surat lamaran terbaik sebagai referensi",
    color: "bg-purple-soft text-purple",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

const externalLinks = [
  { href: "#", label: "Portal Lowongan Kerja", note: "Web eksternal" },
  { href: "#", label: "Tracer Study UMSIDA", note: "Web eksternal" },
];

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const firstName = session.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar userName={session.name} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">
            Halo, {firstName}!
          </h1>
          <p className="text-gray-500 mt-1">
            Siapkan langkah karirmu dari sini.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-border
                         hover:border-navy/20 hover:shadow-sm transition-all"
            >
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}
              >
                {f.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-display)] text-sm font-semibold text-gray-900 group-hover:text-navy transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* External links */}
        <div className="mt-8">
          <h2 className="font-[var(--font-display)] text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Tautan terkait
          </h2>
          <div className="flex flex-wrap gap-2">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-border
                           text-sm text-gray-600 hover:border-gray-300 hover:text-gray-800 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
