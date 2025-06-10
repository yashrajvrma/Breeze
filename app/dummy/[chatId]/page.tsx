"use client";

import ChatMessage from "@/components/chat/ChatMessage";
import { Spinner } from "@/components/loader/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Messages = {
  id: string;
  sender: "user" | "assistant";
  content: string;
  status: "PENDING" | "COMPLETED";
  orderIndex: number;
};

type Thread = {
  chatId: string;
  title: string;
  messages: Messages[];
};

type ThreadResponse = {
  success: boolean;
  message: string;
  thread: Thread;
};

// fetch existing threads message from db
const fetchThreadFn = async (chatId: string): Promise<Thread> => {
  try {
    const response = await axios.get<ThreadResponse>(
      `/api/v1/chat/thread?chatId=${chatId}`
    );
    console.log("res is", response.data.thread);
    return response.data.thread;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message;
      console.error("error response is", error.response.data);
      throw new Error(errorMessage || "Failed to fetch chats");
    }
    throw new Error("Something went wrong");
  }
};

export default function DummyChat() {
  const params = useParams();
  const { data: session } = useSession();
  const [firstMsg, setFirstMsg] = useState<Messages[]>();

  const { chatId } = params;

  // fetch existing thread message
  const {
    data: threadData,
    isLoading: isThreadLoading,
    error: threadError,
  } = useQuery({
    queryKey: ["thread", chatId],
    queryFn: () => fetchThreadFn(chatId as string),
    enabled: !!session,
  });

  // display erorr while fetching threads
  useEffect(() => {
    if (threadError) {
      console.log(
        "theres an error while fetching thread",
        threadError?.message
      );
      toast.error(threadError?.message);
    }
  }, [threadError]);

  // send message to llm
  const {
    messages,
    input,
    handleInputChange,
    stop,
    isLoading,
    status,
    handleSubmit,
    append,
  } = useChat({
    api: "/api/v1/chat/message",
    body: {
      chatId,
    },
    initialMessages: firstMsg
      ? []
      : threadData?.messages.map((item: Messages) => ({
          id: item.id,
          role: item.sender,
          content: item.content,
        })),
    experimental_throttle: 200,
    onError: (error) => {
      console.log("ai sdk error", error?.message);
      toast.error(error.message);
    },
  });

  // set first message
  useEffect(() => {
    if (threadData?.messages) {
      const messageArray = threadData.messages as Messages[];

      if (
        messageArray.length === 1 &&
        messageArray[0].sender === "user" &&
        messageArray[0].status === "PENDING"
      ) {
        setFirstMsg(messageArray);
        append({
          role: "user",
          content: messageArray[0].content,
        }).catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
      }
    }
  }, [threadData]);

  return (
    <div className="flex flex-col h-full border-r border-border font-sans">
      <div className="py-4 px-7 text-base font-semibold border-b">
        {threadData?.title || "Untitled Chat"}
      </div>
      <ScrollArea className="flex-1 p-0 pb-0 px-7">
        <div className="space-y-4 pt-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={msg.id || index}
              isLoading={isLoading}
              message={{
                id: msg.id || String(index),
                sender: msg.role === "user" ? "user" : "assistant",
                content: msg.content,
              }}
            />
          ))}
        </div>
      </ScrollArea>

      {(status === "submitted" || status === "streaming") && (
        <div className="fixed top-0 bg-red-400">
          {status === "submitted" && <Spinner />}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}
      <div className="px-4 pb-2 mt-auto">
        <form onSubmit={handleSubmit}>
          <input name="prompt" value={input} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
