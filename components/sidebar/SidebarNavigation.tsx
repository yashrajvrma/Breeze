import { cn } from "@/lib/utils";
import { FolderOpenDot, MessageSquare } from "lucide-react";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export default function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  return (
    <div className="px-3 py-2">
      <div className={cn("mb-2", isCollapsed ? "px-2" : "px-3")}>
        {!isCollapsed && (
          <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
            <FolderOpenDot className="h-4 w-4 mr-1" /> Projects
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center py-2">
            <FolderOpenDot className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <ChatItem
          title="Chat 1"
          isCollapsed={isCollapsed}
          isActive={true}
        />
        <ChatItem
          title="Chat 2"
          isCollapsed={isCollapsed}
          isActive={false}
        />
        <ChatItem
          title="Chat 3"
          isCollapsed={isCollapsed}
          isActive={false}
        />
      </div>
    </div>
  );
}

interface ChatItemProps {
  title: string;
  isCollapsed: boolean;
  isActive: boolean;
}

function ChatItem({ title, isCollapsed, isActive }: ChatItemProps) {
  return (
    <div
      className={cn(
        "flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
      )}
    >
      <MessageSquare className="h-4 w-4 flex-shrink-0" />
      {!isCollapsed && <span className="ml-2 text-sm truncate">{title}</span>}
    </div>
  );
}