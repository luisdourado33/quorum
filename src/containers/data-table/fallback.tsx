import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DataTableFallback() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} height={30} style={{ marginBottom: 10 }} />
      ))}
    </>
  );
}
