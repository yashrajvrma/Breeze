interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export default function Favourite({ isCollapsed }: SidebarNavigationProps) {
  return <div className="px-2 py-2 text-sm text-muted-foreground">F</div>;
}
