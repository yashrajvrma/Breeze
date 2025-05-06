// "use client";

// import { useState } from "react";
// import EditorToolbar from "./EditorToolbar";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export default function DocumentEditor() {
//   const [documentContent, setDocumentContent] =
//     useState(`# Large Language Models

// ## Introduction

// Large Language Models (LLMs) are a type of artificial intelligence (AI) that can understand and generate human-like text. Trained on massive amounts of data, LLMs are capable of tasks like answering questions, writing essays, summarizing information, translating languages, coding, and even reasoning to a certain degree. They form the backbone of many modern AI applications, including chatbots, virtual assistants, content generators, and coding assistants.

// LLMs are typically built using deep learning techniques, particularly transformer architectures like GPT (Generative Pre-trained Transformer). These models revolutionize how machines process language, enabling interactions that feel surprisingly human.

// ## How Large Language Models Work

// Large Language Models operate based on deep neural networks, particularly utilizing transformer architectures. Neural networks are computational systems inspired by the human brain, designed to recognize patterns and relationships in data. The transformer model, introduced in the paper "Attention Is All You Need" by Vaswani et al., brought a major breakthrough in natural language processing by enabling models to attend to different parts of input sequences simultaneously through a mechanism called self-attention. This allowed for more efficient training and better handling of long-range dependencies in text.

// ## Popular LLMs in the Market

// Today, several prominent LLMs dominate the AI landscape. OpenAI’s GPT series, particularly GPT-3.5 and GPT-4, are among the most widely used models and are known for their versatility across different domains. Google has introduced its Gemini model, aiming to integrate text, image, and audio understanding. Anthropic developed the Claude series, which focuses heavily on alignment and safety. Meta (formerly Facebook) released the LLaMA (Large Language Model Meta AI) models, which are designed to be open-weight and accessible for research and development. Other notable contributors include Mistral, known for lightweight open-source LLMs, and Cohere, which focuses on enterprise AI solutions. Each of these models has its strengths and specialized applications, driving innovation across industries.
// `);

//   return (
//     <div className="flex flex-col h-full">
//       <EditorToolbar />
//       <ScrollArea className="flex-1 p-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="prose prose-lg dark:prose-invert">
//             {documentContent.split("\n\n").map((paragraph, i) => {
//               if (paragraph.startsWith("# ")) {
//                 return (
//                   <h1 key={i} className="text-center text-2xl font-bold my-4">
//                     {paragraph.substring(2)}
//                   </h1>
//                 );
//               } else if (paragraph.startsWith("## ")) {
//                 return (
//                   <h2 key={i} className="text-xl font-bold my-3">
//                     {paragraph.substring(3)}
//                   </h2>
//                 );
//               } else if (paragraph.startsWith("### ")) {
//                 return (
//                   <h3 key={i} className="text-lg font-bold my-2">
//                     {paragraph.substring(4)}
//                   </h3>
//                 );
//               } else {
//                 return (
//                   <p key={i} className="my-2">
//                     {paragraph}
//                   </p>
//                 );
//               }
//             })}
//           </div>
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import DOMPurify from "dompurify";
import EditorToolbar from "./EditorToolbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocumentEditor() {
  const [documentContent, setDocumentContent] = useState(`
    <b>editor&nbsp;</b>rjrjrj
    <div><br></div>
    <div><strike>hii how are you&nbsp;</strike><br>
      <div>
        <ul>
          <li>hii&nbsp;</li>
          <li>hello</li>
          <li>how are you</li>
        </ul>
        <ol>
          <li>kkdkd&nbsp;</li>
          <li>djdjdj</li>
          <li>jdjdjd</li>
          <li>lddld</li>
        </ol>
        <h1><a href="https://megahertz.github.io/react-simple-wysiwyg/">click me&nbsp;</a></h1>
      </div>
      <h1>hii</h1>
      <h2>h2</h2>
    </div>
    <div><br></div>
    <div>----------------------------------</div>
    <pre style="color: #f5f5f5; background-color: #161d26; font-family: Consolas, 'Courier New', monospace; font-size: 13px;">
<code>
<span style="color: #ff9bcb;">for</span> <span style="color: #ff9bcb;">await</span> (<span style="color: #9fc8ff;">const</span> <span style="color: #00c5d3;">textPart</span> <span style="color: #ff9bcb;">of</span> <span style="color: #00c5d3;">textStream</span>) {
  <span style="color: #9fc8ff;">console</span>.<span style="color: #8fe5c2;">log</span>(<span style="color: #00c5d3;">textPart</span>);
}
</code>
    </pre>
  `);

  const cleanHTML = DOMPurify.sanitize(documentContent);

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar />
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        </div>
      </ScrollArea>
    </div>
  );
}
