"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchChatTitle = () => {
  axios.get("/api/chat");
};
export default function ChatTitle() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chatTitle"],
    queryFn: fetchChatTitle,
  });

  return (
    <div className="text-md font-medium bg-red-400">{data?.data?.title}</div>
  );
}
