import { createClient } from "@supabase/supabase-js"
import { Database } from "./database.types"
import { env } from "./env"

export function supabaseAdmin() {
  return createClient<Database>(env.supabaseUrl, env.supabaseService, {
    auth: { persistSession: false },
  })
}
