import React from "react";
import { twMerge } from "tailwind-merge";

export default function Brand() {
  return (
    <span
      className={twMerge([
        "relative",
        "font-bold text-lg md:text-2xl cursor-pointer",
        "tracking-tighter",
      ])}
    >
      <span className="text-quorum-primary">Q</span>
      uorum{" "}
      <span className="absolute -right-18 text-xs rounded-md p-1 bg-gray-100 text-quorum-primary tracking-tight">
        Dashboard
      </span>
    </span>
  );
}
