import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("students")
    .select("nim, name, date_of_birth")
    .order("nim");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Bulk insert (from CSV upload)
  if (Array.isArray(body)) {
    const rows = body.map((r: { nim: string; name: string; date_of_birth: string }) => ({
      nim: r.nim.trim(),
      name: r.name.trim(),
      date_of_birth: r.date_of_birth.trim(),
    }));

    const { data, error } = await supabase
      .from("students")
      .upsert(rows, { onConflict: "nim" })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ inserted: data?.length ?? 0 });
  }

  // Single insert
  const { nim, name, date_of_birth } = body;
  if (!nim || !name || !date_of_birth) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  const { error } = await supabase
    .from("students")
    .insert({ nim: nim.trim(), name: name.trim(), date_of_birth });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "NIM sudah terdaftar." }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
