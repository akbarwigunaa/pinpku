import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import MahasiswaClient from "./MahasiswaClient";

export default async function MahasiswaPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <div className="min-h-screen bg-bg">
      <AdminNavbar />
      <MahasiswaClient />
    </div>
  );
}
