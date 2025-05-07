import { handleDbOperation } from "@/lib/db";
import { IVoteResult } from "../types/vote_result";

import legislatorDb from "../db/legislators.json";
import voteResultsDb from "../db/vote_results.json";
import voteDb from "../db/votes.json";

export const getVoteResults = async (): Promise<IVoteResult[]> => {
  return await handleDbOperation(async () => {
    return voteResultsDb.map((voteResult) => ({
      ...voteResult,
      legislator: legislatorDb.find(
        (legislator) => legislator.id === voteResult.legislator_id
      ),
      vote: voteDb.find((vote) => vote.id === voteResult.vote_id),
    }));
  }, "fetching vote results");
};

export const addVoteResult = async (
  newVoteResult: IVoteResult
): Promise<void> => {
  await handleDbOperation(async () => {
    voteResultsDb.push(newVoteResult);
  }, "adding a vote result");
};

export const updateVoteResult = async (
  id: string,
  updatedVoteResult: Partial<IVoteResult>
): Promise<void> => {
  await handleDbOperation(async () => {
    const index = voteResultsDb.findIndex((result) => result.id === Number(id));
    if (index !== -1) {
      voteResultsDb[index] = { ...voteResultsDb[index], ...updatedVoteResult };
    }
  }, `updating vote result with id ${id}`);
};

export const deleteVoteResult = async (id: string): Promise<void> => {
  await handleDbOperation(async () => {
    const index = voteResultsDb.findIndex((result) => result.id === Number(id));
    if (index !== -1) {
      voteResultsDb.splice(index, 1);
    }
  }, `deleting vote result with id ${id}`);
};
