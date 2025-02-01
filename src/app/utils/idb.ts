import { openDB } from "idb";

const DB_NAME = "urban-haven-spa-db";
const STORE_NAME = "urban-haven-spa-store";

// Define a more specific type for the data you're storing
type CacheData = {
  clientState: Record<string, unknown>;
  timestamp: number;
  buster: string;
};

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME);
        store.createIndex("timestamp", "timestamp"); // Optional: index for expiry check
      }
    },
  });
}

export async function getCache(key: string) {
  const db = await initDB();
  console.log(`Fetching from IndexedDB - Key: ${key}`);
  try {
    const persistedData = await db.get(STORE_NAME, key);
    console.log("Retrieved value:", persistedData);
    if (!persistedData) return null;

    // You could implement a cache expiry check here, for example:
    // if (Date.now() - persistedData.timestamp > YOUR_CACHE_EXPIRY_TIME) {
    //   deleteCache(key);
    //   return null;
    // }

    return persistedData.clientState;
  } catch (error) {
    console.error("Error fetching data from IndexedDB:", error);
    return null;
  }
}

export async function setCache(key: string, value: Record<string, unknown>) {
  const db = await initDB();
  try {
    console.log(`Storing data in IndexedDB with key: ${key}`, value);
    const persistedData: CacheData = {
      clientState: value,
      timestamp: Date.now(),
      buster: Math.random().toString(36).substring(7), // Random string to bust cache if needed
    };
    await db.put(STORE_NAME, persistedData, key);
  } catch (error) {
    console.error("Error storing data in IndexedDB:", error);
  }
}

export async function deleteCache(key: string) {
  const db = await initDB();
  try {
    console.log(`Deleting data from IndexedDB - Key: ${key}`);
    await db.delete(STORE_NAME, key);
    console.log(`Successfully deleted key: ${key}`);
  } catch (error) {
    console.error(`Error deleting key: ${key} from IndexedDB`, error);
  }
}

export async function clearCache() {
  const db = await initDB();
  try {
    console.log("Clearing all cache data");
    await db.clear(STORE_NAME);
    console.log("Successfully cleared all cache");
  } catch (error) {
    console.error("Error clearing all cache from IndexedDB", error);
  }
}
