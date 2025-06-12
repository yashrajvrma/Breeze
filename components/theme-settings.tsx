import { useThemeStore } from "@/lib/store/themeStore";
import { MonitorCogIcon, MoonStarIcon, SunIcon } from "lucide-react";

export const ThemeSettings = () => {
  const { theme, setTheme } = useThemeStore();

  const options = [
    { value: "system", icon: <MonitorCogIcon size={16} />, label: "System" },
    { value: "light", icon: <SunIcon size={16} />, label: "Light" },
    { value: "dark", icon: <MoonStarIcon size={16} />, label: "Dark" },
  ];

  return (
    <div className="flex justify-between items-center align-middle gap-x-2 rounded-lg px-2 py-1">
      <div>Theme</div>
      <div className="flex gap-x-5 border px-4 py-2 rounded-lg">
        {options.map((option) => (
          <div
            key={option.value}
            className={`cursor-pointer ${
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
    </div>
  );
};
