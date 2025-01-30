import "./styles/globals.css";

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
        {children}
        {/* Add service worker registration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined" && "serviceWorker" in navigator) {
                window.addEventListener("load", () => {
                  navigator.serviceWorker
                    .register("/sw.js")
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
