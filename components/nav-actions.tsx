"use client";

import * as React from "react";
import {
  User,
  CircleUser,
  MessageCircle,
  Paintbrush,
  Settings,
} from "lucide-react";
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
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { ThemeSettings } from "./theme-settings";
import { ProfileSettings } from "./profile-settings";
import { AccountSettings } from "./account-settings";
import { ContactUsSettings } from "./contact-us-settings";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useRouter } from "next/navigation";

const data = {
  nav: [
    { name: "Profile", icon: CircleUser, component: ProfileSettings },
    { name: "Appearance", icon: Paintbrush, component: ThemeSettings },
    { name: "Account", icon: Settings, component: AccountSettings },
    { name: "Contact Us", icon: MessageCircle, component: ContactUsSettings },
  ],
};

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

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
    router.push("/signin");
  }

  return (
    <div className="flex items-center gap-2 text-sm font-sans">
      {/* <div className="hidden font-medium text-muted-foreground md:inline-block font-sm">
        Edit Oct 08
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star size={16} />
      </Button> */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Avatar className="h-7 w-7 rounded-lg">
            <AvatarImage
              src={session?.user?.image || ""}
              referrerPolicy="no-referrer"
              alt="User"
            />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
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
                            className="flex md:w-full"
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
  );
}
