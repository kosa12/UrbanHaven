"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import Link from "next/link";

const languages = [
  { code: "en", label: "🇬🇧 English" },
  { code: "hu", label: "🇭🇺 Magyar" },
  { code: "ro", label: "🇷🇴 Română" },
];

const themes = [
  { name: "Light", className: "light", icon: "☀️" },
  { name: "Dark", className: "dark", icon: "🌙" },
  { name: "Sepia", className: "sepia", icon: "🎱" },
];

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [themeIndex, setThemeIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const index = themes.findIndex((t) => t.className === savedTheme);
    if (index !== -1) {
      setThemeIndex(index);
      document.documentElement.classList.add(savedTheme!);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang).then(() => {
      router.refresh();
    });
  };

  const cycleTheme = () => {
    const newIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(newIndex);

    document.documentElement.classList.remove(
      ...themes.map((t) => t.className)
    );
    document.documentElement.classList.add(themes[newIndex].className);
    localStorage.setItem("theme", themes[newIndex].className);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${
        isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""
      } text-foreground px-6 py-3 flex justify-between items-center transition-all duration-300`}
    >
      <div className="flex space-x-6">
        <Link href="/" className="text-xl hover:opacity-80">
          {t("home")}
        </Link>
        <Link href="/contact" className="text-xl hover:opacity-80">
          {t("contact")}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Rotator Button */}
        <button
          onClick={cycleTheme}
          className="p-2 rounded-lg border border-gray-300 bg-gray-200 dark:bg-gray-700 sepia:bg-yellow-200 
                   text-black dark:text-white sepia:text-brown-800 transition-all"
        >
          {themes[themeIndex].icon}
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => {
            const nextLang =
              languages[
                (languages.findIndex((l) => l.code === selectedLanguage) + 1) %
                  languages.length
              ].code;
            handleLanguageChange(nextLang);
          }}
          className="px-4 py-2 rounded border border-gray-300 bg-gray-200 dark:bg-gray-700 sepia:bg-yellow-200 
                     text-black dark:text-white sepia:text-brown-800 transition-all"
        >
          {languages.find((l) => l.code === selectedLanguage)?.label}
        </button>
      </div>
    </nav>
  );
}
