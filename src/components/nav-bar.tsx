import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./icons/menu";
import { SideMenu } from "./side-menu";
import { AuthToggle } from "./toggle-button";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  SideMenuDialogContent,
} from "./ui/dialog";

export async function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center container mx-auto">
        <Link href="/" className="hidden sm:flex items-center">
          <Image
            src="/album.png"
            alt="icon of this photo album app"
            width="50"
            height="50"
          />
          MEDIAS APP
        </Link>
        <div className="sm:ml-auto flex items-center space-x-4">
          <UserButton
            afterSignOutUrl="/gallery"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
          <AuthToggle />
          <div className="lg:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="border border-input hover:bg-accent hover:text-accent-foreground"
                >
                  <Menu />
                </Button>
              </DialogTrigger>

              <SideMenuDialogContent>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  <SideMenu />
                </nav>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-5">
                  <DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Close
                  </DialogClose>
                </div>
              </SideMenuDialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
