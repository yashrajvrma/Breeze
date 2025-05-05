export default function HomeChatLayout() {
  return (
    <div className="flex justify-center items-center align-middle font-sans h-screen">
      <div className="flex flex-col items-center align-middle">
        <div className="text-4xl font-semibold text-foreground">
          What do you want to build?
        </div>
        <div className="mt-2 text-lg font-normal text-muted-foreground">
          Prompt, create and edit word documents.
        </div>
      </div>
    </div>
  );
}
