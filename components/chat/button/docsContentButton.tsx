"use client";

import Image from "next/image";
import notesIcon from "@/public/assets/images/notes.png";

type DocsContent = {
  isLoading: boolean;
};

export default function DocsContent({ isLoading }: DocsContent) {
  // if (isLoading) {
  //   return (
  //     <div className="relative bg-neutral-900 text-white px-6 py-4 rounded-lg flex items-center justify-between border border-gray-700 overflow-hidden w-full">
  //       {/* Left side - Title and subtitle */}
  //       <div className="flex flex-col z-10 w-full">
  //         <h1 className="text-sm font-medium">Making edits...</h1>
  //       </div>

  //       {/* Right-side image (with spacing and faded look) */}
  //       <div className="absolute -bottom-3 right-4 rotate-[15deg] opacity-50">
  //         <Image src={notesIcon} alt="notes" width={60} height={60} />
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="relative bg-neutral-900 text-white px-6 py-4 rounded-lg flex items-center justify-between border border-gray-700 overflow-hidden w-full">
      {/* Left side - Title and subtitle */}
      <div className="flex flex-col z-10 w-full">
        <div className="text-sm font-medium">
          {isLoading ? "Making edits..." : "Generated Docs"}
        </div>
        {!isLoading && (
          <p className="text-muted-foreground text-xs">Click to view</p>
        )}
      </div>

      <div className="w-[60px] min-w-[100px]"></div>
      {/* Right-side SVG (styled like a faded background graphic) */}
      <div className="absolute -bottom-3 right-4 rotate-[15deg] opacity-50">
        <Image src={notesIcon} alt="notes" width={60} height={60} />
      </div>
    </div>
  );
}
