import React from "react";

import MainNavigation from "../main-navigation";
import Brand from "@/components/brand";

import { twMerge } from "tailwind-merge";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Menu() {
  return (
    <div
      className={twMerge([
        "sticky top-0 left-0 z-50 w-full",
        "flex w-full items-center justify-center",
        "shadow-sm",
        "backdrop-blur-2xl",
        "py-4",
        "mb-4",
      ])}
    >
      <div className="container flex items-center justify-between">
        <Brand />
        <MainNavigation className="hidden md:flex" />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
