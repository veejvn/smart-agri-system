"use client";

import React from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  /** Header search placeholder text */
  searchPlaceholder?: string;
  /** Show stats icons (bell, thermometer, globe) in header */
  showStats?: boolean;
  /** Show role switcher button in header */
  showRoleSwitcher?: boolean;
  /** Footer app name override */
  footerAppName?: string;
  /** Additional className for the content wrapper */
  contentClassName?: string;
}

/**
 * DashboardLayout wraps Sidebar + Header + Footer for internal dashboard pages.
 * Used by: Dashboard, Admin, Order Management, Order Details, Market Trends,
 *          AgroAI, Experts, Book Consultation, Knowledge.
 */
export default function DashboardLayout({
  children,
  searchPlaceholder = "Search farm data...",
  showStats = true,
  showRoleSwitcher = false,
  footerAppName,
  contentClassName = "p-lg md:p-xl space-y-lg grow",
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />

      <main className="md:ml-64 min-h-screen flex flex-col">
        <Header
          showSearch
          searchPlaceholder={searchPlaceholder}
          showStats={showStats}
          showRoleSwitcher={showRoleSwitcher}
        />

        <div className={contentClassName}>
          {children}
        </div>

        <Footer appName={footerAppName} className="mt-auto" />
      </main>
    </div>
  );
}
