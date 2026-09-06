import type { LucideIcon } from "lucide-react";
import { LayoutGrid, Users, BarChart3, Bot, Server } from "lucide-react";

export type Capability = {
  icon: LucideIcon;
};

// Display text (title/description) lives in lib/i18n/dictionaries.ts,
// matched to these by array index — this just supplies the icon, which
// doesn't change with locale.
export const capabilities: Capability[] = [
  { icon: LayoutGrid },
  { icon: Users },
  { icon: BarChart3 },
  { icon: Bot },
  { icon: Server },
];
