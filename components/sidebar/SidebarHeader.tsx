import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo1 from "../../public/assets/images/breeze.png";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function SidebarHeader({
  isCollapsed,
  toggleSidebar,
}: SidebarHeaderProps) {
  return (
    <div className="flex flex-col border-b">
      <div className="flex items-center justify-between my-3.5 px-4">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo1} alt="logo" width={24} height={24} />
          </Link>
          {!isCollapsed && (
            <span className="ml-2 font-semibold text-lg text-foreground ">
              breeze
            </span>
          )}
        </div>
        {!isCollapsed && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 group relative"
                  onClick={toggleSidebar}
                >
                  {/* Default icon */}
                  <PanelRightIcon
                    size={18}
                    className="text-foreground/70 group-hover:hidden"
                  />

                  {/* Icon shown on hover */}
                  <ArrowLeftToLineIcon
                    size={18}
                    className="text-foreground/70 hidden group-hover:block absolute inset-0 m-auto"
                  />

                  <span className="sr-only">Collapse sidebar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Collapse sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center">
        {isCollapsed && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 mx-auto group relative my-1"
                  onClick={toggleSidebar}
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
    </div>
  );
}
