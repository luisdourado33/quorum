import { IBill } from "./bill";

export interface IVote {
  id: number;
  bill_id: number;

  // Relationships
  bill?: IBill;
}

export enum VoteTypeEnum {
  SUPPORT = 1,
  OPPOSE = 2,
}
