// import MainLayout from "@/components/layout/MainLayout";
import Page from "@/components/new-layout";
import prisma from "@/db";
import { Metadata } from "next";

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

  return {
    title: `${chat?.title}`,
  };
};

export default function ChatSession() {
  // return <MainLayout />;
  return <Page />;
}
