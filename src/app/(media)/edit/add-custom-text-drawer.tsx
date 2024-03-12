import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { gravities, textColors, textFontsFamily } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SettingData, Transform } from "./page";

export function AddCustomTextDrawer({
  handleTransform,
  handleSettings,
  text,
  x,
  y,
  angle,
  gravity,
  fontSize,
  letterSpacing,
}: {
  handleTransform: (value: Transform) => void;
  handleSettings: Dispatch<SetStateAction<SettingData>>;
  text: string;
  x: number;
  y: number;
  angle: number;
  gravity?: string;
  fontSize: number;
  letterSpacing: number;
}) {
  const [activeColor, setActiveColor] = useState("White");
  const [activeFont, setActiveFont] = useState("Roboto Mono");
  const [activeFontWeight, setActiveFontWeight] = useState("normal");
  const [activeTextDecoration, setActiveTextDecoration] = useState("none");
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== undefined ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Sheet modal={false}>
        <SheetTrigger asChild>
          <Button onClick={() => handleTransform("custom-text")}>
            Add Custom Text
          </Button>
        </SheetTrigger>

        <SheetContent
          side={screenWidth > 640 ? "left" : "top"}
          className="w-full h-1/2 sm:h-full sm:max-w-md"
        >
          <ScrollArea className="h-full w-full rounded-md pr-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  Adding custom texting
                </h4>
                <p className="text-sm text-muted-foreground">
                  Adding Text with Effects
                </p>
              </div>
              <div className="grid gap-3">
                <h5 className="font-medium leading-none">Text Position:</h5>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="text">Text</Label>
                  <Input
                    id="text"
                    type="text"
                    value={text}
                    onChange={(e) => {
                      handleSettings((prevSettings) => ({
                        ...prevSettings,
                        text: e.target.value,
                      }));
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="x">X</Label>
                  <div className="flex flex-col col-span-2 gap-2">
                    <Slider
                      defaultValue={[x]}
                      max={300}
                      min={-300}
                      step={1}
                      className="h-5 cursor-pointer"
                      onValueChange={(value) => {
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          x: value[0],
                        }));
                      }}
                    />
                    <Input
                      id="x"
                      type="number"
                      className="h-8 cursor-pointer"
                      value={x}
                      min="-300"
                      max="300"
                      step="1"
                      onChange={(e) => {
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          x: +e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="y">Y</Label>
                  <div className="flex flex-col col-span-2 gap-2">
                    <Slider
                      defaultValue={[y]}
                      max={500}
                      min={0}
                      step={1}
                      className="h-5 cursor-pointer"
                      onValueChange={(value) => {
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          y: value[0],
                        }));
                      }}
                    />
                    <Input
                      id="y"
                      type="number"
                      className="h-8 cursor-pointer"
                      value={y}
                      min="0"
                      max="750"
                      step="1"
                      onChange={(e) => {
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          y: +e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="angle">Angle</Label>
                  <div className="flex flex-col col-span-2 gap-2">
                    <Slider
                      defaultValue={[angle]}
                      max={180}
                      min={-180}
                      step={1}
                      className="h-5 cursor-pointer"
                      onValueChange={(value) => {
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          angle: value[0],
                        }));
                      }}
                    />
                    <Input
                      id="angle"
                      type="number"
                      className="h-8 cursor-pointer"
                      value={angle}
                      min="-180"
                      max="180"
                      step="1"
                      onChange={(e) => {
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          angle: +e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="gravity">Gravity</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSettings((prevSettings) => ({
                        ...prevSettings,
                        gravity: value,
                      }))
                    }
                    defaultValue={gravity}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose graivity positions for crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {gravities.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="grid gap-3">
                <h5 className="font-medium leading-none">Text Style:</h5>
                <Label htmlFor="text">Text Color</Label>
                <div className="grid grid-cols-3 gap-2 items-center">
                  {textColors.map((color) => (
                    <Button
                      className={cn(
                        "whitespace-nowrap focus-visible:ring-1 bg-background shadow-sm h-8 px-3 text-xs justify-start",
                        activeColor === color.label
                          ? "border-2 border-primary"
                          : ""
                      )}
                      variant="outline"
                      key={color.value}
                      onClick={() => {
                        setActiveColor(color.label);
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          textColor: color.value,
                        }));
                      }}
                    >
                      <span
                        className="mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full"
                        style={{ backgroundColor: color.value }}
                      >
                        {activeColor === color.label && (
                          <svg
                            width={15}
                            height={15}
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                          >
                            <path
                              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                      {color.label}
                    </Button>
                  ))}
                </div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <div className="grid grid-cols-3 gap-2 items-center">
                  {textFontsFamily.map((font) => (
                    <Button
                      className={cn(
                        "focus-visible:ring-1 bg-background shadow-sm px-3 text-xs justify-start text-left",
                        activeFont === font.label ? "border border-primary" : ""
                      )}
                      variant="outline"
                      key={font.value}
                      onClick={() => {
                        setActiveFont(font.label);
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          fontFamily: font.value,
                        }));
                      }}
                    >
                      {font.label}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="textSize">Text Size</Label>
                  <Input
                    id="textSize"
                    type="number"
                    min="0"
                    value={fontSize}
                    onChange={(e) => {
                      handleSettings((prevSettings) => ({
                        ...prevSettings,
                        fontSize: +e.target.value,
                      }));
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="fontWeight">Font Weight</Label>
                  <div className="col-span-2 space-x-2">
                    <Button
                      className={cn(
                        "focus-visible:ring-1 bg-background shadow-sm px-3 text-xs justify-start text-left",
                        activeFontWeight === "normal"
                          ? "border-2 border-primary"
                          : ""
                      )}
                      variant="outline"
                      onClick={() => {
                        setActiveFontWeight("normal");
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          fontWeight: "normal",
                        }));
                      }}
                    >
                      Normal
                    </Button>
                    <Button
                      className={cn(
                        "focus-visible:ring-1 bg-background shadow-sm px-3 text-xs justify-start text-left font-bold",
                        activeFontWeight === "bold"
                          ? "border-2 border-primary"
                          : ""
                      )}
                      variant="outline"
                      onClick={() => {
                        setActiveFontWeight("bold");
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          fontWeight: "bold",
                        }));
                      }}
                    >
                      Bold
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="textDecoration">Text Decoration</Label>
                  <div className="col-span-2 space-x-2">
                    <Button
                      className={cn(
                        "focus-visible:ring-1 bg-background shadow-sm px-3 text-xs justify-start text-left",
                        activeTextDecoration === "none"
                          ? "border-2 border-primary"
                          : ""
                      )}
                      variant="outline"
                      onClick={() => {
                        setActiveTextDecoration("none");
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          textDecoration: "none",
                        }));
                      }}
                    >
                      None
                    </Button>
                    <Button
                      className={cn(
                        "focus-visible:ring-1 bg-background shadow-sm px-3 text-xs justify-start text-left font-bold",
                        activeTextDecoration === "underline"
                          ? "border-2 border-primary"
                          : ""
                      )}
                      variant="outline"
                      onClick={() => {
                        setActiveTextDecoration("underline");
                        handleSettings((prevSettings) => ({
                          ...prevSettings,
                          textDecoration: "underline",
                        }));
                      }}
                    >
                      Underline
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <Label htmlFor="textSize">Letter Spacing</Label>
                  <Input
                    id="letterSpacing"
                    type="number"
                    min="0"
                    value={letterSpacing}
                    onChange={(e) => {
                      handleSettings((prevSettings) => ({
                        ...prevSettings,
                        letterSpacing: +e.target.value,
                      }));
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
