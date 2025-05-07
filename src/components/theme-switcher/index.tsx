"use client";

import React from "react";

import { useTheme } from "next-themes";
import { RiSunLine, RiMoonClearLine } from "@remixicon/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="cursor-pointer flex items-center gap-x-2"
      onClick={() =>
        setTheme((current) => (current === "dark" ? "light" : "dark"))
      }
    >
      {theme === "dark" ? (
        <RiSunLine className="text-quorum-primary" size={24} />
      ) : (
        <RiMoonClearLine className="text-quorum-primary" size={24} />
      )}
    </button>
  );
}
