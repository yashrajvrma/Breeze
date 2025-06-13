// components/editor/EditorDrawer.tsx
"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Editor } from "@/components/tiptap/Editor"; // Assuming tiptap Editor is here
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEditorContent, useEditorStore } from "@/lib/store/editorStore";
import { useEffect } from "react";

interface EditorDrawerProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void; // Make optional
}

export function EditorDrawer({ isOpen, onOpenChange }: EditorDrawerProps) {
  const content = useEditorContent((state) => state.content);
  const closeDrawer = useEditorStore((state) => state.closeDrawer); // Add this line

  // Update the close handler
  const handleClose = () => {
    closeDrawer(); // Use Zustand action
    onOpenChange?.(false); // Still call prop if provided for compatibility
  };

  useEffect(() => {
    if (!content && isOpen) {
      handleClose(); // Use the new close handler
    }
  }, [content, isOpen]);

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="h-[95vh] flex flex-col font-sans rounded-xl">
        {/* <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Document Editor</DrawerTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose} // Use handleClose instead of onOppenChange
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close editor</span>
          </Button>
        </DrawerHeader> */}
        <div className="flex-1 overflow-hidden">{content && <Editor />}</div>
      </DrawerContent>
    </Drawer>
  );
}
