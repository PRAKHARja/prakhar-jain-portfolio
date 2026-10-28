import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`project-card ${compact ? "project-card-compact" : ""}`}>
      <Link className="project-card-visual" href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}><ProjectVisual kind={project.visual} title={project.title} /></Link>
      <div className="project-card-content">
        <div className="project-card-top"><span className="eyebrow-small">{project.category.split(" · ")[0]}</span><span className="status-pill"><i />{project.status}</span></div>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}<span aria-hidden="true"> ↗</span></Link></h3>
        <p>{project.summary}</p>
        <div className="tag-list">{project.technologies.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
        <Link className="text-link" href={`/projects/${project.slug}`}>View case study <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
