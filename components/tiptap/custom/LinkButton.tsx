"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/lib/store/editorStore";
import { Link2Icon } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        className="flex items-center h-8 font-sans align-middle text-muted-foreground"
      >
        <button className="flex flex-col justify-center items-center hover:text-foreground px-1.5 py-1 rounded-sm min-w-7 h-7 overflow-hidden text-sm shrink-0">
          <Tooltip>
            <TooltipTrigger>
              <Link2Icon className="w-4 h-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert link</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center gap-x-2 p-2.5 bg-neutral-900 border border-neutral-700 text-muted-foreground">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-neutral-900 focus:border-none outline-0 outline-none focus:outline-none font-sans text-foreground"
        />
        <Button
          variant="secondary"
          className="hover:bg-foreground font-sans text-blue-600 cursor-pointer"
          onClick={() => onChange(value)}
        >
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
