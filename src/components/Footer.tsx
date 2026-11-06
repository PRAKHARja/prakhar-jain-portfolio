import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link href="/" className="footer-name">Prakhar Jain<span className="wordmark-dot">.</span></Link>
        <p>Salesforce, full-stack software, and data systems.</p>
        <div className="footer-links">
          <Link href="/projects">Projects</Link><Link href="/about">About</Link>
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={site.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href={`mailto:${site.email}`}>Email <span aria-hidden="true">↗</span></a>
        </div>
        <span className="copyright">© {new Date().getFullYear()} Prakhar Jain</span>
      </div>
    </footer>
  );
}
