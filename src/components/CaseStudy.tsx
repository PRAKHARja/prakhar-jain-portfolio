import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <>
      <section className="case-hero container">
        <div className="case-crumb"><Link href="/projects">Projects</Link><span>/</span><span>{project.title}</span></div>
        <div className="case-title-row"><div><span className="eyebrow"><i />{project.category}</span><h1>{project.title}</h1><p className="case-lede">{project.summary}</p></div></div>
        <div className="case-hero-visual"><ProjectVisual kind={project.visual} title={project.title} /></div>
      </section>
      <section className="container case-layout">
        <aside className="case-meta"><span className="eyebrow-small">TECHNOLOGY</span><div className="tag-list">{project.technologies.map((item) => <span className="tag" key={item}>{item}</span>)}</div></aside>
        <div className="case-content">
          <section className="case-block"><h2>Project overview</h2><p>{project.details}</p></section>
          <section className="case-block"><h2>Highlights</h2><ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
      </section>
      <section className="container case-bottom"><Link className="text-link" href="/projects">← Back to all projects</Link><Link className="button button-outline" href="/contact">Get in touch <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
