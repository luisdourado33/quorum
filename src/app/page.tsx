"use server";

import Card from "@/components/quick-card";
import ServerBillsTable from "@/containers/bills-table";
import ServerLegislatorTable from "@/containers/legislators-table";
import { RiBillLine, RiChatPollLine, RiQuillPenAiLine } from "@remixicon/react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function metadata(): Promise<Metadata> {
  return {
    title: "Homepage",
  };
}

export default async function Home() {
  return (
    <main className="flex flex-col h-full w-full items-center scroll-smooth">
      <div className="container flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-lg md:text-2xl font-bold">
            Welcome to the dashboard.
          </h1>
          <span className="text-xs md:text-sm text-gray-500">
            Here you can find all the information you need about your
            representatives and the legislative process.
          </span>
        </div>
        <div className="grid col-span-1 md:grid-cols-4 gap-4">
          {/* Votes */}
          <Card>
            <Card.Title>
              <span className="flex items-center gap-x-1">
                <RiChatPollLine className="text-quorum-primary" />
                <span>Total Votes</span>
              </span>
            </Card.Title>
            <Card.Description>
              This is the total number of votes cast in the last election.
            </Card.Description>

            <Card.Content>
              <div className="text-2xl font-bold">1,234,567</div>
            </Card.Content>
          </Card>

          {/* Bills */}
          <Card>
            <Card.Title>
              <span className="flex items-center gap-x-1">
                <RiBillLine className="text-quorum-primary" />
                <span>Bills</span>
              </span>
            </Card.Title>
            <Card.Description>
              This is the total number of bills passed in the last session.
            </Card.Description>

            <Card.Content>
              <div className="text-2xl font-bold">1,234,567</div>
            </Card.Content>
          </Card>

          {/* Legislators Table */}
          <Card className="col-span-1 md:col-span-4">
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
              <Suspense fallback={<div>Loading...</div>}>
                <ServerLegislatorTable />
              </Suspense>
            </Card.Content>
          </Card>

          {/* Bills Table */}
          <Card className="col-span-1 md:col-span-4">
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
              <Suspense fallback={<div>Loading...</div>}>
                <ServerBillsTable />
              </Suspense>
            </Card.Content>
          </Card>
        </div>
      </div>
    </main>
  );
}
