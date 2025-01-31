import axios, { AxiosResponse } from "axios";

// Define types for API response data (adjust according to your backend's data structure)
interface ApiResponse<T> {
  data: T;
  message: string;
}

// Axios instance with base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Function to fetch data from a given endpoint
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(
      endpoint
    );
    return response.data.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
