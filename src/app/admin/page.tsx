import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminLoginClient from "./AdminLoginClient";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  return <AdminLoginClient />;
}
