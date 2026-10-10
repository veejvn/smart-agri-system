"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, Thermometer, Globe, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import type { HeaderUser, HeaderProps } from "@/types";


export default function Header({
  appName = "AgriSmart Pro",
  showNav = false,
  activeNav = "none",
  showSearch = false,
  searchPlaceholder = "Search ecosystem...",
  searchValue,
  onSearchChange,
  showStats = false,
  showUser = false,
  user: propUser,
  showRoleSwitcher = false,
  containerClassName = "",
}: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const { user: authUser, isAuthenticated, logout } = useAuth();

  const defaultAvatar =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDFggpoE1gb4uJ_24FX6BDlA8zsjw7gfTmfuBFqRl0ATSra7867WXBuMhPzfivqV2Yovcsu--7bHy-HgQ2RuO_UWJBadpKLBHQsK2ZLIPbdgrHF8CjVm7_C9pND9nZwS3OFS2DaIPAUN_wW7KXIr4UMriSMMTLtXTRaS_16q0P97kRLDx3Zh6FeahyZEWe74S5Lr-GIRAmDMd1-YHlrl_xMQhhB6AJaiUm8llcgwmZh9H7YTgZxSJfc8r1TTYflsO9WecCfoXq7Nw";

  const currentUser = propUser || (isAuthenticated && authUser ? {
    name: authUser.fullName || authUser.username,
    role: authUser.roles?.[0] || "Farmer",
    avatarUrl: authUser.avatarUrl || defaultAvatar,
  } : null);

  const userName = currentUser?.name || "Marcus";
  const userRole = currentUser?.role || "Owner";
  const userAvatar = currentUser?.avatarUrl || defaultAvatar;

  return (
    <header
      className={`sticky top-0 z-20 flex justify-between items-center w-full px-lg py-md bg-surface shadow-sm border-b border-outline-variant ${containerClassName}`}
    >
      <div className="flex items-center gap-xl">
        {showNav ? (
          <span className="text-title-md font-title-md font-bold text-primary">{appName}</span>
        ) : (
          <h1 className="text-title-md font-title-md font-bold text-primary">{appName}</h1>
        )}

        {showNav && (
          <nav className="hidden lg:flex gap-lg items-center ml-lg">
            <Link
              className={`text-label-sm font-label-sm transition-colors px-sm py-xs rounded ${activeNav === "home"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant font-medium hover:bg-surface-container"
                }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`text-label-sm font-label-sm transition-colors px-sm py-xs rounded ${activeNav === "marketplace"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant font-medium hover:bg-surface-container"
                }`}
              href="/marketplace"
            >
              Marketplace
            </Link>
            <Link
              className={`text-label-sm font-label-sm transition-colors px-sm py-xs rounded ${activeNav === "community"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant font-medium hover:bg-surface-container"
                }`}
              href="/community"
            >
              Community
            </Link>
          </nav>
        )}

        {showSearch && !showNav && (
          <div
            className={`hidden sm:flex items-center bg-surface-container px-md py-xs rounded-full border transition-colors ${searchFocused ? "border-primary" : "border-outline-variant"
              }`}
          >
            <Search className="text-on-surface-variant text-body-md mr-sm shrink-0" />
            <input
              className="bg-transparent border-none outline-none text-body-md w-48 focus:ring-0"
              placeholder={searchPlaceholder}
              type="text"
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-md">
        {showSearch && showNav && (
          <div
            className={`hidden sm:flex items-center bg-surface-container rounded-full px-md py-xs border transition-colors ${searchFocused ? "border-primary" : "border-outline-variant"
              }`}
          >
            <Search className="w-5 h-5 text-on-surface-variant shrink-0" />
            <input
              className="bg-transparent border-none focus:ring-0 text-body-md ml-xs outline-none"
              placeholder={searchPlaceholder}
              type="text"
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        )}

        {showStats && (
          <div className={`flex items-center gap-sm ${showUser ? "pr-md border-r border-outline-variant" : ""}`}>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <Bell className="w-5 h-5 text-primary shrink-0" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <Thermometer className="w-5 h-5 text-primary shrink-0" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <Globe className="w-5 h-5 text-primary shrink-0" />
            </button>
          </div>
        )}

        {showRoleSwitcher && (
          <button className="bg-primary-container text-on-primary px-lg py-sm rounded-full font-bold text-label-sm hover:opacity-80 transition-opacity">
            Role Switcher
          </button>
        )}

        {(showUser || isAuthenticated) && (
          <div className="flex items-center gap-md pl-sm">
            <span className="hidden lg:block text-label-sm font-label-sm text-primary font-bold bg-primary-fixed px-sm py-1 rounded-full">
              {userName} ({userRole})
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="User profile photo"
              className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              src={userAvatar}
            />
            {isAuthenticated && (
              <button
                onClick={logout}
                title="Đăng xuất"
                className="p-2 text-on-surface-variant hover:text-error hover:bg-surface-container rounded-full transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {!isAuthenticated && (
          <Link
            href="/login"
            className="bg-primary text-on-primary px-lg py-sm rounded-full font-bold text-label-sm hover:opacity-90 transition-opacity"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}
