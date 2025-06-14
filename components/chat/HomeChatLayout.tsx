"use client";

import { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { createChatSession } from "@/app/actions/chatSession";
import CreateChatButton from "./button/CreateChatButton";
import {
  LucideIcon,
  PencilIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getFormattedResetTime } from "@/lib/utils/getLocalTimeZone";
import { useIsMobile } from "@/hooks/use-mobile";
import HomechatHeader from "../home-chat-header";

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
      className="flex gap-x-2 items-center align-middle border px-3 py-2 rounded-xl hover:border-[hsl(var(--border-foreground))] hover:cursor-pointer"
    >
      <Icon size={16} />
      {label}
    </div>
  );
};

export default function HomeChatLayout() {
  const isMobile = useIsMobile();
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
      if (response.success) {
        console.log("response is", response?.data?.chatId);
        const chatId = response?.data?.chatId;
        router.push(`/chat/${chatId}`);
      }
      if (!response.success) {
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
    <div className="flex flex-col font-sans h-screen">
      {isMobile && <HomechatHeader title={"Breeze"} />}
      <div className="flex flex-col justify-center items-center align-middle text-center h-screen">
        <div className="md:text-5xl text-3xl tracking-tighter font-semibold text-primary text-center px-1">
          What do you want to create?
        </div>
        <div className="md:mt-2.5 mt-1.5 md:text-lg text-base  font-sans tracking-tight text-muted-foreground">
          Prompt, research and edit documents with AI.
        </div>
        <div className="md:w-[650px] w-full md:mt-7 mt-5 px-5">
          <form ref={formRef} action={handleSubmit} className="relative">
            <Textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can I help you today?"
              className="resize-none p-4 pr-16 border rounded-2xl focus:border-[hsl(var(--border-foreground))] placeholder:text-base placeholder:font-medium"
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
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 my-4 font-sans text-sm">
          {templates.map((item) => (
            <PromptSuggestor key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
