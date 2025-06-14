"use client";

import { ArrowRightIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface CreateChatButtonProps {
  message: boolean;
  isSubmitting: boolean;
}

export default function CreateChatButton({
  message,
  isSubmitting,
}: CreateChatButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="icon"
      type="submit"
      disabled={pending || !message || isSubmitting}
      className="absolute top-4 right-4 md:h-8 md:w-8 h-7 w-7 text-neutral-50 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowRightIcon className="h-5 w-5 text-neutral-50" />
      <span className="sr-only">Send message</span>
    </Button>
  );
}
