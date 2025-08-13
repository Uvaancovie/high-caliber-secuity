import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseServer"
import PDFDocument from "pdfkit"

export const runtime = "nodejs" // PDFKit requires Node runtime (not Edge).

function pdfBuffer(b: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    b.on("data", (c: Buffer) => chunks.push(c))
    b.on("end", () => resolve(Buffer.concat(chunks)))
    b.on("error", reject)
  })
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

  const sb = supabaseAdmin()

  const { data: quote, error } = await sb
    .from("quotes")
    .select("id, user_id, kind, breakdown, payload, total_cents, currency, pdf_path, created_at")
    .eq("id", id)
    .maybeSingle()

  if (error || !quote) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // 1) Generate PDF
  const doc = new PDFDocument({ size: "A4", margin: 50 })
  doc.fontSize(18).text(`Quote #${quote.id}`, { underline: true })
  doc.moveDown()

  doc.fontSize(12).text(`Kind: ${quote.kind.toUpperCase()}`)
  doc.text(`Created: ${new Date(quote.created_at as any).toLocaleString()}`)
  doc.moveDown()

  doc.fontSize(14).text("Breakdown")
  doc.moveDown(0.5)

  const b = (quote.breakdown as any) || {}
  const money = (cents: number) => `R ${(cents / 100).toFixed(2)}`

  if (quote.kind === "personal") {
    doc.text(`Hours: ${b.hours}`)
    doc.text(`Base: ${money(b.base_cents)}`)
    doc.text(`Surcharges: Night ${b.surcharges?.night_pct ?? 0}% • Weekend ${b.surcharges?.weekend_pct ?? 0}%`)
    doc.text(`Risk Multiplier: ${(b.risk_multiplier ?? 1).toFixed(2)}`)
  } else {
    doc.text(`Guards: ${b.num_guards}`)
    doc.text(`Coverage: ${b.coverage_hours_per_day}h/day × ${b.days_per_month}`)
    doc.text(`Labour: ${money(b.labour_cents)}`)
    doc.text(`Extras: CCTV ${money(b.extras?.cctv_cents ?? 0)}`)
  }
  doc.moveDown()
  doc.fontSize(16).text(`TOTAL: ${money(quote.total_cents)}`, { align: "right" })
  doc.end()

  const buffer = await pdfBuffer(doc)

  // 2) Upload to Supabase Storage (upsert)
  const path = `quotes/${quote.user_id ?? "anon"}/quote-${quote.id}.pdf`
  const { error: upErr } = await sb.storage
    .from("quotes")
    .upload(path, buffer, { contentType: "application/pdf", upsert: true })
  if (upErr) return NextResponse.json({ error: "Upload failed" }, { status: 500 })

  await sb.from("quotes").update({ pdf_path: path }).eq("id", id)

  // 3) Stream PDF back to the browser
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="quote-${quote.id}.pdf"`,
    },
  })
}
