import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabaseAdmin } from "../../../../lib/supabaseServer"
import { computePersonalQuote } from "../../../../lib/quotes"

const personalQuoteSchema = z.object({
  guard_id: z.number().int(),
  start_time: z.string(),
  end_time: z.string(),
  area_id: z.number().int().optional(),
  city: z.string().optional(),
  area: z.string().optional(),
  isArmed: z.boolean().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
})

export async function GET() {
  return Response.json({
    message: "Personal quote endpoint",
    status: "ready",
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = personalQuoteSchema.parse(body)
    const sb = supabaseAdmin()

    // Look up guard level and hourly rate
    let effectiveGuardId = validatedData.guard_id
    
    // If armed security is requested, override to use Armed guard level (ID: 2)
    if (validatedData.isArmed) {
      effectiveGuardId = 2 // Armed guard level from database
    }

    const { data: guardLevel, error: guardError } = await sb
      .from("guard_levels")
      .select("hourly_rate_cents")
      .eq("id", effectiveGuardId)
      .maybeSingle()

    if (guardError || !guardLevel) {
      return NextResponse.json({ error: "Guard level not found" }, { status: 404 })
    }

    // Look up area risk multiplier if area_id provided
    let riskMultiplier = 1.0
    if (validatedData.area_id) {
      const { data: area, error: areaError } = await sb
        .from("areas")
        .select("risk_multiplier")
        .eq("id", validatedData.area_id)
        .maybeSingle()

      if (!areaError && area) {
        riskMultiplier = area.risk_multiplier
      }
    } else if (validatedData.city && validatedData.area) {
      // Fallback: lookup by city and area name
      const { data: area, error: areaError } = await sb
        .from("areas")
        .select("risk_multiplier")
        .eq("city", validatedData.city)
        .eq("area", validatedData.area)
        .maybeSingle()

      if (!areaError && area) {
        riskMultiplier = area.risk_multiplier
      }
    }

    const breakdown = computePersonalQuote({
      guard_id: validatedData.guard_id,
      start_time: validatedData.start_time,
      end_time: validatedData.end_time,
      area: validatedData.city && validatedData.area ? 
        { city: validatedData.city, area: validatedData.area } : null,
      base_hourly_cents: guardLevel.hourly_rate_cents,
      risk_multiplier: riskMultiplier,
    })

    const { data: quote, error: quoteError } = await sb
      .from("quotes")
      .insert({
        user_id: null, // TODO: set from session
        kind: "personal",
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
    console.error("Personal quote error:", error)

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
