// mainLayout.tsx
"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MainSidebarLayout from "../chat/MainSidebarLayout";
import { Editor } from "@/components/tiptap/Editor";
import ChatInterface from "../chat/ChatInterface";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebarStore } from "@/lib/store/sidebarStore";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );
  const setIsSidebarCollapsed = useSidebarStore(
    (state) => state.setIsSidebarCollapsed
  );

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans relative">
      {/* Sidebar - positioned differently for mobile vs desktop */}
      {isMobile ? (
        <>
          {/* Mobile overlay sidebar */}
          <div
            className={`fixed inset-0 z-50 ${
              isSidebarCollapsed ? "pointer-events-none" : ""
            }`}
          >
            {/* Backdrop */}
            {!isSidebarCollapsed && (
              <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={() => toggleSidebar()}
              />
            )}
            {/* Sidebar */}
            <div
              className={`absolute left-0 top-0 h-full transition-transform duration-300 ${
                isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <MainSidebarLayout />
            </div>
          </div>
          {/* Main content - full width on mobile */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatInterface />
          </div>
        </>
      ) : (
        <>
          {/* Desktop sidebar - normal flow */}
          <MainSidebarLayout />
          <div className="flex-1 overflow-hidden flex flex-col">
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={70} minSize={50}>
                <Editor />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={30} maxSize={40}>
                <ChatInterface />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </>
      )}
    </div>
  );
}
