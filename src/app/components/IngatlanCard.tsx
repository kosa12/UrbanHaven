"use client";
import Image from "next/image";
import { Ingatlan } from "../types";
import Link from "next/link";

interface IngatlanCardProps {
  ingatlan: Ingatlan;
}

export default function IngatlanCard({ ingatlan }: IngatlanCardProps) {
  return (
    <Link
      href={`/ingatlanok/${ingatlan.id}`}
      passHref
      className="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative w-full" style={{ height: "300px" }}>
        {ingatlan.kepUrl ? (
          <Image
            src={ingatlan.kepUrl}
            alt={ingatlan.cim}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 dark:text-white">
          {ingatlan.cim}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {ingatlan.leiras}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
          {ingatlan.arPenz} Ft
        </span>
        <br />
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
          {ingatlan.feltoltesiDatum}
        </span>
      </div>
    </Link>
  );
}
