"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AdminGate } from "@/components/admin/AdminGate";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getSupabaseClient } from "@/lib/supabase/client";
import { acceptedProjectImageTypes, getProjectImageUrl, MAX_PROJECT_IMAGE_BYTES, removeProjectImage, uploadProjectImage, validateProjectImage } from "@/lib/supabase/project-images";

type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  thumbnail_path: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type ProjectDraft = Omit<ProjectRecord, "id" | "created_at" | "updated_at" | "thumbnail_path">;
type SaveProject = (draft: ProjectDraft, project: ProjectRecord | null, image: File | null, removeThumbnail: boolean, setStatus: (message: string) => void) => Promise<void>;
const imageCleanupStorageKey = "portfolio-admin-image-cleanup";

const columns = "id,slug,title,summary,description,technologies,github_url,live_url,thumbnail_path,featured,published,sort_order,created_at,updated_at";

function toOptionalUrl(value: string, label: string) {
  const normalized = value.trim();
  if (!normalized) return null;
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error(`${label} must be a full URL beginning with https:// or http://.`);
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`${label} must use http:// or https://.`);
  }
  return parsed.toString();
}

function ProjectForm({ project, onCancel, onSave }: { project: ProjectRecord | null; onCancel: () => void; onSave: SaveProject }) {
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [title, setTitle] = useState(project?.title ?? "");
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [technologies, setTechnologies] = useState(project?.technologies.join(", ") ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? false);
  const [sortOrder, setSortOrder] = useState(String(project?.sort_order ?? 0));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeThumbnail, setRemoveThumbnail] = useState(false);
  const [imageError, setImageError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const existingImageUrl = project?.thumbnail_path ? getProjectImageUrl(project.thumbnail_path) : null;
  const currentImageUrl = imageFile ? imagePreview : removeThumbnail ? null : existingImageUrl;

  useEffect(() => {
    if (!imagePreview) return;
    return () => URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  async function selectImage(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    input.value = "";
    setImageFile(null);
    setImagePreview(null);
    setRemoveThumbnail(false);
    setImageError("");
    try {
      await validateProjectImage(file);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } catch (value) {
      setImageError(value instanceof Error ? value.message : "Choose a supported image no larger than 5 MB.");
    }
  }

  function removeImageSelection() {
    if (imageFile) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (project?.thumbnail_path) setRemoveThumbnail(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const cleanSlug = slug.trim();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug)) {
      setError("Use a lowercase URL slug with letters, numbers, and single hyphens.");
      return;
    }
    const order = Number(sortOrder);
    if (!Number.isInteger(order)) {
      setError("Sort order must be a whole number.");
      return;
    }

    let github_url: string | null;
    let live_url: string | null;
    try {
      github_url = toOptionalUrl(githubUrl, "GitHub URL");
      live_url = toOptionalUrl(liveUrl, "Live URL");
    } catch (value) {
      setError(value instanceof Error ? value.message : "Check the project URLs.");
      return;
    }

    setSaving(true);
    try {
      setSaveStatus(imageFile ? "Uploading thumbnail…" : "Saving project…");
      await onSave({
        slug: cleanSlug,
        title: title.trim(),
        summary: summary.trim(),
        description: description.trim(),
        technologies: [...new Set(technologies.split(/[\n,]/).map((item) => item.trim()).filter(Boolean))],
        github_url,
        live_url,
        featured,
        published,
        sort_order: order,
      }, project, imageFile, removeThumbnail, setSaveStatus);
    } catch (value) {
      setError(value instanceof Error ? value.message : "Could not save this project.");
      setSaving(false);
      return;
    }
    setSaving(false);
  }

  return (
    <section className="admin-panel" aria-labelledby="project-form-heading">
      <h2 id="project-form-heading">{project ? "Edit project" : "Add a project"}</h2>
      <form className="admin-form" onSubmit={submit}>
        <div className="admin-form-grid">
          <label className="admin-field">Title<input required maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} /></label>
          <label className="admin-field">Slug<input required maxLength={120} value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="my-project" /></label>
          <label className="admin-field admin-field-full">Summary<input required maxLength={500} value={summary} onChange={(event) => setSummary(event.target.value)} /></label>
          <label className="admin-field admin-field-full">Description<textarea required maxLength={10000} rows={5} value={description} onChange={(event) => setDescription(event.target.value)} /></label>
          <label className="admin-field admin-field-full">Technologies <span className="admin-muted">Separate items with commas or new lines.</span><textarea value={technologies} onChange={(event) => setTechnologies(event.target.value)} rows={2} /></label>
          <label className="admin-field">GitHub URL<input type="url" value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} placeholder="https://github.com/..." /></label>
          <label className="admin-field">Live URL<input type="url" value={liveUrl} onChange={(event) => setLiveUrl(event.target.value)} placeholder="https://..." /></label>
          <div className="admin-field admin-field-full">
            <label htmlFor="project-thumbnail-file">Project thumbnail</label>
            <input id="project-thumbnail-file" type="file" accept={acceptedProjectImageTypes} onChange={selectImage} aria-describedby={imageError ? "project-thumbnail-help project-thumbnail-error" : "project-thumbnail-help"} disabled={saving} />
            <span id="project-thumbnail-help" className="admin-muted">JPEG, PNG, WebP, GIF, AVIF or BMP. Maximum {MAX_PROJECT_IMAGE_BYTES / 1024 / 1024} MB.</span>
            {imageError && <span id="project-thumbnail-error" className="admin-alert admin-alert-error" role="alert">{imageError}</span>}
            {currentImageUrl ? <div className="admin-thumbnail-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentImageUrl} alt={imageFile ? "Selected thumbnail preview" : `Current thumbnail for ${project?.title ?? title}`} />
              <div className="admin-actions">
                <span className="admin-muted">{imageFile ? "Preview; saved when you submit." : removeThumbnail ? "Thumbnail will be removed when you save." : "Current thumbnail"}</span>
                {(imageFile || (project?.thumbnail_path && !removeThumbnail)) && <button className="admin-button admin-button-danger" type="button" onClick={removeImageSelection} disabled={saving}>{imageFile ? "Clear selection" : "Remove thumbnail"}</button>}
                {removeThumbnail && <button className="admin-button" type="button" onClick={() => setRemoveThumbnail(false)} disabled={saving}>Keep current thumbnail</button>}
              </div>
            </div> : <p className="admin-muted">{removeThumbnail ? "Thumbnail will be removed when you save." : "No thumbnail selected."}{removeThumbnail && <button className="admin-button" type="button" onClick={() => setRemoveThumbnail(false)} disabled={saving}>Keep current thumbnail</button>}</p>}
          </div>
          <label className="admin-field">Sort order<input type="number" step="1" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} /></label>
        </div>
        <div className="admin-checks">
          <label className="admin-check"><input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /> Featured</label>
          <label className="admin-check"><input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} /> Published in Supabase</label>
        </div>
        {error && <p className="admin-alert admin-alert-error" role="alert">{error}</p>}
        {saving && <p className="admin-muted" role="status" aria-live="polite">{saveStatus}</p>}
        <div className="admin-actions">
          <button className="admin-button admin-button-primary" type="submit" disabled={saving}>{saving ? saveStatus : "Save project"}</button>
          <button className="admin-button" type="button" onClick={onCancel} disabled={saving}>Cancel</button>
        </div>
      </form>
    </section>
  );
}

function ProjectsContent() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<ProjectRecord | null>(null);
  const [busyId, setBusyId] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [pendingCleanup, setPendingCleanup] = useState<string[]>([]);
  const cleanupQueueRef = useRef<string[]>([]);

  async function loadProjects() {
    setError("");
    const { data, error: queryError } = await getSupabaseClient()
      .from("projects")
      .select(columns)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (queryError) {
      setError("Could not load projects. Confirm the admin can read all rows, including drafts, through RLS.");
      setLoading(false);
      return;
    }
    setProjects((data ?? []) as ProjectRecord[]);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      setLoading(true);
      void loadProjects().catch(() => {
        if (active) {
          setError("Could not reach Supabase to load projects.");
          setLoading(false);
        }
      });
    }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [attempt]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(imageCleanupStorageKey) ?? "[]");
        if (Array.isArray(saved)) {
          const paths = saved.filter((value): value is string => typeof value === "string");
          cleanupQueueRef.current = paths;
          setPendingCleanup(paths);
        }
      } catch {
        cleanupQueueRef.current = [];
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function rememberCleanupPath(path: string) {
    const paths = [...new Set([...cleanupQueueRef.current, path])];
    cleanupQueueRef.current = paths;
    setPendingCleanup(paths);
    try {
      window.localStorage.setItem(imageCleanupStorageKey, JSON.stringify(paths));
    } catch {
      // The current page still offers a retry if persistent browser storage is unavailable.
    }
  }

  function forgetCleanupPath(path: string) {
    const paths = cleanupQueueRef.current.filter((value) => value !== path);
    cleanupQueueRef.current = paths;
    setPendingCleanup(paths);
    try {
      window.localStorage.setItem(imageCleanupStorageKey, JSON.stringify(paths));
    } catch {
      // Cleanup succeeded in Storage even if local queue persistence is unavailable.
    }
  }

  async function removeImageOrQueue(path: string) {
    try {
      await removeProjectImage(path);
    } catch {
      rememberCleanupPath(path);
    }
  }

  async function saveProject(draft: ProjectDraft, project: ProjectRecord | null, image: File | null, removeThumbnail: boolean, setStatus: (message: string) => void) {
    setError("");
    setNotice("");
    const now = new Date().toISOString();
    const projectId = project?.id ?? crypto.randomUUID();
    const oldThumbnail = project?.thumbnail_path ?? null;
    let uploadedPath: string | null = null;
    let cleanupWarning = false;

    try {
      if (image) {
        setStatus("Uploading thumbnail…");
        uploadedPath = await uploadProjectImage(image, projectId);
      }

      const thumbnailPath = uploadedPath ?? (removeThumbnail ? null : oldThumbnail);
      setStatus("Saving project…");
      const supabase = getSupabaseClient();
      const result = project
        ? await supabase.from("projects").update({ ...draft, thumbnail_path: thumbnailPath, updated_at: now }).eq("id", project.id).select("id").maybeSingle()
        : await supabase.from("projects").insert({ ...draft, id: projectId, thumbnail_path: thumbnailPath, created_at: now, updated_at: now }).select("id").single();

      if (result.error || !result.data) {
        const message = result.error?.code === "23505" || result.error?.message.toLowerCase().includes("duplicate")
          ? "That slug is already in use. Choose a unique slug."
          : result.error?.message ?? "Supabase did not confirm a changed row. Check the admin write policies.";
        setError(message);
        throw new Error(message);
      }

      if (oldThumbnail && (uploadedPath || removeThumbnail)) {
        setStatus("Cleaning up previous thumbnail…");
        try {
          await removeProjectImage(oldThumbnail);
        } catch {
          rememberCleanupPath(oldThumbnail);
          cleanupWarning = true;
        }
      }
    } catch (value) {
      if (uploadedPath) await removeImageOrQueue(uploadedPath);
      const message = value instanceof Error ? value.message : "Could not save this project.";
      setError(message);
      throw new Error(message);
    }

    setCreating(false);
    setEditing(null);
    setNotice(cleanupWarning
      ? "Project saved. Previous thumbnail cleanup is pending below."
      : project ? "Project updated in Supabase." : "Project added to Supabase.");
    await loadProjects();
  }

  async function retryImageCleanup(path: string) {
    setBusyId(`cleanup:${path}`);
    setError("");
    try {
      await removeProjectImage(path);
      forgetCleanupPath(path);
      setNotice("Thumbnail cleanup completed.");
    } catch {
      setError("Storage cleanup is still pending. Check your connection and project-images delete policy, then retry.");
    }
    setBusyId("");
  }

  async function updateFlag(project: ProjectRecord, field: "published" | "featured") {
    setBusyId(project.id);
    setError("");
    setNotice("");
    const value = !project[field];
    const patch = field === "published"
      ? { published: value, updated_at: new Date().toISOString() }
      : { featured: value, updated_at: new Date().toISOString() };
    const { data: updated, error: updateError } = await getSupabaseClient().from("projects").update(patch).eq("id", project.id).select("id").maybeSingle();
    if (updateError || !updated) {
      setError("Could not update this project. Confirm the admin write policies in Supabase.");
    } else {
      setNotice(`${field === "published" ? "Publish state" : "Featured state"} updated in Supabase.`);
      await loadProjects();
    }
    setBusyId("");
  }

  async function deleteProject(project: ProjectRecord) {
    if (!window.confirm(`Delete “${project.title}” and its thumbnail from Supabase?`)) return;
    setBusyId(project.id);
    setError("");
    setNotice("");
    const { data: deleted, error: deleteError } = await getSupabaseClient().from("projects").delete().eq("id", project.id).select("id").maybeSingle();
    if (deleteError || !deleted) {
      setError("Could not delete this project. Confirm the admin write policies in Supabase.");
    } else {
      setProjects((current) => current.filter((item) => item.id !== project.id));
      if (project.thumbnail_path) {
        try {
          await removeProjectImage(project.thumbnail_path);
          setNotice("Project and its thumbnail deleted.");
        } catch {
          rememberCleanupPath(project.thumbnail_path);
          setError("Project deleted, but its image could not be removed from Storage. Retry cleanup below.");
        }
      } else {
        setNotice("Project deleted from Supabase.");
      }
    }
    setBusyId("");
  }

  return (
    <div className="admin-page">
      <div className="admin-width">
        <AdminHeader />
        <div className="admin-main">
          <p className="eyebrow-small">CONTENT</p>
          <h1 className="admin-heading">Projects</h1>
          <p className="admin-lede">Manage all Supabase project records. Drafts remain visible here to authorized admins.</p>
          <p className="admin-notice">Static export note: publish and featured flags apply to Supabase only. The public project pages still read from <code>src/data/projects.ts</code>. A new slug needs a statically generated page and redeployment before it can appear on the public site.</p>
          {error && <p className="admin-alert admin-alert-error" role="alert">{error} <button className="admin-button" type="button" onClick={() => setAttempt((value) => value + 1)}>Reload</button></p>}
          {notice && <p className="admin-alert admin-alert-success" role="status">{notice}</p>}
          {pendingCleanup.length > 0 && <section className="admin-panel admin-cleanup-panel" aria-labelledby="image-cleanup-heading">
            <h2 id="image-cleanup-heading">Thumbnail cleanup needs a retry</h2>
            <p className="admin-muted">The database change succeeded, but Storage did not confirm removal. Retry now; pending paths are kept in this browser until cleanup completes.</p>
            {pendingCleanup.map((path) => <div className="admin-cleanup-row" key={path}><code>{path}</code><button className="admin-button" type="button" onClick={() => void retryImageCleanup(path)} disabled={busyId === `cleanup:${path}`}>{busyId === `cleanup:${path}` ? "Removing…" : "Retry cleanup"}</button></div>)}
          </section>}
          <div className="admin-actions">
            <button className="admin-button admin-button-primary" type="button" onClick={() => { setEditing(null); setCreating((value) => !value); }}>{creating ? "Close new project form" : "Add project"}</button>
            <button className="admin-button" type="button" onClick={() => setAttempt((value) => value + 1)} disabled={loading}>Refresh list</button>
            <Link className="admin-link" href="/admin/">← Dashboard</Link>
          </div>
          {creating && <div className="admin-stack" style={{ marginTop: 18 }}><ProjectForm key="new" project={null} onCancel={() => setCreating(false)} onSave={saveProject} /></div>}
          {editing && <div className="admin-stack" style={{ marginTop: 18 }}><ProjectForm key={editing.id} project={editing} onCancel={() => setEditing(null)} onSave={saveProject} /></div>}
          {loading ? <p className="admin-muted" aria-live="polite">Loading project records…</p> : projects.length === 0 ? <section className="admin-panel"><p className="admin-muted">No project records were returned. If the table contains rows, check the admin SELECT policy.</p></section> :
            <div className="admin-project-list" aria-live="polite">
              {projects.map((project) => {
                const thumbnailUrl = getProjectImageUrl(project.thumbnail_path);
                return <article className="admin-project" key={project.id}>
                  <div className="admin-project-summary">
                    <div className="admin-project-thumb">{thumbnailUrl ? <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumbnailUrl} alt={`Thumbnail for ${project.title}`} />
                    </> : <span>No thumbnail</span>}</div>
                    <div>
                      <h2>{project.title}</h2>
                      <p>{project.summary}</p>
                      <div className="admin-meta"><span>/{project.slug}</span><span>{project.published ? "Published in Supabase" : "Draft"}</span><span>{project.featured ? "Featured" : "Not featured"}</span><span>Order {project.sort_order}</span></div>
                      {project.technologies.length > 0 && <div className="admin-meta"><span>Technologies: {project.technologies.join(", ")}</span></div>}
                    </div>
                  </div>
                  <div className="admin-actions">
                    <button className="admin-button" type="button" onClick={() => { setCreating(false); setEditing(project); }}>Edit</button>
                    <button className="admin-button" type="button" onClick={() => void updateFlag(project, "published")} disabled={busyId === project.id}>{project.published ? "Unpublish" : "Publish"}</button>
                    <button className="admin-button" type="button" onClick={() => void updateFlag(project, "featured")} disabled={busyId === project.id}>{project.featured ? "Unfeature" : "Feature"}</button>
                    <button className="admin-button admin-button-danger" type="button" onClick={() => void deleteProject(project)} disabled={busyId === project.id}>Delete</button>
                  </div>
                </article>;
              })}
            </div>}
        </div>
      </div>
    </div>
  );
}

export function AdminProjects() {
  return <AdminGate><ProjectsContent /></AdminGate>;
}
