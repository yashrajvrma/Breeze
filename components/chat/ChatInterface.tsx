"use client";

import ChatMessage from "@/components/chat/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChatInput,
  ChatInputSubmit,
  ChatInputTextArea,
} from "@/components/chat-input";
import { useChat } from "@ai-sdk/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { getFormattedResetTime } from "@/lib/utils/getLocalTimeZone";
import { Skeleton } from "../ui/skeleton";
import { TextShimmer } from "../text-shimmer";
import { EditorDrawer } from "../editor/EditorDrawer";
import { useEditorStore } from "@/lib/store/editorStore";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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

export default function ChatInterface() {
  const { isMobile } = useSidebar();
  const params = useParams();
  const { data: session } = useSession();
  const [firstMsg, setFirstMsg] = useState<Messages[]>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAppendedFirstMsg = useRef(false);

  const isEditorDrawerOpen = useEditorStore((state) => state.isDrawerOpen); // Add this line
  const closeDrawer = useEditorStore((state) => state.closeDrawer); // Add this line

  const queryClient = useQueryClient();

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

  // display error while fetching threads
  useEffect(() => {
    console.log("thread error render is");
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
    error: chatError,
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
    experimental_throttle: 50,
    onFinish: () => {
      queryClient.invalidateQueries({
        queryKey: ["rateLimit"],
      });
    },
    onResponse(response) {
      if (response.status === 429) {
        const localTime = getFormattedResetTime();
        console.log("time is", localTime);
        toast.error(
          `You've hit your daily limit. Your credits will reset after ${localTime}`
        );
      }
    },
    onError: (error) => {
      console.log("ai sdk error", error?.message);
      toast.error("Something went wrong. Please try again later");
    },
  });

  // set first message
  useEffect(() => {
    console.log("append");
    if (
      !hasAppendedFirstMsg.current &&
      threadData?.messages &&
      threadData.messages.length === 1 &&
      threadData.messages[0].sender === "user" &&
      threadData.messages[0].status === "PENDING"
    ) {
      const messageArray = threadData.messages as Messages[];
      setFirstMsg(messageArray);

      append({
        role: "user",
        content: messageArray[0].content,
      }).catch((error) => {
        console.log(error);
        toast.error(error.message);
      });

      hasAppendedFirstMsg.current = true;
    }
  }, [threadData, append]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    console.log("message render is");
    if (messages.length > 0) {
      // Small delay ensures DOM is rendered before scrolling
      const timeout = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle chat input submit
  const handleChatSubmit = () => {
    if (!input.trim()) return;

    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    handleSubmit(syntheticEvent);
  };

  // Determine if we should show loading/generating state
  const isGenerating =
    (status === "submitted" || status === "streaming") && !chatError;

  // if (isThreadLoading) {
  //   return (
  //     <div className="flex flex-col h-full border rounded-xl font-sans">
  //       <div className="sm:py-3.5 px-3.5 text-base hidden text-muted-foreground md:inline-block font-sm border-b">
  //         Chat
  //       </div>
  //       <div className="flex flex-col w-full gap-y-4 px-7 pt-4">
  //         <div className="flex justify-end">
  //           <Skeleton className="items-end h-8 w-[80%]" />
  //         </div>

  //         <div className="flex flex-col items-start gap-y-2">
  //           <Skeleton className="flex items-start h-8 w-[90%]" />
  //           <Skeleton className="flex items-start h-8 w-[90%]" />
  //           <Skeleton className="flex items-start h-8 w-[90%]" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      className={cn(
        "flex flex-col h-full font-sans rounded-xl min-h-0 overflow-hidden",
        isMobile ? "border-0" : "border"
      )}
    >
      <div className="sm:py-3.5 px-3.5 text-base hidden text-muted-foreground md:inline-block font-sm border-b">
        Chat
      </div>
      {/* <ChatTitle
        title={threadData?.title || "Untitled Chat"}
        isMobile={isMobile}
      /> */}

      <ScrollArea className="flex-1 min-h-0 sm:px-7 px-4">
        {/* {isThreadLoading ? (
          <div className="flex flex-col h-full border rounded-xl font-sans">
            <div className="sm:py-3.5 px-3.5 text-base hidden text-muted-foreground md:inline-block font-sm border-b">
              Chat
            </div>
            <div className="flex flex-col w-full gap-y-4 px-7 pt-4">
              <div className="flex justify-end">
                <Skeleton className="items-end h-8 w-[80%]" />
              </div>

              <div className="flex flex-col items-start gap-y-2">
                <Skeleton className="flex items-start h-8 w-[90%]" />
                <Skeleton className="flex items-start h-8 w-[90%]" />
                <Skeleton className="flex items-start h-8 w-[90%]" />
              </div>
            </div>
          </div>
        ) : ( */}
        <div className="space-y-4 pt-4 pb-1">
          {isThreadLoading ? (
            <div className="flex flex-col w-full gap-y-2">
              <div className="flex justify-end">
                <Skeleton className="items-end h-8 w-[80%]" />
              </div>
              <div className="flex flex-col w-full items-start gap-y-2">
                <Skeleton className="flex items-start h-8 w-[90%]" />
                <Skeleton className="flex items-start h-8 w-[90%]" />
                <Skeleton className="flex items-start h-8 w-[90%]" />
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <ChatMessage
                  key={msg.id || index}
                  // isLoading={isLoading}
                  message={{
                    id: msg.id || String(index),
                    sender: msg.role === "user" ? "user" : "assistant",
                    content: msg.content,
                  }}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        {/* )} */}

        {isGenerating && (
          <div className="flex justify-start pb-4">
            {status === "submitted" && (
              <div className="flex align-middle">
                {/* <Spinner /> */}
                <TextShimmer className="font-sans text-base" duration={1}>
                  Thinking...
                </TextShimmer>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="sm:px-4 px-3 pb-4 mt-auto shrink-0">
        <ChatInput
          variant="default"
          value={input}
          onChange={handleInputChange}
          onSubmit={handleChatSubmit}
          loading={isGenerating}
          onStop={() => stop()}
          className="relative w-full h-full focus:outline-none ring-0 border md:min-h-[120px] py-0 min-h-[100px] max-h-[300px]"
          // className="relative w-full h-full focus:outline-none ring-0 border md:min-h-[120px] min-h-[130px] max-h-[300px] py-0 min-h-[60px] max-h-[180px]"
          rows={2}
        >
          <ChatInputTextArea
            placeholder="How can Breeze help you today?"
            className="my-0 md:placeholder:text-base placeholder:text-sm  placeholder:font-normal"
          />
          <ChatInputSubmit />
        </ChatInput>
      </div>

      {/* Update EditorDrawer props */}
      {isMobile && (
        <EditorDrawer
          isOpen={isEditorDrawerOpen}
          onOpenChange={closeDrawer} // This will handle close button click
        />
      )}
    </div>
  );
}
