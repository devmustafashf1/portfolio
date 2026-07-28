import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

// A key that bypasses RLS is required for server-side Storage writes (bucket create, image
// upload) — the anon/publishable key is subject to storage RLS and will fail those calls even
// on a public bucket. Prefers the new-format secret key, falling back to the legacy
// service_role JWT, then to the read-only anon/publishable key.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY
)
