"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useThemeStore } from "@/lib/store/themeStore";

function ThemeSyncer() {
  const { setTheme } = useTheme();
  const zustandTheme = useThemeStore((state) => state.theme);

  if (!zustandTheme) {
    return null;
  }

  useEffect(() => {
    setTheme(zustandTheme);
  }, [zustandTheme, setTheme]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <ThemeSyncer />
            {children}
          </TooltipProvider>
          <Toaster toastOptions={{ className: "font-sans" }} />
        </NextThemesProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
