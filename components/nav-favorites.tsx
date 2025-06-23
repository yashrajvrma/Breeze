"use client";

import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShareButton from "./button/share-button";
import UnFavouriteButton from "./button/unfavourite-button";
import { DeleteButton } from "./button/delete-button";
import { RenameChatButton } from "./button/rename-button";

type FavChats = {
  id: string;
  userId: string;
  title: string;
  favourite: boolean;
  updatedAt: string;
};

const favChatsFn = async () => {
  return axios.get("/api/v1/chat/favourite");
};

export function NavFavorites() {
  const { isMobile } = useSidebar();

  const params = useParams();

  const { data: session, status } = useSession();

  const chatId = params.chatId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["favChats"],
    queryFn: favChatsFn,
    enabled: !!session,
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col px-3 mb-1 mt-2">
        <div className="flex-shrink-0  text-muted-foreground leading-none hover:text-foreground font-sans text-xs">
          Favourites
        </div>
        <div className="flex flex-col py-2 font-sans text-center text-sm text-muted-foreground gap-y-2">
          <Skeleton className="flex items-center h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!session || data?.data.favourite.length === 0) {
    return (
      <div className="flex flex-col px-3 mb-1 mt-2">
        <div className="flex-shrink-0 text-muted-foreground leading-none hover:text-foreground text-xs font-sans">
          Favourites
        </div>
        <div className="border border-dashed text-center mt-3 px-4 py-2 text-xs text-muted-foreground rounded-lg font-sans">
          Favourites chats that you use often.
        </div>
      </div>
    );
  }

  return (
    <SidebarGroup className="flex group-data-[collapsible=icon]:hidden font-sans overflow-hidden">
      <SidebarGroupLabel className="font-sans shrink-0">
        Favourites
      </SidebarGroupLabel>

      <ScrollArea
        // style="scrollbar-width:none"
        className="[&>div>div[style]]:!block max-h-[250px] overflow-hidden hover:overflow-y-auto  scrollbar-thin"
      >
        <SidebarMenu>
          {data?.data.favourite.map((chat: FavChats) => {
            const isActive = chat.id === chatId;

            return (
              <SidebarMenuItem
                key={chat.id}
                className={cn(
                  "group relative flex justify-between items-center rounded-lg transition-all duration-200 cursor-pointer",
                  "hover:bg-accent/50",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <SidebarMenuButton asChild className="font-medium text-sm pr-8">
                  <Link href={`/chat/${chat.id}`}>
                    <span>{chat.title}</span>
                  </Link>
                </SidebarMenuButton>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal size={16} />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-44 rounded-2xl shadow-xl px-1.5 py-1.5 backdrop-blur-sm font-sans"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                    sideOffset={1}
                  >
                    <div className="space-y-0.5">
                      <ShareButton />
                      <RenameChatButton id={chat.id} title={chat.title} />
                      <UnFavouriteButton chatId={chat.id} />
                      <DeleteButton chatId={chat.id} />
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </ScrollArea>
    </SidebarGroup>
  );
}
