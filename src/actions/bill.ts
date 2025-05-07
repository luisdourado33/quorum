import { GetBillsStatsResponse, IBill } from "@/types/bill";

import billDb from "../db/bills.json";
import legislatorDb from "../db/legislators.json";
import voteResultsDb from "../db/vote_results.json";

import { handleDbOperation } from "@/lib/db";
import { ILegislatorTableColumns } from "@/types/legislator";
import { VoteTypeEnum } from "@/types/vote";
import { getVotes } from "./votes";
import { getVoteResults } from "./vote-results";

export const getBills = async (): Promise<IBill[]> => {
  return handleDbOperation(
    () =>
      Promise.resolve(
        billDb.map((bill) => ({
          ...bill,
          sponsor: legislatorDb.find(
            (legislator) => legislator.id === bill.sponsor_id
          ),
        }))
      ),
    "fetching bills"
  );
};

export const getBillById = async (id: string): Promise<IBill | undefined> => {
  return handleDbOperation(
    () =>
      Promise.resolve(
        billDb
          .map((bill) => ({
            ...bill,
            sponsor: legislatorDb.find(
              (legislator) => legislator.id === bill.sponsor_id
            ),
          }))
          .find((bill) => bill.id === Number(id))
      ),
    `fetching bill with id ${id}`
  );
};

export const createBill = async (newBill: IBill): Promise<IBill> => {
  return handleDbOperation(() => {
    billDb.push(newBill);
    return Promise.resolve(newBill);
  }, "creating a new bill");
};

export const updateBill = async (
  id: string,
  updatedBill: Partial<IBill>
): Promise<IBill | undefined> => {
  return handleDbOperation(() => {
    const index = billDb.findIndex((bill) => bill.id === Number(id));
    if (index === -1) return Promise.resolve(undefined);
    billDb[index] = { ...billDb[index], ...updatedBill };
    return Promise.resolve(billDb[index]);
  }, `updating bill with id ${id}`);
};

export const deleteBill = async (id: string): Promise<boolean> => {
  return handleDbOperation(() => {
    const index = billDb.findIndex((bill) => bill.id === Number(id));
    if (index === -1) return Promise.resolve(false);
    billDb.splice(index, 1);
    return Promise.resolve(true);
  }, `deleting bill with id ${id}`);
};

export const getLegislatorsWithBillStats = async (): Promise<
  ILegislatorTableColumns[]
> => {
  return handleDbOperation(() => {
    const legislatorsWithStats = legislatorDb.map((legislator) => {
      const votesFromLegislator = voteResultsDb.filter(
        (vote) => vote.legislator_id === legislator.id
      );

      const supportedBills =
        votesFromLegislator.filter(
          (vote) => vote.vote_type === VoteTypeEnum.SUPPORT
        )?.length || 0;

      const opposedBills =
        votesFromLegislator.filter(
          (vote) => vote.vote_type === VoteTypeEnum.OPPOSE
        )?.length || 0;

      return {
        id: legislator.id,
        name: legislator.name,
        supportedBills,
        opposedBills,
      };
    });

    return Promise.resolve(legislatorsWithStats);
  }, "fetching legislators with bill stats");
};

export const getBillsStats = async (): Promise<GetBillsStatsResponse[]> => {
  return handleDbOperation(async () => {
    const [billsWithRelationships, votes, voteResults] = await Promise.all([
      getBills(),
      getVotes(),
      getVoteResults(),
    ]);

    return billsWithRelationships.map((bill) => {
      const votesFromBill = votes
        .filter((vote) => vote.bill_id === bill.id)
        .map((vote) => {
          const supporters = voteResults.filter(
            (voteRes) =>
              voteRes.vote_id === vote.id &&
              voteRes.vote_type === VoteTypeEnum.SUPPORT
          ).length;

          const opposers = voteResults.filter(
            (voteRes) =>
              voteRes.vote_id === vote.id &&
              voteRes.vote_type === VoteTypeEnum.OPPOSE
          ).length;

          return { ...vote, supporters, opposers };
        });

      const supporters = votesFromBill.reduce(
        (acc, vote) => acc + vote.supporters,
        0
      );

      const opposers = votesFromBill.reduce(
        (acc, vote) => acc + vote.opposers,
        0
      );

      return {
        id: bill.id,
        title: bill.title || "",
        supporters,
        opposers,
        primarySponsor: bill.sponsor?.name || "",
      };
    });
  }, "fetching bills with stats");
};
