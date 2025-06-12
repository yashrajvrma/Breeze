"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const deleteUserFn = async (userId: string) => {
  try {
    const response = await axios.post(`/api/v1/user/delete-account`, {
      userId,
    });

    if (response) {
      toast.success(response.data.message);
      setTimeout(() => {
        signOut();
      }, 1000);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
export function AccountSettings() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (!session) {
    router.push("/signin");
  }
  const userId = session?.user?.id!;

  const { mutate: deleteUser } = useMutation({
    mutationFn: deleteUserFn,
  });

  const handleDelete = async (userId: string) => {
    deleteUser(userId);
    console.log("deleted");
  };
  return (
    <div className="flex flex-col justify-center gap-y-5 px-2">
      <div className="flex justify-between items-center align-middle text-base font-normal">
        Log out on this device
        <Button variant="outline" className="text-sm" onClick={() => signOut()}>
          Log out
        </Button>
      </div>
      <div className="flex justify-between items-center align-middle">
        <span className="text-base font-normal">Delete your account</span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-sm">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="font-sans text-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete account</AlertDialogTitle>
              <AlertDialogDescription>
                Deleting your account is permanent. You will have no way of
                recovering your account or document data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(userId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
