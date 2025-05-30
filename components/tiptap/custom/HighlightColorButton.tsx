"use client";

import { useEditorStore } from "@/lib/store/editor";
import {
  CirclePicker,
  CompactPicker,
  GithubPicker,
  SketchPicker,
  SwatchesPicker,
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
        className="flex items-center h-8 font-sans align-middle text-muted-foreground"
      >
        <button className="flex flex-col justify-center items-center hover:bg-background hover:text-foreground px-1.5 py-1 rounded-sm min-w-7 h-7 overflow-hidden text-sm shrink-0">
          <HighlighterIcon className="w-4 h-5" />
          <div className="w-5 h-0.5" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-20 bg-neutral-900 border border-neutral-700 text-muted-foreground">
        <SwatchesPicker
          className="bg-black text-white"
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
