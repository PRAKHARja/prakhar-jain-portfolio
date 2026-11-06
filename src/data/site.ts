export const site = {
  name: "Prakhar Jain",
  title: "Salesforce Developer",
  summary: "Salesforce Developer at Wipro contributing to ServiceMax enhancements for Beckman, with full-stack experience building web products, APIs, database workflows, payment integrations and role-based access controls.",
  linkedin: "https://www.linkedin.com/in/prakhar-jain-73063b22b/",
  github: "https://github.com/PRAKHARja",
  email: "jainprakhar641@gmail.com",
  location: "Bengaluru, India",
  url: "https://prakharja.github.io/prakhar-jain-portfolio/",
  role: "Salesforce Developer",
  company: "Wipro",
} as const;

export const experience = {
  title: site.role,
  company: site.company,
  dates: "March 2026 – Present",
  responsibilities: [
    "Contribute to enhancements for Beckman’s ServiceMax system through Salesforce development.",
  ],
};

export const education = [
  {
    qualification: "B.E., Electronics and Computer",
    institution: "Thapar Institute of Engineering and Technology",
    years: "2021–2025",
  },
  {
    qualification: "CBSE Class XII",
    institution: "Adarsh Vidhya Mandir, Bharatpur",
    years: "2019–2020",
  },
  {
    qualification: "CBSE Class X",
    institution: "St. Peter’s Sr. Sec. School, Bharatpur",
    years: "2017–2018",
  },
];

export const skills = [
  { group: "Development", items: ["Salesforce", "ServiceMax", "Next.js", "React", "TypeScript", "Python", "C++", "SQL", "HTML/CSS", "Tailwind CSS"] },
  { group: "Backend & data", items: ["REST APIs", "PostgreSQL", "Supabase", "Prisma", "Authentication", "RBAC", "CSV processing"] },
  { group: "Integrations & tools", items: ["Razorpay", "Cloudflare R2", "Git/GitHub", "CI/CD", "OpenCV", "MediaPipe", "PyQt5"] },
];

export const certifications = [
  { name: "Salesforce Certified Platform Developer", issuer: "Salesforce" },
  { name: "Salesforce Certified Agentforce 360", issuer: "Salesforce" },
  { name: "Google Python course", issuer: "Google" },
  { name: "Emotion AI facial key-points project certificate", issuer: "Emotion AI project" },
];

export const leadership = [
  {
    role: "Executive Committee Member",
    organization: "SAIC",
    year: "2024",
    detail: "Planned alumni–student engagement initiatives with the core team.",
  },
  {
    role: "Creativity Head",
    organization: "EXORDIUM",
    year: "",
    detail: "Led the creative team for the flagship alumni–fresher event, attended by approximately 2,000 people.",
  },
  {
    role: "Event Management Team",
    organization: "Saturnalia",
    year: "2022",
    detail: "Supported event planning, logistics, promotions, and on-site activities for more than 10,000 attendees.",
  },
];
