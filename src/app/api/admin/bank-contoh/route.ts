import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("bank_contoh")
    .select("*")
    .order("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, judul, tipe, bidang, ringkasan, poin, mengapa_barik } = body;

  if (!id || !judul || !tipe || !bidang || !ringkasan) {
    return NextResponse.json({ error: "Field wajib tidak lengkap." }, { status: 400 });
  }

  const { error } = await supabase.from("bank_contoh").insert({
    id,
    judul,
    tipe,
    bidang,
    ringkasan,
    poin: poin || [],
    mengapa_barik: mengapa_barik || [],
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "ID sudah digunakan." }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
