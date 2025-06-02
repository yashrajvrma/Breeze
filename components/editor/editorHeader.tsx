import { ShareIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEditorStore } from "@/lib/store/editor";

interface EditorHeaderProps {
  title?: string;
}

export default function EditorHeader({
  title = "Rust Programming",
}: EditorHeaderProps) {
  const editor = useEditorStore((state) => state.editor);

  const handleExportToDocx = () => {
    if (!editor) {
      console.error("Editor instance not available");
      return;
    }

    console.log("Editor JSON:", editor.getJSON());

    try {
      // Export with custom options
      editor.commands.exportToDocx({
        filename: `${title.replace(/\s+/g, "_").toLowerCase()}.docx`,
        header: title,
        footer: `Generated on ${new Date().toLocaleDateString()}`,
        download: true,
      });
    } catch (error) {
      console.error("Failed to export to DOCX:", error);
      // You could add a toast notification here
    }
  };

  return (
    <div className="flex flex-row justify-between items-center px-5 py-2.5 border-b">
      <div className="text-lg font-medium">{title}</div>
      <div className="flex justify-between gap-x-5">
        <button className="flex justify-center items-center text-sm px-2.5 py-2 text-foreground rounded-lg bg-primary-foreground hover:bg-muted-foreground/20">
          Save
        </button>
        <button
          onClick={handleExportToDocx}
          className="flex justify-center items-center text-sm bg-cyan-600 hover:bg-cyan-500 text-foreground gap-x-1.5 rounded-lg px-2.5 py-2"
          disabled={!editor}
        >
          <ShareIcon size={16} />
          Export to DOCX
        </button>
      </div>
    </div>
  );
}
