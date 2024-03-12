import Link from "next/link";
import { Heart } from "./icons/heart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { fetchFolders } from "@/lib/data";

export async function SideMenu() {
  const folders = await fetchFolders();

  return (
    <div className="space-y-1">
      <Button
        asChild
        variant="ghost"
        className="w-full justify-start flex gap-2"
      >
        <Link href="/gallery">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Gallery
        </Link>
      </Button>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-0">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start flex gap-2"
            >
              <Link href="/albums">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
                Albums
              </Link>
            </Button>
          </AccordionTrigger>
          <AccordionContent>
            {folders.map((folder) => (
              <Button
                variant="ghost"
                asChild
                key={folder.name}
                className="w-full justify-start flex gap-2"
              >
                <Link className="pl-8" href={`/albums/${folder.path}`}>
                  {folder.name}
                </Link>
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        asChild
        variant="ghost"
        className="w-full justify-start flex gap-2"
      >
        <Link href="/favorites">
          <Heart />
          Favorites
        </Link>
      </Button>
    </div>
  );
}
