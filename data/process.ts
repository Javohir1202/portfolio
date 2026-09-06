import { Search, PenTool, Hammer, Rocket, type LucideIcon } from "lucide-react";

export type ProcessStep = {
  index: string;
  icon: LucideIcon;
};

// Display text (title/description/tags) lives in lib/i18n/dictionaries.ts,
// keyed by the same index — this just supplies the structural bits (the
// step number and icon) that don't change with locale.
export const process: ProcessStep[] = [
  { index: "00", icon: Search },
  { index: "01", icon: PenTool },
  { index: "02", icon: Hammer },
  { index: "03", icon: Rocket },
];
