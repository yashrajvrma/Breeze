"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editor";
import { ListCollapseIcon } from "lucide-react";

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
            <ListCollapseIcon className="w-4 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-900 border border-neutral-700 text-muted-foreground">
          {lineHeights.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setLineHeight(value).run()}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-background hover:text-foreground w-full",
                editor?.getAttributes("paragraph").lineHeight === value &&
                  "bg-foreground text-background hover:bg-foreground hover:text-background"
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
