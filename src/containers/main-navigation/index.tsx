"use client";

import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type MainNavigationProps = {
  className?: string;
};

export default function MainNavigation({ className }: MainNavigationProps) {
  const linkClasses = twMerge([
    "transition-colors",
    "hover:text-quorum-primary",
    "hover:border-b-2 hover:border-quorum-primary",
  ]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const targetId = event.currentTarget.dataset.href?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = 100; // Adjust this value as needed
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav className={twMerge(["flex items-center", className])}>
      <ul className="flex space-x-4 font-semibold tracking-tight transition-all duration-350">
        {[
          { href: "#dashboard", label: "Home" },
          { href: "#legislators", label: "Legislators" },
          { href: "#bills", label: "Bills" },
        ].map(({ href, label }) => (
          <li key={href}>
            <button
              onClick={handleLinkClick}
              className={linkClasses}
              data-href={href}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
