import Link from "next/link";
import React from "react";
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

  return (
    <nav className={twMerge(["flex items-center", className])}>
      <ul className="flex space-x-4 font-semibold tracking-tight transition-all duration-350">
        <li>
          <Link href="#dashboard" className={linkClasses}>
            Home
          </Link>
        </li>
        <li>
          <Link href="#legislators" className={linkClasses}>
            Legislators
          </Link>
        </li>
        <li>
          <Link href="#bills" className={linkClasses}>
            Bills
          </Link>
        </li>
      </ul>
    </nav>
  );
}
