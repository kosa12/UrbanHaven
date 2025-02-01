import { useState } from "react";
import axios from "axios";

export interface Ingatlan {
  cim: string;
  leiras: string;
  arPenz: number;
  feltoltesiDatum: string;
  allapot: string;
  id?: number;
}

const useIngatlan = () => {
  const [ingatlan, setIngatlan] = useState<Ingatlan>({
    cim: "",
    leiras: "",
    arPenz: 0,
    feltoltesiDatum: "",
    allapot: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleIngatlanChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIngatlan({ ...ingatlan, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (router: any) => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    try {
      // Step 1: Upload the image to the middleware server
      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.status !== 200) {
        throw new Error("Failed to upload image");
      }

      const { imageUrl } = uploadResponse.data;

      // Step 2: Fetch the existing images.json to generate a new ID
      const imagesResponse = await axios.get(
        "http://localhost:3001/images.json"
      );
      const uploadedImages = imagesResponse.data;

      const newIngatlanId =
        uploadedImages.length > 0
          ? Math.max(...uploadedImages.map((img: any) => img.ingatlanId)) + 1
          : 1;

      // Step 3: Update images.json with the new entry
      const newImageEntry = {
        ingatlanId: newIngatlanId,
        kepUrl: imageUrl,
      };

      const updateResponse = await axios.post(
        "http://localhost:3001/update-images",
        { newImageEntry }
      );

      if (updateResponse.status !== 200) {
        throw new Error("Failed to update images.json");
      }

      // Step 4: Save the ingatlan data to the backend API
      const ingatlanData = {
        ...ingatlan,
        tulajdonosId: 1,
      };

      await axios.post("http://localhost:8081/ingatlanok", ingatlanData);

      console.log("Ingatlan data saved to backend:", ingatlanData);

      // Reset the form and state
      setIngatlan({
        cim: "",
        leiras: "",
        arPenz: 0,
        feltoltesiDatum: "",
        allapot: "",
      });
      setImage(null);

      // Redirect to the home page
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the ingatlan.");
    }
  };

  return {
    ingatlan,
    setIngatlan,
    image,
    handleIngatlanChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useIngatlan;
