"use client";

import * as React from "react";
import {
  ChevronRight,
  EllipsisVerticalIcon,
  MessageCircle,
  Paintbrush,
  Settings,
  User,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import LoginButton from "./button/loginButton";
import { useSession } from "next-auth/react";
import { ThemeSettings } from "./theme-settings"; // Import the new ThemeToggle
import { ProfileSettings } from "./profile-settings"; // Import placeholder components
import { AccountSettings } from "./account-settings";
import { ContactUsSettings } from "./contact-us-settings";

const data = {
  nav: [
    { name: "Profile", icon: User, component: ProfileSettings },
    { name: "Appearance", icon: Paintbrush, component: ThemeSettings },
    { name: "Account", icon: Settings, component: AccountSettings },
    { name: "Contact Us", icon: MessageCircle, component: ContactUsSettings },
  ],
};

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SettingsDialog({ isCollapsed }: SidebarFooterProps) {
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState("Profile"); // State to manage the selected item for breadcrumb
  const { data: session, status } = useSession();

  const CurrentComponent = React.useMemo(() => {
    const item = data.nav.find((navItem) => navItem.name === selectedItem);
    return item ? item.component : null;
  }, [selectedItem]);

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
    <div className="px-3 py-2 border-t font-sans">
      <div className="flex flex-row items-center align-middle">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
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
          </DialogTrigger>
          <DialogContent className="overflow-hidden p-0 font-sans md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
            <DialogTitle className="sr-only">Settings</DialogTitle>
            <SidebarProvider className="items-start">
              <Sidebar collapsible="none" className="hidden md:flex">
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {data.nav.map((item) => (
                          <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                              isActive={item.name === selectedItem}
                              onClick={() => setSelectedItem(item.name)} // Update selected item on click
                            >
                              <item.icon size={16} />
                              <span>{item.name}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink>Settings</BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                        <ChevronRight size={16} />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{selectedItem}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  {CurrentComponent && <CurrentComponent />}
                </div>
              </main>
            </SidebarProvider>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
