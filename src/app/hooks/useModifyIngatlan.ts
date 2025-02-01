import { useState } from "react";
import axios from "axios";
import { Ingatlan } from "../types";
import { deleteCache, setCache } from "../utils/idb";

const useModifyIngatlan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modifyIngatlan = async (id: number, updatedData: Ingatlan) => {
    setLoading(true);
    setError(null);
    try {
      // Update ingatlan in backend
      const response = await axios.put(
        `http://localhost:8081/ingatlanok/${id}`,
        updatedData
      );
      console.log("Ingatlan updated successfully:", response.data);

      // Delete the old cache
      await deleteCache(`/ingatlanok/${id}`);

      // Cache the updated data
      await setCache(`/ingatlanok/${id}`, { ...updatedData });

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError("Failed to update ingatlan.");
        console.error(err.response?.data || err.message);
      } else {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    modifyIngatlan,
    loading,
    error,
  };
};

export default useModifyIngatlan;
