export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  visual: "attendly" | "study" | "vision" | "portfolio" | "hospital" | "forecast" | "microscopy";
  details: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "no-stress-study",
    title: "No Stress Study",
    summary: "An authenticated marketplace for digital learning materials, with product browsing, administration, payments, and purchase-based access.",
    category: "Full-stack · Education",
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Razorpay", "Cloudflare R2"],
    visual: "study",
    details: "Built an authenticated storefront for digital study materials, alongside administration for products, categories, and orders. Customers receive content access through their purchases.",
    highlights: [
      "Implemented product browsing and purchase-based access to digital learning materials.",
      "Built administrator workflows for products, categories, and orders.",
      "Integrated Razorpay order creation, payment verification, and webhooks.",
      "Used PostgreSQL, Prisma migrations, and Cloudflare R2 storage.",
    ],
  },
  {
    slug: "attendly",
    title: "Attendly",
    summary: "An employee attendance management system for company-scoped records, punch-event processing, leave workflows, and attendance review.",
    category: "Full-stack · Workforce",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "REST APIs"],
    visual: "attendly",
    details: "Built employee management around company-level access controls and a deterministic attendance workflow, from punch-event ingestion through review and export.",
    highlights: [
      "Added role-based access, employee search and deactivation, and manager assignment.",
      "Implemented punch-event ingestion and deduplication with deterministic attendance calculations.",
      "Created attendance review, leave workflows, a seven-day view, and CSV exports.",
    ],
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio Website",
    summary: "A responsive developer portfolio with static GitHub Pages deployment and a Supabase-authenticated project administration interface.",
    category: "Web · Personal portfolio",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "GitHub Actions"],
    visual: "portfolio",
    details: "Designed and built this portfolio with static export, custom routing, a GitHub Pages base path, and continuous deployment.",
    highlights: [
      "Configured static export and GitHub Pages deployment through GitHub Actions.",
      "Built a separate Supabase-authenticated admin interface for project and thumbnail management.",
      "Designed responsive pages for project case studies and professional information.",
    ],
  },
  {
    slug: "visionos",
    title: "VisionOS",
    summary: "A gesture and gaze-based virtual mouse exploring hand tracking, pointer control, and eye-tracking interaction.",
    category: "Computer vision",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyQt5", "PyAutoGUI", "Pupil Labs"],
    visual: "vision",
    details: "Developed real-time hand tracking and gesture recognition for pointer control, with a PyQt5 interface. Also explored gaze-based pointer interaction using Pupil Labs and other eye-tracking tools.",
    highlights: [
      "Tracked hand movement and recognized gestures for virtual pointer control.",
      "Built an interactive desktop interface with PyQt5.",
      "Explored gaze-based interaction with Pupil Labs and related eye-tracking tools.",
    ],
  },
  {
    slug: "hospital-management-system",
    title: "Hospital Management System",
    summary: "A relational database project for patient records, appointments, doctor schedules, and operational data workflows.",
    category: "Database design",
    technologies: ["SQL", "MySQL", "Relational modeling", "ETL"],
    visual: "hospital",
    details: "Designed a 10+ table relational schema for patients, appointments, and doctor schedules, with primary and foreign key integrity and ETL workflows.",
    highlights: [
      "Modeled patients, appointments, and doctor schedules with relational constraints.",
      "Supported more than 500 patient records, 1,000 appointments, and 100 doctor schedules.",
      "Reported data retrieval improvements of up to 30%.",
    ],
  },
  {
    slug: "store-sales-forecasting",
    title: "Store Sales Forecasting",
    summary: "A time-series forecasting project analyzing trends, seasonality, and event effects in store sales.",
    category: "Time-series analytics",
    technologies: ["Python", "ACF/PACF", "SMA/EMA", "Statistical testing"],
    visual: "forecast",
    details: "Analyzed sales patterns and built forecasts with moving averages and ACF/PACF-based lag features, using A/B comparisons and hypothesis testing.",
    highlights: [
      "Visualized trends, seasonal patterns, and event effects.",
      "Used ACF/PACF lag features with simple and exponential moving averages.",
      "Achieved an RMSE of 0.98 and a runner-up position.",
    ],
  },
  {
    slug: "cancer-cell-image-counting",
    title: "Cancer Cell Image Counting",
    summary: "A computer vision and deep learning project estimating cancer cell counts from microscope images.",
    category: "Computer vision · Deep learning",
    technologies: ["Python", "ResNet-34", "Image processing", "Regression"],
    visual: "microscopy",
    details: "Normalized and center-cropped microscope images, then trained a single-output ResNet-34 regression model with RMSE loss to estimate cell counts.",
    highlights: [
      "Prepared microscope imagery through normalization and center cropping.",
      "Applied a ResNet-34 model with a regression output for cell-count estimates.",
      "Optimized the model using RMSE loss.",
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
