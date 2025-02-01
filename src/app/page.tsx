"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";
import axios from "axios";
import IngatlanCard from "./components/IngatlanCard";
import { Ingatlan } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useImageUrls from "./hooks/useImageUrls";
import "../../i18n";

export default function Home() {
  const { t } = useTranslation();
  const [ingatlanok, setIngatlanok] = useState<Ingatlan[]>([]);
  const [page, setPage] = useState(0);
  const { ref, inView } = useInView();
  const imageUrls = useImageUrls(); // Image URLs from custom hook

  // Fetching ingatlan data
  const fetchIngatlanok = async () => {
    try {
      const response = await axios.get("http://localhost:8081/ingatlanok");
      const data = response.data;

      if (imageUrls.length > 0) {
        console.log("Image URLs HERE:", imageUrls);
        const ingatlanokWithImages = data.map((ingatlan: Ingatlan) => {
          const image = imageUrls.find((img) => img.ingatlanId === ingatlan.id);
          return {
            ...ingatlan,
            kepUrl: image ? `${image.kepUrl}` : "", // Make sure this is the full path
          };
        });

        setIngatlanok(ingatlanokWithImages);
      }
    } catch (error) {
      console.error("Error fetching ingatlanok:", error);
    }
  };

  // Fetching ingatlanok when imageUrls are ready
  useEffect(() => {
    if (imageUrls.length > 0) {
      fetchIngatlanok();
    }
  }, [imageUrls]); // Run when imageUrls change

  const loadMoreIngatlanok = () => {
    const nextPage = page + 1;
    const startIndex = nextPage * 9;
    const endIndex = (nextPage + 1) * 9;

    const newIngatlanok = ingatlanok.slice(startIndex, endIndex);

    if (newIngatlanok.length > 0) {
      setIngatlanok((prev) => [...prev, ...newIngatlanok]);
      setPage(nextPage);
    }
  };

  // Load more on inView detection
  useEffect(() => {
    if (inView) {
      loadMoreIngatlanok();
    }
  }, [inView]);

  return (
    <div className="w-full">
      <Navbar />

      <div className="mx-[100px] md:mx-[150px] p-4 mt-10">
        <h1 className="text-4xl font-bold mb-8">{t("welcome")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingatlanok.map((ingatlan) => (
            <IngatlanCard key={ingatlan.id} ingatlan={ingatlan} />
          ))}
        </div>

        <div ref={ref} className="h-10"></div>
      </div>

      <Footer />
    </div>
  );
}
