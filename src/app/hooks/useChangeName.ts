import { useState } from "react";
import axios from "axios";

export const useChangeName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeName = async (newName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID is not available");
      }

      const id = parseInt(userId, 10);

      if (isNaN(id)) {
        throw new Error("Invalid User ID");
      }

      // Making the PUT request to update the name
      const response = await axios.put(
        "http://localhost:3001/user/change-name",
        {
          newName,
          id,
        }
      );
      localStorage.removeItem("userName");
      localStorage.setItem("userName", newName);
      window.location.reload();
      setIsLoading(false);

      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError("Failed to change name");
      console.error(err);
    }
  };

  return { isLoading, error, handleChangeName };
};
