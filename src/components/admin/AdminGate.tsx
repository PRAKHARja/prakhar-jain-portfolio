"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { checkAdminUser } from "@/lib/supabase/admin";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

type GateState = "checking" | "authorized" | "error";

function rememberNotice(notice: string) {
  try {
    window.sessionStorage.setItem("portfolio-admin-notice", notice);
  } catch {
    // Session storage may be unavailable; the login screen still remains usable.
  }
}

export function AdminGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<GateState>(isSupabaseConfigured ? "checking" : "error");
  const [message, setMessage] = useState(isSupabaseConfigured ? "" : "Supabase is not configured in this build. Add a valid public project URL and publishable key, then rebuild.");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    let redirecting = false;
    let checkId = 0;

    if (!isSupabaseConfigured) {
      return;
    }

    const supabase = getSupabaseClient();
    const redirectToLogin = (notice: string) => {
      if (!active || redirecting) return;
      redirecting = true;
      rememberNotice(notice);
      router.replace("/admin/login/");
    };

    const verifyAccess = async () => {
      const currentCheck = ++checkId;
      setState("checking");
      setMessage("");

      try {
        const { data, error } = await supabase.auth.getUser();
        if (!active || currentCheck !== checkId) return;

        if (error && /fetch|network|timeout/i.test(error.message)) {
          setMessage("Could not reach Supabase to verify your session. Check your connection and retry.");
          setState("error");
          return;
        }

        if (!data.user) {
          await supabase.auth.signOut();
          redirectToLogin("session");
          return;
        }

        const access = await checkAdminUser(data.user.id);
        if (!active || currentCheck !== checkId) return;
        if (access.error) {
          setMessage("Could not verify admin access. Check the admin_users read policy and retry.");
          setState("error");
          return;
        }
        if (!access.authorized) {
          redirecting = true;
          rememberNotice("unauthorized");
          await supabase.auth.signOut();
          if (active) router.replace("/admin/login/");
          return;
        }

        setState("authorized");
      } catch {
        if (active && currentCheck === checkId) {
          setMessage("Could not verify admin access. Check your connection and retry.");
          setState("error");
        }
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") redirectToLogin("session");
      if (event === "TOKEN_REFRESHED") window.setTimeout(() => void verifyAccess(), 0);
    });

    void verifyAccess();
    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [attempt, router]);

  if (state === "authorized") return children;

  return (
    <section className="admin-login-wrap" aria-live="polite">
      <div className="admin-panel">
        <h1 className="admin-heading">{state === "checking" ? "Checking admin access" : "Admin access unavailable"}</h1>
        {state === "checking" ? <p className="admin-muted">Verifying your Supabase session and admin record…</p> : <>
          <p className="admin-alert admin-alert-error" role="alert">{message}</p>
          <div className="admin-actions">
            <button className="admin-button admin-button-primary" type="button" onClick={() => setAttempt((value) => value + 1)}>Retry</button>
            <Link className="admin-link" href="/admin/login/">Go to admin login</Link>
          </div>
        </>}
      </div>
    </section>
  );
}
