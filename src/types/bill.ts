import { ILegislator } from "./legislator";

/**
 * Represents a bill with its associated details.
 */
export interface IBill {
  id: number;
  title: string;
  sponsor_id: number;

  // Relationships
  sponsor?: ILegislator;
}

export interface GetLegislatorWithBillStatusResponse {
  id: number;
  name: string;
  billsSupported: number;
  billsOpposed: number;
}

export interface GetBillsStatsResponse {
  id: number;
  title: string;
  supporters: number;
  opposers: number;
  primarySponsor: string;
}
