"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ChatInterface from "@/components/chat/ChatInterface";
import { NavActions } from "@/components/nav-actions";
import { Editor } from "@/components/tiptap/Editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export default function NewChatLayout() {
  const { isMobile } = useSidebar();

  return (
    // <SidebarProvider>
    //   <AppSidebar />
    //   <SidebarInset className="flex flex-col h-screen overflow-hidden">
    //     <header className="sticky top-0 z-10 flex h-10 shrink-0 items-center gap-2 bg-background">
    //       <div className="flex flex-1 items-center gap-1 px-3">
    //         <SidebarTrigger />
    //         <Separator orientation="vertical" className="mr-2 h-4" />
    //         <Breadcrumb>
    //           <BreadcrumbList>
    //             <BreadcrumbItem>
    //               <BreadcrumbPage className="line-clamp-1 font-sans">
    //                 Project Management & Task Tracking
    //               </BreadcrumbPage>
    //             </BreadcrumbItem>
    //           </BreadcrumbList>
    //         </Breadcrumb>
    //       </div>
    //       <div className="ml-auto px-3">
    //         <NavActions />
    //       </div>
    //     </header>

    //     <div className="flex-1 min-h-0 font-sans">
    //       {isMobile ? (
    //         <div className="h-full p-2 pl-0">
    //           <ChatInterface />
    //         </div>
    //       ) : (
    //         <ResizablePanelGroup direction="horizontal" className="h-full">
    //           <ResizablePanel defaultSize={70} minSize={50}>
    //             <Editor />
    //           </ResizablePanel>
    //           <ResizableHandle withHandle />
    //           <ResizablePanel defaultSize={30} minSize={30} maxSize={40}>
    //             <div className="h-full p-2 pl-0">
    //               <ChatInterface />
    //             </div>
    //           </ResizablePanel>
    //         </ResizablePanelGroup>
    //       )}
    //     </div>
    //   </SidebarInset>
    // </SidebarProvider>
    <>
      {isMobile ? (
        <div className="h-full p-2 pl-0">
          <ChatInterface />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={70} minSize={50}>
            <div className="h-full p-2">
              <Editor />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={30} maxSize={40}>
            <div className="h-full p-2 pl-0">
              <ChatInterface />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </>
  );
}
