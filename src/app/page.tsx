"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [nim, setNim] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nim, dateOfBirth }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-navy-soft/50" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gold-soft/40" />
      </div>

      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy mb-4">
          <span className="font-[var(--font-display)] text-2xl font-extrabold text-white tracking-wider">
            P
          </span>
        </div>
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-navy tracking-wide">
          PINPKU
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Pusat Informasi dan Pengembangan Karir Umsida
        </p>
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="font-[var(--font-display)] text-lg font-semibold text-navy mb-1">
          Masuk
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Gunakan NIM dan tanggal lahir untuk mengakses platform.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nim"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              NIM
            </label>
            <input
              id="nim"
              type="text"
              inputMode="numeric"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Masukkan NIM"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-sm
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                         transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Tanggal Lahir
            </label>
            <input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-sm
                         text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                         transition-colors"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-navy text-white text-sm font-semibold
                       hover:bg-navy-mid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>
      </div>

      <a
        href="/admin"
        className="mt-6 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-navy transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Login Admin
      </a>

      <p className="mt-3 text-xs text-gray-400 text-center">
        &copy; 2026 Universitas Muhammadiyah Sidoarjo
      </p>
    </div>
  );
}
