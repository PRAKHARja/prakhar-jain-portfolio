import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <>
      <section className="case-hero container">
        <div className="case-crumb"><Link href="/projects">Projects</Link><span>/</span><span>{project.title}</span></div>
        <div className="case-title-row"><div><span className="eyebrow"><i />{project.category}</span><h1>{project.title}</h1><p className="case-lede">{project.summary}</p></div><span className="status-pill"><i />{project.status}</span></div>
        <div className="case-hero-visual"><ProjectVisual kind={project.visual} title={project.title} /></div>
      </section>
      <section className="container case-layout">
        <aside className="case-meta"><span className="eyebrow-small">TECHNOLOGY</span><div className="tag-list">{project.technologies.map((item) => <span className="tag" key={item}>{item}</span>)}</div>{project.demoUrl && <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">Visit demo ↗</a>}{project.repositoryUrl && <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">View source ↗</a>}</aside>
        <div className="case-content">
          <CaseBlock title="Overview"><p>{project.overview}</p></CaseBlock>
          <CaseBlock title="The problem"><p>{project.problem}</p></CaseBlock>
          <CaseBlock title="Goals & requirements"><ul>{project.goals.map((item) => <li key={item}>{item}</li>)}</ul></CaseBlock>
          <CaseBlock title="My contribution"><p>{project.contribution}</p></CaseBlock>
          <CaseBlock title="Key features"><ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul></CaseBlock>
          <CaseBlock title="Technical implementation"><p>{project.implementation}</p></CaseBlock>
          <CaseBlock title="Testing & verification"><p>{project.verification}</p></CaseBlock>
          <CaseBlock title="Known limitations"><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></CaseBlock>
          <CaseBlock title="Future improvements"><ul>{project.future.map((item) => <li key={item}>{item}</li>)}</ul></CaseBlock>
          {project.slug === "clinic-website" && <div className="case-demo-cta"><div><span className="eyebrow-small">LOCAL PREVIEW</span><h3>See the concept in context.</h3><p>Explore the fictional clinic site and its front-end-only enquiry UI.</p></div><Link className="button button-primary" href="/projects/clinic-website/demo">Open the clinic demo <span aria-hidden="true">↗</span></Link></div>}
        </div>
      </section>
      <section className="container case-bottom"><Link className="text-link" href="/projects">← Back to all projects</Link><Link className="button button-outline" href="/contact">Discuss a project <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}

function CaseBlock({ title, children }: { title: string; children: ReactNode }) {
  return <section className="case-block"><h2>{title}</h2>{children}</section>;
}
