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

export const Editor = () => {
  const setEditor = useEditorStore((state) => state.setEditor);
  const content = useEditorContent((state) => state.content);

  const leftMargin = useMargin((state) => state.leftMargin);
  const rightMargin = useMargin((state) => state.rightMargin);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: `padding-left : ${leftMargin}px; padding-right: ${rightMargin}px`,
        class:
          "focus:outline-none print:border-0 bg-white border-2 border-neutral-200 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
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
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
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
    onBlur({ editor }) {
      setEditor(editor);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },

    content: content,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white print:bg-white print:p-1 px-4 size-full print:overflow-visible overflow-x-auto">
      <Toolbar />
      <Ruler />
      <div className="flex flex-col justify-center mx-auto print:p-0 py-4 print-w-full w-[816px] min-w-max print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
