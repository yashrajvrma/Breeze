import { AppSidebar } from "@/components/app-sidebar";
import HomeChatLayout from "@/components/chat/HomeChatLayout";
import { NavActions } from "@/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Chat() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-10 flex h-10 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-1 px-3">
            <SidebarTrigger />
            {/* <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 font-sans">
                    Untitled chat
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        <div className="flex-1 min-h-0 font-sans">
          <HomeChatLayout />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
