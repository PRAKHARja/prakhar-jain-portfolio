import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications, experience, leadership, site, skills } from "@/data/site";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("Prakhar Jain — Salesforce Developer", site.summary, "/");

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow"><i />SALESFORCE DEVELOPER · FULL-STACK SOFTWARE</span>
          <h1>Building reliable systems and <em>useful</em> experiences<span className="headline-period">.</span></h1>
          <p className="hero-intro">{site.summary}</p>
          <div className="button-row"><Link className="button button-primary" href="/projects">Explore my work <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/contact">Discuss a project <span aria-hidden="true">→</span></Link></div>
          <div className="hero-skills"><span className="eyebrow-small">FOCUS AREAS</span><div>{["Salesforce", "ServiceMax", "Full-stack", "Data systems"].map((skill) => <span key={skill}>{skill}</span>)}</div></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-core"><span>PJ</span><i>BUILD · LEARN · REFINE</i></div><span className="orbit-chip chip-one">CRM</span><span className="orbit-chip chip-two">WEB</span><span className="orbit-chip chip-three">AI</span><span className="orbit-chip chip-four">CODE</span></div>
      </section>

      <section className="section container" id="work">
        <SectionHeading label="PROJECTS" title="Projects across platforms and products." copy="Full-stack applications, Salesforce, computer vision, analytics, and relational data systems." />
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        <div className="section-action"><Link className="text-link" href="/projects">Browse all projects <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="section section-muted">
        <div className="container experience-layout"><div><SectionHeading label="EXPERIENCE" title="Salesforce Developer at Wipro." /><p className="muted-copy">Contributing to Beckman’s ServiceMax platform through Salesforce development, Apex, SOQL, and application troubleshooting.</p></div>
          <article className="experience-entry"><span className="experience-marker" /><div className="experience-main"><span className="eyebrow-small">{experience.dates}</span><h3>{experience.title}</h3><p>{experience.company}</p><ul>{experience.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div><span className="experience-current">CURRENT ROLE</span></article>
        </div>
      </section>

      <section className="section container">
        <div className="skills-layout"><SectionHeading label="TECHNICAL SKILLS" title="Tools for platform, product, and data work." /><div className="skill-groups">{skills.map((group) => <div className="skill-group" key={group.group}><h3>{group.group}</h3><div className="tag-list">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>)}</div></div>
      </section>

      <section className="section section-muted"><div className="container credential-layout"><div><SectionHeading label="CREDENTIALS" title="Certifications and training." /></div><div className="credential-list">{certifications.map((item, index) => <article className="credential-entry" key={item.name}><span className="credential-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.name}</h3><p>{item.issuer}</p></div><span className="credential-mark" aria-hidden="true">✳</span></article>)}</div></div></section>

      <section className="section container services-layout"><div><SectionHeading label="LEADERSHIP" title="Creative work and campus communities." copy="Planning, creative direction, logistics, and collaboration across student events." /><Link className="text-link" href="/about">More about my background <span aria-hidden="true">→</span></Link></div><div className="service-list">{leadership.map((item, index) => <article className="service-item leadership-item" key={item.organization}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.role} · {item.organization}{item.year ? ` (${item.year})` : ""}</h3><p>{item.detail}</p></div></article>)}</div></section>

      <section className="closing-cta"><div className="container closing-inner"><div><span className="eyebrow"><i />GET IN TOUCH</span><h2>Let’s build something<br />useful together.</h2></div><div><p>Reach out about software development, Salesforce work, or a product idea.</p><Link className="button button-light" href="/contact">Contact Prakhar <span aria-hidden="true">↗</span></Link><div className="closing-links"><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`mailto:${site.email}`}>Email ↗</a></div></div></div></section>
    </>
  );
}
