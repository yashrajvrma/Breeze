import prisma from "@/db";
import { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
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
import NewChatLayout from "@/components/chat/new-chat-layout";

type Props = {
  params: Promise<{ chatId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const chatId = (await params).chatId;

  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
  });

  const chatTitle = chat?.title ? chat.title : "Untitled chat";

  return {
    title: chatTitle,
  };
};

export default async function ChatSession({ params }: Props) {
  const chatId = (await params).chatId;

  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-10 flex h-10 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-1 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 font-sans">
                    {chat?.title || "Untitled chat"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        <div className="flex-1 min-h-0 font-sans">
          <NewChatLayout />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
