"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ResizablePanels from "@/components/ui/ResizablePanels";
import ChatInterface from "@/components/chat/ChatInterface";
import DocumentEditor from "@/components/editor/DocumentEditor";

export default function ClientLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on component mount - this ensures we're in the browser
  useEffect(() => {
    // Using a small timeout helps ensure the browser has completed its initial rendering
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // During server-side rendering or initial client render,
  // show a placeholder to prevent layout shift
  if (!isClient) {
    return (
      <div className="flex h-screen bg-background overflow-hidden font-sans">
        {/* Simple placeholder with similar structure to prevent layout shift */}
        <div className="w-[240px] border-r border-border"></div>
        <div className="flex-1">
          <div className="flex h-full">
            <div className="w-[40%] border-r border-border"></div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-hidden">
        <ResizablePanels defaultSize={40}>
          <ChatInterface />
          <DocumentEditor />
        </ResizablePanels>
      </div>
    </div>
  );
}
