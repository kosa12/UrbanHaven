import { useState, useEffect } from "react";
import axios from "axios";
import { Ingatlan } from "../types";
import { setCache, getCache } from "../utils/idb";

const useIngatlan = (id: string | null) => {
  const [ingatlan, setIngatlan] = useState<Ingatlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No ID provided");
      return;
    }

    const fetchIngatlan = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try fetching from cache first
        const cachedIngatlan = await getCache(`/ingatlanok/${id}`);
        if (cachedIngatlan) {
          setIngatlan(cachedIngatlan);
          setLoading(false); // Set loading to false if cached
          return;
        }

        // If not cached, attempt to fetch from the network
        const response = await axios.get<Ingatlan>(
          `http://localhost:8081/ingatlanok/${id}`
        );
        setIngatlan(response.data);
        await setCache(`/ingatlanok/${id}`, { ...response.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to fetch ingatlan");
        } else {
          setError("Failed to fetch ingatlan");
        }
        console.error("Failed to fetch ingatlan:", error);
      } finally {
        // Ensure loading is set to false after the fetch attempt, regardless of success
        if (!ingatlan) setLoading(false); // Avoid premature loading state reset
      }
    };

    fetchIngatlan();
  }, [id]); // Add 'ingatlan' as a dependency to ensure loading is correctly handled

  return { ingatlan, loading, error };
};

export default useIngatlan;
