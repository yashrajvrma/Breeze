import NewChat from "../button/newChatButton";
import RecentChats from "./RecentChats";
import FavouriteChats from "./FavouriteChats";
import RateLimitCard from "./RateLimit";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export default function SidebarNavigation({
  isCollapsed,
}: SidebarNavigationProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="flex-shrink-0 px-3 py-2">
        <NewChat isCollapsed={isCollapsed} />
      </div>

      {/* Favourite and Recent Chats - Scrollable content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden flex flex-col font-sans">
          <RateLimitCard />
          <FavouriteChats isCollapsed={isCollapsed} />
          <RecentChats isCollapsed={isCollapsed} />
        </div>
      )}
    </div>
  );
}
