import HomeChatLayout from "../chat/HomeChatLayout";
import HomeSidebarLayout from "../chat/HomeSidebarLayout";

export default function HomeLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <HomeSidebarLayout />
      <div className="flex-1 overflow-hidden">
        <HomeChatLayout />
      </div>
    </div>
  );
}
