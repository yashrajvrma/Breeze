"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  maxHeight?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxHeight = 250, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current!);

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = "auto";

        // Calculate new height
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;

        // Set overflow based on whether content exceeds maxHeight
        textarea.style.overflowY =
          textarea.scrollHeight > maxHeight ? "auto" : "hidden";
      }
    }, [maxHeight]);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      props.onInput?.(e);
    };

    return (
      <textarea
        ref={textareaRef}
        data-slot="textarea"
        className={cn(
          "border-input placeholder-neutral-500 flex min-h-[150px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none overflow-hidden",
          className
        )}
        onInput={handleInput}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
