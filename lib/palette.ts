// A small, curated set of secondary accents — used systematically (one per
// capability/tech-group/process-step), never arbitrarily — to give sections
// visual identity without turning into a rainbow. Colors are Tailwind's own
// muted 400/500 shades so they stay legible on the near-black background.
export type AccentTheme = {
  icon: string;
  badge: string;
  text: string;
  bar: string;
  borderL: string;
  dot: string;
};

export const palette: AccentTheme[] = [
  {
    icon: "text-violet-400",
    badge: "border-violet-500/25 bg-violet-500/10",
    text: "text-violet-400",
    bar: "bg-violet-500",
    borderL: "border-l-violet-500",
    dot: "bg-violet-500",
  },
  {
    icon: "text-sky-400",
    badge: "border-sky-500/25 bg-sky-500/10",
    text: "text-sky-400",
    bar: "bg-sky-500",
    borderL: "border-l-sky-500",
    dot: "bg-sky-500",
  },
  {
    icon: "text-emerald-400",
    badge: "border-emerald-500/25 bg-emerald-500/10",
    text: "text-emerald-400",
    bar: "bg-emerald-500",
    borderL: "border-l-emerald-500",
    dot: "bg-emerald-500",
  },
  {
    icon: "text-amber-400",
    badge: "border-amber-500/25 bg-amber-500/10",
    text: "text-amber-400",
    bar: "bg-amber-500",
    borderL: "border-l-amber-500",
    dot: "bg-amber-500",
  },
  {
    icon: "text-rose-400",
    badge: "border-rose-500/25 bg-rose-500/10",
    text: "text-rose-400",
    bar: "bg-rose-500",
    borderL: "border-l-rose-500",
    dot: "bg-rose-500",
  },
];
