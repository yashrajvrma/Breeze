"use client";

import { ShareIcon } from "lucide-react";
import { useEditorContent, useEditorStore } from "@/lib/store/editorStore";
import { exportToPdf } from "@/extension/exportToPdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMargin } from "@/lib/store/marginStore";
import { useExportDocx } from "@/extension/exportToDocx";
import SaveButton from "../button/saveButton";

export default function EditorHeader() {
  const title = useEditorContent((state) => state.title);
  const editor = useEditorStore((state) => state.editor);
  const leftMargin = useMargin((state) => state.leftMargin);
  const rightMargin = useMargin((state) => state.rightMargin);

  const exportDocxMutation = useExportDocx();

  const isEditorEmpty = !editor || editor.getText().trim().length === 0;

  const handleExportToWord = async () => {
    if (!editor) {
      console.error("Editor instance not available");
      return;
    }

    const htmlContent = editor.getHTML();
    exportDocxMutation.mutate({ htmlContent, leftMargin, rightMargin });
  };

  const handleExportToPdf = async () => {
    if (!editor) {
      console.error("Editor instance not available");
      return;
    }
    const htmlContent = editor?.getHTML();

    await exportToPdf({ htmlContent, leftMargin, rightMargin });
  };

  return (
    <div className="flex flex-row justify-between items-center px-5 py-2.5 border-b">
      <div className="text-base font-medium">
        {title ? title : "Untitled Doc"}
      </div>

      <div className="flex justify-between gap-x-2.5">
        <SaveButton />

        <DropdownMenu>
          {isEditorEmpty ? (
            <button
              className="flex justify-center items-center text-sm gap-x-1.5 rounded-lg px-2.5 py-2 text-primary cursor-not-allowed border"
              disabled
            >
              <ShareIcon size={16} />
              Export
            </button>
          ) : (
            <DropdownMenuTrigger asChild>
              <button className="flex justify-center items-center text-sm gap-x-1.5 rounded-lg px-2.5 py-2 bg-blue-500 hover:bg-blue-600 text-neutral-50 cursor-default">
                <ShareIcon size={16} />
                Export
              </button>
            </DropdownMenuTrigger>
          )}

          <DropdownMenuContent className="w-48" side="bottom" align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleExportToWord}
            >
              Microsoft Word (.docx)
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleExportToPdf}
            >
              PDF document (.pdf)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
