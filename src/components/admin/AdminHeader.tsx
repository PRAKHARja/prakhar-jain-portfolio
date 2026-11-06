"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

export function AdminHeader() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      const { error } = await getSupabaseClient().auth.signOut();
      if (error) throw error;
      router.replace("/admin/login/");
    } catch {
      setMessage("Sign out did not complete. Retry before closing this page.");
      setBusy(false);
    }
  }

  return (
    <>
      <header className="admin-topbar">
        <Link className="admin-brand" href="/admin/">Portfolio admin<span>Supabase dashboard</span></Link>
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin/">Overview</Link>
          <Link href="/admin/projects/">Projects</Link>
          <button className="admin-button" type="button" onClick={logout} disabled={busy}>{busy ? "Signing out…" : "Log out"}</button>
        </nav>
      </header>
      {message && <p className="admin-alert admin-alert-error" role="alert">{message}</p>}
    </>
  );
}
