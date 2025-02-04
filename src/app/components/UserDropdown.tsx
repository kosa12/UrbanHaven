"use client";
import { useState, useEffect } from "react";
import i18next from "../../../i18n";
import Link from "next/link";
import UserSettingsModal from "./UserSettingsModal";

interface UserDropdownProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function UserDropdown({
  isLoggedIn,
  onLogout,
}: UserDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Fetch username from localStorage when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("userName"); // Assuming "dentistName" is stored in localStorage
      setUsername(storedUsername);
    }
  }, [isLoggedIn]);

  const openModal = (option: string) => {
    setSelectedOption(option);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOption(null);
  };

  return (
    <div className="relative">
      {/* User Icon Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition-all"
      >
        👤
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {isLoggedIn ? (
            <>
              {/* Display username when logged in */}
              {username && (
                <div className="px-4 py-2 text-center text-black dark:text-white">
                  👤 {username}
                </div>
              )}
              <button
                onClick={() => openModal("changeName")}
                className="block w-full px-4 py-2 text-center text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {i18next.t("settings")}
              </button>
              <button
                onClick={onLogout}
                className="block w-full px-4 py-2 text-black dark:text-white hover:bg-red-200 dark:hover:bg-red-700"
              >
                {i18next.t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 text-center text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {i18next.t("login")}
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-center text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {i18next.t("register")}
              </Link>
            </>
          )}
        </div>
      )}

      {/* Modal */}
      <UserSettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
