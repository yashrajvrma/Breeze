"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const GoBack = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="outline">
      Go Back
    </Button>
  );
};
