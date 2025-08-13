import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabaseServer"

export async function GET() {
  try {
    const sb = supabaseAdmin()
    
    const { data: areas, error } = await sb
      .from("areas")
      .select("*")
      .order("city", { ascending: true })
      .order("area", { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json(areas)
  } catch (error: any) {
    console.error("Areas error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch areas" },
      { status: 500 }
    )
  }
}
