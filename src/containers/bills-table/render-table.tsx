"use client";

import React, { useState } from "react";
import DataTable from "../data-table";

import { RiThumbDownFill, RiThumbUpFill } from "@remixicon/react";

import { type GetBillsStatsResponse } from "@/types/bill";
import { type ColumnDef } from "@tanstack/react-table";
import SearchText from "@/components/search-text";

type Props = {
  data: GetBillsStatsResponse[];
};

export default function RenderBillsTable({ data }: Props) {
  const [storedData, setStoredData] = useState<typeof data>(data);

  const handleOnSearch = (value: string): void => {
    const filteredData = data.filter((bill) => {
      return (
        bill.title.toLowerCase().includes(value.toLowerCase()) ||
        bill.id.toString().includes(value)
      );
    });

    setStoredData(filteredData);
  };

  const COLUMNS: ColumnDef<GetBillsStatsResponse>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "supporters",
      header: "Supporters",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-1">
            <RiThumbUpFill size={14} className="text-quorum-primary" />
            <span>{row.original.supporters}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "opposers",
      header: "Opposers",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-1">
            <RiThumbDownFill size={14} className="text-red-500" />
            <span>{row.original.opposers}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "primarySponsor",
      header: "Primary Sponsor",
    },
  ];

  return (
    <>
      <SearchText
        placeholder="Search by title or ID from the bill"
        onSearch={handleOnSearch}
      />
      <DataTable data={storedData} columns={COLUMNS} />
    </>
  );
}
