"use server";

import React from "react";

import { getBillsStats } from "@/actions/bill";
import { simulateServerRequest } from "@/lib/utils";
import { type GetBillsStatsResponse } from "@/types/bill";
import { DELAY_REQUEST_TIMEOUT } from "@/utils/delay";
import RenderBillsTable from "./render-table";

export default async function ServerBillsTable() {
  const bills: GetBillsStatsResponse[] = await simulateServerRequest(
    getBillsStats(),
    DELAY_REQUEST_TIMEOUT
  );

  return <RenderBillsTable data={bills} />;
}
