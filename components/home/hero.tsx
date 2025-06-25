"use client";

import { RainbowButton } from "../rainbow-button";
import { Button } from "../ui/button";
import Link from "next/link";
import lightPeerlistLogo from "@/public/assets/images/Launch_SVG_Light (1).svg";
import darkPeerlistLogo from "@/public/assets/images/Launch_SVG_Dark (1).svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col justify-center items-center font-interTight md:mt-40 mt-36">
      <div className="flex flex-col justify-center items-center w-full text-foreground">
        <div className="flex justify-center items-center md:mb-16 mb-12">
          <Link
            href="https://peerlist.io/yashrajvrma/project/breeze"
            target="_blank"
          >
            <Image
              src={
                resolvedTheme === "dark" ? darkPeerlistLogo : lightPeerlistLogo
              }
              alt="Peerlist logo"
              className="md:w-56 w-44"
            />
          </Link>
        </div>
        <span className="text-center font-medium md:text-7xl lg:text-8xl text-5xl px-4 ">
          <span className="flex flex-col md:hidden">
            <span>Your AI Docs</span>
            <span className="font-instrumentSerif italic font-[400]">
              assistant.
            </span>
          </span>

          <span className="hidden md:inline dark:text-neutral-200">
            Your AI Docs
            <br />
            <span className="font-instrumentSerif italic font-[400]">
              assistant.
            </span>
          </span>
        </span>
      </div>
      <div className="md:text-lg text-sm text-center text-foreground/70 pt-2 md:px-0 px-2 md:max-w-md max-w-sm font-interTight mt-2">
        Breeze is an AI powered editor that turns your ideas into beautiful
        documents in seconds.
      </div>
      <div className="flex flex-col justify-center pt-8">
        <Link href="/chat">
          <RainbowButton className="px-6 font-medium text-base">
            Try for free
          </RainbowButton>
          {/* <Button className="text-sm rounded-xl" variant="default">
            Try for free
          </Button> */}
        </Link>
      </div>
      <div className="flex justify-center text-center text-base md:pb-14 pb-8 pt-4 items-center text-muted-foreground/80 font-normal font-intrumentSerifItalic">
        No credit card required
      </div>
    </div>
  );
}
