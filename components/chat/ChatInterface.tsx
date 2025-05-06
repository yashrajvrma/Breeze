"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useChat } from "@ai-sdk/react";

interface Messages {
  id: string;
  sender: "user" | "assistant";
  content: string;
  status: "PENDING" | "STREAMING" | "COMPLETED";
  orderIndex: number;
  createdAt: string;
}

interface Thread {
  chatId: string;
  messages: Messages[];
}

export default function ChatInterface() {
  const params = useParams();
  const { chatId } = params;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [thread, setThread] = useState<Thread | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body : []
  });

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`/api/chat/thread?chatId=${chatId}`);
        if (response.data && response.data.success === true) {
          const threadData = response.data.thread as Thread;
          setThread(threadData);

          const msgs = threadData.messages;

          if (
            msgs.length === 1 &&
            msgs[0].sender === "user" &&
            msgs[0].status === "PENDING"
          ) {
            await append({
              role: "user",
              content: msgs[0].content,
            });
          } else {
            const initialMsgs = msgs.map((message) => ({
              id: message.id,
              role: message.sender,
              content: message.content,
            }));
            setMessages(initialMsgs);
          }

          toast.success(`${response.data.message}`);
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to fetch conversation"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchThread();
  }, [chatId, append, setMessages]);

  useEffect(() => {
    scrollToBottom();
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

  return (
    <div className="flex flex-col h-full border-r border-border font-sans">
      <div className="p-4 border-b border-border">
        <h2 className="text-md font-medium">Word Doc on LLM</h2>
      </div>
      <ScrollArea className="flex-1 p-4 pb-0">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={{
                id: String(index),
                sender: msg.role === "user" ? "user" : "assistant",
                content: msg.content,
              }}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 mt-auto">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            placeholder="Ask AI to write or edit your document..."
            className="pr-10 min-h-[44px] max-h-[200px] resize-none"
            rows={1}
          />
          <Button
            size="icon"
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 bottom-1.5 h-7 w-7"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
