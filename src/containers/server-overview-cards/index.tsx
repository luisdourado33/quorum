import React from "react";
import Card from "@/components/quick-card";
import { RiChatPollLine, RiBillLine } from "@remixicon/react";
import { getVotes } from "@/actions/votes";
import { getBills } from "@/actions/bill";
import { simulateServerRequest } from "@/lib/utils";
import { DELAY_REQUEST_TIMEOUT } from "@/utils/delay";

export default async function ServerOverviewCards() {
  const totalVotes = await simulateServerRequest(
    await getVotes(),
    DELAY_REQUEST_TIMEOUT
  );
  const totalBills = await simulateServerRequest(
    await getBills(),
    DELAY_REQUEST_TIMEOUT
  );

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
          <div className="text-2xl font-bold">{totalVotes?.length || 0}</div>
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
          <div className="text-2xl font-bold">{totalBills?.length || 0}</div>
        </Card.Content>
      </Card>
    </>
  );
}
