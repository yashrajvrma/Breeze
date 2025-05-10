import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useMemo } from "react";

interface Message {
  id: string;
  content: string;
  sender: string;
}

interface ChatMessageProps {
  message: Message;
}

interface ParsedContent {
  beforeDoc: string;
  docContent: string | null;
  afterDoc: string | null;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [parsedContent, setParsedContent] = useState<ParsedContent>({
    beforeDoc: message.content,
    docContent: null,
    afterDoc: null,
  });

  // Parse content as it changes during streaming
  useEffect(() => {
    const content = message.content;
    const startTag = "<<start-doc>>";
    const endTag = "<<end-doc>>";

    const startIdx = content.indexOf(startTag);

    // If we haven't found the start tag yet, everything is pre-doc content
    if (startIdx === -1) {
      setParsedContent({
        beforeDoc: content,
        docContent: null,
        afterDoc: null,
      });
      return;
    }

    const beforeDoc = content.slice(0, startIdx).trim();
    const endIdx = content.indexOf(endTag, startIdx);

    // If we have a start tag but no end tag yet, show what we have so far as document content
    if (endIdx === -1) {
      const partialDocContent = content
        .slice(startIdx + startTag.length)
        .trim();
      setParsedContent({
        beforeDoc,
        docContent: partialDocContent,
        afterDoc: null,
      });
      return;
    }

    // We have both tags, so we can parse all three sections
    const docContent = content.slice(startIdx + startTag.length, endIdx).trim();
    const afterDoc = content.slice(endIdx + endTag.length).trim();

    setParsedContent({
      beforeDoc,
      docContent,
      afterDoc,
    });
  }, [message.content]);

  const { beforeDoc, docContent, afterDoc } = parsedContent;

  return (
    <div
      className={cn(
        "flex flex-col w-full text-sm font-sans",
        message.sender === "user" ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-lg",
          message.sender === "user"
            ? "bg-secondary text-secondary-foreground max-w-[100%]"
            : "text-foreground max-w-[100%] font-sans"
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm font-sans space-y-4">
          {/* Content before document */}
          {beforeDoc && <ReactMarkdown>{beforeDoc}</ReactMarkdown>}

          {/* Word doc card - shows even during streaming */}
          {docContent !== null && (
            <div className="rounded-lg border bg-muted p-4 shadow-sm cursor-pointer hover:bg-muted/70 transition">
              <p className="text-sm font-semibold mb-1">Word Document</p>
              <p className="text-xs text-muted-foreground">
                {docContent.length > 200
                  ? `${docContent.slice(0, 200)}...`
                  : docContent || "Loading document content..."}
              </p>
            </div>
          )}

          {/* Content after document */}
          {afterDoc && <ReactMarkdown>{afterDoc}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
}
