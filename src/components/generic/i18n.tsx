import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function LanguageSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-xl icon-btn i-carbon-language"></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-16 mt-3">
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="zh-CN">
            <Link href="/" locale="zh-CN" className="w-full">
              中文
            </Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">
            <Link href="/en" locale="en" className="w-full">
              English
            </Link>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
