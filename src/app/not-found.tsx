import Link from "next/link";

export default function NotFound() {
  return <section className="not-found container"><span className="eyebrow"><i />404 · PAGE NOT FOUND</span><h1>Looks like this<br />page moved on.</h1><p>The link may be old, or the page may not exist.</p><Link className="button button-primary" href="/">Return home <span aria-hidden="true">↗</span></Link></section>;
}
