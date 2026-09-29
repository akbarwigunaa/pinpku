import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { nim, dateOfBirth } = await request.json();

  if (!nim || !dateOfBirth) {
    return NextResponse.json(
      { error: "NIM dan tanggal lahir wajib diisi." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("students")
    .select("nim, name")
    .eq("nim", nim.trim())
    .eq("date_of_birth", dateOfBirth)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "NIM atau tanggal lahir tidak cocok." },
      { status: 401 }
    );
  }

  await createSession({ nim: data.nim, name: data.name });

  return NextResponse.json({ success: true, name: data.name });
}
