"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/mahasiswa", label: "Mahasiswa" },
  { href: "/admin/bank-contoh", label: "Bank Contoh" },
  { href: "/admin/tips-wawancara", label: "Tips Wawancara" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <header className="bg-navy-deep text-white border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center text-navy-deep text-xs font-bold">
              A
            </div>
            <span className="font-[var(--font-display)] font-semibold text-sm tracking-wide">
              PINPKU Admin
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-white/50 hover:text-white transition-colors"
        >
          Keluar
        </button>
      </div>
      {/* Mobile nav */}
      <nav className="sm:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              pathname.startsWith(item.href)
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
