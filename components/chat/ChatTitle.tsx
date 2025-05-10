"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

const fetchChatTitle = (chatId: string) => {
  return axios.get(`/api/chat/${chatId}`);
};
export default function ChatTitle() {
  const { chatId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chatTitle", chatId],
    queryFn: () => fetchChatTitle,
  });

  return <div className="text-md font-medium bg-red-400">{data?.title}</div>;
}
