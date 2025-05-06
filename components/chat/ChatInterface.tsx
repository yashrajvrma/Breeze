"use client";

import { useState, useRef, useEffect } from "react";
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

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    
  });

  const [message, setMessage] = useState("");
  const [thread, setThread] = useState<Thread>();
  const [firstMsg, setFirstMsg] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { chatId } = params;

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`/api/chat/thread?chatId=${chatId}`);

        if (response.data && response.data.success === true) {
          setThread(response.data.thread);
          toast.success(`${response.data.message}`);
          console.log("thread msg", thread);

          fetchFirstMessage();
        }
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data?.message || "Something went wrong");
        } else if (error.request) {
          console.log(error.request);
          toast.error("No response from server");
        } else {
          console.log("Axios error", error.message);
          toast.error("Unexpected error occurred");
        }
      }
    };
    fetchThread();
  }, [chatId]);

  function fetchFirstMessage() {
    if (
      thread?.messages &&
      thread?.messages[0].sender === "user" &&
      thread?.messages[0].status === "PENDING"
    ) {
      const inputMsg = thread?.messages[0].content!;
      setFirstMsg(inputMsg);
    }
  }

  // useEffect(() => {

  //   if(firstMsg){

  //   }

  // }, [thread]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage("");
      // Here you would typically send the message to your AI backend
      // and receive a response
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Sample messages for demonstration
  const messages = [
    {
      id: "1",
      content: "Generate a word document on LLM",
      sender: "user",
    },
    {
      id: "2",
      content: `
I've generated the Word document about Large Language Models (LLMs)! Would you like me to add more?
`,
      sender: "ai",
    },
    {
      id: "3",
      content: "Also add how LLMs work",
      sender: "user",
    },
    {
      id: "4",
      content:
        "Certainly! Here's a brief explanation of how Large Language Models (LLMs) work, which I can add in the document.",
      sender: "ai",
    },
  ];

  return (
    <div className="flex flex-col h-full border-r border-border font-sans">
      <div className="p-4 border-b border-border">
        <h2 className="text-md font-medium">Word Doc on LLM</h2>
      </div>
      <ScrollArea className="flex-1 p-4 pb-0">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 mt-auto">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            placeholder="Ask AI to write or edit your document..."
            className="pr-10 min-h-[44px] max-h-[200px] resize-none"
            rows={1}
          />
          <Button
            size="icon"
            type="submit"
            disabled={!message.trim()}
            className="absolute right-1.5 bottom-1.5 h-7 w-7"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
