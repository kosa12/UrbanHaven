import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import { getCache, setCache, clearCache } from "./idb";

export const createIDBPersister = (): Persister => ({
  persistClient: async (client: PersistedClient) => {
    console.log("Persisting client to IndexedDB");
    await setCache("react-query-cache", { ...client }); // Spread into a plain object
  },
  restoreClient: async (): Promise<PersistedClient | undefined> => {
    console.log("Restoring client from IndexedDB");
    return (await getCache("react-query-cache")) as PersistedClient | undefined;
  },
  removeClient: async () => {
    console.log("Removing client from IndexedDB");
    await clearCache();
  },
});
