"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

export const Editor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: "padding-left : 56px; padding-right:56px",
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
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="size-full overflow-x-auto bg-white px-4 print:p-1 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:p-0 mx-auto print-w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
