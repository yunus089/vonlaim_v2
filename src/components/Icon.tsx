import {
  Calendar,
  CheckCircle2,
  Gauge,
  Hammer,
  Mail,
  MapPinned,
  MousePointerClick,
  Phone,
  Search,
  Sparkles,
  Wrench,
  type LucideIcon
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Calendar,
  CheckCircle2,
  Gauge,
  Hammer,
  Mail,
  MapPinned,
  MousePointerClick,
  Phone,
  Search,
  Sparkles,
  Wrench
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const Component = icons[name] ?? Sparkles;
  return <Component size={size} aria-hidden="true" />;
}
