"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StarIcon } from "lucide-react";
import toast from "react-hot-toast";

type ChatId = {
  chatId: string;
};

const addToFavouriteFn = (chatId: string) => {
  return axios.post(`/api/v1/chat/unfavourite`, { chatId });
};

export default function UnFavouriteButton({ chatId }: ChatId) {
  const id = chatId;

  const queryClient = useQueryClient();

  const { mutate: addToFavoruite } = useMutation({
    mutationFn: addToFavouriteFn,
    onSuccess: () => {
      toast.success("Chat added to fav");
      queryClient.invalidateQueries({
        queryKey: ["recentChats"],
      });
      queryClient.invalidateQueries({ queryKey: ["favChats"] });
    },
  });

  const handleFavourite = async (chatId: string) => {
    console.log("chatid", chatId);
    addToFavoruite(chatId);
  };

  return (
    <button
      onClick={() => handleFavourite(id)}
      className="flex items-center s py-2 text-foreground hover:bg-muted-foreground/20 cursor-pointer transition-all duration-150 ease-in-out rounded-xl px-1.5 w-full "
    >
      <StarIcon color="#ffc800" fill="#ffc800" className="w-4 h-4 mr-2.5" />
      <span className="text-sm">Unfavorite</span>
    </button>
  );
}
