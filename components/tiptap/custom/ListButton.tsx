"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ListIcon,
  ListOrderedIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ListButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const alignments = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
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
                <ListIcon className="w-4 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>List</p>
              </TooltipContent>
            </Tooltip>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-sans">
          {alignments.map(({ label, isActive, onClick, icon: Icon }) => (
            <button
              key={label}
              onClick={onClick}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm w-full hover:bg-muted-foreground/20",
                isActive() && "bg-blue-100 text-blue-600 hover:bg-blue-100"
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
