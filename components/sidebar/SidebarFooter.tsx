import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export default function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { data: session, status } = useSession();

  return (
    <div className="p-4 border-t border-border">
      <div className="flex flex-row items-center align-middle">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row items-center align-middle gap-x-2.5 hover:cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || ""} alt="User" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>

              {!isCollapsed && (
                <div>
                  <p className="text-sm font-normal">{`${session?.user?.name
                    ?.charAt(0)
                    .toUpperCase()}${session?.user?.name?.slice(1)}`}</p>
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 font-sans">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-x-2">
                <User size={15} />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-x-2">
                <Settings size={15} />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-x-2">
              <LogOut size={15} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
