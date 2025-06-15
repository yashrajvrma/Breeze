"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/lib/store/editorStore";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useSession } from "next-auth/react";

export const ImageButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const onChange = (src: string) => {
    if (!editor) return;
    editor.chain().focus().setImage({ src }).run();
  };

  const onUpload = async () => {
    // native object url
    // const input = document.createElement("input");
    // input.type = "file";
    // input.accept = "image/*";
    // input.onchange = (e) => {
    //   const file = (e.target as HTMLInputElement).files?.[0];
    //   if (file) {
    //     const imageUrl = URL.createObjectURL(file);
    //     onChange(imageUrl);
    //   }
    // };
    // input.click();

    // upload to vercel
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }
      if (file) {
        const blob = await upload(
          `public/doc-images/${session.user.id}/${file.name}`,
          file,
          {
            access: "public",
            handleUploadUrl: "/api/v1/doc-images/upload",
          }
        );

        const url = blob.url;
        console.log("url is", url);
        onChange(url);

        // const imageUrl = URL.createObjectURL(file);
        // onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger
          asChild
          className="flex items-center h-8 font-sans align-middle text-muted-foreground"
        >
          <button className="flex flex-col justify-center items-center hover:text-foreground px-1.5 py-1 rounded-sm min-w-7 h-7 overflow-hidden text-sm cursor-pointer shrink-0">
            <Tooltip>
              <TooltipTrigger>
                <ImageIcon className="w-4 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Insert image</p>
              </TooltipContent>
            </Tooltip>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex flex-col font-sans">
          <Button
            className="flex justify-start items-center w-full cursor-pointer bg-background text-foreground hover:bg-muted-foreground/20 px-2.5 py-2"
            onClick={() => onUpload()}
          >
            <UploadIcon className="mr-2 w-4 h-4" />
            Upload
          </Button>

          <Button
            className="flex justify-start items-center cursor-pointer bg-background text-foreground hover:bg-muted-foreground/20 px-2.5 py-2"
            onClick={() => {
              setDropdownOpen(false); // Close dropdown
              setTimeout(() => setIsDialogOpen(true), 50); // Open dialog after delay
            }}
          >
            <SearchIcon className="mr-2 w-4 h-4" />
            Paste Image URL
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="font-sans">
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="focus:outline-none font-sans"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button
              variant="outline"
              className="hover:bg-blue-600 hover:text-neutral-50 font-sans bg-blue-500 text-neutral-50 cursor-pointer"
              onClick={handleImageUrlSubmit}
              disabled={!imageUrl}
            >
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
