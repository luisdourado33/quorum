"use server";

import React from "react";

import RenderLegislatorsTable from "./render-table";

import { getLegislatorsWithBillStats } from "@/actions/bill";
import { type ILegislatorTableColumns } from "@/types/legislator";
import { simulateServerRequest } from "@/lib/utils";
import { DELAY_REQUEST_TIMEOUT } from "@/utils/delay";

export default async function ServerLegislatorsTable() {
  const legislators: ILegislatorTableColumns[] = await simulateServerRequest(
    getLegislatorsWithBillStats(),
    DELAY_REQUEST_TIMEOUT
  );

  return <RenderLegislatorsTable data={legislators} />;
}
