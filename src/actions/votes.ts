import { handleDbOperation } from "@/lib/db";

import billDb from "../db/bills.json";
import voteDb from "../db/votes.json";

import { IVote } from "../types/vote";

export const getVotes = async (): Promise<IVote[]> => {
  return await handleDbOperation(async () => {
    return voteDb.map((vote) => ({
      ...vote,
      bill: billDb.find((bill) => bill.id === vote.bill_id),
    }));
  }, "fetching votes");
};

export const addVote = async (vote: IVote): Promise<IVote> => {
  return await handleDbOperation(async () => {
    voteDb.push(vote);
    return vote;
  }, "adding a vote");
};

export const deleteVote = async (id: number): Promise<IVote> => {
  return await handleDbOperation(async () => {
    const index = voteDb.findIndex((vote) => vote.id === id);
    if (index !== -1) {
      const [deletedVote] = voteDb.splice(index, 1);
      return deletedVote as IVote;
    }
    throw new Error("Vote not found");
  }, `deleting vote with id ${id}`);
};
