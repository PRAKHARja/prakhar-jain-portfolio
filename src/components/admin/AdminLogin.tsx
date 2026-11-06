"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { checkAdminUser } from "@/lib/supabase/admin";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;
    let noticeMessage = "";
    let noticeIsError = false;
    try {
      const notice = window.sessionStorage.getItem("portfolio-admin-notice");
      window.sessionStorage.removeItem("portfolio-admin-notice");
      if (notice === "unauthorized") {
        noticeMessage = "This account is not listed in admin_users and cannot access the admin panel.";
        noticeIsError = true;
      } else if (notice === "session") {
        noticeMessage = "Your session ended. Sign in again to continue.";
      }
    } catch {
      // The login form works without session storage.
    }
    if (noticeMessage) {
      Promise.resolve().then(() => {
        if (active) {
          setMessage(noticeMessage);
          setIsError(noticeIsError);
        }
      });
    }

    if (!isSupabaseConfigured) return () => { active = false; };
    const supabase = getSupabaseClient();
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!active || !data.user) return;
      const access = await checkAdminUser(data.user.id);
      if (!active) return;
      if (access.authorized && !access.error) {
        router.replace("/admin/");
      } else if (!access.error) {
        await supabase.auth.signOut();
        if (active) {
          setMessage("This account is not listed in admin_users and cannot access the admin panel.");
          setIsError(true);
        }
      } else {
        setMessage("Could not verify admin access. Check the admin_users read policy and retry.");
        setIsError(true);
      }
    }).catch(() => {
      if (active) {
        setMessage("Could not reach Supabase to verify the current session.");
        setIsError(true);
      }
    });

    return () => { active = false; };
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setIsError(false);

    if (!isSupabaseConfigured) {
      setMessage("Supabase is not configured in this build. Add a valid public project URL and publishable key, then rebuild.");
      setIsError(true);
      setBusy(false);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error || !data.user) {
        setMessage(error?.message.toLowerCase().includes("invalid login credentials")
          ? "Email or password was not accepted."
          : "Could not sign in. Check your credentials and connection, then try again.");
        setIsError(true);
        setBusy(false);
        return;
      }

      const access = await checkAdminUser(data.user.id);
      if (access.error) {
        await supabase.auth.signOut();
        setMessage("Your account signed in, but admin access could not be verified. Check the admin_users read policy.");
        setIsError(true);
        setBusy(false);
        return;
      }
      if (!access.authorized) {
        await supabase.auth.signOut();
        setMessage("This account is not listed in admin_users and cannot access the admin panel.");
        setIsError(true);
        setBusy(false);
        return;
      }

      router.replace("/admin/");
    } catch {
      setMessage("Could not reach Supabase to complete sign-in. Check your connection and configuration, then try again.");
      setIsError(true);
      setBusy(false);
    }
  }

  return (
    <section className="admin-login-wrap">
      <div className="admin-panel">
        <p className="eyebrow-small">PRAKHAR JAIN · ADMIN</p>
        <h1 className="admin-heading">Sign in</h1>
        <p className="admin-lede">Use an account that has been added to the Supabase <code>admin_users</code> table.</p>
        {!isSupabaseConfigured && <p className="admin-alert admin-alert-error" role="alert">Supabase is not configured in this build. Add a valid public project URL and publishable key, then rebuild.</p>}
        {message && <p className={`admin-alert ${isError ? "admin-alert-error" : ""}`} role={isError ? "alert" : "status"}>{message}</p>}
        <form className="admin-form" onSubmit={submit}>
          <label className="admin-field">Email address
            <input type="email" name="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="admin-field">Password
            <input type="password" name="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="admin-button admin-button-primary" type="submit" disabled={busy || !isSupabaseConfigured}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="admin-muted">Public account creation is not available here.</p>
        <Link className="admin-link" href="/">← Return to portfolio</Link>
      </div>
    </section>
  );
}
