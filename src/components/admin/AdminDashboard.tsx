"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminGate } from "@/components/admin/AdminGate";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getSupabaseClient } from "@/lib/supabase/client";

type Counts = { total: number; published: number; drafts: number };

function DashboardContent() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadCounts() {
      setError("");
      const projects = getSupabaseClient().from("projects");
      const [total, published, drafts] = await Promise.all([
        projects.select("id", { count: "exact", head: true }),
        projects.select("id", { count: "exact", head: true }).eq("published", true),
        projects.select("id", { count: "exact", head: true }).eq("published", false),
      ]);
      if (!active) return;
      const queryError = total.error ?? published.error ?? drafts.error;
      if (queryError) {
        setError("Could not load project counts. Confirm the authenticated admin can read all rows in the projects table.");
        return;
      }
      setCounts({ total: total.count ?? 0, published: published.count ?? 0, drafts: drafts.count ?? 0 });
    }
    void loadCounts().catch(() => {
      if (active) setError("Could not reach Supabase to load project counts.");
    });
    return () => { active = false; };
  }, [attempt]);

  return (
    <div className="admin-page">
      <div className="admin-width">
        <AdminHeader />
        <div className="admin-main">
          <p className="eyebrow-small">ADMINISTRATION</p>
          <h1 className="admin-heading">Overview</h1>
          <p className="admin-lede">Review project records and their Supabase publish state.</p>
          <p className="admin-notice">This site is exported as static files. Changes here update Supabase only; the public portfolio and its case study pages still use <code>src/data/projects.ts</code> until a separate build-time content migration is implemented.</p>
          {error && <div className="admin-alert admin-alert-error" role="alert"><p>{error}</p><button className="admin-button" type="button" onClick={() => { setCounts(null); setAttempt((value) => value + 1); }}>Retry</button></div>}
          <div className="admin-stats" aria-live="polite">
            <div className="admin-stat"><span>Total projects</span><strong>{counts?.total ?? "—"}</strong></div>
            <div className="admin-stat"><span>Published in Supabase</span><strong>{counts?.published ?? "—"}</strong></div>
            <div className="admin-stat"><span>Drafts in Supabase</span><strong>{counts?.drafts ?? "—"}</strong></div>
          </div>
          <section className="admin-panel">
            <h2>Project management</h2>
            <p className="admin-lede">Create records, edit project details, and manage database visibility.</p>
            <Link className="admin-button admin-button-primary" href="/admin/projects/">Manage projects →</Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return <AdminGate><DashboardContent /></AdminGate>;
}
