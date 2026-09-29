import { NextRequest, NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const validUsername = process.env.ADMIN_USERNAME || "admin";
  const validPassword = process.env.ADMIN_PASSWORD || "pinpku2026";

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.json(
      { error: "Username atau password salah." },
      { status: 401 }
    );
  }

  await createAdminSession(username);
  return NextResponse.json({ success: true });
}
