import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("Projects", "Project case studies and a local concept demo by Prakhar Jain.", "/projects");

export default function ProjectsPage() {
  return <section className="page-section container"><div className="page-intro"><span className="eyebrow"><i />SELECTED WORK</span><h1>Projects with a<br /><em>purpose.</em></h1><p>Product ideas, hands-on prototypes and a local client-site concept. Each page is clear about what has been verified.</p></div><div className="project-grid project-directory">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>;
}
