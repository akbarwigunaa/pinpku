import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import TipsWawancaraClient from "./TipsWawancaraClient";

export const dynamic = "force-dynamic";

export default async function TipsWawancaraPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const { data } = await supabase
    .from("tips_wawancara")
    .select("id, pertanyaan, kategori, tips, contoh_jawaban")
    .order("sort_order");

  const tips = (data ?? []).map((t) => ({
    id: t.id,
    pertanyaan: t.pertanyaan,
    kategori: t.kategori,
    tips: t.tips,
    contohJawaban: t.contoh_jawaban,
  }));

  const kategoriList = ["Semua", ...Array.from(new Set(tips.map((t) => t.kategori)))];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar userName={session.name} />
      <TipsWawancaraClient tips={tips} kategoriList={kategoriList} />
    </div>
  );
}
