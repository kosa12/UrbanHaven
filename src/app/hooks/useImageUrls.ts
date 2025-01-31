import { useEffect, useState } from "react";
import { IngatlanImage } from "../types";

const useImageUrls = () => {
  const [imageUrls, setImageUrls] = useState<IngatlanImage[]>([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch("/images.json");
        const data: IngatlanImage[] = await response.json();
        setImageUrls(data);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageUrls();
  }, []);

  return imageUrls;
};

export default useImageUrls;
