// ─── Component Prop Types ─────────────────────────────────────────────────────
import type { ComponentType } from "react";

export interface HeaderUser {
  name?: string;
  role?: string;
  avatarUrl?: string;
}

export interface HeaderProps {
  appName?: string;
  showNav?: boolean;
  activeNav?: "home" | "marketplace" | "community" | "dashboard" | "none";
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showStats?: boolean;
  showUser?: boolean;
  user?: HeaderUser;
  showRoleSwitcher?: boolean;
  containerClassName?: string;
}

export interface FooterProps {
  appName?: string;
  className?: string;
}

export interface MenuItem {
  title: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}
