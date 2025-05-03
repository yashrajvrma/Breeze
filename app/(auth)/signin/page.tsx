"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Signin() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [status]);

  return (
    <div>
      <button onClick={async () => await signIn("google")}>
        Signin with Google
      </button>
    </div>
  );
}
