"use client";

import { useEditorContent, useEditorStore } from "@/lib/store/editorStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type UpdatedDocsResponse = {
  id: string | null;
  updatedDocHtml: string;
};

const saveDocsFn = ({ id, updatedDocHtml }: UpdatedDocsResponse) => {
  return axios.post(`/api/v1/save-docx`, { id, updatedDocHtml });
};

export default function SaveButton() {
  const editor = useEditorStore((state) => state.editor);
  const id = useEditorContent((state) => state.id);

  const queryClient = useQueryClient();

  const { mutate: saveDocs, isPending } = useMutation({
    mutationFn: saveDocsFn,
    onSuccess: () => {
      toast.success("Docs saved successfully");
      queryClient.invalidateQueries({
        queryKey: ["thread"],
      });
    },
  });

  const handleSave = async () => {
    if (!editor) {
      console.log("Editor doesn't exist");
      return;
    }
    const updatedDocHtml = editor?.getHTML();
    saveDocs({ id, updatedDocHtml });
  };

  return (
    <button
      onClick={() => handleSave()}
      className="flex justify-center items-center text-sm px-2.5 sm:py-1.5 py-1 text-foreground rounded-lg border hover:bg-accent"
    >
      {isPending ? "Saving..." : "Save"}
    </button>
  );
}
