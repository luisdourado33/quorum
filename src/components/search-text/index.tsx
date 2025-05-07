import { RiSearch2Line } from "@remixicon/react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type SearchTextProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export default function SearchText({
  placeholder = "Search...",
  onSearch,
}: SearchTextProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div
      className={twMerge([
        "flex items-center gap-x-2 p-2",
        "border border-gray-300 hover:border-quorum-primary rounded-lg",
        "focus:ring-quorum-primary",
        "transition duration-200 ease-in-out",
      ])}
    >
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder={placeholder}
        className={twMerge([
          "outline-none border-none ring-0",
          "bg-transparent w-full p-0 text-sm",
        ])}
      />
      <button
        className="cursor-pointer rounded-full bg-quorum-primary p-1 text-white"
        onClick={handleSearch}
      >
        <RiSearch2Line size={16} />
      </button>
    </div>
  );
}
