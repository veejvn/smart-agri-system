"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Store,
  Radio,
  BookOpen,
  TrendingUp,
  Bot,
  Users,
  Sprout,
  Settings,
  HelpCircle
} from "lucide-react";
import type { MenuItem } from "@/types";




export default function Sidebar() {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Order Management", icon: ClipboardList, href: "/order-management" },
    { title: "Knowledge Center", icon: BookOpen, href: "/knowledge" },
    { title: "Market Intelligence", icon: TrendingUp, href: "/market-trends" },
    { title: "AI Assistant", icon: Bot, href: "/agroai" },
    { title: "Expert Support", icon: Users, href: "/experts" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant p-md gap-sm z-30">
        <div className="flex flex-col gap-xs mb-lg">
          <div className="flex items-center gap-md mb-md">
            <Link href="/" className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0">
              <Sprout className="w-6 h-6" />
            </Link>
            <div>
              <Link href="/">
                <h2 className="text-title-md font-title-md font-bold text-primary hover:underline cursor-pointer">AgriSmart Pro</h2>
              </Link>
              <p className="text-label-sm font-label-sm text-on-surface-variant">Premium Tier</p>
            </div>
          </div>

          <nav className="flex flex-col gap-base">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-md rounded-lg px-md py-sm transition-all ${isActive
                    ? "bg-secondary-container text-on-secondary-container font-semibold scale-[0.98]"
                    : "text-on-surface-variant hover:bg-surface-container-highest"
                    }`}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span className="text-label-sm font-label-sm">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto flex flex-col gap-base border-t border-outline-variant pt-md">
          <Link
            href="/agroai"
            className="w-full bg-primary text-on-primary py-sm px-md rounded-xl flex items-center justify-center gap-sm mb-md hover:opacity-90 transition-opacity"
          >
            <Bot className="w-5 h-5 shrink-0" />
            <span className="text-label-sm font-bold">AI Assistant</span>
          </Link>
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest px-md py-sm rounded-lg cursor-pointer" href="#settings">
            <Settings className="w-5 h-5 shrink-0" />
            <span className="text-label-sm font-label-sm">Settings</span>
          </a>
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest px-md py-sm rounded-lg cursor-pointer" href="#support">
            <HelpCircle className="w-5 h-5 shrink-0" />
            <span className="text-label-sm font-label-sm">Support</span>
          </a>
        </div>
      </aside>

      {/* Mobile Header / Bottom Navigation (Responsive) */}
      <header className="md:hidden flex justify-between items-center w-full px-lg py-md bg-surface shadow-sm sticky top-0 z-40 border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <Link href="/" className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0">
            <Sprout className="w-5 h-5" />
          </Link>
          <span className="text-body-lg font-bold text-primary">AgriSmart Pro</span>
        </div>
        <div className="flex items-center gap-sm">
          <Link href="/agroai" className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant flex justify-around items-center py-xs px-sm z-40 shadow-lg">
        <Link href="/dashboard" className={`flex flex-col items-center gap-xs text-[10px] ${pathname === "/dashboard" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/marketplace" className={`flex flex-col items-center gap-xs text-[10px] ${pathname === "/marketplace" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <Store className="w-5 h-5" />
          <span>Market</span>
        </Link>
        <Link href="/" className={`flex flex-col items-center gap-xs text-[10px] ${pathname === "/" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <Radio className="w-5 h-5" />
          <span>Stream</span>
        </Link>
        <Link href="/agroai" className={`flex flex-col items-center gap-xs text-[10px] ${pathname === "/agroai" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <Bot className="w-5 h-5" />
          <span>AI Chat</span>
        </Link>
        <Link href="/experts" className={`flex flex-col items-center gap-xs text-[10px] ${pathname === "/experts" ? "text-primary font-bold" : "text-on-surface-variant"}`}>
          <Users className="w-5 h-5" />
          <span>Experts</span>
        </Link>
      </nav>
    </>
  );
}
