import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const baseURL = "https://breezeai.live";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
});

const geistSans = localFont({
  src: "../public/assets/fonts/Geist-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
});

const interTight = localFont({
  src: "../public/assets/fonts/InterTight-VariableFont_wght.ttf",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
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
    default: "Breeze",
    template: "%s - Breeze",
  },
  description:
    "AI powered document editor that let's you create word docs in seconds.",
  icons: {
    icon: "/assets/images/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breeze",
    description:
      "AI powered document editor that let's you create word docs in seconds.",
    images: [
      {
        url: `${baseURL}/assets/images/og-img.png`,
        width: 1200,
        height: 630,
        alt: "Breeze AI Document Editor Preview",
      },
    ],
  },
  openGraph: {
    title: "Breeze",
    url: baseURL,
    type: "website",
    description:
      "AI powered document editor that let's you create word docs in seconds.",
    images: [
      {
        url: `${baseURL}/assets/images/og-img.png`,
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
        className={`${geistSans.variable}  ${instrumentSerif.variable} ${interTight.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics mode="production" />
        <SpeedInsights />
      </body>
    </html>
  );
}
