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
    <div className="flex  justify-center items-center h-screen font-sans align-middle">
      <div className="flex flex-row">
        {" "}
        <div className="flex">
          <Image src={loginImage} width={400} height={400} alt="login-img" />
        </div>
        <div className="flex flex-col justify-center items-center px-5 gap-y-2 align-middle w-[400px] bg-zinc-900">
          <div className="flex flex-row gap-x-3 mb-0 px-3 py-5">
            <Image src={logo} alt="logo" width={40} height={32} />
            <p className="font-medium text-4xl font-garamond text-white">
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
            {/* <button
              className="flex justify-center items-center gap-2 bg-gradient-to-b from-[#101111] to-[#2d2e30] shadow hover:brightness-110 mb-2 py-3 rounded-xl w-full font-medium text-white text-sm transition"
              onClick={async () => await signIn("google")}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button> */}
            <div className="mt-4">
              <div className="text-muted-foreground text-center text-xs text-wrap mx-16">
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
