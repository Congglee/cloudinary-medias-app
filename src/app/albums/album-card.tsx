"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { deleteFolder } from "@/lib/actions";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Folder } from "./page";

export function AlbumCard({ folder }: { folder: Folder }) {
  const [open, setOpen] = useState(false);
  const [isTransition, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm();

  async function onSubmit() {
    try {
      await deleteFolder(folder.name);
      toast({
        description: `Your ${folder.name} album has deleted.`,
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Folder is not empty",
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
      }}
    >
      <Card className="relative">
        <CardHeader>
          <CardTitle>{folder.name}</CardTitle>
          <CardDescription>All your {folder.name} images</CardDescription>
        </CardHeader>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="absolute top-6 right-5 text-white hover:text-red-500 cursor-pointer p-3 rounded-full hover:bg-red-200"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="mb-5">
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your album.
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
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild>
            <Link href={`/albums/${folder.name}`}>View Album</Link>
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
