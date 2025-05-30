import { cn } from "@/lib/utils";
import {
  ArrowRightFromLine,
  ArrowRightToLineIcon,
  ChevronRight,
  PanelLeftIcon,
  PanelRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>
      {isCollapsed && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 mx-auto group relative"
                onClick={toggleSidebar}
              >
                <PanelLeftIcon className="h-5 w-5 text-foreground/70 group-hover:hidden" />
                <ArrowRightToLineIcon className="h-5 w-5 p-0.5 text-foreground/70 hidden group-hover:block absolute inset-0 m-auto" />
                <span className="sr-only">Expand sidebar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <SidebarFooter isCollapsed={isCollapsed} />
    </div>
  );
}
