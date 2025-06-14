"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import loginImage from "@/public/assets/images/loginImage.jpg";
import logo from "@/public/assets/images/breeze-logo.png";
import { Button } from "../ui/button";

export default function Login() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [status]);

  return (
    <div className="flex justify-center items-center h-screen font-sans align-middle">
      <div className="flex md:flex-row justify-center items-center">
        <div className="hidden md:block">
          <Image src={loginImage} width={400} height={400} alt="login-img" />
        </div>
        <div className="flex flex-col justify-center items-center px-5 gap-y-2 align-middle md:w-[400px] md:h-[400px] h-[320px] w-[320px] bg-zinc-900 rounded-2xl md:rounded-none">
          <div className="flex flex-row gap-x-2 mb-0 px-2 py-2">
            <div className="flex items-center align-middle bg-neutral-50 p-1 rounded-xl">
              <Image src={logo} alt="logo" width={30} height={30} />
            </div>

            <p className="text-4xl font-semibold font-instrumentSerif text-stone-50">
              Breeze
            </p>
          </div>
          <div className="text-sm text-stone-100">
            Welcome to Breeze — Let's get started
          </div>
          <div className="flex flex-col justify-center items-center mt-2">
            <Button
              variant="outline"
              className=" rounded-xl px-10"
              size="lg"
              onClick={async () => await signIn("google")}
            >
              <span className="flex flex-row gap-x-2">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </span>
            </Button>

            <div className="mt-4">
              <div className="text-muted-foreground text-center text-xs text-wrap md:mx-16 mx-5">
                By clicking continue, you agree to our{" "}
                <span className="border-b-2 border-b-neutral-500 hover:text-foreground hover:border-b-foreground hover:cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="border-b-2 border-b-neutral-500 hover:text-foreground hover:border-b-foreground hover:cursor-pointer">
                  Privacy Policy
                </span>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
