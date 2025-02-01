import { useEffect, useState } from "react";
import { IngatlanImage } from "../types";

const useImageUrls = () => {
  const [imageUrls, setImageUrls] = useState<IngatlanImage[]>([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch("http://localhost:3001/images.json"); // Correct the URL
        const data: IngatlanImage[] = await response.json();
        // Update the URLs to include the correct path from the middleware server
        const updatedData = data.map((image) => ({
          ...image,
          kepUrl: `http://localhost:3001${image.kepUrl}`, // Correct image path
        }));

        console.log("Image URLs:", updatedData);
        setImageUrls(updatedData);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageUrls();
  }, []);

  return imageUrls;
};

export default useImageUrls;
