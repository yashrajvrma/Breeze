import { ShareIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function EditorHeader() {
  return (
    <div className="flex flex-row justify-between items-center px-5 py-2.5 border-b">
      <div className="text-lg font-medium">Rust Programming</div>
      <div className="flex justify-between gap-x-5">
        <button className="flex justify-center items-center text-sm px-2.5 py-2 text-foreground rounded-lg bg-primary-foreground hover:bg-muted-foreground/20">
          Save
        </button>
        <button className="flex justify-center items-center text-sm bg-cyan-600 hover:bg-cyan-500 text-foreground gap-x-1.5 rounded-lg px-2.5 py-2">
          <ShareIcon size={16} />
          Export
        </button>
      </div>
    </div>
  );
}
