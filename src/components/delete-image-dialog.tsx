import { useState, useTransition } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { deleteImage } from "@/lib/actions";

export function DeleteImageDialog({
  imagePublicIds,
  onClose,
}: {
  imagePublicIds: string[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [isTransition, startTransition] = useTransition();

  const form = useForm();

  async function onSubmit() {
    try {
      await deleteImage(imagePublicIds);
      toast({ description: `Your image has been deleted.` });
      onClose();
      setOpen(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {}
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
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start pl-4">
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-5">
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                image.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" type="submit">
                Delete
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
