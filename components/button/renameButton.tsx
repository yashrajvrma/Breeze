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
import { Button } from "@/components/ui/button";
import { Edit3Icon } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

type Chat = {
  id: string;
  title: string;
};

const renameChatFn = ({ id, title }: Chat) => {
  return axios.post(`/api/chat/rename`, { id, title });
};

export function RenameChatButton({ id, title }: Chat) {
  const [chatTitle, setChatTitle] = useState(title);

  const queryClient = useQueryClient();

  const { mutate: renameChat } = useMutation({
    mutationFn: renameChatFn,
    onSuccess: () => {
      toast.success("Chat renamed successfully");
      queryClient.invalidateQueries({
        queryKey: ["recentChats"],
      });
    },
    onError: () => {
      toast.error("Failed to rename chat");
    },
  });

  const handleRenameChat = () => {
    if (chatTitle.trim()) {
      renameChat({ id, title: chatTitle });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex font-sans items-center py-2 text-white hover:bg-neutral-800 hover:text-gray-100 cursor-pointer transition-all duration-150 ease-in-out rounded-xl px-1.5 w-full">
        <Edit3Icon className="w-4 h-4 mr-2.5" />
        <span className="text-sm">Rename</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle>Rename Chat</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid pt-1 pb-4 font-sans">
              <div className="grid items-center">
                <Input
                  id="chatTitle"
                  value={chatTitle}
                  onChange={(e) => setChatTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter new chat title"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRenameChat}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
