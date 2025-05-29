"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useInfiniteQuery,
  QueryFunctionContext,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Edit3, Ellipsis, Share, Star, StarIcon, Trash2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import ShareButton from "../button/shareButton";
import { DeleteButton } from "../button/deleteButton";
import FavouriteButton from "../button/favouriteButton";
import { RenameChatButton } from "../button/renameButton";

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
  const chatId = params.chatId as string;

  const queryClient = useQueryClient();

  const router = useRouter();

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
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const chats = data?.pages.flatMap((page) => page.chats);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-2 flex-shrink-0 text-xs text-muted-foreground leading-none">
        Recents
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-2 space-y-1">
          {chats?.map((chat: Chat) => {
            const isActive = chat.id === chatId;

            return (
              <div
                key={chat.id}
                className={cn(
                  "group relative flex items-center rounded-lg transition-colors cursor-pointer text-sm font-sans",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => router.push(`/chat/${chat.id}`)}
              >
                <div className="relative flex-1 min-w-0 px-3 py-2 overflow-hidden">
                  <span className="block overflow-hidden whitespace-nowrap pr-6">
                    {chat.title || "New chat"}
                  </span>

                  {/* Ultra-smooth, narrow fade gradient */}
                  <div
                    className={cn(
                      "absolute right-0 top-0 h-full w-5 pointer-events-none",
                      isActive
                        ? "bg-gradient-to-l from-accent via-accent to-transparent"
                        : "bg-gradient-to-l from-background via-background to-transparent group-hover:bg-gradient-to-l group-hover:from-accent group-hover:via-accent group-hover:to-transparent"
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "transition-opacity duration-200 pr-2",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  {/* <Popover>
                    <PopoverTrigger>
                      <button className="p-1">
                        <Ellipsis size={15} className="text-current" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      sideOffset={-15}
                      align="start"
                      alignOffset={20}
                      className="w-44 border-neutral-600 rounded-2xl shadow-xl px-1.5 py-1.5 font-sans"
                    >
                      <div>
                        <ShareButton />
                        <RenameChatButton id={chat.id} title={chat.title} />
                        <FavouriteButton chatId={chat.id} />
                        <DeleteButton chatId={chat.id} />
                      </div>
                    </PopoverContent>
                  </Popover> */}
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis size={15} className="text-current" />
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      sideOffset={-15}
                      align="start"
                      alignOffset={20}
                      className="w-44 border-neutral-600 rounded-2xl shadow-xl px-1.5 py-1.5 font-sans"
                    >
                      <div className="space-y-1">
                        <div>
                          <ShareButton />
                        </div>
                        <div>
                          <RenameChatButton id={chat.id} title={chat.title} />
                        </div>
                        <div>
                          <FavouriteButton chatId={chat.id} />
                        </div>
                        <div>
                          <DeleteButton chatId={chat.id} />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            );
          })}
        </div>

        {hasNextPage && (
          <div ref={ref} className="text-center text-muted-foreground py-4">
            {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
