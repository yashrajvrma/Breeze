"use client";

export default function SaveButton() {
  const handleSave = async () => {};
  return (
    <button
      onClick={() => handleSave()}
      className="flex justify-center items-center text-sm px-2.5 py-2 text-foreground rounded-lg bg-primary-foreground hover:bg-muted-foreground/20"
    >
      Save
    </button>
  );
}
