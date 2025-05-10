// components/JsonViewer.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface JsonViewerProps {
  jsonData: object;
}

export function JsonViewer({ jsonData }: JsonViewerProps) {
  const formattedJson = JSON.stringify(jsonData, null, 2);

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<pre><code>${formattedJson}</code></pre>`,
    editable: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(`<pre><code>${formattedJson}</code></pre>`);
    }
  }, [jsonData, editor]);

  return <EditorContent editor={editor} className="p-4" />;
}
