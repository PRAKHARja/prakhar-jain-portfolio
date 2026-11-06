# Prakhar Jain Portfolio

A responsive portfolio built with Next.js App Router, TypeScript and local CSS. Project metadata and biography content live in `src/data/`; shared navigation, cards and case study sections live in `src/components/`.

## Run locally

```powershell
npm ci
npm run dev
```

Open http://localhost:3000/prakhar-jain-portfolio/ (the configured Next.js `basePath`).

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run build
```

## Routes

- `/` — Home
- `/projects` — Project directory
- `/projects/attendly` — Attendly case study
- `/projects/no-stress-study` — No Stress Study case study
- `/projects/personal-portfolio` — Personal portfolio case study
- `/projects/visionos` — VisionOS case study
- `/projects/hospital-management-system` — Hospital Management System case study
- `/projects/store-sales-forecasting` — Store Sales Forecasting case study
- `/projects/cancer-cell-image-counting` — Cancer Cell Image Counting case study
- `/about` — Professional profile
- `/contact` — Contact options and enquiry UI
- `/admin/login` — Supabase email/password admin sign-in
- `/admin` — Admin overview (requires an authorized Supabase account)
- `/admin/projects` — Supabase project records (requires an authorized Supabase account)

## Supabase admin panel

The admin pages are client-side routes included in the static export. They use only the Supabase browser client and the publishable key; no service-role key, API route, Server Action, or middleware is used. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. These values must also be available to the GitHub Pages build workflow because `NEXT_PUBLIC_*` variables are embedded in the exported JavaScript.

In Supabase Auth, enable email/password sign-in and disable public sign-ups. Create the administrator account from the Supabase Dashboard, then add its Auth user UUID to `public.admin_users`. The admin panel has no sign-up flow and verifies that row after authentication. Keep RLS enabled: the `admin_users` policy must allow each signed-in user to read only their own row; public project reads must be limited to `published = true`; and project insert, update, delete, and all-row admin reads must be restricted to UUIDs in `admin_users`. The frontend check is for navigation and UX; RLS is the database security boundary.

Project CRUD currently changes Supabase records only. The public portfolio still reads its case studies from `src/data/projects.ts`. The database schema does not contain all of the current case-study narrative fields, so existing pages remain unchanged. A safe migration is to seed Supabase with the shared fields (slug, title, summary, technologies, links, thumbnail path, visibility, featured state, and sort order) while preserving `src/data/projects.ts` as the source for each case-study narrative. If public content is later switched to Supabase, fetch it at export/build time and redeploy. New slugs need to be present when `generateStaticParams` runs and need a statically generated page; inserting a row alone cannot create a runtime Next.js route on GitHub Pages.

Project thumbnails are uploaded from the admin form to the public `project-images` Storage bucket. The browser checks the raster image format and a 5 MB size limit, and saves the bucket-relative object path in `projects.thumbnail_path`. Replacing or removing a thumbnail updates the row before cleaning up the old object. If a Storage delete cannot complete, the admin page keeps a retry entry in that browser's local storage.

The current project folder does not include the SQL that created the existing policies, so review their exact `USING` and `WITH CHECK` expressions in the Supabase Dashboard before relying on the panel. The implementation does not modify RLS policies.

## Portfolio content

The public profile and project details are based on Prakhar Jain’s resume. Contact options publish the approved email address and professional profile links; the phone number and resume PDF are kept private. The contact form prepares an email draft in the visitor’s mail app and does not send or store messages. Project descriptions are limited to the information supplied for each project.

Do not add a Supabase service-role or secret key to `.env.local`, GitHub Actions, or frontend code. The publishable key is intended for browser use and must be paired with correctly scoped RLS policies.

## GitHub and Vercel

From this folder after reviewing the changes:

```powershell
git init
git add .
git commit -m "Build Prakhar Jain developer portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/prakhar-jain-portfolio.git
git push -u origin main
```

Create the `prakhar-jain-portfolio` repository under the intended GitHub account first. In Vercel, import that repository and use the Next.js defaults (`npm run build`, no custom output directory). Set `NEXT_PUBLIC_SITE_URL` to the assigned production domain, then deploy. There are no contact provider variables or other secrets to configure.

`package-lock.json` is included with the project files and matches the declared dependencies. Use `npm ci` for a clean, reproducible install.
