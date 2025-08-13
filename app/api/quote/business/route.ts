import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabaseAdmin } from "../../../../lib/supabaseServer"
import { computeBusinessQuote } from "../../../../lib/quotes"

const businessQuoteSchema = z.object({
  num_guards: z.number().int().min(1),
  coverage_hours_per_day: z.union([z.literal(12), z.literal(24)]),
  days_per_month: z.number().positive().optional(),
  level_id: z.number().int(),
  armed: z.boolean(),
  include_cctv: z.boolean(),
  site_factor: z.number().positive().optional(),
  // Additional context fields
  companyName: z.string().optional(),
  contactName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  businessType: z.string().optional(),
  contractLength: z.string().optional(),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = businessQuoteSchema.parse(body)
    const sb = supabaseAdmin()

    // Look up hourly rate from level
    const { data: level, error: levelError } = await sb
      .from("guard_levels")
      .select("hourly_rate_cents")
      .eq("id", validatedData.level_id)
      .maybeSingle()

    if (levelError || !level) {
      return NextResponse.json({ error: "Level not found" }, { status: 404 })
    }

    const breakdown = computeBusinessQuote({
      num_guards: validatedData.num_guards,
      coverage_hours_per_day: validatedData.coverage_hours_per_day,
      days_per_month: validatedData.days_per_month,
      level_hourly_cents: level.hourly_rate_cents,
      armed: validatedData.armed,
      include_cctv: validatedData.include_cctv,
      site_factor: validatedData.site_factor,
    })

    const { data: quote, error: quoteError } = await sb
      .from("quotes")
      .insert({
        user_id: null, // TODO: set from session
        kind: "business",
        payload: validatedData,
        breakdown,
        total_cents: breakdown.total_cents,
        currency: "ZAR",
        status: "sent",
      })
      .select("id")
      .maybeSingle()

    if (quoteError || !quote) {
      throw new Error(quoteError?.message || "Failed to create quote")
    }

    return NextResponse.json(
      {
        quoteId: quote.id,
        breakdown,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Business quote error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 },
    )
  }
}
