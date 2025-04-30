import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  sender: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full",
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
        <div className="prose prose-sm dark:prose-invert max-w-none text-md">
          <ReactMarkdown
            components={{
              span: ({ node, className, children, ...props }) => {
                if (className?.includes("bg-button")) {
                  return (
                    <span
                      {...props}
                      className={cn(
                        "inline-block bg-blue-500 text-white px-2 py-1 rounded",
                        className // Merge with additional classes if any
                      )}
                    >
                      {children}
                    </span>
                  );
                }
                return <span {...props}>{children}</span>;
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
