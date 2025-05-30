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
import FavouriteButton from "../button/favouriteButton";
import { DeleteButton } from "../button/deleteButton";
import { EllipsisIcon } from "lucide-react";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

type FavChats = {
  id: string;
  userId: string;
  title: string;
  favourite: boolean;
  updatedAt: string;
};

const favChatsFn = async () => {
  return axios.get("/api/v1/chat/fav");
};

export default function FavouriteChats({
  isCollapsed,
}: SidebarNavigationProps) {
  const params = useParams();
  const router = useRouter();

  const chatId = params.chatId as string;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favChats"],
    queryFn: favChatsFn,
  });

  console.log("data is ", JSON.stringify(data));
  return (
    <div className="flex flex-col">
      <div className="px-5 py-1 flex-shrink-0 text-sm text-muted-foreground leading-none">
        Favourite
      </div>

      {isLoading ? (
        <div className="px-5 py-2 font-sans text-center text-sm text-muted-foreground">
          Loading...
        </div>
      ) : (
        <ScrollArea className="max-h-[150px]">
          <div className="px-3 py-2 space-y-1">
            {data?.data.favourite.map((chat: FavChats) => {
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
                              <EllipsisIcon
                                size={16}
                                className="text-current"
                              />
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
                              {/* <FavouriteButton chatId={chat.id} /> */}
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
        </ScrollArea>
      )}
    </div>
  );
}
