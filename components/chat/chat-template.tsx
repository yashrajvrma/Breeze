// app/components/chat-templates.tsx (Updated with constants)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createChatSession } from "@/app/actions/chatSession";
import { getFormattedResetTime } from "@/lib/utils/getLocalTimeZone";
import {
  LucideIcon,
  PencilIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";

type User = {
  userId: string;
};

interface PromptSuggestorProps {
  label: string;
  onClick?: () => void;
  prompt: string;
  icon: LucideIcon;
  disabled?: boolean;
}

const PromptSuggestor = ({
  label,
  icon: Icon,
  prompt,
  onClick,
  disabled = false,
}: PromptSuggestorProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex gap-x-2 items-center align-middle border px-3 py-2 rounded-xl hover:border-[hsl(var(--border-foreground))] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      type="button"
    >
      <Icon size={16} />
      {label}
    </button>
  );
};

export interface Template {
  label: string;
  icon: LucideIcon;
  prompt: string;
}

export const CHAT_TEMPLATES: Template[] = [
  {
    label: "Create a report",
    icon: WandSparklesIcon,
    prompt:
      "Create a comprehensive business analysis report with market research, financial projections, competitive landscape, and strategic recommendations for technology sector growth",
  },
  {
    label: "Draft a letter",
    icon: PencilIcon,
    prompt:
      "Draft a professional business correspondence letter with proper formatting, formal tone, clear objectives, and appropriate closing statements for corporate communication",
  },
  {
    label: "Build a resume",
    icon: SparklesIcon,
    prompt:
      "Build a comprehensive professional resume with detailed work experience, skills assessment, educational background, achievements, and industry-specific keywords for career advancement",
  },
];

export default function ChatTemplates({ userId }: User) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleTemplateClick = async (prompt: string) => {
    const formData = new FormData();
    formData.append("message", prompt);

    if (userId) {
      formData.append("userId", userId);
    }

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

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 my-4 font-sans text-sm">
      {CHAT_TEMPLATES.map((template) => (
        <PromptSuggestor
          key={template.label}
          label={template.label}
          icon={template.icon}
          prompt={template.prompt}
          onClick={() => handleTemplateClick(template.prompt)}
          disabled={isSubmitting}
        />
      ))}
    </div>
  );
}
