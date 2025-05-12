"use client";

import { useEditorStore } from "@/lib/zustand/store";
import {
  CirclePicker,
  CompactPicker,
  SketchPicker,
  type ColorResult,
} from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HighlighterIcon } from "lucide-react";

export const HighlightColorButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex items-center align-middle font-sans h-8"
      >
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-sm">
          <HighlighterIcon className="w-4 h-5" />
          <div
            className="w-5 h-0.5 bg-red-500"
            style={{ backgroundColor: value }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-50 text-neutral-900 border border-neutral-300 p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
