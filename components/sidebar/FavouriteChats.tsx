"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

const favChatsFn = async () => {
  return axios.get("/api//chat/fav");
};
export default function Favourite({ isCollapsed }: SidebarNavigationProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favChats"],
    queryFn: favChatsFn,
  });
  return (
    <div className="px-2 py-2 text-sm text-muted-foreground font-sans">
      {!isCollapsed && (
        <div>
          {isLoading ? (
            <div className="text-center text-sm">Loading...</div>
          ) : (
            <div>
              {data.map((item,index) => {
                
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
