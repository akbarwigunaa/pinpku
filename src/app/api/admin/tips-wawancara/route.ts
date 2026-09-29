import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("tips_wawancara")
    .select("*")
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { pertanyaan, kategori, tips, contoh_jawaban } = body;

  if (!pertanyaan || !kategori || !tips || !contoh_jawaban) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  // Auto-generate ID and sort_order
  const { data: maxRow } = await supabase
    .from("tips_wawancara")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxRow?.sort_order ?? 0) + 1;
  const id = String(nextOrder);

  const { error } = await supabase.from("tips_wawancara").insert({
    id,
    pertanyaan,
    kategori,
    tips,
    contoh_jawaban,
    sort_order: nextOrder,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id });
}
