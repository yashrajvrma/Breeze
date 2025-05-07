import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewChat from "./NewChat";
import Favourite from "./FavouriteChats";
import RecentChats from "./RecentChats";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export default function SidebarNavigation({
  isCollapsed,
}: SidebarNavigationProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="px-3 py-2 flex-shrink-0">
        <NewChat isCollapsed={isCollapsed} />

        {/* Favourite Chat List */}
        <div className="space-y-1 font-sans">
          <Favourite isCollapsed={isCollapsed} />
        </div>
      </div>

      {/* Scrollable recent chats section */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <RecentChats isCollapsed={isCollapsed} />
        </div>
      )}
    </div>
  );
}

interface ChatItemProps {
  title: string;
  isCollapsed: boolean;
  isActive: boolean;
}
