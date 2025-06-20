"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RateLimit from "./sidebar/RateLimit";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const router = useRouter;
  return (
    <SidebarMenu className="font-sans">
      {/* {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))} */}
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
