import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useEditorContent } from "@/lib/store/editor";

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
  const setEditorContent = useEditorContent((state) => state.setEditorContent);

  const [parsedContent, setParsedContent] = useState<ParsedContent>({
    beforeDoc: "",
    docContent: null,
    afterDoc: null,
  });

  useEffect(() => {
    const content = message.content;
    const startTag = "<<start-doc>>";
    const endTag = "<<end-doc>>";

    const startIdx = content.indexOf(startTag);

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

    if (endIdx === -1) {
      setParsedContent({
        beforeDoc,
        docContent: content.slice(startIdx + startTag.length).trim(),
        afterDoc: null,
      });
      return;
    }

    setParsedContent({
      beforeDoc,
      docContent: content.slice(startIdx + startTag.length, endIdx).trim(),
      afterDoc: content.slice(endIdx + endTag.length).trim(),
    });
  }, [message.content]);

  const handleDocumentClick = () => {
    if (parsedContent.docContent) {
      try {
        const contentJson = JSON.parse(parsedContent.docContent);
        setEditorContent(contentJson);
        console.log("Document content set to editor:", contentJson);
      } catch (error) {
        console.error("Error parsing document content:", error);
      }
    }
  };

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
        <div className="space-y-4 dark:prose-invert max-w-none font-sans text-sm prose prose-sm">
          {parsedContent.beforeDoc && (
            <ReactMarkdown>{parsedContent.beforeDoc}</ReactMarkdown>
          )}

          {parsedContent.docContent && (
            <div
              className="flex flex-col bg-muted hover:bg-muted/70 shadow-sm p-4 border rounded-lg transition-colors cursor-pointer"
              onClick={handleDocumentClick}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-sm">Document</p>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded text-primary text-xs">
                  <span>Click to edit</span>
                </div>
              </div>
              <div className="bg-background/70 p-2 border border-border/50 rounded max-h-20 overflow-hidden text-muted-foreground text-xs">
                {parsedContent.docContent.length > 200
                  ? `${parsedContent.docContent.slice(0, 200)}...`
                  : parsedContent.docContent}
              </div>
            </div>
          )}

          {parsedContent.afterDoc && (
            <ReactMarkdown>{parsedContent.afterDoc}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
