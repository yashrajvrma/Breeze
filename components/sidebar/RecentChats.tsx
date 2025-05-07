"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Ellipsis } from "lucide-react";

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
    const 
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

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const chats = data?.pages.flatMap((page) => page.chats);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-2 flex-shrink-0 text-sm text-muted-foreground leading-none">
        Recents
      </div>

      <ScrollArea className="flex-1">
        <div className="px-6 py-1 space-y-1">
          {chats?.map((chat: Chat) => (
            <div
              key={chat.id}
              className="text-sm py-1 cursor-pointer hover:text-accent-foreground relative group flex items-center "
            >
              <span className="w-full pr-12 overflow-hidden whitespace-nowrap">
                {chat.title}
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-r from-transparent to-background pointer-events-none flex items-center justify-end">
                <span className="inline-flex justify-end items-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Ellipsis size={15} />
                </span>
              </div>
            </div>
          ))}
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
