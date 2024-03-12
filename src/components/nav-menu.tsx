import { cn } from "@/utils/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { ActiveLink } from "./active-link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { fetchFolders } from "@/lib/data";

export async function NavMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const folders = await fetchFolders();

  return (
    <>
      <nav
        className={cn("hidden sm:flex items-center overflow-x-auto", className)}
        {...props}
      >
        <Button asChild variant="ghost">
          <ActiveLink href="/gallery">Gallery</ActiveLink>
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <ActiveLink href="/albums">Albums</ActiveLink>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2">
              <DropdownMenuGroup>
                {folders.map((folder) => (
                  <DropdownMenuItem key={folder.name} asChild>
                    <Button
                      variant="ghost"
                      asChild
                      className="w-full justify-start flex gap-2 cursor-pointer"
                    >
                      <Link className="pl-8" href={`/albums/${folder.path}`}>
                        {folder.name}
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
        <Button asChild variant="ghost">
          <ActiveLink href="/favorites">Favorites</ActiveLink>
        </Button>
      </nav>
    </>
  );
}
