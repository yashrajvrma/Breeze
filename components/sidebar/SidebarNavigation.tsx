import { cn } from "@/lib/utils";
import { MessageSquare, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function SidebarNavigation({
  isCollapsed,
}: SidebarNavigationProps) {
  return (
    <div>
      <div className="px-3 py-2">
        <div
          className={cn(
            "mb-2 cursor-pointer text-sm w-full",
            isCollapsed
              ? "flex justify-center"
              : "p-2 rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground"
          )}
          title={isCollapsed ? "New chat" : ""}
        >
          {isCollapsed ? (
            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
              <Plus className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
                <Plus className="h-4 w-4" />
              </div>
              <span className="font-semibold">New chat</span>
            </div>
          )}
        </div>

        {/* Chat List */}
        <div className="space-y-1 font-sans">
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Favourite
          </div>
          {/* <ChatItem
          title="Large Language Model"
          isCollapsed={isCollapsed}
          isActive={true}
        />
        <ChatItem
          title="Sales report"
          isCollapsed={isCollapsed}
          isActive={false}
        />
        <ChatItem
          title="Boom of AI Agents"
          isCollapsed={isCollapsed}
          isActive={false}
        /> */}
        </div>
      </div>
      <div className="pl-3 pr-0 py-2">
        <div className="px-3 mb-2 text-sm text-muted-foreground leading-none">
          Recents
        </div>
        <ScrollArea className="h-72 w-full">
          <div className="pl-3 pr-0 py-2">
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm py-2">
                  {tag}
                </div>
              </>
            ))}
          </div>
        </ScrollArea>
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
        "flex justify-start items-center cursor-pointer transition-colors",
        isCollapsed
          ? "justify-start h-8 w-8 rounded-full"
          : "px-3 py-2 rounded-md",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
      )}
      title={isCollapsed ? title : undefined}
    >
      {/* <MessageSquare className="h-4 w-4 flex-shrink-0" /> */}
      {!isCollapsed && <span className="text-sm truncate">{title}</span>}
    </div>
  );
}
