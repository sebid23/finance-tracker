import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let query = supabase.from("transactions").select("*").order("date", { ascending: false }).order("id", { ascending: false });

    if (limit) query = query.limit(Number(limit));

    const { data, error } = await query;
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    const mapped = data.map((t) => ({
        id: t.id,
        date: t.date,
        description: t.description,
        category: t.category.toLowerCase(),
        type: t.type.toLowerCase(),
        amount: t.amount
    }));

    return NextResponse.json(mapped);
}

export async function POST(request: Request) {
    const { date, description, category, type, amount } = await request.json();

    const { data, error } = await supabase.from("transactions").insert({ date, description, category, type, amount}).select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: Request) {
    const { id, date, description, category, type, amount } = await request.json();

    const { data, error } = await supabase.from("transactions").update({ date, description, category, type, amount}).eq("id", id).select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const { data, error } = await supabase.from("transactions").delete().eq("id", id).select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    return NextResponse.json(data, { status: 200 });
}