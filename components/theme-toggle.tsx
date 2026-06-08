"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="w-8 inline-block" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-sm font-mono text-dim hover:text-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}
