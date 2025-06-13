import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";
import { useSidebarStore } from "@/lib/store/sidebarStore";

export default function Sidebar() {
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );
  return (
    <div
      className={cn(
        "h-full bg-background border-r border-border transition-all duration-300 flex flex-col overflow-hidden",
        isSidebarCollapsed ? "w-[60px]" : "w-[250px]"
      )}
    >
      <SidebarHeader />
      <div className="flex-1 overflow-y-auto pt-1  scrollbar-thin">
        <SidebarNavigation />
      </div>
      <SidebarFooter />
    </div>
  );
}
