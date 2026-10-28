export type ProjectStatus = "In development" | "Prototype" | "Concept demo";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  status: ProjectStatus;
  visual: "attendly" | "study" | "vision" | "clinic";
  overview: string;
  problem: string;
  goals: string[];
  contribution: string;
  features: string[];
  implementation: string;
  verification: string;
  limitations: string[];
  future: string[];
  repositoryUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "attendly",
    title: "Attendly",
    summary: "An attendance management MVP for small Indian businesses, with a focus on reviewing raw device events and calculating workdays clearly.",
    category: "Workforce · In development",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    status: "In development",
    visual: "attendly",
    overview: "Attendly is described in the project brief as an employee attendance management MVP for small Indian businesses.",
    problem: "Manual attendance review and inconsistent device timestamps can make it difficult to reconcile daily records.",
    goals: ["Keep employee records scoped to a company.", "Make raw device events reviewable before they become attendance records.", "Account for common shift and timestamp edge cases."],
    contribution: "The brief identifies this as your project, but its source repository was not found in the inspected folders. Add a concise account of your contribution after confirming the project history.",
    features: ["The brief lists sign-in, role-based access and company-scoped records.", "It describes an event inbox with deduplication and attendance review.", "It lists CSV exports and persistent light/dark theme selection."],
    implementation: "The architecture and implementation have not been source-audited. The feature list above is based on the supplied brief and should be checked against the current code before publication.",
    verification: "No project source or test suite was available in the inspected workspace, so implementation and tests could not be verified.",
    limitations: ["A simulator or adapter boundary does not confirm a working biometric device integration.", "Detailed implementation status remains unverified without the source repository."],
    future: ["Link the source repository once it is confirmed public.", "Update this page with a verified architecture and tested feature list."],
  },
  {
    slug: "no-stress-study",
    title: "No Stress Study",
    summary: "An educational storefront for organizing and selling digital study material, with account, admin, order and payment flows in the local codebase.",
    category: "Education · In development",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Razorpay", "Cloudflare R2"],
    status: "In development",
    visual: "study",
    overview: "No Stress Study is an educational digital-material storefront. A local Next.js source repository was found and reviewed read-only.",
    problem: "Students need a straightforward way to discover study resources and access purchases in one place.",
    goals: ["Organize digital products for browsing.", "Provide account and order pages.", "Support administrator workflows for products and categories."],
    contribution: "The local repository demonstrates an implementation, but the brief and source do not establish which parts were individually authored by you. Replace this note with your confirmed contribution before publishing.",
    features: ["Product listing and detail routes are present.", "Signup, login and account pages are present.", "Admin pages cover products, categories, orders and coupons.", "Payment order, verification and webhook routes are present.", "Private product access and thumbnail/upload routes are present."],
    implementation: "The app uses Next.js App Router with Prisma and PostgreSQL. The source contains Razorpay order creation and verification endpoints and Cloudflare R2 helpers. The schema centers on products, categories, orders and user access; it does not currently show a course-bundle model in the inspected schema.",
    verification: "Source files were inspected, but the repository was not run as part of this portfolio review. Payment, storage and authorization behavior still need an environment-backed test before describing them as production-ready.",
    limitations: ["The repository has no public demo URL confirmed here.", "Payment and object-storage flows depend on deployment credentials and provider configuration.", "The PDF upload route checks the declared MIME type and size; it does not inspect the file signature.", "Course bundles and learner access direction are not evidenced by a course model in the inspected schema."],
    future: ["Test payment verification and webhook behavior in a provider sandbox.", "Document purchase authorization and upload constraints.", "Add course relationships if course bundling remains a product goal."],
  },
  {
    slug: "visionos",
    title: "VisionOS",
    summary: "A Python virtual-mouse concept that maps webcam hand landmarks and face landmarks to pointer movement and gesture-triggered actions.",
    category: "Computer vision · Prototype",
    technologies: ["Python", "PyQt5", "MediaPipe", "OpenCV", "PyAutoGUI"],
    status: "Prototype",
    visual: "vision",
    overview: "A local Python script for webcam-based hand gesture and gaze-related desktop control was found in the Capstone folder.",
    problem: "The prototype explores alternative ways to move and control a desktop pointer using a webcam.",
    goals: ["Offer selectable gesture and gaze modes.", "Use visual landmarks to map interaction to pointer input.", "Show camera frames in a small desktop interface."],
    contribution: "The inspected file is a single application script. Confirm which portions you authored and whether there are additional modules before publishing a personal-contribution summary.",
    features: ["A PyQt5 window offers Gesture Mode and Gaze Mode.", "MediaPipe Hands landmarks drive pointer movement with a simple smoothing blend; thumb-to-finger distances trigger clicks, double-clicks, scrolling and volume keys.", "Face Mesh iris landmarks map to the pointer in gaze mode; an eye-landmark distance threshold triggers a click."],
    implementation: "OpenCV captures and mirrors webcam frames, converts them for MediaPipe, then sends normalized landmarks to PyAutoGUI. The gesture path uses the index fingertip for pointer movement. The gaze path uses Face Mesh iris landmarks. PyQt5 QTimer refreshes the preview roughly every 50 ms.",
    verification: "The source file was inspected. Hardware behavior was not run or verified in this review.",
    limitations: ["The gaze path maps iris position from a single webcam frame; the source does not show calibration or robust eye tracking.", "Several gesture actions are threshold-triggered on every frame, which may repeat while a pose is held.", "Camera availability and desktop permissions are required; it is a prototype rather than an operating-system replacement."],
    future: ["Add calibrated cursor mapping and dead zones.", "Add gesture debouncing and configurable controls.", "Handle missing camera and resource cleanup more robustly."],
  },
  {
    slug: "clinic-website",
    title: "Clinic Website Demo",
    summary: "A fictional, responsive clinic website concept demonstrating clear service information, opening hours and an accessible enquiry experience.",
    category: "Freelance sample · Concept demo",
    technologies: ["Next.js", "React", "TypeScript", "CSS"],
    status: "Concept demo",
    visual: "clinic",
    overview: "A fictional clinic website concept built as part of this portfolio to show a possible direction for local healthcare sites.",
    problem: "Patients often need clinic services, opening hours and contact options to be easy to find on a phone.",
    goals: ["Present services and fictional care-team profiles.", "Make hours and contact information easy to scan.", "Offer an appointment enquiry interface without implying a backend."],
    contribution: "Concept design and implementation of the local sample website in this portfolio.",
    features: ["Responsive navigation and prominent appointment enquiry links.", "Fictional services, clinician profiles and opening hours.", "A demo enquiry form that explains no appointment is sent or stored."],
    implementation: "The concept is a local Next.js route using static fictional content. The enquiry interface is front-end only and does not collect or transmit personal data.",
    verification: "The local demo is available at /projects/clinic-website/demo. No external appointment submission or patient data storage is configured.",
    limitations: ["All clinic and clinician details are fictional.", "The enquiry form is a demonstration and does not send a booking."],
    future: ["Replace fictional content with client-approved information.", "Connect a verified scheduling or enquiry service after requirements and privacy handling are agreed."],
  },
];

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
