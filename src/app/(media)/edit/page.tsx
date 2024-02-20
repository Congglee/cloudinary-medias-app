"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dataUrl } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

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
    | "opacity"
    | "tint"
  >();
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [opacity, setOpacity] = useState("50");
  const [amount, setAmount] = useState("80");
  const [color1, setColor1] = useState("blue");
  const [color2, setColor2] = useState("blueviolet");

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 xs:justify-between xs:flex-row">
          <h1 className="text-4xl font-bold break-all">Edit {publicId}</h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="ghost" onClick={() => setTransformation(undefined)}>
            Clear All
          </Button>
          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
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
          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => {
                    setTransformation("opacity");
                  }}
                >
                  Apply Opacity
                </Button>
              </PopoverTrigger>

              <PopoverContent className="flex flex-col gap-3">
                <Label htmlFor="opacity">Opacity</Label>
                <Input
                  id="opacity"
                  type="number"
                  value={opacity}
                  onChange={(e) => setOpacity(e.currentTarget.value)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => {
                    setTransformation("tint");
                  }}
                >
                  Apply Tint Color
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Tint Color</h4>
                    <p className="text-sm text-muted-foreground">
                      Set tint color for image.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.currentTarget.value)}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="color1">Color 1</Label>
                      <Select
                        onValueChange={(value) => setColor1(value)}
                        defaultValue={color1}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose color 1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yellow">Yellow</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="black">Black</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="white">White</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="color2">Color 2</Label>
                      <Select
                        onValueChange={(value) => setColor2(value)}
                        defaultValue={color2}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose color 2" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="greenyellow">
                            Lime Green
                          </SelectItem>
                          <SelectItem value="blueviolet">
                            Blue Violet
                          </SelectItem>
                          <SelectItem value="redblack">Maroon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <CldImage src={publicId} width="500" height="300" alt="some-image" />

          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              alt="some-image"
              sizes="100vw"
              // crop="thumb"
              placeholder={dataUrl}
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
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              blur="800"
            />
          )}

          {transformation === "opacity" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              opacity={opacity}
            />
          )}

          {transformation === "tint" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              tint={`equalize:${amount}:${color1}:${color2}`}
            />
          )}

          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              grayscale
            />
          )}

          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              pixelate
            />
          )}

          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="500"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              removeBackground
            />
          )}
        </div>
      </div>
    </section>
  );
}
