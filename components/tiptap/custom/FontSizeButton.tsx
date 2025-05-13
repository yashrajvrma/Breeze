"use client";

import { useEditorStore } from "@/lib/zustand/store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

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
          className="text-sm h-8 w-8 shrink-0 flex items-center justify-center roudned-sm hover:bg-neutral-200/80"
          onClick={decrement}
        >
          <MinusIcon className="w-8 h-8 m-2" />
        </button>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
          />
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              //   updateFontSize(currentFontSize);
            }}
            className="text-sm h-8 w-10 text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
          >
            {currentFontSize}
          </button>
        )}
        <button
          className="text-sm h-8 w-8 shrink-0 flex items-center justify-center roudned-sm hover:bg-neutral-200/80"
          onClick={increment}
        >
          <PlusIcon className="w-8 h-8 m-2" />
        </button>
      </div>
    </>
  );
};
