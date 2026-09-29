import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import BankContohClient from "./BankContohClient";

export const dynamic = "force-dynamic";

export default async function BankContohPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const { data } = await supabase
    .from("bank_contoh")
    .select("*")
    .order("id");

  const docs = (data ?? []).map((d) => ({
    id: d.id,
    judul: d.judul,
    tipe: d.tipe as "CV" | "Surat Lamaran",
    bidang: d.bidang,
    ringkasan: d.ringkasan,
    poin: d.poin,
    mengapaBarik: d.mengapa_barik,
  }));

  return (
    <div className="min-h-screen bg-bg">
      <Navbar userName={session.name} />
      <BankContohClient docs={docs} />
    </div>
  );
}
