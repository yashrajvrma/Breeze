"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import { ListCollapseIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const LineHeightButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex items-center h-8 font-sans align-middle text-muted-foreground"
        >
          <button className="flex flex-col justify-center items-center hover:text-foreground px-1.5 py-1 rounded-sm min-w-7 h-7 overflow-hidden text-sm cursor-pointer shrink-0">
            <Tooltip>
              <TooltipTrigger>
                <ListCollapseIcon className="w-4 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Line & paragraph spacing</p>
              </TooltipContent>
            </Tooltip>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {lineHeights.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setLineHeight(value).run()}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-muted-foreground/20 w-full",
                editor?.getAttributes("paragraph").lineHeight === value &&
                  "bg-blue-100 text-blue-600 hover:bg-blue-100"
              )}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
