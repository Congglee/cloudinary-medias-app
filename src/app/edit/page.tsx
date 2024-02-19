"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: {
    publicId: string;
  };
}) {
  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "bg-remove"
  >();
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {publicId}</h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button variant="ghost" onClick={() => setTransformation(undefined)}>
            Clear All
          </Button>
          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger>
                <Button
                  onClick={() => {
                    setTransformation("generative-fill");
                    setPrompt(pendingPrompt);
                  }}
                >
                  Apply Generative Fill
                </Button>
              </PopoverTrigger>

              <PopoverContent className="flex flex-col gap-3">
                <Label>Prompt</Label>
                <Input
                  value={pendingPrompt}
                  onChange={(e) => setPendingPrompt(e.currentTarget.value)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={() => setTransformation("blur")}>Apply Blur</Button>
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to Gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            Pixelate
          </Button>
          <Button onClick={() => setTransformation("bg-remove")}>
            Remove Background
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <CldImage src={publicId} width="500" height="300" alt="some-image" />

          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              alt="some-image"
              // crop="thumb"
              fillBackground={{
                prompt,
              }}
            />
          )}

          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              alt="some-image"
              blur="800"
            />
          )}

          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              alt="some-image"
              grayscale
            />
          )}

          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              alt="some-image"
              pixelate
            />
          )}

          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              alt="some-image"
              removeBackground
            />
          )}
        </div>
      </div>
    </section>
  );
}
