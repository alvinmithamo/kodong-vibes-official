import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon?: LucideIcon;
}

export interface SocialLink extends Omit<NavItem, 'icon'> {
  icon: LucideIcon;
}
