"use client";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you're using a token to track login
    setIsLoggedIn(!!token); // Set logged-in state based on token presence
  }, []);

  return (
    <footer className="bg-gray-800 dark:bg-gray-700 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="hover:text-gray-300">
                  {t("home")}
                </Link>
              </li>
              {/* Only show the upload link if logged in */}
              {isLoggedIn && (
                <li>
                  <Link href="/upload" className="hover:text-gray-300">
                    {t("upload")}
                  </Link>
                </li>
              )}
              <li>
                <Link href="/tos" className="hover:text-gray-300">
                  {t("tos")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("contactUs")}</h3>
            <p className="mb-2">Email: matyas.kosa@stud.ubbcluj.ro</p>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} - {t("Kosa Matyas")}.{" "}
            {t("allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
