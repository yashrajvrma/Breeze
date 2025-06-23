import {
  ArrowUpRight,
  Link2Icon,
  MoreHorizontal,
  StarOff,
  Trash2Icon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ShareButton from "@/components/button/share-button";
import { DeleteButton } from "@/components/button/delete-button";
import FavouriteButton from "@/components/button/favourite-button";
import { RenameChatButton } from "@/components/button/rename-button";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

interface Chat {
  id: string;
  title: string;
  updatedAt: string;
}

interface ChatResponse {
  success: boolean;
  page: number;
  size: number;
  totalChats: number;
  chats: Chat[];
}

const fetchRecentChats = async (
  context: QueryFunctionContext
): Promise<ChatResponse> => {
  const pageParam = (context.pageParam as number) || 1;

  const res = await axios.get(`/api/v1/chat?page=${pageParam}&size=10`);
  return res.data;
};

export function NavRecents() {
  const { isMobile } = useSidebar();

  const params = useParams();
  const { data: session, status } = useSession();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
    triggerOnce: false,
  });

  const chatId = params.chatId as string;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ChatResponse, Error>({
      queryKey: ["recentChats"],
      initialPageParam: 1,
      queryFn: fetchRecentChats,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.chats.length < lastPage.size) {
          return undefined;
        }

        const totalChatsLoaded = allPages.flatMap((p) => p.chats).length;

        if (totalChatsLoaded >= lastPage.totalChats) {
          console.log("No more pages - all chats loaded");
          return undefined;
        }
        const nextPage = lastPage.page + 1;
        return nextPage;
      },
      enabled: !!session,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading]);

  const chats = data?.pages.flatMap((page) => page.chats);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col px-3 py-1">
        <div className="flex-shrink-0 text-xs text-muted-foreground leading-none hover:text-foreground font-sans">
          Recents
        </div>
        <div className="flex flex-col py-2 font-sans text-center text-sm text-muted-foreground gap-y-2">
          <Skeleton className="flex items-center h-7 w-full" />
          <Skeleton className="flex items-center h-7 w-full" />
          <Skeleton className="flex items-center h-7 w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col px-3 py-1 font-sans">
        <div className="flex-shrink-0 text-sm text-muted-foreground leading-none hover:text-foreground font-sans">
          Recents
        </div>
        <div className="border border-dashed text-center mt-3 px-4 py-4 text-xs text-muted-foreground rounded-lg">
          Your recent chats will appear here once you're logged in.
        </div>
      </div>
    );
  }
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden overflow-hidden">
      <SidebarGroupLabel className="font-sans shrink-0">
        Recents
      </SidebarGroupLabel>
      <ScrollArea className="flex flex-col [&>div>div[style]]:!block">
        <SidebarMenu>
          {chats?.map((chat: Chat) => {
            const isActive = chat.id === chatId;

            return (
              <SidebarMenuItem
                key={chat.id}
                className={cn(
                  "flex rounded-lg transition-all duration-200 cursor-pointer hover:bg-accent/50",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <SidebarMenuButton
                  asChild
                  className="font-sans font-medium text-sm pr-8"
                >
                  <Link href={`/chat/${chat.id}`}>
                    <span>{chat.title}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal size={16} />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-44 rounded-2xl shadow-xl px-1.5 py-1.5 backdrop-blur-sm font-sans bg-background border"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                    sideOffset={1}
                  >
                    <div className="space-y-0.5">
                      <ShareButton />
                      <RenameChatButton id={chat.id} title={chat.title} />
                      <FavouriteButton chatId={chat.id} />
                      <DeleteButton chatId={chat.id} />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })}
          {hasNextPage && (
            <div ref={ref} className="h-4 flex justify-center">
              {isFetchingNextPage && (
                <div className="text-xs text-muted-foreground font-sans">
                  Loading...
                </div>
              )}
            </div>
          )}
        </SidebarMenu>
      </ScrollArea>
    </SidebarGroup>
  );
}
