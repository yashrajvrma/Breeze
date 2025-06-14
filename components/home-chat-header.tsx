"use client";

import { ArrowRightToLineIcon, PanelLeftIcon, Router } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

type HomechatHeaderProps = {
  title: string;
};
export default function HomechatHeader({ title }: HomechatHeaderProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSidebarStore();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-between sm:py-4 py-3 px-2 border-b">
        <div className="flex flex-row gap-x-2 w-full">
          <Skeleton className="flex items-center h-8 w-8" />
          <Skeleton className="flex items-center h-8 w-32" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-between sm:py-4 py-3 px-2 text-base font-semibold border-b bg-background font-sans">
      <div className="flex items-center align-middle gap-x-2.5">
        <div className="flex ">
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
                    size={20}
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
        </div>
        <div className="flex items-center align-middle font-instrumentSerif text-2xl font-semibold">
          {title}
        </div>
      </div>
      <div>
        {!session && (
          <button
            onClick={() => router.push("/signin")}
            className="font-sans px-2.5 py-1.5 bg-foreground text-background text-sm font-medium rounded-md"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
