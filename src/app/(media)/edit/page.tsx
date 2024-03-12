"use client";

import { Button } from "@/components/ui/button";
import { dataUrl } from "@/utils/utils";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { AddCustomTextDrawer } from "./add-custom-text-drawer";
import { GenerativeFillPopover } from "./generative-fill-popover";
import { OpacityPopover } from "./opacity-popover";
import { TintColorPopover } from "./tint-color-popover";

export type Transform =
  | undefined
  | "generative-fill"
  | "blur"
  | "grayscale"
  | "pixelate"
  | "bg-remove"
  | "opacity"
  | "tint"
  | "custom-text";

export type SettingData = {
  prompt: string;
  opacity: string;
  amount: string;
  color1: string;
  color2: string;
  x: number;
  y: number;
  text: string;
  angle: number;
  gravity: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  textDecoration: string;
  letterSpacing: number;
};

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: {
    publicId: string;
  };
}) {
  const [transformation, setTransformation] = useState<Transform>();
  const [settings, setSettings] = useState<SettingData>({
    prompt: "cake",
    opacity: "50",
    amount: "80",
    color1: "blue",
    color2: "blueviolet",
    x: 0,
    y: 250,
    text: "Hello World",
    angle: 0,
    gravity: "south",
    textColor: "#fff",
    fontFamily: "Roboto Mono",
    fontSize: 18,
    fontWeight: "normal",
    textDecoration: "none",
    letterSpacing: 0,
  });

  const handleTransform = (value: Transform) => {
    setTransformation(value);
  };

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
          <GenerativeFillPopover
            handleTransform={handleTransform}
            handleSettings={setSettings}
            prompt={settings.prompt}
            gravity={settings.gravity}
          />
          <AddCustomTextDrawer
            handleTransform={handleTransform}
            handleSettings={setSettings}
            text={settings.text}
            x={settings.x}
            y={settings.y}
            angle={settings.angle}
            gravity={settings.gravity}
            fontSize={settings.fontSize}
            letterSpacing={settings.letterSpacing}
          />
          <Button onClick={() => setTransformation("blur")}>Apply Blur</Button>
          <OpacityPopover
            handleSettings={setSettings}
            handleTransform={handleTransform}
            opacity={settings.opacity}
          />
          <TintColorPopover
            handleSettings={setSettings}
            amount={settings.amount}
            color1={settings.color1}
            color2={settings.color2}
            handleTransform={handleTransform}
          />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <CldImage src={publicId} width="680" height="300" alt="some-image" />
          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="680"
              height="300"
              alt="some-image"
              sizes="100vw"
              placeholder={dataUrl}
              fillBackground={{
                crop: "pad",
                gravity: settings.gravity,
                prompt: settings.prompt,
              }}
            />
          )}
          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="680"
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
              width="680"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              opacity={settings.opacity}
            />
          )}
          {transformation === "tint" && (
            <CldImage
              src={publicId}
              width="680"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              tint={`equalize:${settings.amount}:${settings.color1}:${settings.color2}`}
            />
          )}
          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="680"
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
              width="680"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              pixelate
            />
          )}
          {transformation === "custom-text" && (
            <CldImage
              src={publicId}
              width="680"
              height="300"
              sizes="100vw"
              alt="some-image"
              placeholder={dataUrl}
              overlays={[
                {
                  position: {
                    x: settings.x,
                    y: settings.y,
                    angle: settings.angle,
                    gravity: settings.gravity,
                  },
                  text: {
                    color: settings.textColor,
                    fontFamily: settings.fontFamily,
                    fontSize: settings.fontSize,
                    fontWeight: settings.fontWeight,
                    antialias: settings.textDecoration,
                    letterSpacing: settings.letterSpacing,
                    text: settings.text,
                  },
                },
              ]}
            />
          )}
          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="680"
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
