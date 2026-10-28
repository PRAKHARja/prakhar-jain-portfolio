export function SectionHeading({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return <div className="section-heading"><span className="eyebrow"><i />{label}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}
