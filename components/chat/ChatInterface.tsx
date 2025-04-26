"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      content: "## 2. Drug Discovery and Development",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: "2",
      content:
        "The traditional drug development process typically takes 10-15 years and costs billions of dollars. AI is dramatically accelerating this timeline by:\n\n- Analyzing biological data to identify potential drug candidates\n- Predicting how compounds will behave in the human body\n- Repurposing existing medications for new therapeutic uses\n- Designing novel molecules with specific properties\n\nCompanies like Insillico Medicine have used AI to identify promising drug candidates for diseases ranging from fibrosis to cancer in a matter of weeks rather than years.",
      sender: "ai",
      timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      id: "3",
      content: "## 3. Patient Care and Monitoring",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "4",
      content:
        "AI-powered systems are transforming patient care through:\n\n- **Continuous monitoring**: Wearable devices",
      sender: "ai",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
  ];

  return (
    <div className="flex flex-col h-full border-r border-border">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Chat with AI</h2>
      </div>
      <ScrollArea className="flex-1 p-4 pb-0">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border mt-auto">
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
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
