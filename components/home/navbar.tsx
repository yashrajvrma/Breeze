"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/assets/images/breeze-logo.png";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuDemo } from "../nav-menu";
import { Menu, MoonStarIcon, SunIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Twitter, Linkedin, GitHub } from "@/components/icons/icons";
import { useTheme } from "next-themes";
import { useThemeStore } from "@/lib/store/themeStore";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yashrajvrma",
    icon: GitHub,
    ariaLabel: "GitHub",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/theyashrajverma/",
    icon: Linkedin,
    ariaLabel: "Linkedin",
  },
  {
    name: "Twitter",
    href: "https://x.com/yashrajvrma",
    icon: Twitter,
    ariaLabel: "X (Twitter)",
  },
];

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/10 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between max-w-3xl mx-auto font-sans px-3">
        <Link href="/">
          <div className="flex items-center gap-x-2 sm:px-0 md:px-0 lg:px-0 px-3">
            <div className="flex justify-center items-center align-middle bg-stone-50 rounded-xl w-8 h-8">
              <Image src={logo} alt="Breeze Logo" className="w-6" />
            </div>
            <div className="md:text-2xl text-xl text-foreground font-instrumentSerif font-semibold">
              Breeze
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center">
          <NavigationMenuDemo />
        </div>

        {/* Desktop Navigation Links and Sign In Button */}
        <div className="hidden md:flex items-center gap-x-2">
          {/* NavigationMenuDemo is assumed to contain your main navigation links with dropdowns */}

          {resolvedTheme === "dark" ? (
            <button
              className="border py-2.5 px-2.5 rounded-lg"
              onClick={() => {
                setTheme("light" as typeof theme);
                console.log("theme is dark");
              }}
            >
              <SunIcon size={16} />
            </button>
          ) : (
            <button
              className="border p-2 rounded-lg"
              onClick={() => {
                setTheme("dark" as typeof theme);
                console.log("theme is light");
              }}
            >
              {/* <SunIcon size={16} /> */}
              <MoonStarIcon size={16} />
            </button>
          )}

          <Link href="/signin">
            <button className="bg-foreground text-background hover:bg-foreground/90 py-2 px-3 text-sm font-medium rounded-lg hover:cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet>
          <div className="flex justify-between items-center align-middle md:hidden px-3 gap-x-3">
            {resolvedTheme === "dark" ? (
              <button
                className="border p-1 rounded-md"
                onClick={() => {
                  setTheme("light" as typeof theme);
                  console.log("theme is dark");
                }}
              >
                <SunIcon size={16} />
              </button>
            ) : (
              <button
                className="border p-1 rounded-md"
                onClick={() => {
                  setTheme("dark" as typeof theme);
                  console.log("theme is light");
                }}
              >
                {/* <SunIcon size={16} /> */}
                <MoonStarIcon size={16} />
              </button>
            )}
            <SheetTrigger>
              <div className="hover:cursor-pointer">
                <Menu size={22} />
                <span className="sr-only">Toggle navigation menu</span>
              </div>
            </SheetTrigger>
          </div>

          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] flex flex-col font-sans"
          >
            <div className="flex items-center justify-between py-4 px-2">
              <Link href="/" className="flex items-center">
                <Image src={logo} alt="Breeze Logo" className="w-6" />
              </Link>
              <Link href="/signin">
                <Button
                  variant="default"
                  className="text-sm rounded-lg hover:cursor-pointer"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-1">
              <div className="grid text-base font-medium">
                <Link href="/about" className="block py-2 px-1 ">
                  About
                </Link>
                <Link href="/privacy" className="block py-2 px-1 ">
                  Privacy
                </Link>
                <Link href="/terms" className="block py-2 px-1 ">
                  Terms of Service
                </Link>
                <a
                  href="mailto:yashrajv.work@gmail.com"
                  className="block py-2 px-1 "
                >
                  Contact Us
                </a>
              </div>
              <div className="flex justify-center mt-8 py-6 border-t">
                <div className="flex items-center gap-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      aria-label={social.ariaLabel}
                      className="duration-200"
                    >
                      <social.icon
                        fill="#dc2626"
                        className="h-5 w-5 transition-transform hover:scale-110"
                      />
                      <span className="sr-only">{social.ariaLabel}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
