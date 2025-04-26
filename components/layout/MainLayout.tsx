"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ResizablePanels from "@/components/ui/ResizablePanels";
import ChatInterface from "@/components/chat/ChatInterface";
import DocumentEditor from "@/components/editor/DocumentEditor";

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-hidden">
        <ResizablePanels>
          <ChatInterface />
          <DocumentEditor />
        </ResizablePanels>
      </div>
    </div>
  );
}
