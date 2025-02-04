"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import i18next from "i18next";

export default function RegisterPage() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !password || !phoneNumber) {
      setError("Name, password, and phone number are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        password,
        phoneNumber,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userName", response.data.name);
      }

      router.push("/home");
    } catch (er: any) {
      setIsLoading(false);
      setError(er.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-500 rounded-xl shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">
            {i18next.t("createAccount")}
          </h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <input
              type="text"
              placeholder={i18next.t("Name")}
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder={i18next.t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder={i18next.t("phoneNumber")}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            {i18next.t("alreadyhaveaccount")}{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {i18next.t("login")}
            </a>
          </p>
        </div>
      </div>
      <Footer /> {/* Add Footer */}
    </>
  );
}
