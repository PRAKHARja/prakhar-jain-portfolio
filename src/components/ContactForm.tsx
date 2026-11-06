"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { site } from "@/data/site";

export function ContactForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setMessage(`Your email app will open with a draft addressed to ${site.email}.`);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-pair">
        <label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
      </div>
      <label>What would you like to build?<textarea name="message" rows={5} required placeholder="A few details about your project…" /></label>
      <button className="button button-primary" type="submit">Prepare email <span aria-hidden="true">↗</span></button>
      <p className="form-status" role="status">{message}</p>
    </form>
  );
}
