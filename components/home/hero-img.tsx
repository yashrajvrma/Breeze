"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import HeroLightImg from "@/public/assets/images/new-light-hero.png";
import HeroDarkImg from "@/public/assets/images/new-dark-hero.png";

export default function HeroImg() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center w-full border-y px-2.5">
      <div className="flex items-center md:max-w-7xl border-x">
        <Image
          src={resolvedTheme === "dark" ? HeroDarkImg : HeroLightImg}
          alt="Breeze AI Preview Image"
          className="w-full h-full rounded-xl border-[0.5px] transition-opacity duration-300 ease-in-out"
          loading="eager"
        />
      </div>
    </div>
  );
}
