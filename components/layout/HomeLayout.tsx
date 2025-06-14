// HomeLayout.tsx
"use client";

import HomeChatLayout from "../chat/HomeChatLayout";
import HomeSidebarLayout from "../chat/HomeSidebarLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebarStore } from "@/lib/store/sidebarStore";

export default function HomeLayout() {
  const isMobile = useIsMobile();
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans relative">
      {/* Sidebar - positioned differently for mobile vs desktop */}
      {isMobile ? (
        <>
          {/* Mobile overlay sidebar */}
          <div
            className={`fixed inset-0 z-50 ${
              isSidebarCollapsed ? "pointer-events-none" : ""
            }`}
          >
            {/* Backdrop */}
            {!isSidebarCollapsed && (
              <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={() =>
                  useSidebarStore.getState().setIsSidebarCollapsed(true)
                }
              />
            )}
            {/* Sidebar */}
            <div
              className={`absolute left-0 top-0 h-full transition-transform duration-300 ${
                isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <HomeSidebarLayout />
            </div>
          </div>
          {/* Main content - full width on mobile */}
          <div className="flex-1">
            <HomeChatLayout />
          </div>
        </>
      ) : (
        <>
          {/* Desktop sidebar - normal flow */}
          <HomeSidebarLayout />
          <div className="flex-1">
            <HomeChatLayout />
          </div>
        </>
      )}
    </div>
  );
}
