"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatInterface from "@/components/chat/ChatInterface";
import HomeChatLayout from "../chat/HomeChatLayout";

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-hidden">
        <HomeChatLayout />
      </div>
    </div>
  );
}
