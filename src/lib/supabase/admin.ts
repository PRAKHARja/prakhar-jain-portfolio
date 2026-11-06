import { getSupabaseClient } from "@/lib/supabase/client";

export async function checkAdminUser(userId: string) {
  const { data, error } = await getSupabaseClient()
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return {
    authorized: Boolean(data?.user_id),
    error: error?.message ?? null,
  };
}

export function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
