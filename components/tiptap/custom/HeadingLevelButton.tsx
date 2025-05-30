"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editor";
import { Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";

export const HeadingLevelButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "28px" },
    { label: "Heading 3", value: 3, fontSize: "24px" },
    { label: "Heading 4", value: 4, fontSize: "20px" },
    { label: "Heading 5", value: 5, fontSize: "18px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex items-center h-8 font-sans align-middle text-muted-foreground"
      >
        <button className="flex justify-center items-center hover:text-foreground px-2 py-3 rounded-sm min-w-7 h-7 overflow-hidden text-sm shrink-0">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-1 w-5 h-5 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 bg-neutral-900 p-1 border border-neutral-700 text-muted-foreground">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{
              fontSize,
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-background hover:text-foreground",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-foreground text-background hover:bg-foreground hover:text-background")
            )}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            <span>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
