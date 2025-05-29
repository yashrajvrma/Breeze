import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StarIcon } from "lucide-react";
import toast from "react-hot-toast";

type ChatId = {
  chatId: string;
};

const addToFavouriteFn = (chatId: string) => {
  return axios.post(`/api/chat/fav`, { chatId });
};

export default function FavouriteButton({ chatId }: ChatId) {
  const id = chatId;

  const queryClient = useQueryClient();

  const { mutate: addToFavoruite } = useMutation({
    mutationFn: addToFavouriteFn,
    onSuccess: () => {
      toast.success("Chat added to fav");
      queryClient.invalidateQueries({
        queryKey: ["recentChats"],
      });
    },
  });

  const handleFavourite = async (chatId: string) => {
    console.log("chatid", chatId);
    addToFavoruite(chatId);
  };

  return (
    <button
      onClick={() => handleFavourite(id)}
      className="flex items-center s py-2 text-white hover:bg-neutral-800 hover:text-gray-100 cursor-pointer transition-all duration-150 ease-in-out rounded-xl px-1.5 w-full "
    >
      <StarIcon className="w-4 h-4 mr-2.5" />
      <span className="text-sm">Favorite</span>
    </button>
  );
}
