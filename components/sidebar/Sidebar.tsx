import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={cn(
        "h-full bg-card border-r border-border transition-all duration-300 flex flex-col overflow-hidden",
        isCollapsed ? "w-[60px]" : "w-[250px]"
      )}
    >
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-y-auto pt-1  scrollbar-thin">
        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>

      <SidebarFooter isCollapsed={isCollapsed} />
    </div>
  );
}
