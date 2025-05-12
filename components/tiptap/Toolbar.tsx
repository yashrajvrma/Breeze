"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/zustand/store";
import { LucideIcon, Undo2Icon } from "lucide-react";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-9 min-w-9 w-9 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-blue-200"
      )}
    >
      <Icon className="w-9 h-9 m-2" />
    </button>
  );
};

export const Toolbar = () => {
  const editor = useEditorStore((state) => state.editor);
  console.log("Editor :", editor);

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
    ],
  ];

  return (
    <div className="bg-neutral-200/30 px-2.5 py-2 rounded-md min-h-[40px] flex items-center gap-x-1 mb-2">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
