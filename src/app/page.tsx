import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications, experience, site, skills } from "@/data/site";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("Prakhar Jain — Software Developer", "Portfolio of Prakhar Jain, a software developer working across Salesforce development, web applications and automation.", "/");

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow"><i />SOFTWARE DEVELOPER · SALESFORCE · FULL-STACK</span>
          <h1>I build software<br />that solves <em>real</em> problems<span className="headline-period">.</span></h1>
          <p className="hero-intro">I’m Prakhar, a software developer working across Salesforce development, web applications and automation. I build practical products with a focus on reliable functionality, clear user experiences and maintainable code.</p>
          <div className="button-row"><Link className="button button-primary" href="/projects">Explore my work <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/contact">Discuss a project <span aria-hidden="true">→</span></Link></div>
          <div className="hero-skills"><span className="eyebrow-small">WORKING WITH</span><div>{["Salesforce", "TypeScript", "Next.js", "Python"].map((skill) => <span key={skill}>{skill}</span>)}</div></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-core"><span>PJ</span><i>BUILD · LEARN · REFINE</i></div><span className="orbit-chip chip-one">CRM</span><span className="orbit-chip chip-two">WEB</span><span className="orbit-chip chip-three">AI</span><span className="orbit-chip chip-four">CODE</span></div>
      </section>

      <section className="section container" id="work">
        <SectionHeading label="SELECTED WORK" title="A few things I’ve been building." copy="Personal projects and a concept demo, with implementation details called out where the source could be checked." />
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        <div className="section-action"><Link className="text-link" href="/projects">Browse all projects <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="section section-muted">
        <div className="container experience-layout"><div><SectionHeading label="CURRENT ROLE" title="Learning by building in Salesforce." /><p className="muted-copy">A current role, presented without claims about client work or delivery impact that I can’t substantiate here.</p></div>
          <article className="experience-entry"><span className="experience-marker" /><div className="experience-main"><span className="eyebrow-small">{experience.dates}</span><h3>{experience.title}</h3><p>{experience.company}</p>{experience.responsibilities.length ? <ul>{experience.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="entry-note">Role responsibilities and achievements to be added.</p>}</div><span className="experience-current">CURRENT</span></article>
        </div>
      </section>

      <section className="section container">
        <div className="skills-layout"><SectionHeading label="TOOLKIT" title="A practical set of tools." copy="Grouped by the kinds of problems I work on, without arbitrary proficiency scores." /><div className="skill-groups">{skills.map((group) => <div className="skill-group" key={group.group}><h3>{group.group}<span>↗</span></h3><div className="tag-list">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>)}</div></div>
      </section>

      <section className="section section-muted"><div className="container credential-layout"><div><SectionHeading label="CREDENTIALS" title="Certifications." /></div><div className="credential-list">{certifications.map((item, index) => <article className="credential-entry" key={item.name}><span className="credential-number">0{index + 1}</span><div><h3>{item.name}</h3><p>{item.issuer} <span>·</span> {item.date}</p></div><span className="credential-mark" aria-hidden="true">✳</span></article>)}</div></div></section>

      <section className="section container services-layout"><div><SectionHeading label="WAYS I CAN HELP" title="Thoughtful websites, made for people." copy="Services I can offer for new projects. These describe areas of work, not a list of past clients." /><Link className="text-link" href="/contact">Tell me about your project <span aria-hidden="true">→</span></Link></div><div className="service-list">{["Business websites", "Clinic & healthcare demos", "Restaurant websites", "Portfolio & interior-design sites", "Custom web applications", "Responsive redesigns"].map((service, index) => <div className="service-item" key={service}><span>0{index + 1}</span><h3>{service}</h3><b aria-hidden="true">↗</b></div>)}</div></section>

      <section className="closing-cta"><div className="container closing-inner"><div><span className="eyebrow"><i />HAVE SOMETHING IN MIND?</span><h2>Let’s make the next<br />useful thing.</h2></div><div><p>Tell me what you’re trying to solve. We can start with a clear conversation about the scope.</p><Link className="button button-light" href="/contact">Tell me about your project <span aria-hidden="true">↗</span></Link><div className="closing-links"><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><span>GitHub · add verified URL</span><span>Email · add verified address</span></div></div></div></section>
    </>
  );
}
