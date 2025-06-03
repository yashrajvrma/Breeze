import { ShareIcon } from "lucide-react";
import { useEditorStore } from "@/lib/store/editor";
import { exportToPdf } from "@/extension/exportToPdf";

interface EditorHeaderProps {
  title?: string;
}

export default function EditorHeader({
  title = "Rust Programming",
}: EditorHeaderProps) {
  const editor = useEditorStore((state) => state.editor);

  const handleExportToPdf = async () => {
    if (!editor) {
      console.error("Editor instance not available");
      return;
    }

    const html = editor.getHTML();

    await exportToPdf(html);
  };

  return (
    <div className="flex flex-row justify-between items-center px-5 py-2.5 border-b">
      <div className="text-lg font-medium">{title}</div>
      <div className="flex justify-between gap-x-5">
        <button className="flex justify-center items-center text-sm px-2.5 py-2 text-foreground rounded-lg bg-primary-foreground hover:bg-muted-foreground/20">
          Save
        </button>
        <button
          onClick={handleExportToPdf}
          className="flex justify-center items-center text-sm bg-cyan-600 hover:bg-cyan-500 text-foreground gap-x-1.5 rounded-lg px-2.5 py-2"
          disabled={!editor}
        >
          <ShareIcon size={16} />
          Export
        </button>
      </div>
    </div>
  );
}
