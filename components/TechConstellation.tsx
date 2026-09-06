type Node = { label: string; x: number; y: number; dot: string };

// Mirrors data/techStack.ts — a decorative, hand-laid-out companion to that
// section's plain-text list (which stays the accessible source of truth).
const NODES: Node[] = [
  // Frontend — violet
  { label: "Next.js", x: 140, y: 70, dot: "fill-violet-400" },
  { label: "React", x: 90, y: 145, dot: "fill-violet-400" },
  { label: "TypeScript", x: 225, y: 110, dot: "fill-violet-400" },
  { label: "JavaScript", x: 55, y: 225, dot: "fill-violet-400" },
  { label: "Tailwind CSS", x: 195, y: 195, dot: "fill-violet-400" },
  { label: "Vite", x: 275, y: 155, dot: "fill-violet-400" },
  // Backend — sky
  { label: "Node.js", x: 365, y: 90, dot: "fill-sky-400" },
  { label: "Server Actions", x: 435, y: 48, dot: "fill-sky-400" },
  { label: "Serverless Functions", x: 495, y: 120, dot: "fill-sky-400" },
  { label: "REST APIs", x: 400, y: 175, dot: "fill-sky-400" },
  { label: "Zod", x: 328, y: 205, dot: "fill-sky-400" },
  // Database — emerald
  { label: "PostgreSQL", x: 545, y: 225, dot: "fill-emerald-400" },
  { label: "Supabase", x: 472, y: 275, dot: "fill-emerald-400" },
  { label: "Row Level Security", x: 560, y: 320, dot: "fill-emerald-400" },
  // Tools — amber
  { label: "Vitest", x: 545, y: 55, dot: "fill-amber-400" },
  { label: "Git", x: 615, y: 110, dot: "fill-amber-400" },
  { label: "GitHub", x: 655, y: 180, dot: "fill-amber-400" },
  { label: "Vercel", x: 605, y: 250, dot: "fill-amber-400" },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5],
  [0, 6], [6, 7], [6, 9], [9, 10], [6, 8],
  [7, 12], [12, 11], [11, 13],
  [15, 16], [16, 17], [15, 14],
];

/**
 * Decorative node map of the real stack (see data/techStack.ts) — purely
 * visual, so it's aria-hidden; the same technologies are listed as plain,
 * accessible text right below this in the Stack section.
 */
export function TechConstellation() {
  return (
    <svg
      viewBox="0 0 720 360"
      className="h-full w-full"
      role="img"
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="currentColor"
          className="text-border"
          strokeWidth={1}
        />
      ))}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={3.5} className={n.dot} />
          <text
            x={n.x + 9}
            y={n.y + 4}
            className="fill-ink-muted font-mono"
            fontSize={11}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
