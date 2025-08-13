import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabaseAdmin } from "../../../lib/supabaseServer"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)
    const sb = supabaseAdmin()

    const { data: contact, error } = await sb
      .from("contacts")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        subject: validatedData.subject,
        message: validatedData.message,
        status: "new",
      })
      .select("id")
      .maybeSingle()

    if (error) {
      throw error
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
        contact_id: contact?.id,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: error.message || "Failed to send message",
      },
      { status: 500 }
    )
  }
}
