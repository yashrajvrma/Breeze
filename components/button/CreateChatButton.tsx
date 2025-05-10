"use client";

import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function CreateChatButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size="icon"
      type="submit"
      disabled={pending}
      className="absolute top-4 right-4 h-9 w-9 bg-cyan-500 hover:bg-cyan-600"
    >
      <MoveRight className="h-5 w-5 text-foreground" />
      <span className="sr-only">Send message</span>
    </Button>
  );
}
