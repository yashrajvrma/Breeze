"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Ellipsis } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ShareButton from "../button/shareButton";
import { DeleteButton } from "../button/deleteButton";
import FavouriteButton from "../button/favouriteButton";
import { RenameChatButton } from "../button/renameButton";
import { useSession } from "next-auth/react";
import { Spinner } from "../loader/spinner";
import { Skeleton } from "../ui/skeleton";

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

export default function RecentChats() {
  const params = useParams();
  const router = useRouter();
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
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
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
      <div className="flex flex-col px-5 py-1">
        <div className="flex-shrink-0 text-sm text-muted-foreground leading-none hover:text-foreground">
          Recents
        </div>
        <div className="flex flex-col py-4 font-sans text-center text-sm text-muted-foreground gap-y-2">
          <Skeleton className="flex items-center h-7 w-full" />
          <Skeleton className="flex items-center h-7 w-full" />
          <Skeleton className="flex items-center h-7 w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col px-5 py-1">
        <div className="flex-shrink-0 text-sm text-muted-foreground leading-none hover:text-foreground">
          Recents
        </div>
        <div className="border border-dashed text-center mt-3 px-4 py-4 text-xs text-muted-foreground rounded-lg">
          Your recent chats will appear here once you're logged in.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pb-1 flex-shrink-0 text-sm text-muted-foreground leading-none hover:text-foreground">
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
                  "group relative flex items-center justify-between rounded-lg transition-all duration-200 cursor-pointer",
                  "hover:bg-accent/50",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex-1 min-w-0 px-2 py-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium truncate"
                      onClick={() => router.push(`/chat/${chat.id}`)}
                    >
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
                              "hover:bg-background/50 focus:outline-none",
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
                          className="w-44 rounded-2xl shadow-xl px-1.5 py-1.5 backdrop-blur-sm font-sans"
                        >
                          <div className="space-y-0.5">
                            <ShareButton />
                            <RenameChatButton id={chat.id} title={chat.title} />
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

          {hasNextPage && (
            <div
              ref={ref}
              className="flex justify-center text-center text-muted-foreground py-4"
              style={{ minHeight: "40px" }}
            >
              {isFetchingNextPage && (
                <div className="flex items-center justify-center space-x-2 py-5">
                  <Spinner />
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
