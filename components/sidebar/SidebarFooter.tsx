import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export default function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar-placeholder.png" alt="User" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="ml-2">
            <p className="text-sm font-medium">yashrajverma@gmail.com</p>
          </div>
        )}
      </div>
    </div>
  );
}
