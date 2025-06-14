import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Sidebar() {
  const isMobile = useIsMobile();
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );

  if (!isMobile) {
    return null;
  }

  return (
    <div
      className={cn(
        "h-full bg-background border-r border-border transition-all duration-300 flex flex-col overflow-hidden",

        isMobile
          ? isSidebarCollapsed
            ? "w-[0px]"
            : "w-[100vw]"
          : isSidebarCollapsed
          ? "w-[60px]"
          : "w-[250px]"
      )}
    >
      <SidebarHeader />
      <div className="flex-1 overflow-y-auto pt-1 scrollbar-thin">
        <SidebarNavigation />
      </div>
      <SidebarFooter />
    </div>
  );
}
