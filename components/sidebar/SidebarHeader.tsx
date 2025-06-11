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
import logo from "../../public/assets/images/breeze-logo.png";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function SidebarHeader({
  isCollapsed,
  toggleSidebar,
}: SidebarHeaderProps) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex items-center justify-between py-2.5 px-3.5 border-b",
          isCollapsed && "py-3.5"
        )}
      >
        <div className="flex justify-center items-center align-middle">
          <div className="flex justify-center bg-stone-50 rounded-lg w-7 h-7">
            <Link className="flex items-center align-middle" href="/">
              <Image src={logo} alt="logo" width={22} height={22} />
            </Link>
          </div>

          {!isCollapsed && (
            <span className="ml-1.5 text-3xl font-instrumentSerif font-semibold tracking-tight text-foreground">
              Breeze
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
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 mx-auto group relative my-4 border-0"
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
