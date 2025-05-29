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
import { useState } from "react";

type ChatId = {
  chatId: string;
  title: string;
};

export function RenameChatButton({ chatId, title }: ChatId) {
  const [id, setId] = useState(chatId);
  const [chatTitle, setChatTitle] = useState(title);

  const handleRenameChat = async ({ chatId, title }: ChatId) => {};

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center  py-2 text-white hover:bg-neutral-800 hover:text-gray-100 cursor-pointer transition-all duration-150 ease-in-out rounded-xl px-1.5 w-full">
          <Edit3Icon className="w-4 h-4 mr-2.5" />
          <span className="text-sm">Rename</span>
        </button>{" "}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rename Chat</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="username"
                  defaultValue={title}
                  className="col-span-3"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <button onClick={() => handleRenameChat({ id, chatTitle })}>
              Save
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
