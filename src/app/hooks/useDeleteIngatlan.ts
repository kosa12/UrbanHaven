// hooks/useDeleteIngatlan.ts
import { useState } from "react";
import axios from "axios";
import { deleteCache } from "../utils/idb";

const useDeleteIngatlan = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteIngatlan = async (ingatlanId: number) => {
    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:8081/ingatlanok/${ingatlanId}`);

      await deleteCache(`/ingatlanok/${ingatlanId}`);
      setIsDeleting(false);
      return true;
    } catch (err) {
      setIsDeleting(false);
      setError("Failed to delete Ingatlan.");
      console.error(err);
      return false;
    }
  };

  return {
    isDeleting,
    error,
    deleteIngatlan,
  };
};

export default useDeleteIngatlan;
