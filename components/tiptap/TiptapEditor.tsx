// components/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Toolbar } from "./Toolbar";

interface TiptapEditorProps {
  content: JSONContent | string;
  onUpdate: (content: JSONContent) => void;
}

export function TiptapEditor({ content, onUpdate }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "System Design" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "System design is a crucial phase in the development of any software application or system. It involves designing the architecture, components, modules, interfaces, and data for a system to meet specified requirements. A well-thought-out system design ensures scalability, reliability, and efficiency.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Key Components of System Design" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "1. Requirements Analysis" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "2. Architecture Design" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "3. Data Design" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "4. Interface Design" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "Detailed Breakdown of Key Components" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "1. Requirements Analysis: This phase involves gathering, analyzing, and documenting the requirements of the system to understand user needs and constraints.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "2. Architecture Design: The architecture design defines the structure of the system, including components, modules, and their interactions to ensure system scalability and performance.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "3. Data Design: Data design focuses on organizing and structuring data within the system, including databases, data models, and storage mechanisms.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "4. Interface Design: Interface design deals with designing user interfaces that are intuitive, user-friendly, and meet user expectations for usability.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "System Architecture Diagram" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Insert system architecture diagram here." },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "Comparison of System Design Approaches" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Different system design approaches, such as monolithic architecture, microservices, and serverless architecture, offer unique advantages and challenges. Understanding these approaches helps in selecting the most suitable design for a given system.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "Examples of System Design in Tech Giants" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tech giants like Netflix and Google have implemented robust system design principles in their platforms. Netflix's microservices architecture enables scalability and fault tolerance, while Google's distributed systems handle massive data processing efficiently.",
            },
          ],
        },
      ],
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (typeof content === "string") {
      editor.commands.setContent(content);
    } else if (content?.type === "doc") {
      editor.commands.setContent(content);
    }
  }, [content]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex-1 p-4 overflow-auto font-sans text-sm focus:outline-none"
      />
    </div>
  );
}
