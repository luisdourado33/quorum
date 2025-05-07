"use client";

import React, { useState } from "react";
import DataTable from "../data-table";
import SearchText from "@/components/search-text";

import { RiThumbDownFill, RiThumbUpFill } from "@remixicon/react";

import { type ILegislatorTableColumns } from "@/types/legislator";
import { type ColumnDef } from "@tanstack/react-table";

type Props = {
  data: ILegislatorTableColumns[];
};

export default function RenderLegislatorsTable({ data }: Props) {
  const [storedData, setStoredData] = useState<typeof data>(data);

  const handleOnSearch = (value: string): void => {
    const filteredData = data.filter((legislator) => {
      return (
        legislator.name.toLowerCase().includes(value.toLowerCase()) ||
        legislator.id.toString().includes(value)
      );
    });

    setStoredData(filteredData);
  };

  const COLUMNS: ColumnDef<ILegislatorTableColumns>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "supportedBills",
      header: "Supported Bills",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-1">
            <RiThumbUpFill size={14} className="text-quorum-primary" />
            <span>{row.original.supportedBills}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "opposedBills",
      header: "Opposed Bills",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-1">
            <RiThumbDownFill size={14} className="text-red-500" />
            <span>{row.original.opposedBills}</span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <SearchText
        placeholder="Search by name or ID from legislator"
        onSearch={handleOnSearch}
      />
      <DataTable data={storedData} columns={COLUMNS} />
    </>
  );
}
