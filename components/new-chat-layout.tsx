"use client";

import ChatInterface from "@/components/chat/ChatInterface";
import { Editor } from "@/components/tiptap/Editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function NewChatLayout() {
  const { isMobile } = useSidebar();

  return (
    <>
      {isMobile ? (
        <div className={cn("h-full w-full", isMobile ? "p-0" : "p-2")}>
          <ChatInterface />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={70} minSize={50}>
            <div className="h-full p-2">
              <Editor />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={30} maxSize={40}>
            <div className="h-full p-2 pl-0">
              <ChatInterface />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </>
  );
}
