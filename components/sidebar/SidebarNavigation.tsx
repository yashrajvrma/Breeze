import NewChat from "../button/newChatButton";
import RecentChats from "./RecentChats";
import FavouriteChats from "./FavouriteChats";
import RateLimitCard from "./RateLimit";
import { useSidebarStore } from "@/lib/store/sidebarStore";

export default function SidebarNavigation() {
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="flex-shrink-0 px-3 py-2">
        <NewChat />
      </div>

      {/* Favourite and Recent Chats - Scrollable content */}
      {!isSidebarCollapsed && (
        <div className="flex-1 overflow-hidden flex flex-col font-sans">
          <RateLimitCard />
          <FavouriteChats />
          <RecentChats />
        </div>
      )}
    </div>
  );
}
