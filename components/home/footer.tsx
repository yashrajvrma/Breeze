"use client";

import { Twitter, Linkedin, GitHub } from "@/components/icons/icons";
import { useThemeStore } from "@/lib/store/themeStore";
import { MonitorCogIcon, MoonStarIcon, SunIcon } from "lucide-react";

import Link from "next/link";

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

const options = [
  { value: "system", icon: <MonitorCogIcon size={16} />, label: "System" },
  { value: "light", icon: <SunIcon size={16} />, label: "Light" },
  { value: "dark", icon: <MoonStarIcon size={16} />, label: "Dark" },
];
export default function Footer() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex justify-center text-foreground font-sans">
      <div className="flex flex-col border-x min-w-[70%] px-20 py-8">
        {/* Top Row: Social + Links */}
        <div className="flex justify-between items-center flex-wrap gap-y-4">
          {/* Social Icons */}
          <div className="flex gap-x-4 items-center">
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

          {/* About, Terms, Privacy */}
          <div className="flex items-center md:text-base text-sm text-foreground/80 font-medium gap-x-2">
            <Link className="hover:text-foreground" href="/about">
              About
            </Link>
            |
            <Link className="hover:text-foreground" href="/terms">
              Terms & Conditions
            </Link>
            |
            <Link className="hover:text-foreground" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="flex justify-end mt-2">
          <div className="flex items-center gap-x-3 border px-3 py-1 rounded-xl">
            {options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer ${
                  theme === option.value
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => {
                  setTheme(option.value as typeof theme);
                  console.log("theme set to", option.value);
                }}
              >
                {option.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
