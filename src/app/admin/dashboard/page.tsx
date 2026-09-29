import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";

const menuItems = [
  {
    href: "/admin/mahasiswa",
    title: "Data Mahasiswa",
    desc: "Kelola data login mahasiswa — tambah, hapus, atau import dari CSV",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "bg-navy-soft text-navy",
  },
  {
    href: "/admin/bank-contoh",
    title: "Bank Contoh Dokumen",
    desc: "Tambah, edit, atau hapus contoh CV dan surat lamaran",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    color: "bg-gold-soft text-gold-deep",
  },
  {
    href: "/admin/tips-wawancara",
    title: "Tips Wawancara",
    desc: "Edit pertanyaan, tips, dan contoh jawaban wawancara",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "bg-teal-soft text-teal",
  },
];

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <div className="min-h-screen bg-bg">
      <AdminNavbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Kelola konten dan data PINPKU.</p>
        </div>

        <div className="grid gap-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-4 p-5 rounded-xl bg-white border border-border hover:border-navy/20 hover:shadow-sm transition-all"
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-display)] text-sm font-semibold text-gray-900 group-hover:text-navy transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 shrink-0 mt-1 group-hover:text-navy/50 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
