"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ShareButton from "../button/shareButton";
import { RenameChatButton } from "../button/renameButton";
import { DeleteButton } from "../button/deleteButton";
import { EllipsisIcon } from "lucide-react";
import UnFavouriteButton from "../button/unFavourite";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

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

export default function FavouriteChats() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const chatId = params.chatId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["favChats"],
    queryFn: favChatsFn,
    enabled: !!session,
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col px-4 py-1 mb-2 mt-5">
        <div className="flex-shrink-0 text-sm text-muted-foreground leading-none hover:text-foreground">
          Favourite
        </div>
        <div className="flex flex-col py-4 font-sans text-center text-sm text-muted-foreground gap-y-2">
          <Skeleton className="flex items-center h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col px-4 py-1 mb-2 mt-5">
        <div className="flex-shrink-0 text-sm text-muted-foreground leading-none hover:text-foreground">
          Favourite
        </div>
        <div className="border border-dashed text-center mt-3 px-4 py-4  text-xs text-muted-foreground rounded-lg">
          Favourites chats that you use often.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-6 mt-5">
      <div className="px-4 flex-shrink-0 text-sm text-muted-foreground leading-none hover:text-foreground">
        Favourite
      </div>

      <ScrollArea className="flex max-h-[150px]">
        <div className="px-2 py-2 space-y-0.5">
          {data?.data.favourite.map((chat: FavChats) => {
            const isActive = chat.id === chatId;

            return (
              <div
                key={chat.id}
                className={cn(
                  "group relative flex justify-between items-center rounded-lg transition-all duration-200 cursor-pointer",
                  "hover:bg-accent/50",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div
                  onClick={() => router.push(`/chat/${chat.id}`)}
                  className="py-2 inline-block px-2 w-[90%]"
                >
                  <span className="text-sm font-medium line-clamp-1">
                    {chat.title || "New chat"}
                  </span>
                </div>

                <div
                  className={cn(
                    "flex-shrink-0 justify-center items-center align-middle transition-opacity pr-1 duration-200",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "flex align-middle p-1 rounded-md transition-colors duration-200 text-foreground",
                          "hover:bg-background/50 focus:outline-none ",
                          isActive
                            ? "hover:bg-accent-foreground/10"
                            : "hover:bg-accent"
                        )}
                      >
                        <EllipsisIcon size={16} className="text-current" />
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
                        <UnFavouriteButton chatId={chat.id} />
                        <DeleteButton chatId={chat.id} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
