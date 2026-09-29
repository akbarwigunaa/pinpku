import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import BankContohAdminClient from "./BankContohAdminClient";

export default async function BankContohAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <div className="min-h-screen bg-bg">
      <AdminNavbar />
      <BankContohAdminClient />
    </div>
  );
}
