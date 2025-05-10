"use client";

import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";

export default function HomeSidebarLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
  );
}
