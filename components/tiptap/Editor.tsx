"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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

import { useMargin } from "@/lib/store/margin";
import { useEditorContent, useEditorStore } from "@/lib/store/editor";
import { FontSizeExtension } from "@/extension/fontSize";
import { LineHeightExtension } from "@/extension/lineHeight";
import { Ruler } from "./Ruler";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // ✅ import scroll area

export const Editor = () => {
  const setEditor = useEditorStore((state) => state.setEditor);
  const content = useEditorContent((state) => state.content);
  const leftMargin = useMargin((state) => state.leftMargin);
  const rightMargin = useMargin((state) => state.rightMargin);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px`,
        class:
          "focus:outline-none print:border-0 bg-black border border-neutral-700 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
        handleWidth: 5,
        lastColumnResizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      Image,
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
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    content,
  });

  if (!editor) return null;

  // return (
  //   <div className="flex flex-col items h-full bg-foreground print:bg-white overflow-hidden">
  //     {/* Toolbar */}
  //     <div className="flex-shrink-0 bg-white border-b z-10">
  //       <Toolbar />
  //     </div>

  //     {/* Scrollable Area with ScrollArea from ShadCN */}
  //     <div className="flex-1 min-h-0 overflow-y-auto">
  //       <ScrollArea className="h-full w-full px-4 py-4 print:p-0 print:overflow-visible">
  //         <div className="w-fit min-w-[816px]">
  //           {/* Ruler */}
  //           <div className="sticky top-0 bg-white z-10">
  //             <Ruler />
  //           </div>

  //           {/* Editor */}
  //           <div className="flex justify-center pt-4 pb-10">
  //             <EditorContent editor={editor} />
  //           </div>
  //         </div>
  //         <ScrollBar orientation="horizontal" />
  //       </ScrollArea>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col h-full bg-background print:bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex-shrink-0 bg-background border-b border-neutral-700 z-10 flex justify-center">
        <Toolbar />
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ScrollArea className="h-full w-full px-4 py-4 print:p-0 print:overflow-visible">
          <div className="min-w-[816px] mx-auto">
            {" "}
            {/* ✅ Center everything here */}
            {/* Ruler */}
            <div className="sticky top-0 bg-background z-10 flex justify-center">
              <Ruler />
            </div>
            {/* Editor content */}
            <div className="flex justify-center pt-4 pb-20">
              <EditorContent editor={editor} />
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
