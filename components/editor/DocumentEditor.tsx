"use client";

import { useState } from "react";
import EditorToolbar from "./EditorToolbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocumentEditor() {
  const [documentContent, setDocumentContent] =
    useState(`# AI-Generated Document

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.

## Main Content

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

### Section 1

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

### Section 2

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

## Analysis

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti`);

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar />
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert">
            {documentContent.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h1 key={i} className="text-2xl font-bold my-4">
                    {paragraph.substring(2)}
                  </h1>
                );
              } else if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold my-3">
                    {paragraph.substring(3)}
                  </h2>
                );
              } else if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-bold my-2">
                    {paragraph.substring(4)}
                  </h3>
                );
              } else {
                return (
                  <p key={i} className="my-2">
                    {paragraph}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
