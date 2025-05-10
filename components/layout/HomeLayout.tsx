import HomeChatLayout from "../chat/HomeChatLayout";
import SidebarLayout from "../chat/SidebarLayout";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <SidebarLayout />
      <div className="flex-1 overflow-hidden">
        <HomeChatLayout />
      </div>
    </div>
  );
}
