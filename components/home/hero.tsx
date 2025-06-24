import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center w-full text-foreground md:max-w-7xl md:border-x">
        <span className="text-center font-medium md:text-7xl lg:text-8xl text-5xl md:mt-40 mt-36 px-4 ">
          <span className="flex flex-col md:hidden">
            <span>AI Powered</span>
            <span>Docs, Built to</span>
            <span>Save You Time</span>
          </span>

          <span className="hidden md:inline font-interTight">
            Your AI Docs
            <br />
            <span className="font-instrumentSerif italic font-[400]">
              assistant.
            </span>
          </span>
        </span>

        <p className="md:text-xl text-lg text-center font-normal text-foreground/70 tracking-tight pt-2 font-sans md:px-0 px-2">
          Breeze turns your ideas into documents in seconds with AI.
        </p>
        <div className="flex flex-col justify-center pt-3">
          <Link href="/chat">
            <Button className="font-sans text-sm rounded-xl" variant="default">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex justify-center text-center text-xs md:pb-14 pb-8 pt-2 items-center text-muted-foreground font-normal font-intrumentSerifItalic">
          No credit card required
        </div>
      </div>
    </div>
  );
}
