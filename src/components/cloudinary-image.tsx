"use client";

import { SearchResult } from "@/app/(media)/gallery/page";
import { FullHeart } from "@/components/icons/full-heart";
import { Heart } from "@/components/icons/heart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setAsFavoriteAction } from "@/lib/actions";
import { dataUrl } from "@/utils/utils";
import { Pencil } from "lucide-react";
import { CldImage, CldImageProps } from "next-cloudinary";
import Link from "next/link";
import { useState, useTransition } from "react";
import { AddToAlbumDialog } from "./add-to-album-dialog";
import { DeleteImageDialog } from "./delete-image-dialog";
import { Menu } from "./icons/menu";
import { Button } from "./ui/button";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTransition] = useTransition();
  const { imageData, onUnheart, ...rest } = props;

  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite")
  );
  const [publicIds, setPublicIds] = useState([imageData.public_id]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <CldImage {...rest} src={imageData.public_id} placeholder={dataUrl} />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavorited(false);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavorited(true);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}

      <div className="absolute top-2 right-2">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-8 h-8 p-0">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem asChild>
              <AddToAlbumDialog
                image={imageData}
                onClose={() => setOpen(false)}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                className="cursor-pointer flex justify-start pl-4"
                asChild
                variant="ghost"
              >
                <Link
                  href={`/edit?publicId=${encodeURIComponent(
                    imageData.public_id
                  )}`}
                >
                  <Pencil className="mr-2 w-4 h-4" />
                  Edit
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteImageDialog
                imagePublicIds={publicIds}
                onClose={() => setOpen(false)}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
