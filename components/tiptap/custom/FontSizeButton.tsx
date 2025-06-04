"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FontSizeButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-0.5">
        <button
          className="flex justify-center items-center w-8 h-8 text-sm shrink-0 roudned-sm text-muted-foreground hover:text-foreground"
          onClick={decrement}
        >
          <Tooltip>
            <TooltipTrigger className="flex justify-center items-center w-8 h-8 text-sm shrink-0 roudned-sm text-muted-foreground hover:text-foreground">
              <MinusIcon className="m-2 w-8 h-8" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Decrease font size</p>
            </TooltipContent>
          </Tooltip>
        </button>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent border border-neutral-700 text-muted-foreground rounded-sm focus:outline-none focus:ring-0 w-10 h-7 text-sm text-center"
          />
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              //   updateFontSize(currentFontSize);
            }}
            className="bg-transparent border border-neutral-700 text-muted-foreground rounded-sm w-10 h-8 text-sm text-center cursor-text"
          >
            {currentFontSize}
          </button>
        )}
        <button
          className="flex justify-center items-center text-muted-foreground hover:text-foreground w-8 h-8 text-sm shrink-0 roudned-sm"
          onClick={increment}
        >
          <Tooltip>
            <TooltipTrigger className="flex justify-center items-center text-muted-foreground hover:text-foreground w-8 h-8 text-sm shrink-0 roudned-sm">
              <PlusIcon className="m-2 w-8 h-8" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Increase font size</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </div>
    </>
  );
};
