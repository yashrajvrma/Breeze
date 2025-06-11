"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal, SquircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useChat } from "@ai-sdk/react";
import { useQuery } from "@tanstack/react-query";
import SendMessageButton from "./button/sendMsgButton";
import { Skeleton } from "../ui/skeleton";
import { error } from "console";
import { getFormattedResetTime } from "@/lib/utils/getLocalTimeZone";

interface Messages {
  id: string;
  sender: "user" | "assistant";
  content: string;
  status: "PENDING" | "COMPLETED";
  orderIndex: number;
  createdAt: string;
}

interface Thread {
  chatId: string;
  messages: Messages[];
}

async function fetchThread(chatId: string) {
  const response = await fetch(`/api/v1/chat/thread?chatId=${chatId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch conversation");
  }
  return response.json();
}

export default function ChatInterface() {
  const params = useParams();
  const { chatId } = params;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [firstMsg, setFirstMsg] = useState<Messages[]>();

  const {
    data: threadData,
    isLoading: isThreadLoading,
    error: threadError,
  } = useQuery({
    queryKey: ["thread", chatId],
    queryFn: () => fetchThread(chatId as string),
    refetchOnWindowFocus: false,
  });

  const {
    messages,
    input,
    handleInputChange,
    append,
    setMessages,
    isLoading,
    status,
    stop,
  } = useChat({
    api: "/api/v1/chat/message",
    body: {
      chatId,
    },
    initialMessages: firstMsg
      ? []
      : threadData?.thread?.messages?.map((msg: Messages) => ({
          id: msg.id,
          role: msg.sender,
          content: msg.content,
        })),
    experimental_throttle: 50,
    onError: (error) => {
      console.log("error is ", error);
      toast.error(error.message);
    },
    onResponse(response) {
      if (response.status === 429) {
        const localTime = getFormattedResetTime();
        console.log("time is", localTime);
        toast.error(
          `You've hit your daily limit. Your credits will reset after ${localTime}`
        );
      }
    },
  });

  useEffect(() => {
    if (threadError) {
      toast.error(threadError.message);
    }
  }, [threadError]);

  useEffect(() => {
    if (threadData?.thread?.messages) {
      const msgs = threadData.thread.messages as Messages[];
      // setFirstMsg(threadData.thread.message);

      if (
        msgs.length === 1 &&
        msgs[0].sender === "user" &&
        msgs[0].status === "PENDING"
      ) {
        setFirstMsg(msgs);
        append({
          role: "user",
          content: msgs[0].content,
        }).catch((error) => {
          toast.error(error.message);
        });
      }
    }
  }, [threadData, append]);

  useEffect(() => {
    if (messages.length > 0) {
      // Small delay ensures DOM is rendered before scrolling
      const timeout = setTimeout(() => {
        scrollToBottom();
      }, 100); // 100ms delay is usually safe
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await append({
        role: "user",
        content: input.trim(),
      });
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  if (isThreadLoading) {
    return (
      <div className="flex flex-col h-full border-r border-border font-sans">
        <div className="p-4 border-b">
          <Skeleton className="flex items-center h-8 w-full" />
        </div>
        <div className="flex flex-col w-full gap-y-4 px-7 pt-4">
          <div className="flex justify-end">
            <Skeleton className="items-end h-8 w-[80%]" />
          </div>

          <div className="flex flex-col items-start gap-y-2">
            <Skeleton className="flex items-start h-8 w-[90%]" />
            <Skeleton className="flex items-start h-8 w-[90%]" />
            <Skeleton className="flex items-start h-8 w-[90%]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border-r border-border font-sans">
      <div className="py-4 px-7 text-base font-semibold border-b">
        {threadData?.thread?.title || "Untitled Chat"}
      </div>
      <ScrollArea className="flex-1 p-0 pb-0 px-7">
        <div className="space-y-4 pt-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={msg.id || index}
              isLoading={isLoading}
              message={{
                id: msg.id || String(index),
                sender: msg.role === "user" ? "user" : "assistant",
                content: msg.content,
              }}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="px-4 pb-2 mt-auto">
        <form onSubmit={handleFormSubmit} className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            placeholder="Ask a follow up..."
            className="pr-10 p-3 max-h-[250px] min-h-[100px] resize-none rounded-xl hover:border-[hsl(var(--border-foreground))]"
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
              }
            }}
          />

          {status === "submitted" || status === "streaming" ? (
            <Button
              size="icon"
              onClick={stop}
              className="absolute top-2 right-2 h-7 w-7 bg-blue-500 text-neutral-50 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <SquircleIcon fill="#d4d4d4" className="h-4 w-4" />
            </Button>
          ) : (
            <SendMessageButton inputMessage={input} isLoading={isLoading} />
          )}
        </form>
      </div>
    </div>
  );
}
