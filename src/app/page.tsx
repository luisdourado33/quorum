"use server";

import Card from "@/components/quick-card";
import ServerBillsTable from "@/containers/bills-table";
import DataTableFallback from "@/containers/data-table/fallback";
import ServerLegislatorTable from "@/containers/legislators-table";
import ServerOverviewCards from "@/containers/server-overview-cards";
import ServerOverviewCardsFallback from "@/containers/server-overview-cards/fallback";

import { RiQuillPenAiLine } from "@remixicon/react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function metadata(): Promise<Metadata> {
  return {
    title: "Homepage",
  };
}

export default async function Home() {
  return (
    <main
      id="dashboard"
      className="flex flex-col h-full w-full items-center scroll-smooth pb-12"
    >
      <div className="container flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-quorum-primary to-quorum-secondary text-transparent bg-clip-text">
            Legislative Data Dashboard
          </h1>
          <span className="text-xs md:text-sm text-gray-500">
            Here you can find all the information you need about your
            representatives and the legislative process.
          </span>
        </div>
        <div className="grid col-span-1 md:grid-cols-4 gap-4">
          <Suspense fallback={<ServerOverviewCardsFallback />}>
            <ServerOverviewCards />
          </Suspense>

          {/* Legislators Table */}
          <Card id="legislators" className="col-span-1 md:col-span-4">
            <Card.Title>
              <span className="flex items-center gap-x-1">
                <RiQuillPenAiLine className="text-quorum-primary" />
                <span>Legislators</span>
              </span>
            </Card.Title>
            <Card.Description>
              This is the total number of legislators from database.
            </Card.Description>

            <Card.Content>
              <Suspense fallback={<DataTableFallback />}>
                <ServerLegislatorTable />
              </Suspense>
            </Card.Content>
          </Card>

          {/* Bills Table */}
          <Card id="bills" className="col-span-1 md:col-span-4">
            <Card.Title>
              <span className="flex items-center gap-x-1">
                <RiQuillPenAiLine className="text-quorum-primary" />
                <span>Bills</span>
              </span>
            </Card.Title>
            <Card.Description>
              Here you can see all bills with its respective stats
            </Card.Description>

            <Card.Content>
              <Suspense fallback={<DataTableFallback />}>
                <ServerBillsTable />
              </Suspense>
            </Card.Content>
          </Card>
        </div>
      </div>
    </main>
  );
}
