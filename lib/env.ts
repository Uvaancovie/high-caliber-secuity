export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  supabaseService: process.env.SUPABASE_SERVICE_ROLE!,
  recipientEmail: process.env.RECIPIENT_EMAIL || "way2flyagency@gmail.com",
  devEmailMode: (process.env.DEV_EMAIL_MODE || "ethereal") as "ethereal" | "log",
  etherealUser: process.env.ETHEREAL_USER,
  etherealPass: process.env.ETHEREAL_PASS,
}
