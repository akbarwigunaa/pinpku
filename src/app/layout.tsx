import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PINPKU — Pusat Informasi dan Pengembangan Karir Umsida",
  description:
    "Platform karir digital untuk mahasiswa dan alumni Universitas Muhammadiyah Sidoarjo. Buat CV, surat lamaran, dan persiapkan wawancara kerja.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
