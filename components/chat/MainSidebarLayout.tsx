"use client";

import Sidebar from "../sidebar/Sidebar";
import { useSidebarStore } from "@/lib/store/sidebarStore";

export default function MainSidebarLayout() {
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );
  // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarCollapsed(!isSidebarCollapsed);
  // };

  return (
    // <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
    <Sidebar />
  );
}
