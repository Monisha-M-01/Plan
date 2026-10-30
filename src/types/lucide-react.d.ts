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
  export const Download: LucideIcon;
  export const ShieldCheck: LucideIcon;

  const icons: { [key: string]: LucideIcon };
  export default icons;
}

