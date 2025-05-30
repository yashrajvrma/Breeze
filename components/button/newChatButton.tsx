"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
          : "rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground"
      )}
      onClick={() => router.push("/")}
    >
      {isCollapsed ? (
        // <div className="h-7 w-7 flex items-center justify-center rounded-md bg-muted-foreground text-foreground hover:bg-">
        //   <Plus className="h-5 w-5" strokeWidth={2} />
        // </div>
        <Button className="h-7 w-7 px-0" variant="outline">
          <Plus className="w-5 h-5" strokeWidth={2} />
        </Button>
      ) : (
        <Button className="w-full text-foreground" variant="outline">
          New Chat
        </Button>
      )}
    </div>
  );
}
