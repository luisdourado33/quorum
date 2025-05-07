/**
 * Represents a legislator with an identifier and a name.
 */
export interface ILegislator {
  id: number;
  name: string;
}

export interface ILegislatorTableColumns extends ILegislator {
  supportedBills: number;
  opposedBills: number;
}
