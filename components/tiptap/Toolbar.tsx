"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/zustand/store";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  PenIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { FontFamilyButton } from "./custom/FontFamilyButton";
import { HeadingLevelButton } from "./custom/HeadingLevelButton";
import { SketchPicker, CirclePicker } from "react-color";
import { TextColorButton } from "./custom/TextColorButton";
import { HighlightColorButton } from "./custom/HighlightColorButton";
import { LinkButton } from "./custom/LinkButton";
import { ImageButton } from "./custom/ImageButton";

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
    [
      {
        label: "Highlight",
        icon: PenIcon,
        onClick: () => editor?.chain().focus().toggleHighlight().run(),
        isActive: editor?.isActive("highlight"),
      },
    ],
  ];

  return (
    <div className="bg-neutral-200/30 px-2.5 py-2 rounded-md min-h-[40px] flex items-center gap-x-1 mb-2 max-w-full">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      <FontFamilyButton />

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      <HeadingLevelButton />

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />

      <TextColorButton />
      <HighlightColorButton />

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Link */}
      <LinkButton />
      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Image */}
      <ImageButton />
      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Text Align */}

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* TODO : Font size */}

      <Separator orientation="vertical" className="bg-neutral-300 h-10" />
      {/* task list */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
