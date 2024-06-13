import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a type for your stored values (customize as needed)
type StoredValue = string | number | boolean | object | null;

/**
 * Sets an item in AsyncStorage.
 *
 * @param key The key to store the value under.
 * @param value The value to store. Must be JSON-serializable.
 */
export const setItem = async (
  key: string,
  value: StoredValue
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("AsyncStorage setItem error:", error);
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

/**
 * Gets an item from AsyncStorage.
 *
 * @param key The key of the item to retrieve.
 * @returns The parsed value, or null if not found or an error occurred.
 */
export const getItem = async (key: string): Promise<StoredValue | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("AsyncStorage getItem error:", error);
    return null;
  }
};

/**
 * Removes an item from AsyncStorage.
 *
 * @param key The key of the item to remove.
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("AsyncStorage removeItem error:", error);
    throw error;
  }
};

/**
 * Merges an existing item in AsyncStorage with a new value.
 *
 * @param key The key of the item to merge.
 * @param value The new value to merge. Must be JSON-serializable.
 */
export const mergeItem = async (
  key: string,
  value: StoredValue
): Promise<void> => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("AsyncStorage mergeItem error:", error);
    throw error;
  }
};

/**
 * Clears all items from AsyncStorage.
 */
export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("AsyncStorage clear error:", error);
    throw error;
  }
};

/**
 * Gets all keys stored in AsyncStorage.
 *
 * @returns An array of stored keys.
 */
export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error("AsyncStorage getAllKeys error:", error);
    return [];
  }
};

/**
 * Gets all key-value pairs stored in AsyncStorage.
 *
 * @returns An object mapping keys to their parsed values.
 */
export const getAllItems = async (): Promise<{
  [key: string]: StoredValue;
}> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result: { [key: string]: StoredValue } = {};
    for (const key of keys) {
      result[key] = await getItem(key);
    }
    return result;
  } catch (error) {
    console.error("AsyncStorage getAllItems error:", error);
    return {};
  }
};
