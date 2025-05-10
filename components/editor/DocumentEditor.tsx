"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  hideDocument,
  updateDocumentContent,
  updateDocumentTitle,
} from "@/lib/features/documentEditor/documentSlice";

export default function DocumentEditor() {
  const dispatch = useAppDispatch();
  const { isVisible, content, title } = useAppSelector(
    (state) => state.document
  );
  const [localContent, setLocalContent] = useState(content || "");
  const [localTitle, setLocalTitle] = useState(title);

  // Update local state when Redux state changes
  useEffect(() => {
    if (content !== null) {
      setLocalContent(content);
    }
    setLocalTitle(title);
  }, [content, title]);

  // Save changes to Redux store
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    dispatch(updateDocumentContent(newContent));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    dispatch(updateDocumentTitle(newTitle));
  };

  if (!isVisible) {
    return null; // Don't render anything if document should be hidden
  }

  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <Input
          value={localTitle}
          onChange={handleTitleChange}
          className="max-w-md border-none focus-visible:ring-0 px-0 h-8 font-medium"
          placeholder="Untitled Document"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              // Download document
              const blob = new Blob([localContent], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${localTitle || "document"}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            title="Download Document"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => dispatch(hideDocument())}
            title="Close Document"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={localContent}
          onChange={handleContentChange}
          className={cn(
            "w-full h-full p-4 resize-none border rounded-md focus:outline-none focus:ring-1 focus:ring-primary",
            "font-mono text-sm bg-background"
          )}
          placeholder="Document content appears here..."
        />
      </div>
    </div>
  );
}
