"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Ellipsis } from "lucide-react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const chats = data?.pages.flatMap((page) => page.chats);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-2 flex-shrink-0 text-sm text-muted-foreground leading-none">
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
                  <Ellipsis size={15} className="text-current" />
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
