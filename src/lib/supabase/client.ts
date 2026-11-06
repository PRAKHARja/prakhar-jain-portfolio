
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

const hasValidSupabaseUrl = (() => {
  try {
    const parsed = new URL(supabaseUrl ?? "");
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
})();

export const isSupabaseConfigured = Boolean(hasValidSupabaseUrl && supabasePublishableKey);

let client: ReturnType<typeof createClient<Database>> | undefined;

export function getSupabaseClient() {
  if (!supabaseUrl || !hasValidSupabaseUrl || !supabasePublishableKey) {
    throw new Error("Add a valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to the build environment.");
  }

  client ??= createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
  });

  return client;
}
