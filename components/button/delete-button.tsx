"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

type ChatId = {
  chatId: string;
};

const addToDeleteFn = (chatId: string) => {
  return axios.post(`/api/v1/chat/delete`, { chatId });
};

export function DeleteButton({ chatId }: ChatId) {
  const id = chatId;

  const queryClient = useQueryClient();

  const { mutate: addToDelete } = useMutation({
    mutationFn: addToDeleteFn,
    onSuccess: () => {
      toast.success("Chat deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["recentChats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["favChats"],
      });
    },
  });

  const handleDelete = async (chatId: string) => {
    addToDelete(chatId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center py-2 text-red-500 hover:bg-red-100 hover:text-red-500 cursor-pointer transition-all duration-150 ease-in-out rounded-xl px-1.5 w-full ">
          <Trash2Icon className="w-4 h-4 mr-2.5" />
          <span className="text-sm">Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this chat?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <div onClick={() => handleDelete(id)}>Delete</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
