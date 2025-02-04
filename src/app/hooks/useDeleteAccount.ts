import { useState } from "react";
import axios from "axios"; // Import axios

export const useDeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID is not available");
      }

      const id = parseInt(userId, 10);

      const response = await axios.delete(
        `http://localhost:3001/user/delete/${id}`
      );

      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      window.location.reload();

      setIsLoading(false);
      return response.data;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Failed to delete account");
    }
  };

  return { isLoading, error, handleDeleteAccount };
};
