import { ArrowRightToLineIcon, PanelLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useSidebarStore } from "@/lib/store/sidebarStore";

type ChatTitleProps = {
  title: string;
  isMobile: boolean;
};
export default function ChatTitle({ title, isMobile }: ChatTitleProps) {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSidebarStore();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <div className="flex justify-start gap-x-2.5 sm:py-4 py-3 px-2 text-base font-semibold border-b bg-background font-sans">
      <div className="flex items-center align-middle">
        {isMobile && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-5 w-5 mx-auto group relative border-0"
                  onClick={() => toggleSidebar()}
                >
                  <PanelLeftIcon
                    size={18}
                    className="text-foreground/70 group-hover:hidden"
                  />
                  <ArrowRightToLineIcon
                    size={18}
                    className="text-foreground/70 hidden group-hover:block absolute inset-0 m-auto"
                  />
                  <span className="sr-only">Expand sidebar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center align-middle font-medium text-base">
        {title}
      </div>
    </div>
  );
}
