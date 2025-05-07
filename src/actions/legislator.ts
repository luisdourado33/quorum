import { handleDbOperation } from "@/lib/db";
import { ILegislator } from "@/types/legislator";
import legislatorDb from "../db/legislators.json";

export const getLegislators = async (): Promise<ILegislator[]> => {
  return handleDbOperation(
    () => Promise.resolve(legislatorDb),
    "fetching legislators"
  );
};

export const getLegislatorById = async (
  id: string
): Promise<ILegislator | null> => {
  return handleDbOperation(
    () =>
      Promise.resolve(
        legislatorDb.find((legislator) => legislator.id === Number(id)) || null
      ),
    `fetching legislator with id ${id}`
  );
};

export const createLegislator = async (
  data: ILegislator
): Promise<ILegislator> => {
  return handleDbOperation(() => {
    legislatorDb.push(data);
    return Promise.resolve(data);
  }, "creating legislator");
};

/**
 * Updates a legislator's information in the database.
 *
 * @param id - The unique identifier of the legislator to update.
 * @param data - A partial object containing the properties to update for the legislator.
 * @returns A promise that resolves to the updated legislator object.
 * @throws An error if the legislator with the specified ID is not found.
 */
export const updateLegislator = async (
  id: string,
  data: Partial<ILegislator>
): Promise<ILegislator> => {
  return handleDbOperation(() => {
    const index = legislatorDb.findIndex(
      (legislator) => legislator.id === Number(id)
    );
    if (index === -1) {
      throw new Error(`Legislator with id ${id} not found`);
    }
    legislatorDb[index] = { ...legislatorDb[index], ...data };
    return Promise.resolve(legislatorDb[index]);
  }, `updating legislator with id ${id}`);
};

export const deleteLegislator = async (id: string): Promise<void> => {
  await handleDbOperation(() => {
    const index = legislatorDb.findIndex(
      (legislator) => legislator.id === Number(id)
    );
    if (index === -1) {
      throw new Error(`Legislator with id ${id} not found`);
    }
    legislatorDb.splice(index, 1);
    return Promise.resolve();
  }, `deleting legislator with id ${id}`);
};
