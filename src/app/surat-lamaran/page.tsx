import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import SuratLamaranClient from "./SuratLamaranClient";

export default async function SuratLamaranPage() {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <div className="min-h-screen bg-bg">
      <Navbar userName={session.name} />
      <SuratLamaranClient />
    </div>
  );
}
