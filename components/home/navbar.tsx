"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/assets/images/breeze-logo.png";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuDemo } from "../nav-menu"; // Assuming this component exists and handles navigation links
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Twitter, Linkedin, GitHub } from "@/components/icons/icons";

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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between  max-w-5xl mx-auto font-sans">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-x-2 sm:px-0 md:px-0 lg:px-0 px-3">
          <Link href="/">
            <Image src={logo} alt="Breeze Logo" className="w-6" />
          </Link>
          <div className="md:text-3xl text-2xl text-foreground font-instrumentSerif font-semibold tracking-tight">
            Breeze
          </div>
        </div>

        {/* Desktop Navigation Links and Sign In Button */}
        <div className="hidden lg:flex items-center gap-x-5">
          {/* NavigationMenuDemo is assumed to contain your main navigation links with dropdowns */}
          <NavigationMenuDemo />
          <Link href="/signin">
            <Button className="text-sm rounded-xl hover:cursor-pointer">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden px-3">
            <div className="hover:cursor-pointer">
              <Menu size={20} />
              <span className="sr-only">Toggle navigation menu</span>
            </div>
          </SheetTrigger>
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
                  Sign In
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
