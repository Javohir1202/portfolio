export type TechGroup = {
  label: string;
  items: string[];
};

// Verified against the actual repositories (focusflow / finance-pwa) — nothing listed
// here is aspirational. Grouped, not ranked; no proficiency scores.
export const techStack: TechGroup[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Next.js Server Actions", "Serverless Functions", "REST APIs", "Zod"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "Supabase", "Row Level Security"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Vercel", "Vitest"],
  },
];
