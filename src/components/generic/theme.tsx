import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeMap = {
  system: {
    name: "跟随系统",
    icon: <span className="text-xl i-carbon-contrast"></span>,
  },
  dark: {
    name: "深色",
    icon: <span className="text-xl i-carbon-moon"></span>,
  },
  light: {
    name: "浅色",
    icon: <span className="text-xl i-carbon-sun"></span>,
  },
};

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="icon-btn">
        {ThemeMap[theme as keyof typeof ThemeMap].icon}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-3">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {Object.keys(ThemeMap).map((key) => (
            <DropdownMenuRadioItem value={key} key={key}>
              <span className="flex gap-2">
                {ThemeMap[key as keyof typeof ThemeMap].icon}
                {ThemeMap[key as keyof typeof ThemeMap].name}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeSwitch;
