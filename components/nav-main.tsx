"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import RateLimit from "./sidebar/RateLimit";

export function NavMain() {
  return (
    <SidebarMenu className="font-sans">
      <SidebarMenuItem>
        <Link href="/chat">
          <SidebarMenuButton className="flex justify-center border">
            New Chat
          </SidebarMenuButton>
        </Link>
        <RateLimit />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
