"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";
import IngatlanCard from "./components/IngatlanCard";
import { Ingatlan } from "../types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../../i18n";

const mockIngatlanok: Ingatlan[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  cim: `Ingatlan ${i + 1}`,
  leiras: `Ez az ingatlan ${i + 1} leírása.`,
  kepUrl: i % 2 === 0 ? "/images/blokk.jpeg" : "/images/blokk2.jpg",
  ar: Math.floor(Math.random() * 100000000) + 50000000,
  alapterulet: Math.floor(Math.random() * 200) + 50,
}));

export default function Home() {
  const { t } = useTranslation();
  const [ingatlanok, setIngatlanok] = useState<Ingatlan[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const loadMoreIngatlanok = () => {
    const nextPage = page + 1;
    const newIngatlanok = mockIngatlanok.slice(
      (nextPage - 1) * 9,
      nextPage * 9
    );
    setIngatlanok((prev) => [...prev, ...newIngatlanok]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreIngatlanok();
    }
  }, [inView]);

  return (
    <div className="w-full">
      {/* Include the Navbar at the top */}
      <Navbar />

      <div className="mx-[100px] md:mx-[150px] p-4 mt-10">
        <h1 className="text-4xl font-bold mb-8">{t("welcome")}</h1>

        {/* Displaying the properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingatlanok.map((ingatlan) => (
            <IngatlanCard key={ingatlan.id} ingatlan={ingatlan} />
          ))}
        </div>

        {/* Infinite scrolling trigger */}
        <div ref={ref} className="h-10"></div>
      </div>

      {/* Include the Footer at the bottom */}
      <Footer />
    </div>
  );
}
