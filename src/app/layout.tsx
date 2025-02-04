"use client";

import { useEffect } from "react";
import "./styles/globals.css";
import { QueryProvider } from "./providers";
import { AuthProvider } from "./context/authContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/custom-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope: ",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed: ", error);
        });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/icons/icon.png" />
      </head>
      <body>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
