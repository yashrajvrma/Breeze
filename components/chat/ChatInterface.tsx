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
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchedMessages, setFetchedMessages] = useState<Messages[]>([]);

  const { messages, input, handleInputChange, append, setMessages, isLoading } =
    useChat({
      api: "/api/chat/message",
      body: () => ({
        chatId,
        messages,
      }),
      initialMessages: fetchedMessages.map((msg) => ({
        id: msg.id,
        role: msg.sender,
        content: msg.content,
      })),
    });

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`/api/chat/thread?chatId=${chatId}`);
        if (response.data?.success) {
          const threadData = response.data.thread as Thread;
          const msgs = threadData.messages;

          setFetchedMessages(msgs); // Store in state for initialMessages

          // If only 1 pending user message, trigger assistant reply
          if (
            msgs.length === 1 &&
            msgs[0].sender === "user" &&
            msgs[0].status === "PENDING"
          ) {
            await append(
              {
                role: "user",
                content: msgs[0].content,
              },
              {
                body: {
                  chatId,
                  messages: [
                    {
                      role: "user",
                      content: msgs[0].content,
                    },
                  ],
                },
              }
            );
          }

          toast.success(response.data.message);
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
  }, [chatId, append]);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await append(
      {
        role: "user",
        content: input.trim(),
      },
      {
        body: {
          chatId,
          messages,
        },
      }
    );
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
        <form onSubmit={handleFormSubmit} className="relative">
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
