# Phase 1 CMS database

This folder contains the additive Phase 1 CMS schema for the portfolio. The migration has **not** been applied to Supabase. It creates 19 new tables and does not alter or seed `public.projects`, `public.admin_users`, or any Storage bucket/policy.

## Existing projects contract

The repository's `src/lib/supabase/database.types.ts` describes the existing `public.projects` table as:

| Column | Type | Nullability |
| --- | --- | --- |
| `id` | `uuid` | not null, primary/unique key |
| `slug` | `text` | not null, unique |
| `title`, `summary`, `description` | `text` | not null |
| `technologies` | `text[]` | not null |
| `github_url`, `live_url`, `thumbnail_path` | `text` | nullable |
| `featured`, `published` | `boolean` | not null |
| `sort_order` | `integer` | not null |
| `created_at`, `updated_at` | `timestamptz` | not null |

The migration checks these expected columns and nullability, the project key constraints, RLS, and the existing public read policy before creating the case-study foreign key. It allows extra live columns. This is a repository contract, **not proof of the live database shape**: compare against the live Supabase catalog before applying. A mismatch aborts the transaction without modifying existing data. The existing project records are never updated or deleted by this migration or the optional seed file.

## Apply safely

1. Confirm the target Supabase project and take/verify a recent database backup.
2. Compare the live `projects` and `admin_users` columns, keys, RLS and policies with this contract and the existing application. See `verification/phase1_cms_verification.sql`.
3. Apply the timestamped migration to a development Supabase project first. Use the Supabase CLI linked to the intended project (`supabase db push`) so migration history is recorded. The migration has a transaction and fails if prerequisites or new-table names do not match expectations.
4. Run the verification queries and inspect the resulting policies and table grants.
5. Do not run the optional file under `seeds/` as part of the migration. Review existing local content and the current project rows first if/when migrating content.

The singleton primary key plus `CHECK (id = 1)` permits at most one configuration row in each table. The migration creates no singleton rows, to avoid seeding content; the future CMS must insert the `id = 1` row as an admin before it can edit a singleton configuration table. Its `content` object is intentionally JSONB because Phase 1 defines storage and authorization; a later CMS phase should define and validate each versioned JSON shape in TypeScript before saving.

## Table purposes and access

All public policies are RLS `SELECT` policies. An authenticated non-admin receives the same public rows as an anonymous visitor. Admin policies call `public.cms_is_admin()`, a `SECURITY DEFINER` helper with an empty search path that checks only whether the caller's `auth.uid()` exists in `public.admin_users`. Execute is revoked from `PUBLIC` and `anon`, and granted only to `authenticated`; it returns only a boolean. Existing admin policies are not changed. No service-role key is used. Tables with no public read policy have no `anon` table grant.

| Table | Purpose | Public read | Admin access |
| --- | --- | --- | --- |
| `site_settings` | Singleton brand, profile, favicon and default social-image references plus settings JSON | `published AND is_visible` | Insert, select, update, delete |
| `home_content` | Singleton homepage content JSON | `published AND is_visible` | Insert, select, update, delete |
| `about_content` | Singleton About content JSON | `published AND is_visible` | Insert, select, update, delete |
| `contact_settings` | Singleton public contact details/settings JSON; not contact submissions | `published AND is_visible` | Insert, select, update, delete |
| `education` | Ordered education entries | `published AND is_visible` | Insert, select, update, delete |
| `skill_categories` | Ordered skill groups | `published AND is_visible` | Insert, select, update, delete |
| `skills` | Skills linked to a category | `published AND is_visible`, with a published and visible category | Insert, select, update, delete |
| `experience` | Ordered work history | `published AND is_visible` | Insert, select, update, delete |
| `services` | Ordered services or capability cards | `published AND is_visible` | Insert, select, update, delete |
| `certifications` | Credentials, dates and optional media reference | `published AND is_visible` | Insert, select, update, delete |
| `achievements` | Awards and achievements with optional media reference | `published AND is_visible` | Insert, select, update, delete |
| `social_links` | Public social/profile links | `published AND is_visible` | Insert, select, update, delete |
| `navigation_items` | Header/footer links | `published AND is_visible` | Insert, select, update, delete |
| `page_seo` | Per-route metadata and social-sharing references | `published AND is_visible` | Insert, select, update, delete |
| `media_assets` | Metadata for objects stored in Supabase Storage | `is_public AND published AND is_visible` | Insert, select, update, delete |
| `resume_documents` | Published resume/document versions | Published and visible, and linked asset is public, published and visible | Insert, select, update, delete |
| `project_case_studies` | One-to-one narrative extension for an existing project | Visible and parent `projects.published` | Insert, select, update, delete |
| `content_revisions` | Append-only content snapshots for later revision workflows | None | Select and insert only |
| `asset_cleanup_queue` | Admin retry queue for failed Storage object cleanup | None | Insert, select, update, delete |

`project_case_studies` deliberately does not duplicate the existing project title, slug, summary, description, technologies, links, thumbnail path, featured or published fields. Its public visibility follows the existing `projects.published` flag. Existing project routes remain part of the static site; adding a database row does not create a new GitHub Pages route.

For a later content migration, map the local `slug`, `title`, `summary`, `technologies`, repository and live URLs, and overview to the matching existing project columns only after comparing those values with the live records. The optional seed imports the remaining narrative fields (`category`, `status`, visual kind, problem, goals, contribution, features, implementation, verification, limitations and future plans) into `project_case_studies`; it does not write existing project columns.

## Storage and static export notes

The migration does not change Storage RLS. `media_assets` is metadata only; `project-images` is a public bucket, so anyone who knows an object URL can fetch it regardless of a draft row's database policy. Do not store private documents in that public bucket. Private documents require a separate private bucket and signed URL design.

This schema does not make GitHub Pages render new database content at build time or create arbitrary project routes. Existing local TypeScript content and case-study pages remain in place. Replacing static content with Supabase reads, plus rebuilding static SEO and route output, belongs to later CMS phases.

## Deferred work

- The singleton JSONB keys and content validation schemas are defined in later application phases.
- Revision capture/restore and cleanup queue retry workers are not created here.
- This migration does not alter existing project/admin policies or Storage policies.
- `seeds/portfolio-case-studies-review.sql` is a manual, hidden-by-default example import from current local TypeScript data. Review it and the live project slugs before executing it.
