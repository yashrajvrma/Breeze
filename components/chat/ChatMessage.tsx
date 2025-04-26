import { cn } from "@/lib/utils";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formattedTime = format(new Date(message.timestamp), "h:mm a");

  return (
    <div
      className={cn(
        "flex flex-col w-full ",
        message.sender === "user" ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-lg",
          message.sender === "user"
            ? "bg-secondary text-secondary-foreground max-w-[85%]"
            : "text-foreground max-w-[85%]"
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
      <span className="text-xs text-muted-foreground mt-1">
        {formattedTime}
      </span>
    </div>
  );
}
