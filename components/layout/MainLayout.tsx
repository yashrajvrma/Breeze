// import ChatInterface from "@/components/chat/ChatInterface";
// import DocumentEditor from "@/components/editor/DocumentEditor";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import SidebarLayout from "../chat/MainSidebarLayout";

// export default function MainLayout() {
//   // const [isClient, setIsClient] = useState(false);

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     setIsClient(true);
//   //   }, 10);

//   //   return () => clearTimeout(timer);
//   // }, []);

//   // if (!isClient) {
//   //   return (
//   //     <div className="flex h-screen bg-background overflow-hidden font-sans">
//   //       <div className="w-[240px] border-r border-border"></div>
//   //       <div className="flex-1">
//   //         <div className="flex h-full">
//   //           <div className="w-[40%] border-r border-border"></div>
//   //           <div className="flex-1"></div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="flex h-screen bg-background overflow-hidden font-sans">
//       <SidebarLayout />
//       <div className="flex-1 overflow-hidden">
//         <ResizablePanelGroup direction="horizontal">
//           <ResizablePanel defaultSize={50} minSize={30} maxSize={75}>
//             <ChatInterface />
//           </ResizablePanel>
//           <ResizableHandle withHandle />
//           <ResizablePanel>
//             <DocumentEditor />
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </div>
//   );
// }

"use client";

import ChatInterface from "@/components/chat/ChatInterface";
import DocumentEditor from "@/components/editor/DocumentEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MainSidebarLayout from "../chat/MainSidebarLayout";
import { useAppSelector } from "@/lib/hook";

export default function MainLayout() {
  const { isVisible } = useAppSelector((state) => state.document);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <MainSidebarLayout />
      <div className="flex-1 overflow-hidden">
        {isVisible ? (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
              <ChatInterface />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <DocumentEditor />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
}
