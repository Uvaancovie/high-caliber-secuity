"use server"

import { env } from "../../lib/env"
import { supabaseAdmin } from "../../lib/supabaseServer"
import nodemailer from "nodemailer"

export async function sendQuoteEmail(quoteId: number) {
  const sb = supabaseAdmin()

  // Ensure PDF exists (generate on demand by calling the route)
  const { data: q, error } = await sb
    .from("quotes")
    .select("id, pdf_path, user_id, kind, total_cents, currency, created_at")
    .eq("id", quoteId)
    .maybeSingle()
  if (error || !q) throw new Error("Quote not found")

  if (!q.pdf_path) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/quotes/pdf/${quoteId}`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed generating PDF")
  }

  // Signed URL for download
  const { data: signed, error: signErr } = await sb.storage
    .from("quotes")
    .createSignedUrl(q.pdf_path || `quotes/${q.user_id ?? "anon"}/quote-${q.id}.pdf`, 60 * 60 * 24 * 7, {
      download: true,
    })
  if (signErr) throw signErr

  if (env.devEmailMode === "log") {
    console.log("[QUOTE EMAIL LOG]", {
      to: env.recipientEmail,
      subject: `Quote #${q.id} – ${q.kind} – R ${(q.total_cents / 100).toFixed(2)}`,
      url: signed?.signedUrl,
    })
    return { ok: true, mode: "log", url: signed?.signedUrl }
  }

  // Ethereal (dev-only): create or use provided credentials
  let account = null as any
  if (!env.etherealUser || !env.etherealPass) {
    account = await nodemailer.createTestAccount()
  }
  const transporter = nodemailer.createTransporter({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: env.etherealUser || account.user,
      pass: env.etherealPass || account.pass,
    },
  })

  const info = await transporter.sendMail({
    from: `"High Caliber Quotes" <no-reply@highcaliber.dev>`,
    to: env.recipientEmail,
    subject: `Quote #${q.id} – ${q.kind} – R ${(q.total_cents / 100).toFixed(2)}`,
    text: `New quote #${q.id} (${q.kind}). Total: R ${(q.total_cents / 100).toFixed(2)}. PDF: ${signed?.signedUrl}`,
    html: `<p>New quote <b>#${q.id}</b> (${q.kind}).</p>
           <p>Total: <b>R ${(q.total_cents / 100).toFixed(2)}</b></p>
           <p><a href="${signed?.signedUrl}" target="_blank" rel="noreferrer">Download PDF</a></p>`,
  })

  // expose Ethereal preview URL for convenience
  const previewUrl = nodemailer.getTestMessageUrl(info)
  return { ok: true, mode: "ethereal", previewUrl, url: signed?.signedUrl }
}
