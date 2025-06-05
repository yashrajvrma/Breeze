import { useThemeStore } from "@/lib/store/themeStore";
import { MonitorCogIcon, MoonStarIcon, SunIcon } from "lucide-react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useThemeStore();

  const options = [
    { value: "system", icon: <MonitorCogIcon size={16} />, label: "System" },
    { value: "light", icon: <SunIcon size={16} />, label: "Light" },
    { value: "dark", icon: <MoonStarIcon size={16} />, label: "Dark" },
  ];

  return (
    <div className="flex gap-x-2 border rounded-lg px-2 py-1">
      {options.map((option) => (
        <div
          key={option.value}
          className={`cursor-pointer p-1 rounded ${
            theme === option.value
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          }`}
          onClick={() => {
            setTheme(option.value as typeof theme);
            console.log("theme set to", option.value);
          }}
        >
          {option.icon}
        </div>
      ))}
    </div>
  );
}
