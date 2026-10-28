"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { site } from "@/data/site";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!site.email) {
      setError(true);
      setMessage("This is a form preview. Nothing was sent or stored. Add a verified email in src/data/site.ts to enable email drafts.");
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setError(false);
    setMessage("Your email app should open with a draft. The portfolio does not send or store this message.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-pair">
        <label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
      </div>
      <label>What would you like to build?<textarea name="message" rows={5} required placeholder="A few details about your project…" /></label>
      <button className="button button-primary" type="submit">Prepare enquiry <span aria-hidden="true">↗</span></button>
      <p className={`form-status ${error ? "form-error" : ""}`} role={error ? "alert" : "status"}>{message || "No backend is connected. Messages are not sent or stored."}</p>
    </form>
  );
}
