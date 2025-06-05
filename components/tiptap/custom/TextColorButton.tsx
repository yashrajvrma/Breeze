"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { CirclePicker, CompactPicker, type ColorResult } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TextColorButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const value = editor?.getAttributes("textStyle").color || "#ffffff";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex items-center h-8 font-sans align-middle text-muted-foreground"
      >
        <button className="flex flex-col justify-center items-center  hover:text-foreground px-1.5 py-1 rounded-sm min-w-7 h-7 overflow-hidden text-sm shrink-0">
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <span className="text-sm">A</span>
              <div className=" w-5 h-0.5" style={{ backgroundColor: value }} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Text colour</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
