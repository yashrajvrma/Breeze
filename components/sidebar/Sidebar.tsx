// import { cn } from "@/lib/utils";
// import SidebarHeader from "./SidebarHeader";
// import SidebarNavigation from "./SidebarNavigation";
// import SidebarFooter from "./SidebarFooter";
// import { useSidebarStore } from "@/lib/store/sidebarStore";
// import { useIsMobile } from "@/hooks/use-mobile";

// export default function Sidebar() {
//   const isMobile = useIsMobile();
//   const isSidebarCollapsed = useSidebarStore(
//     (state) => state.isSidebarCollapsed
//   );
//   return (
//     <div
//       className={cn(
//         "h-full bg-background border-r border-border transition-all duration-300 flex flex-col overflow-hidden z-10",
//         isSidebarCollapsed ? (isMobile ? "w-0" : "w-[60px]") : "w-[250px]"
//       )}
//     >
//       <SidebarHeader />
//       <div className="flex-1 overflow-y-auto pt-1  scrollbar-thin">
//         <SidebarNavigation />
//       </div>
//       <SidebarFooter />
//     </div>
//   );
// }

// sidebar.tsx
import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

export default function Sidebar() {
  const isMobile = useIsMobile();
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );
  const setIsSidebarCollapsed = useSidebarStore(
    (state) => state.setIsSidebarCollapsed
  );

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div
      className={cn(
        "h-full bg-background border-r border-border transition-all duration-300 flex flex-col overflow-hidden",
        // For mobile: always full width when visible, for desktop: responsive width
        isMobile
          ? "w-[100vw] shadow-xl"
          : isSidebarCollapsed
          ? "w-[60px]"
          : "w-[250px]"
      )}
    >
      {/* Mobile close button */}
      {/* {isMobile && (
        <div className="flex justify-end p-3 border-b border-border">
          <button
            onClick={() => toggleSidebar()}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      )} */}

      <SidebarHeader />
      <div className="flex-1 overflow-y-auto pt-1 scrollbar-thin">
        <SidebarNavigation />
      </div>
      <SidebarFooter />
    </div>
  );
}

// {!isSidebarCollapsed && (
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-7 w-7 group relative"
//               onClick={() => toggleSidebar()}
//             >
//               {/* Default icon */}
//               <PanelRightIcon
//                 size={18}
//                 className="text-foreground/70 group-hover:hidden"
//               />

//               {/* Icon shown on hover */}
//               <ArrowLeftToLineIcon
//                 size={18}
//                 className="text-foreground/70 hidden group-hover:block absolute inset-0 m-auto"
//               />

//               <span className="sr-only">Collapse sidebar</span>
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent side="right">
//             <p>Collapse sidebar</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     )}
