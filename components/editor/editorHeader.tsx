"use client";

import {
  ShareIcon,
  MoreHorizontal,
  EllipsisVerticalIcon,
  EllipsisIcon,
} from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile"; // your ShadCN hook

export default function EditorHeader() {
  const title = useEditorContent((state) => state.title);
  const editor = useEditorStore((state) => state.editor);
  const leftMargin = useMargin((state) => state.leftMargin);
  const rightMargin = useMargin((state) => state.rightMargin);
  const exportDocxMutation = useExportDocx();
  const isMobile = useIsMobile();

  const isEditorEmpty = !editor || editor.getText().trim().length === 0;

  const handleExportToWord = async () => {
    if (!editor) return console.error("Editor instance not available");
    const htmlContent = editor.getHTML();
    exportDocxMutation.mutate({ htmlContent, leftMargin, rightMargin });
  };

  const handleExportToPdf = async () => {
    if (!editor) return console.error("Editor instance not available");
    const htmlContent = editor.getHTML();
    await exportToPdf({ htmlContent, leftMargin, rightMargin });
  };

  return (
    <div className="flex flex-row justify-between items-center sm:px-5 px-3 sm:py-2.5 py-4 border-b border-t-2 border-t-background">
      <div className="sm:text-base text-sm font-medium w-[70%]">
        {title || "Untitled Doc"}
      </div>

      <div className="flex items-center gap-x-2.5">
        {/* Always show Save Button */}
        <SaveButton />

        {/* Export - changes based on screen size */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isEditorEmpty ? (
              <button
                className="flex justify-center items-center text-sm gap-x-1.5 rounded-lg px-2.5 sm:py-1.5 py-1 cursor-not-allowed border text-foreground"
                disabled
              >
                {isMobile ? (
                  // <MoreHorizontal size={18} />
                  <EllipsisVerticalIcon size={18} />
                ) : (
                  <>
                    <ShareIcon size={16} />
                    Export
                  </>
                )}
              </button>
            ) : (
              <button
                className={`flex justify-center items-center text-sm gap-x-1.5 rounded-lg sm:py-1.5 py-1 border ${
                  isMobile
                    ? "text-foreground rounded-lg border hover:bg-accent px-1.5"
                    : "bg-blue-500 hover:bg-blue-600 text-background px-2.5"
                }`}
              >
                {isMobile ? (
                  // <MoreHorizontal size={18} />
                  <EllipsisVerticalIcon size={18} />
                ) : (
                  <>
                    <ShareIcon size={16} />
                    Export
                  </>
                )}
              </button>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48" side="bottom" align="end">
            <DropdownMenuItem onClick={handleExportToWord}>
              Microsoft Word (.docx)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportToPdf}>
              PDF document (.pdf)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
