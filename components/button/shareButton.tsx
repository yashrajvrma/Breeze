import { CopyIcon, ShareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ShareButton() {
  const path = usePathname();
  const [link, setLink] = useState<string>("");

  const handleShare = () => {
    const link = process.env.NEXT_PUBLIC_APP_BASE_URL + path;
    setLink(link);

    // navigator.clipboard.writeText(link);
    // toast.success("Copied to clipboard");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => handleShare()}
          className="flex justify-start items-center py-2 text-white hover:bg-neutral-800 hover:text-gray-100 cursor-pointer transition-all duration-150 ease-in-out rounded-xl w-full px-1.5"
        >
          <ShareIcon className="w-4 h-4 mr-2.5" />
          <span className="text-sm">Share</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-sans">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success("Copied to clipboard");
            }}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            {/* <Copy /> */}
            <CopyIcon size={16} />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
