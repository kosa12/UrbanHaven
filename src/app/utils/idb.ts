import { openDB } from "idb";

const DB_NAME = "urban-haven-spa-db";
const STORE_NAME = "urban-haven-spa-store";

// Define a more specific type for the data you're storing
type CacheData = {
  clientState: Record<string, unknown>; // Allows flexibility for different types of data
  timestamp: number;
  buster: string;
};

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function getCache(key: string) {
  const db = await initDB();
  console.log(`Fetching from IndexedDB - Key: ${key}`);
  const persistedData = await db.get(STORE_NAME, key);
  console.log("Retrieved value:", persistedData);
  return persistedData ? persistedData.clientState : null; // Return the actual data
}

export async function setCache(key: string, value: Record<string, unknown>) {
  // Use a more specific type here
  const db = await initDB();
  try {
    console.log(`Storing data in IndexedDB with key: ${key}`, value);
    const persistedData: CacheData = {
      clientState: value,
      timestamp: Date.now(),
      buster: Math.random().toString(36).substring(7),
    };
    await db.put(STORE_NAME, persistedData, key);
  } catch (error) {
    console.error("Error storing data in IndexedDB:", error);
  }
}

export async function clearCache() {
  const db = await initDB();
  return db.clear(STORE_NAME);
}
