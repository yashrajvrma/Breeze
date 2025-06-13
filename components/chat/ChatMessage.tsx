import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useEditorContent, useEditorStore } from "@/lib/store/editorStore";
import DocsContent from "./button/docsContentButton";
import { extractTitleFromDoc } from "@/lib/utils/docx-title";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEditorState } from "@tiptap/react";

interface Message {
  id: string;
  content: string;
  sender: string;
  isStreaming?: boolean;
}

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
}

interface ParsedContent {
  beforeDoc: string;
  docContent: string | null;
  afterDoc: string | null;
}

export default function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const setContentId = useEditorContent((state) => state.setContentId);
  const setContentTitle = useEditorContent((state) => state.setContentTitle);
  const setEditorContent = useEditorContent((state) => state.setEditorContent);
  const openDrawer = useEditorStore((state) => state.openDrawer); // Add this line
  const isMobile = useIsMobile();
  const [parsedContent, setParsedContent] = useState<ParsedContent>({
    beforeDoc: "",
    docContent: null,
    afterDoc: null,
  });

  useEffect(() => {
    const content = message.content;

    const startTag = "<doc>";
    const endTag = "</doc>";

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
      // Document is still being generated (no end tag found)
      setParsedContent({
        beforeDoc,
        docContent: content.slice(startIdx + startTag.length).trim(),
        afterDoc: null,
      });
      return;
    }

    // Document is complete (both start and end tags found)
    setParsedContent({
      beforeDoc,
      docContent: content.slice(startIdx + startTag.length, endIdx).trim(),
      afterDoc: content.slice(endIdx + endTag.length).trim(),
    });
  }, [message.content, message.isStreaming]);

  // Update the auto-open effect
  useEffect(() => {
    if (isMobile && parsedContent.docContent && !isLoading) {
      try {
        const htmlContent = parsedContent.docContent;
        setContentId(message.id);
        setEditorContent(htmlContent);

        const extractedTitle = extractTitleFromHTML(htmlContent);
        if (extractedTitle) {
          setContentTitle(extractedTitle);
        }

        openDrawer(); // Use Zustand action instead of prop
      } catch (error) {
        console.error("Error processing document content for mobile:", error);
      }
    }
  }, [
    isMobile,
    parsedContent.docContent,
    isLoading,
    message.id,
    setContentId,
    setEditorContent,
    setContentTitle,
    openDrawer,
  ]);

  // Update the click handler
  const handleDocumentClick = () => {
    if (isLoading || !parsedContent.docContent) {
      console.log("Document still loading or no content available");
      return;
    }

    try {
      const htmlContent = parsedContent.docContent;
      setContentId(message.id);
      setEditorContent(htmlContent);

      const extractedTitle = extractTitleFromHTML(htmlContent);
      if (extractedTitle) {
        setContentTitle(extractedTitle);
      }

      // Use Zustand action on mobile
      if (isMobile) {
        openDrawer();
      }
    } catch (error) {
      console.error("Error processing document content:", error);
    }
  };

  // Helper function to extract title from HTML content
  const extractTitleFromHTML = (htmlContent: string): string | null => {
    try {
      // Create a temporary DOM element to parse HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      // Look for the first h1 tag only
      const h1Element = tempDiv.querySelector("h1");
      if (h1Element) {
        return h1Element.textContent?.trim() || null;
      }

      return null;
    } catch (error) {
      console.error("Error extracting title from HTML:", error);
      return null;
    }
  };

  const isDocumentReady = parsedContent.docContent && !isLoading;

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
            ? "bg-secondary text-secondary-foreground max-w-[90%]"
            : "text-foreground max-w-[90%] font-sans py-0 px-0"
        )}
      >
        <div className="space-y-4 dark:prose-invert max-w-none font-sans text-sm prose prose-sm">
          {parsedContent.beforeDoc && (
            <ReactMarkdown>{parsedContent.beforeDoc}</ReactMarkdown>
          )}

          {parsedContent.docContent && (
            <div
              className={cn(
                "flex flex-col bg-muted shadow-sm rounded-lg transition-colors w-full",
                isDocumentReady
                  ? "hover:bg-muted/70 cursor-pointer"
                  : "cursor-not-allowed opacity-75"
              )}
              onClick={isDocumentReady ? handleDocumentClick : undefined}
            >
              <DocsContent isLoading={isLoading} />
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
