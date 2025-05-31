"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editor";
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
import { AlginButton } from "./custom/AlignButton";
import { ListButton } from "./custom/ListButton";
import { FontSizeButton } from "./custom/FontSizeButton";
import { LineHeightButton } from "./custom/LineHeightButton";

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
        "text-sm h-8 min-w-8 w-8 flex items-center justify-center text-muted-foreground rounded-sm hover:text-foreground",
        isActive && "bg-foreground text-background hover:text-background"
      )}
    >
      <Icon className="m-2 w-8 h-8" />
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
    <div className="flex flex-wrap items-center gap-x-1 gap-y-2 bg-neutral-900 mb-2 px-2.5 py-0 rounded-xl max-w-full min-h-[40px]">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      <FontFamilyButton />

      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      <HeadingLevelButton />

      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="bg-neutral-700 h-6" />

      <TextColorButton />
      <HighlightColorButton />

      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {/* TODO : Link */}
      <LinkButton />
      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {/* TODO : Image */}
      <ImageButton />
      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {/* TODO : Text Align */}
      <AlginButton />
      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {/* TODO : List  */}
      <ListButton />

      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {/* TODO : Font size */}
      <FontSizeButton />

      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {/* task list */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="bg-neutral-700 h-6" />
      {/* line height  */}
      <LineHeightButton />
    </div>
  );
};
