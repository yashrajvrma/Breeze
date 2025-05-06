"use client";

import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";

export default function HomeChatLayout() {
  const router = useRouter();

  const [message, setMessage] = useState<string>("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(session?.user?.id);

    const userId = session?.user?.id!;

    try {
      const response = await axios.post("/api/chat/session", {
        userId: userId,
        message: message,
      });
      if (response.data) {
        const chatId = response.data?.chatId;
        console.log("id", chatId);
        router.push(`/chat/${chatId}`);
        console.log("after push");
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  };
  return (
    <div className="flex justify-center items-center align-middle font-sans h-screen">
      <div className="flex flex-col items-center align-middle text-center">
        <div className="text-5xl font-semibold text-foreground">
          What do you want to build?
        </div>
        <div className="mt-2 text-lg font-normal text-muted-foreground">
          Prompt, create and edit word documents .
        </div>
        <div className="w-[500px] mt-7">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can Aero help you today?"
              className="font-medium text-sm p-5 min-h-[150px] max-h-[600px] resize-none focus:outline-none w-full"
              rows={1}
            />
            <Button
              size="icon"
              type="submit"
              //   disabled={!message.trim()}
              className="absolute top-4 right-4 h-9 w-9 bg-cyan-500 hover:bg-cyan-600"
            >
              <MoveRight className="h-5 w-5 text-foreground" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
