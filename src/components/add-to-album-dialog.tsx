import { Folder } from "@/app/albums/page";
import { SearchResult } from "@/app/gallery/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addImageToAlbum } from "../lib/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useToast } from "./ui/use-toast";

const FormSchema = z.object({
  albumName: z.string({
    required_error: "Please select an album",
  }),
});

export function AddToAlbumDialog({
  image,
  onClose,
}: {
  image: SearchResult;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const [isTransition, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    fetch("/api/get-cloudinary-folders")
      .then((res) => res.json())
      .then((data) => {
        setFolders(data.folders);
      });
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await addImageToAlbum(image, data.albumName);
      toast({
        description: `Your image has been move to ${data.albumName} album.`,
      });
      onClose();
      setOpen(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "The image is already in the album, please select another album to move the image to.",
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
        if (!newOpenState) {
          onClose();
        }
      }}
    >
      <DialogTrigger>
        <Button variant="ghost">
          <FolderPlus className="mr-2 h-4 w-4" />
          <span>Add to Album</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add to Album</DialogTitle>
              <DialogDescription>
                Choose an album you want to move this image into
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-5">
              <FormField
                control={form.control}
                name="albumName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Album Name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an album" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {folders?.map((folder) => (
                          <SelectItem key={folder.path} value={folder.name}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button asChild variant="outline" type="button">
                <Link href={`/albums`}>Create Album</Link>
              </Button>
              <Button type="submit">Add to Album</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
