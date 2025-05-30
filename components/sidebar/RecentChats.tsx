"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useInfiniteQuery,
  QueryFunctionContext,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Ellipsis } from "lucide-react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ShareButton from "../button/shareButton";
import { DeleteButton } from "../button/deleteButton";
import FavouriteButton from "../button/favouriteButton";
import { RenameChatButton } from "../button/renameButton";
import { useSession } from "next-auth/react"; // Add this import

interface RecentChatsProps {
  isCollapsed: boolean;
}

interface Chat {
  id: string;
  title: string;
  createdAt: string;
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
  const res = await axios.get(`/api/chat?page=${pageParam}&size=10`);
  return res.data;
};

export default function RecentChats({ isCollapsed }: RecentChatsProps) {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession(); // Add session hook

  const { ref, inView } = useInView();

  const chatId = params.chatId as string;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatResponse, Error>({
    queryKey: ["recentChats"],
    initialPageParam: 1,
    queryFn: fetchRecentChats,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((p) => p.chats).length;
      if (totalLoaded < lastPage.totalChats) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!session, // Only fetch when session exists
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const chats = data?.pages.flatMap((page) => page.chats);

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-1 flex-shrink-0 text-sm text-muted-foreground leading-none">
        Recents
      </div>

      {isLoading ? (
        <div className="px-5 py-2 font-sans text-center text-sm text-muted-foreground">
          Loading...
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="px-3 py-2 space-y-1">
            {chats?.map((chat: Chat) => {
              const isActive = chat.id === chatId;

              return (
                <div
                  key={chat.id}
                  className={cn(
                    "group relative flex items-center justify-between rounded-lg transition-all duration-200 cursor-pointer",
                    "hover:bg-accent/50",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => router.push(`/chat/${chat.id}`)}
                >
                  <div className="flex-1 min-w-0 px-2 py-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">
                        {chat.title || "New chat"}
                      </span>

                      <div
                        className={cn(
                          "flex-shrink-0 transition-opacity duration-200",
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        )}
                      >
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className={cn(
                                "p-1 rounded-md transition-colors duration-200 text-foreground",
                                "hover:bg-background/50 focus:outline-none ",
                                isActive
                                  ? "hover:bg-accent-foreground/10"
                                  : "hover:bg-accent"
                              )}
                            >
                              <Ellipsis size={16} className="text-current" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            side="right"
                            sideOffset={8}
                            align="start"
                            className="w-44 border-neutral-800 rounded-2xl shadow-xl px-1.5 py-1.5 backdrop-blur-sm font-sans"
                          >
                            <div className="space-y-0.5">
                              <ShareButton />
                              <RenameChatButton
                                id={chat.id}
                                title={chat.title}
                              />
                              <FavouriteButton chatId={chat.id} />
                              <DeleteButton chatId={chat.id} />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasNextPage && (
            <div ref={ref} className="text-center text-muted-foreground py-4">
              {isFetchingNextPage ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Loading more...</span>
                </div>
              ) : (
                <span className="text-sm">Scroll to load more</span>
              )}
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
