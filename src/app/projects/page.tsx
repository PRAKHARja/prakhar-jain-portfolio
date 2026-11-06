import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("Projects", "Software, Salesforce, computer vision, analytics, and database projects by Prakhar Jain.", "/projects");

export default function ProjectsPage() {
  return <section className="page-section container"><div className="page-intro"><span className="eyebrow"><i />PROJECTS</span><h1>Projects across<br /><em>software and data.</em></h1><p>Full-stack products, Salesforce development, computer vision, forecasting, and relational data design.</p></div><div className="project-grid project-directory">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>;
}
