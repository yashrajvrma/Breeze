"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/zustand/store";
import {
  AlignJustifyIcon,
  BoldIcon,
  ChevronDown,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
        "text-sm h-8 min-w-8 w-8 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-blue-200"
      )}
    >
      <Icon className="w-8 h-8 m-2" />
    </button>
  );
};

const FontFamilyButton = () => {
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
      <DropdownMenuTrigger asChild className="flex items-center align-middle">
        <button className="h-7 w-[120px] shrink-0 flex item-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-1 w-5 h-5 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
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
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const currentCheck = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            currentCheck === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-neutral-200/30 px-2.5 py-2 rounded-md min-h-[40px] flex items-center gap-x-1 mb-2 max-w-full">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Font family */}
      <FontFamilyButton />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Heading */}
      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Text Align */}

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Font size */}
      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Task list */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
