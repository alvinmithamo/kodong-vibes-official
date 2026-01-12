import { Music, Calendar, Home, Users, Image, ShoppingBag, Mail } from "lucide-react";
import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Users },
  { name: "Music", href: "/music", icon: Music },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Merch", href: "/merch", icon: ShoppingBag },
  { name: "Contact", href: "/contact", icon: Mail },
];

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "Spotify", href: "#" },
];
