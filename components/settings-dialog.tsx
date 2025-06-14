"use client";

import * as React from "react";
import {
  CircleUser,
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
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
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
import { ThemeSettings } from "./theme-settings";
import { ProfileSettings } from "./profile-settings";
import { AccountSettings } from "./account-settings";
import { ContactUsSettings } from "./contact-us-settings";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/store/sidebarStore";

const data = {
  nav: [
    { name: "Profile", icon: CircleUser, component: ProfileSettings },
    { name: "Appearance", icon: Paintbrush, component: ThemeSettings },
    { name: "Account", icon: Settings, component: AccountSettings },
    { name: "Contact Us", icon: MessageCircle, component: ContactUsSettings },
  ],
};

export function SettingsDialog() {
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("Profile");
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
    return (
      <div className="px-3 py-3">{!isSidebarCollapsed && <LoginButton />}</div>
    );
  }

  console.log("opened dialog");

  return (
    <div className="px-3 py-2 border-t font-sans">
      <div className="flex flex-row items-center align-middle">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {!isSidebarCollapsed ? (
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
          <DialogContent className="overflow-hidden p-0 font-sans max-h-[90vh] w-[95vw] max-w-[95vw] md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px] rounded-xl">
            <DialogTitle className="sr-only">Settings</DialogTitle>
            <SidebarProvider className="items-start border">
              <div className="flex flex-col md:flex-row w-full">
                <Sidebar
                  collapsible="none"
                  className="flex bg-background border-r md:border-b-0 border-b w-full h-16 md:w-auto md:h-auto overflow-y-hidden"
                >
                  <SidebarContent className="flex items-center justify-center md:items-center md:justify-start overflow-y-hidden w-full">
                    <SidebarGroup className="overflow-y-hidden w-full ">
                      <SidebarGroupContent className="overflow-y-hidden w-full ">
                        <SidebarMenu className="flex flex-row md:flex-col px-2 md:px-3 py-2 md:py-3 gap-x-2 md:gap-x-0 gap-y-0 md:gap-y-2 items-center justify-center md:items-center md:justify-center overflow-x-auto md:overflow-x-visible overflow-y-hidden w-full">
                          {data.nav.map((item) => (
                            <SidebarMenuItem
                              key={item.name}
                              className="flex md:w-full "
                            >
                              <SidebarMenuButton
                                isActive={item.name === selectedItem}
                                className={cn(
                                  "flex hover:bg-muted-foreground/10  justify-center items-center align-middle",
                                  item.name === selectedItem &&
                                    "bg-muted-foreground/10 hover:bg-muted-foreground/10"
                                )}
                                onClick={() => {
                                  console.log("selected", item.name);
                                  setSelectedItem(item.name);
                                }}
                              >
                                <item.icon
                                  size={16}
                                  className="flex shrink-0 items-center align-middle"
                                />
                                <span className="hidden md:inline w-full">
                                  {item.name}
                                </span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                <main className="flex h-[350px] md:h-[480px] flex-1 flex-col overflow-hidden bg-muted-foreground/10 min-w-0">
                  <header className="flex h-12 md:h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-2 md:px-4">
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem className="px-1 md:px-2">
                            <BreadcrumbPage className="font-semibold text-base md:text-lg">
                              {selectedItem}
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                  </header>

                  <div className="flex flex-1 flex-col gap-4 px-2 py-0 md:px-4 md:py-0 pt-0 min-h-[380px] overflow-auto ">
                    {CurrentComponent && <CurrentComponent />}
                  </div>
                </main>
              </div>
            </SidebarProvider>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
