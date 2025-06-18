import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { Instrument_Serif } from "next/font/google";

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
  metadataBase: new URL("https://breezeai.live"),
  keywords: [
    "breeze",
    "word",
    "docs",
    "google docs",
    "ai docs",
    "breezeai",
    "ai",
    "docx",
    "document editor",
    "ai docx editor",
  ],
  title: {
    default: "Breeze - AI Document Editor",
    template: "%s - Breeze",
  },
  description:
    "AI powered document editor that let's you create word docs in seconds.",
  icons: {
    icon: "/assets/images/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Breeze",
    url: "https://breezeai.live",
    type: "website",
    description:
    "AI powered document editor that let's you create word docs in seconds.",
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Breeze AI Document Editor Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${garamondBookCond.variable} ${instrumentSerif.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
