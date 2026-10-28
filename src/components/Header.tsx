"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="wordmark" href="/" aria-label="Prakhar Jain, home" onClick={() => setOpen(false)}>
          <span className="wordmark-mark">PJ</span><span>Prakhar Jain<span className="wordmark-dot">.</span></span>
        </Link>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          <span className="sr-only">{open ? "Close" : "Open"} navigation menu</span>
          <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="primary-navigation" className={`primary-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Discuss a project <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
