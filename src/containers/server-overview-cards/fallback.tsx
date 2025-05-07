import React from "react";
import Card from "@/components/quick-card";
import { RiChatPollLine, RiBillLine } from "@remixicon/react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function ServerOverviewCardsFallback() {
  return (
    <>
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
          <div className="text-2xl font-bold">
            <p className="w-[50px]">
              <Skeleton count={1} className="bg-red-200 text-red-300" />
            </p>
          </div>
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
          <div className="text-2xl font-bold">
            <p className="w-[50px]">
              <Skeleton count={1} className="bg-red-200 text-red-300" />
            </p>
          </div>
        </Card.Content>
      </Card>
    </>
  );
}
