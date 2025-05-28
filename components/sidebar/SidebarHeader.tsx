import { cn } from "@/lib/utils";
import { ArrowLeftFromLine, ChevronLeft } from "lucide-react";
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
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleSidebar}
          >
            {/* <ChevronLeft className="h-4 w-4" /> */}
            <ArrowLeftFromLine className="h-4 w-4" />
            <span className="sr-only">Collapse sidebar</span>
          </Button>
        )}
      </div>
    </div>
  );
}
