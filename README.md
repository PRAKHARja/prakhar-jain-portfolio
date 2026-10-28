# Prakhar Jain Portfolio

A responsive portfolio built with Next.js App Router, TypeScript and local CSS. Project metadata and biography content live in `src/data/`; shared navigation, cards and case study sections live in `src/components/`.

## Run locally

```powershell
npm ci
npm run dev
```

Open http://localhost:3000.

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
- `/projects/visionos` — VisionOS prototype case study
- `/projects/clinic-website` — Clinic demo case study
- `/projects/clinic-website/demo` — Local fictional clinic-site demo
- `/about` — Professional profile
- `/contact` — Contact options and enquiry UI

## Personal details to complete

- Add a verified email to `src/data/site.ts`. The contact form then prepares a `mailto:` draft; it does not send or store messages.
- Add a verified GitHub URL to `src/data/site.ts` if you want it displayed.
- Add your confirmed responsibilities and achievements to `experience.responsibilities` in `src/data/site.ts`.
- Confirm your personal contribution and project status for Attendly and No Stress Study; see `src/data/projects.ts`.
- Replace the current-resume note with a current, approved resume before adding a public download.
- Set `NEXT_PUBLIC_SITE_URL` to the real production URL before deployment. This enables canonical metadata base and sitemap entries. No URL has been guessed.

No secrets or provider credentials are required by this portfolio.

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
