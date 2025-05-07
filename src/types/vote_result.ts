import { ILegislator } from "./legislator";
import { IVote } from "./vote";

export interface IVoteResult {
  id: number;
  legislator_id: number;
  vote_id: number;
  vote_type: number;

  // Relationships
  legislator?: ILegislator;
  vote?: IVote;
}
