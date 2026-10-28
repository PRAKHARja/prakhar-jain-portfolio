export const site = {
  name: "Prakhar Jain",
  title: "Software Developer",
  linkedin: "https://www.linkedin.com/in/prakhar-jain-73063b22b/",
  github: "",
  email: "",
  location: "India",
  role: "Salesforce Developer",
  company: "Wipro",
  employmentStart: "March 2026",
  education: "B.E. in Electronics and Computer Engineering",
  university: "Thapar Institute of Engineering & Technology",
  educationYears: "2021–2025",
} as const;

export const skills = [
  { group: "Salesforce", items: ["Apex", "SOQL", "Salesforce administration", "Agentforce"] },
  { group: "Web development", items: ["Next.js", "React", "TypeScript"] },
  { group: "Backend & data", items: ["Python", "SQL", "PostgreSQL", "Prisma"] },
  { group: "Computer vision", items: ["OpenCV", "MediaPipe", "PyQt5", "PyAutoGUI"] },
];

export const certifications = [
  { name: "Salesforce Administrator", issuer: "Salesforce", date: "Credential dated August 2026" },
  { name: "Salesforce Agentforce Specialist", issuer: "Salesforce", date: "Credential dated October 2026" },
];

// Keep these empty until the role details are supplied and approved for publication.
export const experience = {
  title: "Salesforce Developer",
  company: "Wipro",
  dates: "March 2026 – Present",
  responsibilities: [] as string[],
};
