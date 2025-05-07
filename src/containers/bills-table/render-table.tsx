"use client";

import React from "react";
import DataTable from "../data-table";

import { RiThumbDownFill, RiThumbUpFill } from "@remixicon/react";

import { type GetBillsStatsResponse } from "@/types/bill";
import { type ColumnDef } from "@tanstack/react-table";

type Props = {
  data: GetBillsStatsResponse[];
};

export default async function RenderBillsTable({ data }: Props) {
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

  return <DataTable data={data} columns={COLUMNS} />;
}
