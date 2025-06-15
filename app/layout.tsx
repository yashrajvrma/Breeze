import "./globals.css";
import type { Metadata } from "next";
import localFont from "@next/font/local";
import { Providers } from "./providers";
import { Instrument_Serif } from "next/font/google";

// Instrument Serif
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = localFont({
  src: "../public/assets/fonts/Geist-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../public/assets/fonts/GeistMono-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
});

const garamondBookCond = localFont({
  src: "../public/assets/fonts/ITCGaramondStd-BkCond.ttf",
  variable: "--font-garamond-book",
});

export const metadata: Metadata = {
  title: "Breeze - AI Document Editor",
  description: "An intelligent document editor powered by AI",
  icons: {
    icon: "/assets/images/breeze.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${garamondBookCond.variable} ${instrumentSerif.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
