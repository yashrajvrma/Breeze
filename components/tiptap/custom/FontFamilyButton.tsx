"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import { ChevronDownIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FontFamilyButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex items-center h-8 font-sans align-middle text-muted-foreground"
      >
        <button className="flex justify-between hover:text-foreground rounded-sm w-[100px] h-7 overflow-hidden text-sm shrink-0 item-center">
          <Tooltip>
            <TooltipTrigger className="flex justify-between items-center w-[100px] shrink-0 px-2 py-3">
              <span className="truncate">
                {editor?.getAttributes("textStyle").fontFamily || "Arial"}
              </span>
              <ChevronDownIcon className="ml-1 w-5 h-5 shrink-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Font</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1 ">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex items-center text-sm gap-x-2 px-2 py-1 rounded-sm  hover:bg-muted-foreground/20",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-blue-100 text-blue-600 hover:bg-blue-100"
            )}
            style={{
              fontFamily: value,
            }}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
          >
            <span>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
