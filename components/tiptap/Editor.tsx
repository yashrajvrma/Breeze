"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { Toolbar } from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";

import { useMargin } from "@/lib/store/marginStore";
import { useEditorContent, useEditorStore } from "@/lib/store/editorStore";
import { FontSizeExtension } from "@/extension/fontSize";
import { LineHeightExtension } from "@/extension/lineHeight";
import { Ruler } from "./Ruler";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import EditorHeader from "../editor/editorHeader";

export const Editor = () => {
  const setEditor = useEditorStore((state) => state.setEditor);
  const content = useEditorContent((state) => state.content);
  const leftMargin = useMargin((state) => state.leftMargin);
  const rightMargin = useMargin((state) => state.rightMargin);

  const editor = useEditor({
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px`,
        class:
          "focus:outline-none print:border-0 border border-neutral-700 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "start writing here...",
        emptyEditorClass: "is-editor-empty",
      }),
      Table.configure({
        resizable: true,
        handleWidth: 5,
        lastColumnResizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      Image.extend({
        name: "image-editor",
      }),
      ImageResize,
      Underline,
      TaskItem.configure({ nested: true }),
      TaskList,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        linkOnPaste: true,
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["https", "http"],
        shouldAutoLink: (url) => url.startsWith("https://"),
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
    ],
    onCreate({ editor }) {
      editor?.commands.setFontFamily("Verdana");
      setEditor(editor);
    },
    // onDestroy() {
    //   setEditor(null);
    // },
    autofocus: true,
    content: content,
  });

  // Sync editor content when store `content` changes
  useEffect(() => {
    if (editor && content) {
      const current = editor.getJSON();
      const isSameContent = JSON.stringify(current) === JSON.stringify(content);
      if (!isSameContent) {
        editor.commands.setContent(content);
        console.log("Editor content updated from store");
      }
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full bg-background print:bg-white overflow-hidden">
      <EditorHeader />
      <div className="flex-shrink-0 bg-background border-b z-10 flex justify-center pt-2 px-2">
        <Toolbar />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <ScrollArea className="h-full w-full px-4 py-4 print:p-0 print:overflow-visible">
          <div className="min-w-[816px] mx-auto">
            <div className="sticky top-0 bg-background z-10 flex justify-center">
              <Ruler />
            </div>
            <div className="flex justify-center pt-4 pb-20">
              <EditorContent
                className="text-accent-foreground bg-background"
                editor={editor}
              />
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
