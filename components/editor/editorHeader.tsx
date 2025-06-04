"use client";

import { ShareIcon } from "lucide-react";
import { useEditorStore } from "@/lib/store/editor";
import { exportToPdf } from "@/extension/exportToPdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMargin } from "@/lib/store/margin";
import { useExportDocx } from "@/extension/exportToDocx";
import SaveButton from "../button/saveButton";

interface EditorHeaderProps {
  title?: string;
}

export default function EditorHeader({
  title = "Rust Programming",
}: EditorHeaderProps) {
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

  const handleSave = () => {
    console.log("updated editor content is", editor?.getJSON());
  };

  return (
    <div className="flex flex-row justify-between items-center px-5 py-2.5 border-b">
      <div className="text-lg font-medium">{title}</div>

      <div className="flex justify-between gap-x-2.5">
        <SaveButton />
        {/* <button
          onClick={() => handleSave()}
          className="flex justify-center items-center text-sm px-2.5 py-2 text-foreground rounded-lg bg-primary-foreground hover:bg-muted-foreground/20"
        >
          Save
        </button> */}

        <DropdownMenu>
          {isEditorEmpty ? (
            <button
              className="flex justify-center items-center text-sm gap-x-1.5 rounded-lg px-2.5 py-2 bg-muted-foreground/50 text-primary cursor-not-allowed"
              disabled
            >
              <ShareIcon size={16} />
              Export
            </button>
          ) : (
            <DropdownMenuTrigger asChild>
              <button className="flex justify-center items-center text-sm gap-x-1.5 rounded-lg px-2.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-foreground cursor-default">
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
