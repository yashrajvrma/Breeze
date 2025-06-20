interface HomeChatHeaderProps {
  title: string;
}

export default function HomeChatHeader({ title }: HomeChatHeaderProps) {
  // Your existing HomeChatHeader implementation goes here
  // This is just a placeholder structure

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-lg font-semibold">{title}</h1>
      {/* Add your existing header content here */}
    </header>
  );
}
