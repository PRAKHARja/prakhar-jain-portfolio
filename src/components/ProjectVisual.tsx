import type { Project } from "@/data/projects";

export function ProjectVisual({ kind, title }: { kind: Project["visual"]; title: string }) {
  return (
    <div className="project-visual" role="img" aria-label={`${title} representative concept visual`}>
      <div className="visual-browser"><span /><span /><span /><i>{title.toLowerCase().replaceAll(" ", "-")}.app</i></div>
      {kind === "attendly" && <div className="visual-attendly"><div className="visual-rail" /><div className="visual-panel"><div className="visual-line wide" /><div className="visual-line" /><div className="visual-grid"><i /><i /><i /></div><div className="visual-chart"><span /><span /><span /><span /><span /><span /><span /></div></div></div>}
      {kind === "study" && <div className="visual-study"><div className="study-side" /><div className="study-content"><div className="visual-line wide" /><div className="visual-line" /><div className="study-books"><i>01</i><i>02</i><i>03</i></div><div className="visual-line wide" /></div></div>}
      {kind === "vision" && <div className="visual-vision"><div className="vision-crosshair">⌖</div><div className="vision-frame"><i /><span /><b /></div><div className="vision-label">TRACKING PREVIEW <span>●</span></div></div>}
      {kind === "clinic" && <div className="visual-clinic"><div className="clinic-topline" /><div className="clinic-copy"><small>CARE, MADE CLEAR</small><strong>Here for<br />your health.</strong><i>Explore our care →</i></div><div className="clinic-sun" /></div>}
      <span className="visual-caption">Representative visual · not an app screenshot</span>
    </div>
  );
}
