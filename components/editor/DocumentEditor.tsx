// components/DocumentEditor.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Download } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  hideDocument,
  updateDocumentContent,
  updateDocumentTitle,
} from "@/lib/features/documentEditor/documentSlice";
import { TiptapEditor } from "../tiptap/TiptapEditor";
import { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import { extensions } from "../tiptap/extensions/extensions";

export default function DocumentEditor() {
  console.log("inside doc editor");

  const dispatch = useAppDispatch();
  const { isVisible, content, title } = useAppSelector(
    (state) => state.document
  );

  console.log("content is ", JSON.stringify(content));
  const [localTitle, setLocalTitle] = useState(title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    dispatch(updateDocumentTitle(newTitle));
  };

  const handleContentUpdate = (newContent: JSONContent) => {
    dispatch(updateDocumentContent(newContent));
  };

  if (!isVisible) {
    return null;
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
              // Convert content to HTML for download
              const htmlContent =
                typeof content === "string"
                  ? content
                  : generateHTML(content, extensions);
              const blob = new Blob([htmlContent], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${localTitle || "document"}.html`;
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
      <div className="flex-1 overflow-auto">
        <TiptapEditor
          content={
            typeof content === "string"
              ? JSON.parse(content) // convert string to JSONContent
              : content || {
                  type: "doc",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Start typing here..." }],
                    },
                  ],
                }
          }
          onUpdate={(newContent) => dispatch(updateDocumentContent(newContent))}
        />
      </div>
    </div>
  );
}
