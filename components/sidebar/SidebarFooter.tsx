"use client";

import { useSession } from "next-auth/react";
import LoginButton from "../button/loginButton";
import { Skeleton } from "../ui/skeleton";
import { SettingsDialog } from "../settings-dialog";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export default function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center px-3 py-2">
        <Skeleton className="flex items-center h-16 w-full" />
      </div>
    );
  }
  if (!session) {
    return <div className="px-3 py-3">{!isCollapsed && <LoginButton />}</div>;
  }

  return <SettingsDialog isCollapsed={isCollapsed} />;
}
