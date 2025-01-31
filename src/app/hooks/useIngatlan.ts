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
        const cachedIngatlan = await getCache(`/ingatlanok/${id}`);
        if (cachedIngatlan) {
          setIngatlan(cachedIngatlan);
          setLoading(false);
          return;
        }

        const response = await axios.get<Ingatlan>(
          `http://localhost:8081/ingatlanok/${id}`
        );
        setIngatlan(response.data);

        await setCache(`/ingatlanok/${id}`, { ...response.data });
      } catch (error) {
        console.error("Failed to fetch ingatlan:", error);
        setError("Failed to fetch ingatlan");
      } finally {
        setLoading(false);
      }
    };

    fetchIngatlan();
  }, [id]);

  return { ingatlan, loading, error };
};

export default useIngatlan;
