"use server";

import React from "react";

import { getBillsStats } from "@/actions/bill";
import { type GetBillsStatsResponse } from "@/types/bill";
import RenderBillsTable from "./render-table";

export default async function ServerBillsTable() {
  const bills: GetBillsStatsResponse[] = await new Promise((resolve) =>
    setTimeout(() => {
      resolve(getBillsStats());
    }, 1000)
  );

  return <RenderBillsTable data={bills} />;
}
