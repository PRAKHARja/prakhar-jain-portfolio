export const site = {
  name: "Prakhar Jain",
  title: "Salesforce Developer",
  summary: "Salesforce Developer at Wipro contributing to enhancements for Beckman’s ServiceMax platform. A Salesforce Certified Platform Administrator with experience in Apex, SOQL, enterprise applications, and full-stack development using Next.js, React, TypeScript, PostgreSQL, and Prisma. Focused on building scalable software solutions across Salesforce and full-stack development.",
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
    "Contribute to Salesforce development and enhancements for Beckman’s ServiceMax platform.",
    "Analyze, debug, and resolve development issues and application defects.",
    "Collaborate with the team on technical enhancements and enterprise application requirements.",
    "Use Apex and SOQL for Salesforce application development, data retrieval, and troubleshooting within ServiceMax.",
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
    institution: "Aadarsh Vidhya Mandir, Bharatpur",
    years: "2019–2020",
  },
  {
    qualification: "CBSE Class X",
    institution: "St. Peter’s Sr. Sec. School, Bharatpur",
    years: "2017–2018",
  },
];

export const skills = [
  { group: "Salesforce", items: ["Salesforce Platform", "Apex", "SOQL", "ServiceMax", "Salesforce Administration", "LWC", "Flows", "Triggers"] },
  { group: "Programming languages", items: ["Python", "C++", "SQL", "JavaScript", "TypeScript"] },
  { group: "Frontend development", items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Backend & data", items: ["REST APIs", "Node.js", "Authentication", "Role-based access control (RBAC)", "PostgreSQL", "MySQL", "Supabase", "Prisma"] },
  { group: "Tools & libraries", items: ["Git", "GitHub", "GitHub Actions", "CI/CD", "Razorpay", "Cloudflare R2", "OpenCV", "MediaPipe", "PyQt5", "PyAutoGUI"] },
];

export const certifications = [
  { name: "Salesforce Certified Platform Administrator", issuer: "Salesforce" },
  { name: "Salesforce Certified Agentforce Specialist", issuer: "Salesforce" },
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
