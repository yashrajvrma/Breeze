// app/components/chat-form.tsx (Client Component)
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";
import { createChatSession } from "@/app/actions/chatSession";
import CreateChatButton from "./button/CreateChatButton";
import { getFormattedResetTime } from "@/lib/utils/getLocalTimeZone";

type User = {
  userId: string;
};

export default function ChatForm({ userId }: User) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const messageText = formData.get("message") as string;
    if (!messageText?.trim()) return;
    if (userId) {
      formData.append("userId", userId);
    }

    try {
      setIsSubmitting(true);
      const response = await createChatSession(formData);

      if (response.success) {
        console.log("response is", response?.data?.chatId);
        const chatId = response?.data?.chatId;
        router.push(`/chat/${chatId}`);
      }

      if (!response.success) {
        console.log("error is", response.error);
        const localTime = getFormattedResetTime();
        console.log("time is", localTime);
        toast.error(
          `You've hit your daily limit. Your credits will reset after ${localTime}`
        );
      }
    } catch (error: any) {
      if (error) {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="relative">
      <Textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can I help you today?"
        className="resize-none p-4 pr-16 border rounded-2xl focus:border-[hsl(var(--border-foreground))] placeholder:text-base placeholder:font-medium md:min-h-[150px] min-h-[130px]"
        maxHeight={250}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.trim()) {
              formRef.current?.requestSubmit();
            }
          }
        }}
      />

      <CreateChatButton
        isSubmitting={isSubmitting}
        message={message.trim().length > 0}
      />
    </form>
  );
}
