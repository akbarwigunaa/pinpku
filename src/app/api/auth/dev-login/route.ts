import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  await createSession({ nim: "DEV001", name: "Mahasiswa Demo" });
  return NextResponse.redirect(new URL("/dashboard", "http://localhost:3001"));
}
