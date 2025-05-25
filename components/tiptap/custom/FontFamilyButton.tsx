"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editor";
import { ChevronDownIcon } from "lucide-react";

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
        className="flex items-center h-8 font-sans align-middle"
      >
        <button className="flex justify-between hover:bg-neutral-200/80 px-2 py-3 rounded-sm w-[100px] h-7 overflow-hidden text-sm shrink-0 item-center">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-1 w-5 h-5 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 bg-neutral-50 p-1 border border-neutral-300 text-neutral-900">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex items-center text-sm gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === "value" &&
                "bg-neutral-200/80"
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
