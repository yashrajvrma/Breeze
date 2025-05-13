"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/lib/zustand/store";
import { Link2Icon } from "lucide-react";
import { useState } from "react";

export const LinkButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger
        asChild
        className="flex items-center align-middle font-sans h-8"
      >
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-sm">
          <Link2Icon className="w-4 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 bg-neutral-50 border border-neutral-300">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-neutral-900 bg-neutral-50 font-sans focus:outline-none outline-none focus:border-none outline-0"
        />
        <Button
          className="font-sans text-blue-600 hover:bg-neutral-200/80"
          onClick={() => onChange(value)}
        >
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
