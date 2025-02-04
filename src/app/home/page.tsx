"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";
import axios from "axios";
import IngatlanCard from "../../app/components/IngatlanCard";
import { Ingatlan } from "../../app/types";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import useImageUrls from "../../app/hooks/useImageUrls";
import SkeletonCard from "../../app/components/SkeletonCard"; // Import the SkeletonCard
import "../../../i18n";

export default function Home() {
  const { t } = useTranslation();
  const [ingatlanok, setIngatlanok] = useState<Ingatlan[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const { ref, inView } = useInView();
  const imageUrls = useImageUrls();

  const fetchIngatlanok = async () => {
    try {
      const response = await axios.get("http://localhost:8081/ingatlanok");
      const data = response.data;

      if (imageUrls.length > 0) {
        const ingatlanokWithImages = data.map((ingatlan: Ingatlan) => {
          const image = imageUrls.find((img) => img.ingatlanId === ingatlan.id);
          return {
            ...ingatlan,
            kepUrl: image ? `${image.kepUrl}` : "/images/placeholder-image.jpg",
          };
        });

        setIngatlanok(ingatlanokWithImages);
      }
    } catch (error) {
      console.error("Error fetching ingatlanok:", error);
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    if (imageUrls.length > 0) {
      fetchIngatlanok();
    }
  }, [imageUrls]);

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
          {/* Show skeleton loading while data is being fetched */}
          {isLoading
            ? Array(9)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : ingatlanok.map((ingatlan) => (
                <IngatlanCard key={ingatlan.id} ingatlan={ingatlan} />
              ))}
        </div>

        {/* Load more trigger */}
        <div ref={ref} className="h-10"></div>
      </div>

      <Footer />
    </div>
  );
}
