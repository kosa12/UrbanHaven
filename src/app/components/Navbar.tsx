"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import Link from "next/link";

const languages = [
  { code: "en", emoji: "🇬🇧" },
  { code: "hu", emoji: "🇭🇺" },
  { code: "ro", emoji: "🇷🇴" },
];

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang).then(() => {
      router.refresh();
    });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""
      } bg-gray-800 dark:bg-gray-500 text-white px-6 py-3 flex justify-between items-center transition-all duration-300`}
    >
      <div className="flex space-x-6">
        <Link href="/" className="text-xl hover:text-gray-300">
          {t("home")}
        </Link>
        <Link href="/contact" className="text-xl hover:text-gray-300">
          {t("contact")}
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-700 dark:bg-gray-600 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
        <select
          value={selectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-gray-700 dark:bg-gray-600 text-white p-2 rounded"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.emoji} {lang.code.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
