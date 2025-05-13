"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/zustand/store";
import { AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export const AlginButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "center",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex items-center align-middle font-sans h-8"
        >
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-sm cursor-pointer">
            <AlignLeftIcon className="w-4 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-sans bg-neutral-50 text-neutral-900 border-neutral-300">
          {alignments.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 w-full",
                editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
