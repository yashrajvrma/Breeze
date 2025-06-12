import { signOut } from "next-auth/react";
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
} from "./ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

export function AccountSettings() {
  const handleDelete = async () => {
    // task
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
              <AlertDialogAction onClick={() => handleDelete()}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
