import "./globals.css";
import type { Metadata } from "next";
import localFont from "@next/font/local";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "../public/assets/fonts/Geist-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../public/assets/fonts/GeistMono-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Aero - AI Document Editor",
  description: "An intelligent document editor powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster
          toastOptions={{
            className: "font-sans",
          }}
        />
      </body>
    </html>
  );
}
