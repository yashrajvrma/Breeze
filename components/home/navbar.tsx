"use client";

import { Button } from "../ui/button";
import logo from "@/public/assets/images/breeze-logo.png";
import Image from "next/image";
import { toast } from "sonner";

export default function Navbar() {
  const handleGetStartedClick = () => {
    toast.success("Please joined waitlist!");
  };

  return (
    <div className="flex flex-row justify-between items-center font-sans sm:px-10 sm:py-5 px-5 py-8">
      <div className="flex justify-center items-center sm:gap-x-2 gap-x-2">
        <div className="flex items-center rounded-lg bg-neutral-100 p-1">
          <Image src={logo} alt="Logo" width={28} height={28} />
        </div>
        <div
          style={{ fontFamily: "var(--font-garamond-book)" }}
          className="flex items-center align-middle sm:text-4xl text-3xl text-stone-50 tracking-tight"
        >
          Breeze
        </div>
      </div>
      <Button
        onClick={handleGetStartedClick}
        className="text-sm sm:text-base px-3 sm:px-4 hover:cursor-pointer"
      >
        Get Started
      </Button>
    </div>
  );
}
