"use client";

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
import { useEditorStore } from "@/lib/store/editor";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

export const ImageButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
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
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex items-center h-8 font-sans align-middle text-muted-foreground"
        >
          <button className="flex flex-col justify-center items-center hover:text-foreground px-1.5 py-1 rounded-sm min-w-7 h-7 overflow-hidden text-sm cursor-pointer shrink-0">
            <ImageIcon className="w-4 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-900 border-neutral-700 font-sans text-muted-foreground">
          <Button
            className="flex justify-start items-start bg-neutral-900 text-muted-foreground hover:bg-background w-full cursor-pointer"
            onClick={onUpload}
          >
            <UploadIcon className="mr-2 w-4 h-4" />
            Upload
          </Button>
          <Button
            className="flex justify-start items-center cursor-pointer bg-neutral-900 text-muted-foreground hover:bg-background"
            onClick={() => setIsDialogOpen(true)}
          >
            <SearchIcon className="mr-2 w-4 h-4" />
            Paste Image URL
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="font-sans bg-neutral-900 border border-neutral-700 text-muted-foreground">
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="bg-neutral-900 focus:border-none outline-0 outline-none focus:outline-none font-sans text-foreground text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button
              variant="secondary"
              className="hover:bg-foreground font-sans text-blue-600 cursor-pointer"
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
