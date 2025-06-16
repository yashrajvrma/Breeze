import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center font-sans">
      <div className="flex flex-col justify-center items-center w-full text-foreground max-w-[70%] border-x">
        <div className="text-6xl md:text-7xl font-medium tracking-tighter md:mt-24 mt-8">
          AI Powered
        </div>
        <div className="text-6xl md:text-7xl font-medium tracking-tighter">
          Document Editor
        </div>
        <p className="sm:text-xl text-sm text-center font-normal text-foreground/60 tracking-tight pt-2 font-sans sm:px-0 px-10 ">
          Breeze turns your ideas into professional documents in seconds with
          AI.
        </p>
        <div className="flex flex-col justify-center pt-5">
          <Link href="/signin">
            <Button className="font-sans text-sm rounded-xl" variant="default">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex justify-center text-center text-xs pb-10 pt-2 items-center text-foreground">
          No credit card required
        </div>
      </div>
    </div>
  );
}
