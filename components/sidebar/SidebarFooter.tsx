"use client";

import {
  CircleUserRoundIcon,
  EllipsisVerticalIcon,
  LogOut,
  MonitorCogIcon,
  MoonStarIcon,
  // Settings,
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
import ThemeToggleButton from "../theme-settings";
import { SettingsDialog } from "../settings-dialog";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const data = {
  nav: [
    { name: "Notifications", icon: Bell },
    { name: "Navigation", icon: Menu },
    { name: "Home", icon: Home },
    { name: "Appearance", icon: Paintbrush },
    { name: "Messages & media", icon: MessageCircle },
    { name: "Language & region", icon: Globe },
    { name: "Accessibility", icon: Keyboard },
    { name: "Mark as read", icon: Check },
    { name: "Audio & video", icon: Video },
    { name: "Connected accounts", icon: Link },
    { name: "Privacy & visibility", icon: Lock },
    { name: "Advanced", icon: Settings },
  ],
};

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
    // <div className="px-3 py-2 border-t">
    //   <div className="flex flex-row items-center align-middle">
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         {!isCollapsed ? (
    //           <div className="flex justify-between w-full p-2 hover:bg-primary-foreground rounded-lg hover:cursor-default">
    //             <div className="flex gap-x-2 items-center">
    //               <Avatar className="h-8 w-8 rounded-lg">
    //                 <AvatarImage
    //                   src={session?.user?.image || ""}
    //                   referrerPolicy="no-referrer"
    //                   alt="User"
    //                 />
    //                 <AvatarFallback>
    //                   <User className="h-4 w-4" />
    //                 </AvatarFallback>
    //               </Avatar>
    //               <div className="text-sm">
    //                 <p className="text-foreground">
    //                   {session?.user?.name?.[0]?.toUpperCase()! +
    //                     session?.user?.name?.slice(1)}
    //                 </p>

    //                 <p className="text-muted-foreground text-xs">Free Plan</p>
    //               </div>
    //             </div>
    //             <div className="flex items-center">
    //               <EllipsisVerticalIcon size={18} />
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="flex flex-row items-center hover:cursor-pointer w-full py-2">
    //             <Avatar className="h-8 w-8 flex items-center rounded-lg">
    //               <AvatarImage
    //                 src={session?.user?.image || ""}
    //                 referrerPolicy="no-referrer"
    //                 alt="User"
    //               />
    //               <AvatarFallback>
    //                 <User className="h-4 w-4" />
    //               </AvatarFallback>
    //             </Avatar>
    //           </div>
    //         )}
    //       </DropdownMenuTrigger>

    //       <DropdownMenuContent>
    //         <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
    //           <DialogTitle className="sr-only">Settings</DialogTitle>
    //           <DialogDescription className="sr-only">
    //             Customize your settings here.
    //           </DialogDescription>
    //           <SidebarProvider className="items-start">
    //             <Sidebar collapsible="none" className="hidden md:flex">
    //               <SidebarContent>
    //                 <SidebarGroup>
    //                   <SidebarGroupContent>
    //                     <SidebarMenu>
    //                       {data.nav.map((item) => (
    //                         <SidebarMenuItem key={item.name}>
    //                           <SidebarMenuButton
    //                             asChild
    //                             isActive={item.name === "Messages & media"}
    //                           >
    //                             <a href="#">
    //                               <item.icon />
    //                               <span>{item.name}</span>
    //                             </a>
    //                           </SidebarMenuButton>
    //                         </SidebarMenuItem>
    //                       ))}
    //                     </SidebarMenu>
    //                   </SidebarGroupContent>
    //                 </SidebarGroup>
    //               </SidebarContent>
    //             </Sidebar>
    //             <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
    //               <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    //                 <div className="flex items-center gap-2 px-4">
    //                   <Breadcrumb>
    //                     <BreadcrumbList>
    //                       <BreadcrumbItem className="hidden md:block">
    //                         <BreadcrumbLink href="#">Settings</BreadcrumbLink>
    //                       </BreadcrumbItem>
    //                       <BreadcrumbSeparator className="hidden md:block" />
    //                       <BreadcrumbItem>
    //                         <BreadcrumbPage>Messages & media</BreadcrumbPage>
    //                       </BreadcrumbItem>
    //                     </BreadcrumbList>
    //                   </Breadcrumb>
    //                 </div>
    //               </header>
    //               <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
    //                 {Array.from({ length: 10 }).map((_, i) => (
    //                   <div
    //                     key={i}
    //                     className="aspect-video max-w-3xl rounded-xl bg-muted/50"
    //                   />
    //                 ))}
    //               </div>
    //             </main>
    //           </SidebarProvider>
    //         </DialogContent>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>

    //   {/* AlertDialog outside Dropdown */}
    //   <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
    //     <AlertDialogContent className="font-sans">
    //       <AlertDialogHeader>
    //         <AlertDialogTitle>
    //           Are you sure you want to log out?
    //         </AlertDialogTitle>
    //         <AlertDialogDescription>
    //           Log out of Breeze as {session?.user?.email}?
    //         </AlertDialogDescription>
    //       </AlertDialogHeader>
    //       <AlertDialogFooter>
    //         <AlertDialogCancel>Cancel</AlertDialogCancel>
    //         <AlertDialogAction onClick={() => signOut()}>
    //           Log out
    //         </AlertDialogAction>
    //       </AlertDialogFooter>
    //     </AlertDialogContent>
    //   </AlertDialog>
    // </div>
    <SettingsDialog isCollapsed={isCollapsed} />
  );
}

// <DropdownMenuContent className="w-64 font-sans rounded-xl">
//           <DropdownMenuLabel>
//             <div className="flex justify-between w-full">
//               <div className="flex gap-x-2 items-center">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   <AvatarImage
//                     src={session?.user?.image || ""}
//                     referrerPolicy="no-referrer"
//                     alt="User"
//                   />
//                   <AvatarFallback>
//                     <User className="h-4 w-4" />
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="text-sm">
//                   <p className="text-foreground">
//                     {session?.user?.name?.[0]?.toUpperCase()! +
//                       session?.user?.name?.slice(1)}
//                   </p>

//                   <p className="text-muted-foreground text-xs">Free Plan</p>
//                 </div>
//               </div>
//             </div>
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuSeparator /> */}
//           <DropdownMenuGroup>
//             <DropdownMenuItem className="gap-x-2 rounded-md">
//               <CircleUserRoundIcon size={16} />
//               <span>Account</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem className="gap-x-2 rounded-md">
//               <Settings size={16} />
//               <span>Settings</span>
//               {/* <SettingsDialog /> */}
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//           <DropdownMenuSeparator />
//           <DropdownMenuLabel>Preferences</DropdownMenuLabel>
//           <DropdownMenuGroup>
//             <DropdownMenuLabel className="flex justify-between">
//               <div className="flex items-center align-middle font-normal">
//                 Theme
//               </div>
//               <ThemeToggleButton />
//             </DropdownMenuLabel>
//           </DropdownMenuGroup>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             className="gap-x-2 rounded-md"
//             onSelect={(e) => {
//               e.preventDefault(); // Prevent Dropdown from closing
//               setShowLogoutDialog(true);
//             }}
//           >
//             <LogOut size={16} />
//             <span>Log out</span>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
