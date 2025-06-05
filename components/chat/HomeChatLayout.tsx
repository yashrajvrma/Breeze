"use client";

import { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { createChatSession } from "@/app/actions/session";
import CreateChatButton from "./button/CreateChatButton";
import {
  Icon,
  LucideIcon,
  PencilIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";

interface PromptSuggestorProps {
  label: string;
  onClick?: () => void;
  prompt: string;
  icon: LucideIcon;
}

const PromptSuggestor = ({
  label,
  icon: Icon,
  prompt,
  onClick,
}: PromptSuggestorProps) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-x-2 items-center align-middle border px-4 py-3 rounded-xl hover:border-neutral-700 hover:cursor-pointer"
    >
      <Icon size={16} />
      {label}
    </div>
  );
};

export default function HomeChatLayout() {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleTemplateClick = async (prompt: string) => {
    const formData = new FormData();
    formData.append("message", prompt);
    await createChatSession(formData);
  };

  const templates: {
    label: string;
    icon: LucideIcon;
    prompt: string;
    onClick: () => void;
  }[] = [
    {
      label: "Create a report",
      icon: WandSparklesIcon,
      prompt:
        "Help me create a comprehensive report with deep research and data analysis on machine learning algorithm",
      onClick: () =>
        handleTemplateClick(
          "Help me create a comprehensive report with deep research and data analysis on machine learning algorithm"
        ),
    },
    {
      label: "Draft a letter",
      icon: PencilIcon,
      prompt:
        "Help me draft a professional letter with proper formatting and tone",
      onClick: () =>
        handleTemplateClick(
          "Help me draft a professional letter with proper formatting and tone"
        ),
    },
    {
      label: "Build a resume",
      icon: SparklesIcon,
      prompt:
        "Help me build a professional resume that highlights my skills and experience",
      onClick: () =>
        handleTemplateClick(
          "Help me build a professional resume that highlights my skills and experience"
        ),
    },
  ];

  const handleSubmit = async (formData: FormData) => {
    const messageText = formData.get("message") as string;
    if (!messageText?.trim()) return;

    await createChatSession(formData);
    setMessage("");
  };

  return (
    <div className="flex justify-center items-center align-middle font-sans h-screen">
      <div className="flex flex-col items-center align-middle text-center">
        <div className="text-5xl tracking-tighter font-semibold text-primary">
          What do you want to create?
        </div>
        <div className="mt-2.5 text-lg font-sans tracking-tight text-muted-foreground">
          Prompt, research and edit documents with AI.
        </div>
        <div className="w-[650px] mt-7">
          <form ref={formRef} action={handleSubmit} className="relative">
            <Textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can I help you today?"
              className="resize-none p-5 border rounded-2xl focus:border-neutral-700"
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
        <div className="flex justify-center items-center gap-x-4 my-4 font-sans text-sm">
          {templates.map((item) => (
            <PromptSuggestor key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
