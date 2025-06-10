"use client";

import { authConfig } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

// fetch existing threads message from db
const fetchThreadFn = async (chatId: string) => {
  try {
    const response = await axios.get(`/api/v1/chat/thread?chatId=${chatId}`);

    if (response?.data) {
      console.log("res", response?.data);
      const data = response?.data;
      console.log("data is", data);
      return data;
    }
  } catch (error: any) {
    if (error.response) {
      const erorrMessage = error?.response?.data?.message;
      console.log("error response is", error?.response?.data);
      console.log("err msg", erorrMessage);
      throw new Error(`${erorrMessage}`);
    }
  }
};

export default function DummyChat() {
  // get the chatid from params
  const params = useParams();
  const { chatId } = params;

  // get session
  const { data: session, status } = useSession();

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

  return (
    <div className="flex flex-col gap-y-10 justify-center items-center align-middle mt-40">
      {`chat id is ${chatId}`}
      <div>{isThreadLoading ? "Loading..." : "thread loaded"}</div>
      <div>
        {threadData?.thread?.messages.map((item: any) => {
          return (
            <div key={item.id}>
              <div>{`Role : ${item.sender}`}</div>
              <div>${item.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
