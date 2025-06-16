"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

import Footer from "./footer";
import Hero from "./hero";
import Navbar from "./navbar";

import HeroLightImg from "@/public/assets/images/new-light-hero.png";
import HeroDarkImg from "@/public/assets/images/new-dark-hero.png";

export default function HomeContent() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <div className="flex flex-col h-screen border-x">
      <Navbar />
      <Hero />

      <div className="flex justify-center w-full border-y">
        <div className="flex items-center max-w-[70%] border-x">
          <Image
            src={resolvedTheme === "dark" ? HeroDarkImg : HeroLightImg}
            alt="Breeze AI Preview Image"
            className="w-full h-full rounded-xl border-[0.5px] transition-opacity duration-300 ease-in-out"
            loading="eager"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
