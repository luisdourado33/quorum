import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: ReactNode;
};

type CardSectionProps = {
  children: ReactNode;
};

export default function Card({
  className,
  children,
  ...otherDivProps
}: CardProps) {
  return (
    <div
      className={twMerge([
        "shadow-md rounded-lg p-4 gap-y-2 flex flex-col group",
        "transition duration-300 ease-in-out transform",
        "dark:bg-gray-950",
        "hover:shadow-lg",
        "w-auto h-fit",
        className,
      ])}
      {...otherDivProps}
    >
      {children}
    </div>
  );
}

Card.Title = function Title({ children }: CardSectionProps) {
  return (
    <h2 className="text-lg md:text-xl font-semibold group-hover:text-quorum-primary">
      {children}
    </h2>
  );
};

Card.Description = function Description({ children }: CardSectionProps) {
  return <p className="text-sm text-gray-500">{children}</p>;
};

Card.Content = function Content({ children }: CardSectionProps) {
  return <div>{children}</div>;
};

Card.Footer = function Footer({ children }: CardSectionProps) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 text-right">
      {children}
    </div>
  );
};
