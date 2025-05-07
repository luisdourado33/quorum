export const handleDbOperation = async <T>(
  operation: () => Promise<T>,
  action: string
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error(`Error ${action}:`, error);
    throw new Error(`Could not ${action}`);
  }
};
