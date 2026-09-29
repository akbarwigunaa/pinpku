import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import CVBuilderClient from "./CVBuilderClient";

export default async function CvBuilderPage() {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <div className="min-h-screen bg-bg">
      <Navbar userName={session.name} />
      <CVBuilderClient userName={session.name} />
    </div>
  );
}
