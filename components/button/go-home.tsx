"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const GoHome = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/")} variant="outline">
      Go Home
    </Button>
  );
};
