import { Button } from "../ui/button";
import logo from "@/public/assets/images/breeze-new-logo.png";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuDemo } from "../nav-menu";

export default function Navbar() {
  return (
    <div className="flex justify-center font-sans border border-b">
      <div className="flex justify-between items-center align-middle min-w-[50%] md:py-3.5">
        <div className="flex justify-center items-center sm:gap-x-2 gap-x-2 ">
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="Logo" className="w-7" />
            </Link>
          </div>
          <div className="flex items-center align-middle md:text-3xl text-3xl text-foreground font-instrumentSerif font-semibold tracking-tight">
            Breeze
          </div>
        </div>
        <div className="flex justify-center gap-x-2">
          <NavigationMenuDemo />
          <Link href="/signin">
            <Button className="text-sm rounded-xl hover:cursor-pointer">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
