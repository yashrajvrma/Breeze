import { Twitter, Linkedin, GitHub } from "@/components/icons/icons";
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

export default function Footer() {
  return (
    <div className="text-foreground font-sans w-full px-4 py-10 border-t mt-8">
      <div className="mx-auto flex justify-center md:py-6 w-full max-w-3xl px-3">
        <div className="flex flex-col justify-between w-full">
          <div className="flex md:flex-row flex-col md:justify-between items-center flex-wrap gap-y-6">
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
            <div className="flex items-center text-sm text-foreground/80 gap-x-2">
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
        </div>
        {/* Top Row: Social + Links */}
      </div>
    </div>
  );
}
