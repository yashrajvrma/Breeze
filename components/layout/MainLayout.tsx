// components/chat/MainLayout.tsx
"use client"; // This component needs to be a client component to use hooks like useIsMobile

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MainSidebarLayout from "../chat/MainSidebarLayout";
import { Editor } from "@/components/tiptap/Editor"; // Original Editor component
import ChatInterface from "../chat/ChatInterface"; // Assuming this is the correct path
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming this hook is available from shadcn/ui sidebar [^5]

export default function MainLayout() {
  const isMobile = useIsMobile(); // Determine if on mobile

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <MainSidebarLayout />
      <div className="flex-1 overflow-hidden flex flex-col">
        {" "}
        {/* Added flex-col for mobile layout */}
        {isMobile ? (
          <>
            {/* On mobile, ChatInterface takes full width, Editor is in a drawer controlled by ChatInterface */}
            <div className="flex-1">
              {" "}
              {/* ChatInterface takes remaining height */}
              <ChatInterface />
            </div>
          </>
        ) : (
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {" "}
            {/* Resizable takes full height */}
            <ResizablePanel defaultSize={70} minSize={50}>
              <Editor />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={30} maxSize={40}>
              <ChatInterface />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}
