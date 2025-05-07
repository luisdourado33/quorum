"use server";

import React from "react";

import RenderLegislatorsTable from "./render-table";

import { getLegislatorsWithBillStats } from "@/actions/bill";
import { type ILegislatorTableColumns } from "@/types/legislator";

export default async function ServerLegislatorsTable() {
  const legislators: ILegislatorTableColumns[] = await new Promise((resolve) =>
    setTimeout(() => {
      resolve(getLegislatorsWithBillStats());
    }, 1000)
  );

  return <RenderLegislatorsTable data={legislators} />;
}
