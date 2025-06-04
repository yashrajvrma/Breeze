"use client";

import { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { createChatSession } from "@/app/actions/session";
import CreateChatButton from "./button/CreateChatButton";

export default function HomeChatLayout() {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const messageText = formData.get("message") as string;
    if (!messageText?.trim()) return;

    await createChatSession(formData);
    // setMessage("");
  };

  return (
    <div className="flex justify-center items-center align-middle font-sans h-screen">
      <div className="flex flex-col items-center align-middle text-center">
        <div className="text-5xl tracking-tighter font-semibold text-primary">
          What do you want to create?
        </div>
        <div className="mt-2.5 text-xl font-sans tracking-tight text-muted-foreground">
          Prompt, create and edit word documents .
        </div>
        <div className="w-[650px] mt-7">
          <form ref={formRef} action={handleSubmit} className="relative">
            <Textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can I help you today?"
              className="resize-none p-5 border rounded-2xl"
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

            <CreateChatButton message={message.trim().length > 0} />
          </form>
        </div>
        
      </div>
    </div>
  );
}
