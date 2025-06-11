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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { error } from "console";

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
      className="flex gap-x-2 items-center align-middle border px-4 py-3 rounded-xl hover:border-[hsl(var(--border-foreground))] hover:cursor-pointer"
    >
      <Icon size={16} />
      {label}
    </div>
  );
};

export default function HomeChatLayout() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleTemplateClick = async (prompt: string) => {
    setMessage(prompt);
    const formData = new FormData();
    formData.append("message", prompt);

    try {
      setIsSubmitting(true);

      const response = await createChatSession(formData);

      if (!response.success) {
        console.log("abc is", response.error);
        toast.error(response?.error!);
      } else {
        console.log("response is", response?.data?.chatId);
        const chatId = response?.data?.chatId;
        router.push(`/chat/${chatId}`);
      }
    } catch (error: any) {
      if (error) {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
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
        "Create a comprehensive business analysis report with market research, financial projections, competitive landscape, and strategic recommendations for technology sector growth",
      onClick: () =>
        handleTemplateClick(
          "Create a comprehensive business analysis report with market research, financial projections, competitive landscape, and strategic recommendations for technology sector growth"
        ),
    },
    {
      label: "Draft a letter",
      icon: PencilIcon,
      prompt:
        "Draft a professional business correspondence letter with proper formatting, formal tone, clear objectives, and appropriate closing statements for corporate communication",
      onClick: () =>
        handleTemplateClick(
          "Draft a professional business correspondence letter with proper formatting, formal tone, clear objectives, and appropriate closing statements for corporate communication"
        ),
    },
    {
      label: "Build a resume",
      icon: SparklesIcon,
      prompt:
        "Build a comprehensive professional resume with detailed work experience, skills assessment, educational background, achievements, and industry-specific keywords for career advancement",
      onClick: () =>
        handleTemplateClick(
          "Build a comprehensive professional resume with detailed work experience, skills assessment, educational background, achievements, and industry-specific keywords for career advancement"
        ),
    },
  ];

  const handleSubmit = async (formData: FormData) => {
    const messageText = formData.get("message") as string;
    if (!messageText?.trim()) return;

    try {
      setIsSubmitting(true);
      const response = await createChatSession(formData);

      if (!response.success) {
        console.log("abc is", response.error);
        toast.error(response?.error!);
      } else {
        console.log("response is", response?.data?.chatId);
        const chatId = response?.data?.chatId;
        router.push(`/chat/${chatId}`);
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
              className="resize-none p-5 pr-16 border rounded-2xl focus:border-[hsl(var(--border-foreground))]"
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
