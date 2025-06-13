// components/editor/EditorDrawer.tsx
"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Editor } from "@/components/tiptap/Editor";
import { useEditorContent, useEditorStore } from "@/lib/store/editorStore";
import { useEffect } from "react";

interface EditorDrawerProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
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
        <div className="flex-1 overflow-hidden">{content && <Editor />}</div>
      </DrawerContent>
    </Drawer>
  );
}
