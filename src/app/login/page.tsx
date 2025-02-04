"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./../context/authContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import i18next from "i18next";

export default function LoginPage() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        name,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        login(token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userName", response.data.name);
        router.push("/home");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-500 rounded-xl shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-900 mb-6">
            {i18next.t("welcomeBack")}
          </h1>

          <div>
            <input
              type="text"
              placeholder={i18next.t("userName")}
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder={i18next.t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full p-4 bg-blue-600 text-white dark:text-gay-700 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {i18next.t("login")}
          </button>

          <p className="text-center text-gray-500 dark:text-gray-900 mt-4">
            {i18next.t("youdonthaveaccount")}{" "}
            <a href="/register" className="text-blue-200 hover:underline">
              {i18next.t("register")}
            </a>
          </p>
        </div>
      </div>
      <Footer /> {/* Add Footer */}
    </>
  );
}
