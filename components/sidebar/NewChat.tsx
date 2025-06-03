"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}
export default function NewChat({ isCollapsed }: SidebarNavigationProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "mb-2 cursor-pointer text-sm w-full",
        isCollapsed
          ? "flex justify-center"
          : "p-2 rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground"
      )}
      onClick={() => router.push("/")}
    >
      {isCollapsed ? (
        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
          <Plus className="h-4 w-4" />
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
            <Plus className="h-4 w-4" />
          </div>
          <span className="font-semibold">New chat</span>
        </div>
      )}
    </div>
  );
}
