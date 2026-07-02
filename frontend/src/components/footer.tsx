"use client";

import React from "react";

import type { FooterProps } from "@/types";

export default function Footer({ appName = "AgriSmart Pro", className = "" }: FooterProps) {
  return (
    <footer
      className={`w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center gap-md bg-surface-dim border-t border-outline-variant ${className}`}
    >
      <div className="flex flex-col items-center md:items-start gap-xs">
        <span className="text-title-md font-title-md font-bold text-primary">{appName}</span>
        <p className="text-body-md font-body-md text-on-surface-variant">
          © 2024 AgriSmart Ecosystem. Data-Driven Growth.
        </p>
      </div>
      <div className="flex gap-lg flex-wrap justify-center">
        <a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary underline transition-all" href="#privacy">
          Privacy Policy
        </a>
        <a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary underline transition-all" href="#terms">
          Terms of Service
        </a>
        <a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary underline transition-all" href="#sustainability">
          Sustainability
        </a>
        <a className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary underline transition-all" href="#contact">
          Contact
        </a>
      </div>
    </footer>
  );
}
