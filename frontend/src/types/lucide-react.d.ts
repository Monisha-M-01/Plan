declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const Sparkles: LucideIcon;
  export const Calendar: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Users: LucideIcon;
  export const MapPin: LucideIcon;
  export const Heart: LucideIcon;
  export const PartyPopper: LucideIcon;
  export const UsersRound: LucideIcon;
  export const Loader2: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Clock: LucideIcon;
  export const Circle: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const CalendarDays: LucideIcon;
  export const CalendarCheck: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Mail: LucideIcon;
  export const Copy: LucideIcon;
  export const Check: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Palette: LucideIcon;
  export const FileText: LucideIcon;
  export const Tag: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Download: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Activity: LucideIcon;
  export const X: LucideIcon;
  export const Compass: LucideIcon;
  export const Layers: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Trash2: LucideIcon;
  export const Search: LucideIcon;
  export const Filter: LucideIcon;
  export const Phone: LucideIcon;
  export const Star: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Bookmark: LucideIcon;

  const icons: { [key: string]: LucideIcon };
  export default icons;
}
