import { ScrollArea } from "@/components/ui/scroll-area";

interface RecentChatsProps {
  isCollapsed: boolean;
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function RecentChats({ isCollapsed }: RecentChatsProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed header */}
      <div className="px-6 py-2 flex-shrink-0 text-sm text-muted-foreground leading-none">
        Recents
      </div>

      {/* Scrollable area */}
      <ScrollArea className="flex-1">
        <div className="px-6 py-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="text-sm py-2 cursor-pointer hover:text-accent-foreground"
            >
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
