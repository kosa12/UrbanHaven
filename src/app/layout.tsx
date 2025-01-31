// app/layout.tsx
import "./styles/globals.css";
import { QueryProvider } from "./providers";

export const metadata = {
  title: "Urban Haven",
  description: "Urban Haven",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/icons/icon.png" />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
        {/* Add service worker registration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined" && "serviceWorker" in navigator) {
                window.addEventListener("load", () => {
                  navigator.serviceWorker
                    .register("/custom-sw.js") // Register the custom service worker
                    .then((registration) => {
                      console.log("Service Worker registered with scope: ", registration.scope);
                    })
                    .catch((error) => {
                      console.error("Service Worker registration failed: ", error);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
