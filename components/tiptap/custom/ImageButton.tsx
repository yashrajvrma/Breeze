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
import { useEditorStore } from "@/lib/zustand/store";
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
          className="flex items-center align-middle font-sans h-8"
        >
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-sm cursor-pointer">
            <ImageIcon className="w-4 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-50 text-neutral-900 border-neutral-300 font-sans">
          <Button
            className="flex items-start justify-start cursor-pointer hover:bg-neutral-200/80 w-full"
            onClick={onUpload}
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button
            className="flex items-center justify-start cursor-pointer hover:bg-neutral-200/80"
            onClick={() => setIsDialogOpen(true)}
          >
            <SearchIcon className="w-4 h-4 mr-2" />
            Paste Image URL
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-neutral-50 text-neutral-900 font-sans">
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="text-neutral-900 text-sm bg-neutral-50 font-sans focus:outline-none outline-none focus:border-none outline-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button
              className="cursor-pointer bg-neutral-200 hover:text-blue-600 hover:bg-neutral-200"
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
