import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabaseServer"

export async function GET() {
  try {
    const sb = supabaseAdmin()
    
    const { data: guardLevels, error } = await sb
      .from("guard_levels")
      .select("*")
      .order("hourly_rate_cents", { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json(guardLevels)
  } catch (error: any) {
    console.error("Guard levels error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch guard levels" },
      { status: 500 }
    )
  }
}
