import { ThemeSettings } from "./theme-settings";

export default function Appearance() {
  return (
    <div className="flex flex-col gap-y-2 px-5">
      Appearance
      <ThemeSettings />
    </div>
  );
}
