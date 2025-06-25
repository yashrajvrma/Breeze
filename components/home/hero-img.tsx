"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import editorDarkImg from "@/public/assets/images/editor-dark.png";
import editorLightImg from "@/public/assets/images/editor-light.png";

export default function HeroImg() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center w-full px-4 mb-16">
      <div className="flex items-center md:max-w-7xl">
        <Image
          src={resolvedTheme === "dark" ? editorDarkImg : editorLightImg}
          alt="Breeze AI Preview Image"
          className="w-full h-auto rounded-2xl border transition-opacity duration-300 ease-in-out"
          priority
        />
      </div>
    </div>
  );
}
