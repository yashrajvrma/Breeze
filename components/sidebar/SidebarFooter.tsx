"use client";

import {
  CircleUserRoundIcon,
  EllipsisVerticalIcon,
  LogOut,
  MonitorCogIcon,
  MoonStarIcon,
  Settings,
  SunIcon,
  User,
  UserRound,
  UserRoundIcon,
} from "lucide-react";
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
import { Skeleton } from "../ui/skeleton";
import ThemeToggleButton from "../button/themeToggleButton";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export default function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { data: session, status } = useSession();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex justify-center px-3 py-2">
        <Skeleton className="flex items-center h-16 w-full" />
      </div>
    );
  }
  if (!session) {
    return <div className="px-3 py-3">{!isCollapsed && <LoginButton />}</div>;
  }

  return (
    <div className="px-3 py-2 border-t">
      <div className="flex flex-row items-center align-middle">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {!isCollapsed ? (
              <div className="flex justify-between w-full p-2 hover:bg-primary-foreground rounded-lg hover:cursor-default">
                <div className="flex gap-x-2 items-center">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      referrerPolicy="no-referrer"
                      alt="User"
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="text-foreground">
                      {session?.user?.name?.[0]?.toUpperCase()! +
                        session?.user?.name?.slice(1)}
                    </p>

                    <p className="text-muted-foreground text-xs">Free Plan</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <EllipsisVerticalIcon size={18} />
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center hover:cursor-pointer w-full py-2">
                <Avatar className="h-8 w-8 flex items-center rounded-lg">
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

          <DropdownMenuContent className="w-64 font-sans rounded-xl">
            <DropdownMenuLabel>
              <div className="flex justify-between w-full">
                <div className="flex gap-x-2 items-center">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      referrerPolicy="no-referrer"
                      alt="User"
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="text-foreground">
                      {session?.user?.name?.[0]?.toUpperCase()! +
                        session?.user?.name?.slice(1)}
                    </p>

                    <p className="text-muted-foreground text-xs">Free Plan</p>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-x-2 rounded-md">
                <CircleUserRoundIcon size={16} />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-x-2 rounded-md">
                <Settings size={16} />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Preferences</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex justify-between">
                <div className="flex items-center align-middle font-normal">
                  Theme
                </div>
                <ThemeToggleButton />
                {/* <div className="flex justify-center gap-x-3 border rounded-lg px-2 py-1 cursor-pointer">
                  <div>
                    <MonitorCogIcon
                      className="text-muted-foreground"
                      size={16}
                    />
                  </div>
                  <div>
                    <SunIcon className="text-muted-foreground" size={16} />
                  </div>
                  <div>
                    <MoonStarIcon className="text-muted-foreground" size={16} />
                  </div>
                </div> */}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-x-2 rounded-md"
              onSelect={(e) => {
                e.preventDefault(); // Prevent Dropdown from closing
                setShowLogoutDialog(true);
              }}
            >
              <LogOut size={16} />
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
