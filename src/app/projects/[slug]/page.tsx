import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { projectBySlug, projects } from "@/data/projects";
import { pageMetadata } from "@/data/seo";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projectBySlug(slug);
    return project ? pageMetadata(project.title, project.summary, `/projects/${project.slug}`) : {};
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
