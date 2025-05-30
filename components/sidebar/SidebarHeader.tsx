import { cn } from "@/lib/utils";
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
import logo from "../../public/assets/images/aero-icon.png";
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
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo1} alt="logo" width={24} height={24} />
          </Link>
          {!isCollapsed && (
            <span className="ml-2 font-semibold text-lg text-foreground ">
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
                  className="h-6 w-6 group relative"
                  onClick={toggleSidebar}
                >
                  {/* Default icon */}
                  <PanelRightIcon className="h-5 w-5 text-foreground/70 group-hover:hidden" />

                  {/* Icon shown on hover */}
                  <ArrowLeftToLineIcon className="h-5 w-5 p-0.5 text-foreground/70 hidden group-hover:block absolute inset-0 m-auto" />

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
    </div>
  );
}
