-- MANUAL REVIEW ONLY. This file is deliberately outside supabase/migrations/.
-- It imports case-study-specific fields from src/data/projects.ts into the
-- extension table, only when the matching existing public.projects.slug exists.
-- It never inserts, updates, or deletes rows in public.projects.
-- Every imported case study starts hidden (is_visible = false) for review.
-- Existing case-study rows are preserved by ON CONFLICT DO NOTHING.

insert into public.project_case_studies (
  project_id, category, status, visual_kind, problem, goals, contribution,
  features, implementation, verification, limitations, future, is_visible
)
select p.id, source.category, source.status, source.visual_kind, source.problem,
       source.goals, source.contribution, source.features, source.implementation,
       source.verification, source.limitations, source.future, false
from (
  values
    (
      'attendly',
      'Workforce · In development',
      'In development',
      'attendly',
      'Manual attendance review and inconsistent device timestamps can make it difficult to reconcile daily records.',
      array['Keep employee records scoped to a company.', 'Make raw device events reviewable before they become attendance records.', 'Account for common shift and timestamp edge cases.']::text[],
      'The brief identifies this as your project, but its source repository was not found in the inspected folders. Add a concise account of your contribution after confirming the project history.',
      array['The brief lists sign-in, role-based access and company-scoped records.', 'It describes an event inbox with deduplication and attendance review.', 'It lists CSV exports and persistent light/dark theme selection.']::text[],
      'The architecture and implementation have not been source-audited. The feature list above is based on the supplied brief and should be checked against the current code before publication.',
      'No project source or test suite was available in the inspected workspace, so implementation and tests could not be verified.',
      array['A simulator or adapter boundary does not confirm a working biometric device integration.', 'Detailed implementation status remains unverified without the source repository.']::text[],
      array['Link the source repository once it is confirmed public.', 'Update this page with a verified architecture and tested feature list.']::text[]
    ),
    (
      'no-stress-study',
      'Education · In development',
      'In development',
      'study',
      'Students need a straightforward way to discover study resources and access purchases in one place.',
      array['Organize digital products for browsing.', 'Provide account and order pages.', 'Support administrator workflows for products and categories.']::text[],
      'Built an authenticated storefront for digital study materials, with administrator workflows for products, categories, and orders.',
      array['Product listing and detail routes are present.', 'Signup, login and account pages are present.', 'Admin pages cover products, categories, orders and coupons.', 'Payment order, verification and webhook routes are present.', 'Private product access and thumbnail/upload routes are present.']::text[],
      'The app uses Next.js App Router with Prisma and PostgreSQL. The source contains Razorpay order creation and verification endpoints and Cloudflare R2 helpers. The schema centers on products, categories, orders and user access; it does not currently show a course-bundle model in the inspected schema.',
      'Source files were inspected, but the repository was not run as part of this portfolio review. Payment, storage and authorization behavior still need an environment-backed test before describing them as production-ready.',
      array['No live project URL was supplied for this entry.', 'Payment and object-storage flows depend on deployment credentials and provider configuration.', 'The PDF upload route checks the declared MIME type and size; it does not inspect the file signature.', 'Course bundles and learner access direction are not evidenced by a course model in the inspected schema.']::text[],
      array['Test payment verification and webhook behavior in a provider sandbox.', 'Document purchase authorization and upload constraints.', 'Add course relationships if course bundling remains a product goal.']::text[]
    ),
    (
      'visionos',
      'Computer vision · Prototype',
      'Prototype',
      'vision',
      'The prototype explores alternative ways to move and control a desktop pointer using a webcam.',
      array['Offer selectable gesture and gaze modes.', 'Use visual landmarks to map interaction to pointer input.', 'Show camera frames in a small desktop interface.']::text[],
      'The inspected file is a single application script. Confirm which portions you authored and whether there are additional modules before publishing a personal-contribution summary.',
      array['A PyQt5 window offers Gesture Mode and Gaze Mode.', 'MediaPipe Hands landmarks drive pointer movement with a simple smoothing blend; thumb-to-finger distances trigger clicks, double-clicks, scrolling and volume keys.', 'Face Mesh iris landmarks map to the pointer in gaze mode; an eye-landmark distance threshold triggers a click.']::text[],
      'OpenCV captures and mirrors webcam frames, converts them for MediaPipe, then sends normalized landmarks to PyAutoGUI. The gesture path uses the index fingertip for pointer movement. The gaze path uses Face Mesh iris landmarks. PyQt5 QTimer refreshes the preview roughly every 50 ms.',
      'The source file was inspected. Hardware behavior was not run or verified in this review.',
      array['The gaze path maps iris position from a single webcam frame; the source does not show calibration or robust eye tracking.', 'Several gesture actions are threshold-triggered on every frame, which may repeat while a pose is held.', 'Camera availability and desktop permissions are required; it is a prototype rather than an operating-system replacement.']::text[],
      array['Add calibrated cursor mapping and dead zones.', 'Add gesture debouncing and configurable controls.', 'Handle missing camera and resource cleanup more robustly.']::text[]
) as source(slug, category, status, visual_kind, problem, goals, contribution,
            features, implementation, verification, limitations, future)
join public.projects p on p.slug = source.slug
on conflict (project_id) do nothing;

-- After review, an admin can set is_visible = true for approved case studies.
