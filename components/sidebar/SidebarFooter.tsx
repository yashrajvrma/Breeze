"use client";

import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import LoginButton from "../button/loginButton";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export default function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { data: session } = useSession();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!session) {
    return <div className="px-3 py-3">{!isCollapsed && <LoginButton />}</div>;
  }

  return (
    <div className="px-3 py-2">
      <div className="flex flex-row items-center align-middle">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {!isCollapsed ? (
              <div className="flex flex-row items-center gap-x-2.5 hover:cursor-pointer w-full p-2 rounded-md hover:bg-primary-foreground ">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    referrerPolicy="no-referrer"
                    alt="User"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="text-sm font-semibold">
                  <p className="text-foreground">
                    {session?.user?.name?.[0]?.toUpperCase()! +
                      session?.user?.name?.slice(1)}
                  </p>
                  <p className="text-muted-foreground">Free Plan</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center hover:cursor-pointer w-full py-2">
                <Avatar className="h-8 w-8 flex items-center">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    referrerPolicy="no-referrer"
                    alt="User"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
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
            <DropdownMenuItem
              className="gap-x-2"
              onSelect={(e) => {
                e.preventDefault(); // Prevent Dropdown from closing
                setShowLogoutDialog(true);
              }}
            >
              <LogOut size={15} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* AlertDialog outside Dropdown */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Log out of Breeze as {session?.user?.email}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => signOut()}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
