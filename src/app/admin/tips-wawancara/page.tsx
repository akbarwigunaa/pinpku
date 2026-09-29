import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import TipsAdminClient from "./TipsAdminClient";

export default async function TipsAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <div className="min-h-screen bg-bg">
      <AdminNavbar />
      <TipsAdminClient />
    </div>
  );
}
